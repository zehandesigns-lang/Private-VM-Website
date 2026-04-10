import { useEffect, useRef } from "react";

/** 4×4 Bayer matrix (flattened) — classic ordered dither. */
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

/** Brand greens with real luminance spread so the pattern reads on #0e3233 (not “invisible mud”). */
const PALETTE: readonly [number, number, number][] = [
  [4, 18, 19],
  [7, 28, 29],
  [11, 40, 41],
  [14, 50, 51],
  [18, 62, 64],
  [26, 78, 80],
  [36, 96, 98],
  [48, 118, 120],
];

type AnimatedDitherBackgroundProps = {
  /** 0–1 strength of the dither modulation on top of the wave field */
  ditherMix?: number;
  className?: string;
};

/**
 * Low-res canvas ordered dither + slow animated field, scaled up with pixelated sampling.
 * No extra deps — avoids pulling in Three.js for a full-page effect.
 */
export function AnimatedDitherBackground({
  ditherMix = 0.22,
  className = "",
}: AnimatedDitherBackgroundProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let t = 0;
    let mw = 0;
    let mh = 0;
    let buf: ImageData | null = null;
    let reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const syncSize = () => {
      const rect = wrap.getBoundingClientRect();
      let rw = rect.width;
      let rh = rect.height;
      // First paint / lazy layouts: parent can report 0×0 briefly; fall back so we still draw.
      if (rw < 2 || rh < 2) {
        rw = wrap.clientWidth || window.innerWidth || 800;
        rh = wrap.clientHeight || 400;
      }

      // Chunky internal resolution → visible dither blocks, cheap per frame
      const targetW = Math.max(120, Math.min(400, Math.floor(rw / 3.8)));
      const targetH = Math.max(90, Math.floor(targetW * (rh / rw)));

      if (targetW !== mw || targetH !== mh) {
        mw = targetW;
        mh = targetH;
        canvas.width = mw;
        canvas.height = mh;
        buf = ctx.createImageData(mw, mh);
      }

      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const drawFrame = () => {
      if (!buf || mw < 1 || mh < 1) return;
      const data = buf.data;
      const n = PALETTE.length;

      for (let y = 0; y < mh; y++) {
        const ny = y / (mh - 1 || 1);
        for (let x = 0; x < mw; x++) {
          const nx = x / (mw - 1 || 1);

          // Slow, organic luminance field
          const wave =
            Math.sin(nx * 5.2 + t * 1.05) * 0.38 +
            Math.sin(ny * 4.4 - t * 0.92) * 0.38 +
            Math.sin((nx + ny) * 5.5 + t * 0.62) * 0.22 +
            Math.sin(nx * 14 - ny * 11 + t * 0.28) * 0.08 +
            0.52;

          const bayer = (BAYER4[(y & 3) * 4 + (x & 3)] + 0.5) / 16 - 0.5;
          const level = Math.min(1, Math.max(0, wave * 0.92 + 0.04 + bayer * ditherMix));

          let qi = Math.round(level * (n - 1));
          if (qi < 0) qi = 0;
          if (qi >= n) qi = n - 1;

          const c = PALETTE[qi];
          const i = (y * mw + x) << 2;
          data[i] = c[0];
          data[i + 1] = c[1];
          data[i + 2] = c[2];
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(buf, 0, 0);
    };

    const loop = () => {
      if (!reducedMotion) t += 0.016;
      drawFrame();
      if (!reducedMotion) raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      syncSize();
      drawFrame();
    });
    ro.observe(wrap);
    syncSize();

    // Layout after paint (below-the-fold sections can report 0×0 on first effect tick).
    const kickLayout = () => {
      syncSize();
      drawFrame();
    };
    const layoutTimer = window.setTimeout(kickLayout, 0);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => {
      reducedMotion = mq.matches;
      cancelAnimationFrame(raf);
      t = 0;
      drawFrame();
      if (!reducedMotion) raf = requestAnimationFrame(loop);
    };
    mq.addEventListener("change", onMq);

    if (reducedMotion) {
      drawFrame();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", onMq);
      cancelAnimationFrame(raf);
      window.clearTimeout(layoutTimer);
    };
  }, [ditherMix]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 min-h-[120px] overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="block h-full w-full object-cover"
        style={{
          imageRendering: "pixelated",
        }}
        aria-hidden
      />
    </div>
  );
}
