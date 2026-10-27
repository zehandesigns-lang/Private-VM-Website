import { useEffect, useRef, useState } from "react";

// Seconds count from when the ship mounts (and only while it is on screen); the hero says when the sweep starts. The
// HUD fade in VAIHeroSection is timed to follow the sweep, so change them together.
const CONFIG = {
  revealSeconds: 2.6, // time for the sweep to cross the ship
  band: 0.4, // depth of the dithered edge, as a share of the ship's width
  cellDivisor: 280, // a dither cell is ship width / this, in CSS px (kept between 3 and 6)
  scanPeriod: 8.5, // seconds between ambient scans once the ship is in
  scanWidth: 0.16, // half-width of the scan, as a share of the ship's width
  scanThin: 0.6, // share of the dots the scan switches off at its centre
  idleFps: 30, // frame rate once the ship has settled
  maxDpr: 2,
  maxPixels: 4.2e6, // cap on the drawing buffer
};

type Controller = { play: (elapsed: number) => void; dispose: () => void };

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;

uniform sampler2D uTex;
uniform float uCell;
uniform float uFront;
uniform float uBand;
uniform float uIdle;
uniform float uScan;
uniform float uScanWidth;
uniform float uScanThin;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Ordered-dither thresholds: an 8x8 Bayer matrix built from the 2x2 one, in 0..1.
float bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2.0 + a.y * a.y * 0.75);
}
float bayer4(vec2 a) {
  return bayer2(0.5 * a) * 0.25 + bayer2(a);
}
float bayer8(vec2 a) {
  return bayer4(0.5 * a) * 0.25 + bayer2(a);
}

void main() {
  vec4 src = texture2D(uTex, vUv); // premultiplied
  if (src.a < 0.002) {
    gl_FragColor = vec4(0.0);
    return;
  }

  // One threshold per cell, so the pattern reads as chunky pixels rather than fine noise.
  vec2 cell = mod(floor(gl_FragCoord.xy / uCell), 8.0);
  float t = bayer8(cell) + 1.0 / 128.0;

  // When the sweep reaches each point: left to right (stern to bow), a little later higher up, with a ragged edge.
  float field = clamp(
    (vUv.x - 0.06) / 0.9 + (vUv.y - 0.5) * 0.16 + (noise(vUv * vec2(5.0, 3.0) + 3.1) - 0.5) * 0.12,
    0.0,
    1.0
  );

  // Resolve: the share of cells that are on climbs from 0 to 1 as the front passes, and cells that have just
  // switched on flash brighter.
  float c = clamp((uFront * (1.0 + uBand) - field) / uBand, 0.0, 1.0);
  float on = step(t, c);
  float glow = (on - step(t, c - 0.2)) * (1.0 - c);

  // Ambient scan once the ship is in: a band sweeps across and thins the dots out in the same dither, then they return.
  float scanAt = uScan * (1.0 + 2.0 * uScanWidth) - uScanWidth;
  float dip = 1.0 - smoothstep(0.0, 1.0, abs(field - scanAt) / uScanWidth);
  on *= step(t, 1.0 - uIdle * uScanThin * dip);
  glow = max(glow, uIdle * dip * 0.6);

  vec3 color = src.rgb + (vec3(src.a) - src.rgb) * clamp(glow, 0.0, 1.0) * 0.75;
  gl_FragColor = vec4(color, src.a) * on;
}`;

const UNIFORMS = ["uTex", "uCell", "uFront", "uBand", "uIdle", "uScan", "uScanWidth", "uScanThin"] as const;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (x: number) => x * x * (3 - 2 * x);

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`VAI ship shader failed to compile: ${log}`);
  }
  return shader;
}

// Everything is set up straight away, but the clock only starts with `play(elapsed)`: `delay` is when the sweep starts
// and `elapsed` how long the hero's entrance has already been running (the image may take a moment to load). That keeps
// the ship in step with the CSS-driven parts of the hero, yet never starts it past the sweep, so a slow load still plays
// the whole thing.
function startShip(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  img: HTMLImageElement,
  delay: number,
  onLost: () => void,
): Controller | null {
  const ctx = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!ctx) return null;
  const gl = ctx;

  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.bindAttribLocation(prog, 0, "aPos");
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    throw new Error(`VAI ship program failed to link: ${gl.getProgramInfoLog(prog)}`);
  }
  gl.deleteShader(vs);
  gl.deleteShader(fs);

  const buf = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const u = {} as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
  for (const name of UNIFORMS) u[name] = gl.getUniformLocation(prog, name);
  gl.useProgram(prog);
  gl.uniform1i(u.uTex, 0);
  gl.uniform1f(u.uBand, CONFIG.band);
  gl.uniform1f(u.uScanWidth, CONFIG.scanWidth);
  gl.uniform1f(u.uScanThin, CONFIG.scanThin);

  // When the sweep is done and the ambient scan can fade in.
  const settle = delay + CONFIG.revealSeconds + 0.3;

  let cell = 3;
  let texW = 0;
  let texH = 0;
  let uploadTimer = 0;
  let time = 0;
  let last = 0;
  let drawn = 0;
  let raf = 0;
  let started = false;
  let running = false;
  let onScreen = true;
  let lost = false;

  // The artwork is a fine dither lattice, so it is prescaled to the drawing buffer (the way the browser does for an
  // <img>) and sampled 1:1; sampling the full-size PNG directly would shimmer.
  function upload(w: number, h: number) {
    if (w === texW && h === texH) return;
    texW = w;
    texH = h;
    const tw = Math.min(w, img.naturalWidth);
    const th = Math.min(h, img.naturalHeight);
    const scaled = document.createElement("canvas");
    scaled.width = tw;
    scaled.height = th;
    const c2d = scaled.getContext("2d")!;
    c2d.imageSmoothingQuality = "high";
    c2d.drawImage(img, 0, 0, tw, th);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, scaled);
    scaled.width = 0;
    scaled.height = 0;
  }

  function draw() {
    if (lost) return;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(prog);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const idle = time - settle;
    gl.uniform1f(u.uCell, cell);
    gl.uniform1f(u.uFront, smooth(clamp01((time - delay) / CONFIG.revealSeconds)));
    gl.uniform1f(u.uIdle, smooth(clamp01(idle / 1.5)));
    gl.uniform1f(u.uScan, (Math.max(0, idle - 1) / CONFIG.scanPeriod) % 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function tick() {
    raf = 0;
    if (!running) return;
    const now = performance.now();
    time += Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    // The ambient scan is slow, so once the ship has settled half the frames are plenty.
    if (time < settle || now - drawn >= 1000 / CONFIG.idleFps - 2) {
      draw();
      drawn = now;
    }
    raf = requestAnimationFrame(tick);
  }

  function sync() {
    const shouldRun = started && onScreen && !document.hidden && !lost;
    if (shouldRun && !running) {
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    } else if (!shouldRun && running) {
      running = false;
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function resize(immediate: boolean) {
    const r = host.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) return;
    const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.maxDpr);
    const k = dpr * Math.min(1, Math.sqrt(CONFIG.maxPixels / (r.width * r.height * dpr * dpr)));
    const w = Math.max(1, Math.round(r.width * k));
    const h = Math.max(1, Math.round(r.height * k));
    cell = Math.max(2, Math.round(Math.min(6, Math.max(3, Math.round(r.width / CONFIG.cellDivisor))) * k));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    // Rebuilding the texture is the expensive part, so wait for a drag-resize to settle.
    window.clearTimeout(uploadTimer);
    if (immediate || !texW) upload(w, h);
    else uploadTimer = window.setTimeout(() => upload(w, h), 150);
    if (!running) draw();
  }

  function onContextLost(e: Event) {
    e.preventDefault();
    lost = true;
    sync();
    onLost();
  }
  function onVisibility() {
    sync();
  }

  function play(elapsed: number) {
    started = true;
    time = Math.min(elapsed, delay);
    sync();
  }

  resize(true);
  draw();

  const ro = new ResizeObserver(() => resize(false));
  ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(host);
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onContextLost);
  sync();

  function dispose() {
    running = false;
    cancelAnimationFrame(raf);
    window.clearTimeout(uploadTimer);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    canvas.removeEventListener("webglcontextlost", onContextLost);
    if (!lost) {
      gl.deleteTexture(tex);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
    }
  }

  return { play, dispose };
}

/**
 * The ship illustration, resolving out of an ordered dither (starting `delay` seconds after `start` turns true) and
 * then scanned by a thin dither band now and then. It is prepared as soon as it mounts, so it is ready when the hero's
 * entrance begins. Falls back to the plain image for reduced motion or when WebGL is unavailable.
 */
export function VAIShipDither({ src, delay, start }: { src: string; delay: number; start: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const controller = useRef<Controller | null>(null);
  const startedAt = useRef<number | null>(null);
  const [plain, setPlain] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPlain(reduce.matches);
    reduce.addEventListener("change", onChange);
    return () => reduce.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!start) return;
    startedAt.current = performance.now();
    controller.current?.play(0);
  }, [start]);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (plain || !canvas || !host) return;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (cancelled) return;
      try {
        controller.current = startShip(canvas, host, img, delay, () => setPlain(true));
      } catch (err) {
        console.warn(err);
      }
      if (!controller.current) {
        setPlain(true);
        return;
      }
      if (startedAt.current !== null) controller.current.play((performance.now() - startedAt.current) / 1000);
    };
    img.onerror = () => {
      if (!cancelled) setPlain(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
      controller.current?.dispose();
      controller.current = null;
    };
  }, [plain, src, delay]);

  if (plain) return <img src={src} alt="" className="absolute inset-0 w-full h-full" />;
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
