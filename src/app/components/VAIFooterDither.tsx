import { useEffect, useRef } from "react";

type RGB = readonly [number, number, number];

// Ordered-dither thresholds: the same 8x8 Bayer pattern as the ship (VAIShipDither), in 0..1.
const BAYER = (() => {
  const b2 = (x: number, y: number) => {
    const v = Math.floor(x) / 2 + Math.floor(y) ** 2 * 0.75;
    return v - Math.floor(v);
  };
  const b4 = (x: number, y: number) => b2(0.5 * x, 0.5 * y) * 0.25 + b2(x, y);
  const b8 = (x: number, y: number) => b4(0.5 * x, 0.5 * y) * 0.25 + b2(x, y);
  const table = new Float32Array(64);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) table[y * 8 + x] = b8(x, y) + 1 / 128;
  return table;
})();

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smoothstep = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

// One canvas pixel per dither cell, scaled up with image-rendering: pixelated, so the cells stay crisp at any size and the
// work per frame stays tiny. A cell is on where its level beats the Bayer threshold.
function paint(canvas: HTMLCanvasElement, cols: number, rows: number, rgb: RGB, level: (x: number, y: number) => number) {
  if (canvas.width !== cols || canvas.height !== rows) {
    canvas.width = cols;
    canvas.height = rows;
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const img = ctx.createImageData(cols, rows);
  const d = img.data;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (level(x, y) > BAYER[(y & 7) * 8 + (x & 7)]) {
        const i = (y * cols + x) * 4;
        d[i] = rgb[0];
        d[i + 1] = rgb[1];
        d[i + 2] = rgb[2];
        d[i + 3] = 255;
      }
    }
  }
  ctx.putImageData(img, 0, 0);
}

const cellFor = (width: number) => (width < 640 ? 3 : 4); // CSS px per cell

const canvasStyle = { display: "block", width: "100%", height: "auto", imageRendering: "pixelated" } as const;

/** A band of `color` cells that thins out going down, so the page above melts into whatever is behind the footer. */
export function VAIDitherEdge({ color, rows }: { color: RGB; rows: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const draw = () => {
      const w = host.clientWidth;
      if (w < 1) return;
      paint(canvas, Math.ceil(w / cellFor(w)), rows, color, (_x, y) => 1 - (y + 1) / rows);
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(host);
    return () => ro.disconnect();
  }, [color, rows]);

  return <canvas ref={ref} style={canvasStyle} />;
}

// The top row of the VAI mark (see vai-logo.svg), in the mark's own 141 x 60 space, with its last circle swapped for the
// mark's rounded square. The lower row is cropped away, so it is not drawn.
const MARK = { w: 141, h: 60 };
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const roundedSquare = (cx: number, cy: number, side: number, r: number) => {
  const s = side - 2 * r;
  return `M${cx - side / 2 + r} ${cy - side / 2}h${s}a${r} ${r} 0 0 1 ${r} ${r}v${s}a${r} ${r} 0 0 1 ${-r} ${r}h${-s}a${r} ${r} 0 0 1 ${-r} ${-r}v${-s}a${r} ${r} 0 0 1 ${r} ${-r}z`;
};
const SHAPES = [
  circle(9.65675, 12.0709, 9.65672),
  circle(47.4789, 12.0709, 9.65672),
  "M79.835 2.91485C80.4259 1.72071 82.129 1.72071 82.7199 2.91485L90.5814 18.8008C91.1108 19.8705 90.3325 21.1241 89.1389 21.1241H73.416C72.2224 21.1241 71.4441 19.8705 71.9735 18.8008L79.835 2.91485Z",
  roundedSquare(130.366, 12.0709, 19.3134, 5),
];

const VISIBLE = 0.56; // how much of the mark's height shows: the top row, dissolving out before the second row starts
const REVEAL_MS = 2200;
const BAND = 0.45; // depth of the dithered front while the mark resolves, as a share of its extent

/**
 * The VAI mark at full width, drawn as a dither that thins out toward the bottom edge. It resolves out of the dither
 * once, when it scrolls into view (and is simply there for reduced motion).
 */
export function VAIDitherMark({ color }: { color: RGB }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cols = 0;
    let rows = 0;
    let cover = new Float32Array(0);
    let fade = new Float32Array(0);
    let progress = reduce ? 1 : 0;
    let raf = 0;
    let started = reduce;

    // Coverage of the artwork, one value per cell, from drawing the shapes into a canvas of the same size.
    const build = () => {
      const w = host.clientWidth;
      if (w < 1) return false;
      cols = Math.max(8, Math.ceil(w / cellFor(w)));
      const full = Math.round((cols * MARK.h) / MARK.w);
      rows = Math.round(full * VISIBLE);
      const probe = document.createElement("canvas");
      probe.width = cols;
      probe.height = full;
      const g = probe.getContext("2d", { willReadFrequently: true });
      if (!g) return false;
      g.scale(cols / MARK.w, full / MARK.h);
      for (const d of SHAPES) g.fill(new Path2D(d));
      const px = g.getImageData(0, 0, cols, full).data;
      cover = new Float32Array(cols * rows);
      for (let i = 0; i < cover.length; i++) cover[i] = px[i * 4 + 3] / 255;
      fade = Float32Array.from({ length: rows }, (_, y) => 1 - smoothstep(0.3, 1, y / rows));
      return true;
    };

    const draw = () => {
      if (!cover.length) return;
      const eased = progress * progress * (3 - 2 * progress);
      const front = eased * (1 + BAND);
      paint(canvas, cols, rows, color, (x, y) => {
        // the front sweeps from the top left to the bottom right, resolving cells in Bayer order behind it
        const field = 0.6 * (x / cols) + 0.4 * (y / rows);
        return cover[y * cols + x] * fade[y] * clamp01((front - field) / BAND);
      });
    };

    const play = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const tick = () => {
        progress = clamp01((performance.now() - t0) / REVEAL_MS);
        draw();
        raf = progress < 1 ? requestAnimationFrame(tick) : 0;
      };
      raf = requestAnimationFrame(tick);
    };

    if (build()) draw();
    const ro = new ResizeObserver(() => {
      if (build()) draw();
    });
    ro.observe(host);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(host);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [color]);

  return <canvas ref={ref} style={canvasStyle} />;
}
