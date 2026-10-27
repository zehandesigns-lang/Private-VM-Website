import { useEffect, useRef } from "react";

// Lengths marked "viewport" are fractions of the browser window, not of the (page-tall) canvas, so the motion looks
// the same however tall the background is.
const CONFIG = {
  flowAmount: 0.09, // ambient displacement (fraction of the viewport), always on
  flowSpeed: 0.1,
  flowScale: 1.4, // noise features per viewport height
  pointerRadius: 0.24, // fraction of viewport height
  pointerWarp: 2, // extra turbulence under the pointer
  pointerLens: 0.25, // soft magnification around the pointer (0..1)
  pointerDrag: 0.09, // gradient dragged along pointer motion
  parallax: 0.025, // whole gradient leans toward the pointer (fraction of the viewport)
  rampSeconds: 2.5, // eases from the still image into motion
  maxSide: 2400, // cap the drawing buffer on very large pages
  maxPixels: 1.6e6, // keeps the per-frame cost flat when the background spans several sections
};

// Grain strength (std dev in 0..1 colour units) at "100%": the film grain of the original artwork.
const GRAIN_STD = 3.7 / 255;
const GRAIN_TILE = 512;

// A part of the artwork to show instead of the whole thing: its centre as fractions of the image from the top left, and a
// magnification.
type Focus = { x: number; y: number; zoom: number };
const FULL_FRAME: Focus = { x: 0.5, y: 0.5, zoom: 1 };

type Controller = { setGrain: (strength: number) => void; dispose: () => void };

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
uniform sampler2D uGrainTex;
uniform vec2 uRes;
uniform vec2 uRef;
uniform vec2 uImg;
uniform vec3 uFocus;
uniform float uTime;
uniform float uRamp;
uniform vec2 uMouse;
uniform vec2 uMouseVel;
uniform vec2 uLean;
uniform float uPointer;
uniform float uFlowAmount;
uniform float uFlowSpeed;
uniform float uFlowScale;
uniform float uPointerRadius;
uniform float uPointerWarp;
uniform float uPointerLens;
uniform float uPointerDrag;
uniform float uParallax;
uniform float uGrain;

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

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.0 + vec2(17.0, 9.0);
    a *= 0.5;
  }
  return v;
}

float fbm2(vec2 p) {
  float v = 0.5 * noise(p);
  p = p * 2.0 + vec2(17.0, 9.0);
  return v + 0.25 * noise(p);
}

// background-size: cover, centred on uFocus.xy (image UV) and magnified by uFocus.z; the default (0.5, 0.5, 1) is plain cover
vec2 coverUv(vec2 uv) {
  float rc = uRes.x / uRes.y;
  float ri = uImg.x / uImg.y;
  vec2 s = rc > ri ? vec2(1.0, ri / rc) : vec2(rc / ri, 1.0);
  return (uv - 0.5) * s / uFocus.z + uFocus.xy;
}

// displaced samples fold back instead of smearing the texture edge
vec2 mirror(vec2 uv) {
  return 1.0 - abs(1.0 - mod(uv, 2.0));
}

void main() {
  vec2 uv = vUv;
  vec2 px = uv * uRes;
  vec2 ratio = uRef / uRes; // the viewport expressed in canvas UV

  vec2 p = px / uRef.y * uFlowScale;
  float t = uTime * uFlowSpeed;
  // Two stacked warps: the second bends the first, so bands undulate organically instead of just sliding.
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - vec2(0.0, t * 1.3)));
  vec2 r = vec2(fbm2(p + 1.8 * q + vec2(1.7, 9.2) + 0.6 * t), fbm2(p + 1.8 * q + vec2(8.3, 2.8) - 0.5 * t));
  vec2 flow = (r - 0.375) * 2.8;

  vec2 dp = px - uMouse * uRes;
  float rad = uPointerRadius * uRef.y;
  float fall = exp(-dot(dp, dp) / (2.0 * rad * rad)) * uPointer;

  vec2 disp = flow * uFlowAmount * ratio * (1.0 + uPointerWarp * fall);
  // Proportional to the offset from the pointer, so it fades to zero right at the pointer (a fixed-length push would pinch there).
  disp -= (uv - uMouse) * fall * uPointerLens;
  disp -= uMouseVel * fall * uPointerDrag;
  disp -= uLean * uParallax * uPointer * ratio;
  vec2 edgePx = min(px, uRes - px);
  disp *= uRamp * smoothstep(0.0, 1.0, min(edgePx.x / (0.16 * uRef.x), edgePx.y / (0.16 * uRef.y)));

  vec3 color = texture2D(uTex, mirror(coverUv(uv + disp))).rgb;

  // Grain is indexed by screen pixel, not by the displaced UV, so it stays put while the gradient moves.
  float g = (texture2D(uGrainTex, gl_FragCoord.xy / ${GRAIN_TILE}.0).r - 128.0 / 255.0) * (255.0 / 32.0);

  gl_FragColor = vec4(clamp(color + g * uGrain, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
  "uTex",
  "uGrainTex",
  "uRes",
  "uRef",
  "uImg",
  "uFocus",
  "uTime",
  "uRamp",
  "uMouse",
  "uMouseVel",
  "uLean",
  "uPointer",
  "uFlowAmount",
  "uFlowSpeed",
  "uFlowScale",
  "uPointerRadius",
  "uPointerWarp",
  "uPointerLens",
  "uPointerDrag",
  "uParallax",
  "uGrain",
] as const;

type Resources = {
  prog: WebGLProgram;
  buf: WebGLBuffer;
  texImage: WebGLTexture;
  texGrain: WebGLTexture;
  u: Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>;
};

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`VAI gradient shader failed to compile: ${log}`);
  }
  return shader;
}

function makeImageTexture(gl: WebGLRenderingContext, source: TexImageSource) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

function makeGrainTexture(gl: WebGLRenderingContext, pixels: Uint8Array) {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, GRAIN_TILE, GRAIN_TILE, 0, gl.LUMINANCE, gl.UNSIGNED_BYTE, pixels);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  return tex;
}

// Gaussian noise softened with a ~1px blur, wrapped so the tile repeats seamlessly: the same monochrome, slightly soft
// film grain as the original artwork. Stored as bytes: 128 + 32 * (unit-variance value).
function buildGrainPixels() {
  const n = GRAIN_TILE;
  const white = new Float32Array(n * n);
  for (let i = 0; i < white.length; i++) {
    const u = Math.random() || 1e-9;
    white[i] = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * Math.random());
  }
  const k = [0.0545, 0.2442, 0.4026, 0.2442, 0.0545];
  const tmp = new Float32Array(n * n);
  const out = new Float32Array(n * n);
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let s = 0;
      for (let t = -2; t <= 2; t++) s += k[t + 2] * white[y * n + ((x + t + n) % n)];
      tmp[y * n + x] = s;
    }
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      let s = 0;
      for (let t = -2; t <= 2; t++) s += k[t + 2] * tmp[((y + t + n) % n) * n + x];
      out[y * n + x] = s;
    }
  }
  let sum = 0;
  let sumSq = 0;
  for (let i = 0; i < out.length; i++) {
    sum += out[i];
    sumSq += out[i] * out[i];
  }
  const mean = sum / out.length;
  const std = Math.sqrt(sumSq / out.length - mean * mean);
  const pixels = new Uint8Array(n * n);
  for (let i = 0; i < pixels.length; i++) {
    pixels[i] = Math.max(0, Math.min(255, Math.round(128 + (32 * (out[i] - mean)) / std)));
  }
  return pixels;
}

function startGradient(
  canvas: HTMLCanvasElement,
  host: HTMLElement,
  img: HTMLImageElement,
  still: boolean,
  initialGrain: number,
  focus: Focus,
): Controller | null {
  const gl = canvas.getContext("webgl", {
    alpha: false,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
  });
  if (!gl) return null;

  const touchLike = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const grainPixels = buildGrainPixels();

  let res: Resources | null = null;
  let lost = false;
  let grainStrength = initialGrain;

  function build(): Resources {
    const vs = compile(gl!, gl!.VERTEX_SHADER, VERT);
    const fs = compile(gl!, gl!.FRAGMENT_SHADER, FRAG);
    const prog = gl!.createProgram()!;
    gl!.attachShader(prog, vs);
    gl!.attachShader(prog, fs);
    gl!.bindAttribLocation(prog, 0, "aPos");
    gl!.linkProgram(prog);
    if (!gl!.getProgramParameter(prog, gl!.LINK_STATUS)) {
      throw new Error(`VAI gradient program failed to link: ${gl!.getProgramInfoLog(prog)}`);
    }
    gl!.deleteShader(vs);
    gl!.deleteShader(fs);

    const buf = gl!.createBuffer()!;
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
    gl!.bufferData(gl!.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl!.STATIC_DRAW);

    const texImage = makeImageTexture(gl!, img);
    const texGrain = makeGrainTexture(gl!, grainPixels);

    const u = {} as Resources["u"];
    for (const name of UNIFORMS) u[name] = gl!.getUniformLocation(prog, name);

    gl!.useProgram(prog);
    gl!.uniform1i(u.uTex, 0);
    gl!.uniform1i(u.uGrainTex, 1);
    gl!.uniform2f(u.uImg, img.naturalWidth, img.naturalHeight);
    gl!.uniform3f(u.uFocus, focus.x, 1 - focus.y, focus.zoom); // the texture is flipped, so UV y runs up
    gl!.uniform1f(u.uFlowAmount, CONFIG.flowAmount);
    gl!.uniform1f(u.uFlowSpeed, CONFIG.flowSpeed);
    gl!.uniform1f(u.uFlowScale, CONFIG.flowScale);
    gl!.uniform1f(u.uPointerRadius, CONFIG.pointerRadius);
    gl!.uniform1f(u.uPointerWarp, CONFIG.pointerWarp);
    gl!.uniform1f(u.uPointerLens, CONFIG.pointerLens);
    gl!.uniform1f(u.uPointerDrag, CONFIG.pointerDrag);
    gl!.uniform1f(u.uParallax, CONFIG.parallax);
    return { prog, buf, texImage, texGrain, u };
  }

  const target = { x: 0.5, y: 0.5 };
  const mouse = { x: 0.5, y: 0.5 };
  const vel = { x: 0, y: 0 };
  const leanTarget = { x: 0, y: 0 };
  const lean = { x: 0, y: 0 };
  let lastClient: { x: number; y: number } | null = null;
  let bufScale = 1;
  let pointerInside = false;
  let pointerPower = 0;
  let time = 0;
  let ramp = 0;
  let last = 0;
  let raf = 0;
  let running = false;
  let onScreen = true;

  function draw() {
    if (!res || lost) return;
    const g = gl!;
    g.viewport(0, 0, canvas.width, canvas.height);
    g.useProgram(res.prog);
    g.activeTexture(g.TEXTURE0);
    g.bindTexture(g.TEXTURE_2D, res.texImage);
    g.activeTexture(g.TEXTURE1);
    g.bindTexture(g.TEXTURE_2D, res.texGrain);
    g.bindBuffer(g.ARRAY_BUFFER, res.buf);
    g.enableVertexAttribArray(0);
    g.vertexAttribPointer(0, 2, g.FLOAT, false, 0, 0);
    g.uniform2f(res.u.uRes, canvas.width, canvas.height);
    g.uniform2f(res.u.uRef, window.innerWidth * bufScale, window.innerHeight * bufScale);
    g.uniform1f(res.u.uTime, time);
    g.uniform1f(res.u.uRamp, ramp * ramp * (3 - 2 * ramp));
    g.uniform2f(res.u.uMouse, mouse.x, mouse.y);
    g.uniform2f(res.u.uMouseVel, vel.x, vel.y);
    g.uniform2f(res.u.uLean, lean.x, lean.y);
    g.uniform1f(res.u.uPointer, pointerPower);
    g.uniform1f(res.u.uGrain, grainStrength);
    g.drawArrays(g.TRIANGLE_STRIP, 0, 4);
  }

  // The pointer is tracked in viewport coordinates and converted to the (page-tall) canvas, so it stays on the cursor
  // while the page scrolls underneath it.
  function pointTo(cx: number, cy: number) {
    const r = host.getBoundingClientRect();
    target.x = Math.min(1, Math.max(0, (cx - r.left) / r.width));
    target.y = 1 - Math.min(1, Math.max(0, (cy - r.top) / r.height));
    leanTarget.x = Math.min(0.5, Math.max(-0.5, cx / window.innerWidth - 0.5));
    leanTarget.y = Math.min(0.5, Math.max(-0.5, 0.5 - cy / window.innerHeight));
  }

  function tick(now: number) {
    raf = 0;
    if (!running) return;
    const dt = Math.min(0.05, Math.max(0.001, (now - last) / 1000));
    last = now;
    time += dt;
    ramp = Math.min(1, ramp + dt / CONFIG.rampSeconds);

    if (touchLike) {
      pointTo(
        window.innerWidth * (0.5 + 0.28 * Math.sin(time * 0.17 + 1.3)),
        window.innerHeight * (0.5 + 0.22 * Math.sin(time * 0.13)),
      );
    }
    const wantPointer = touchLike ? 0.6 : pointerInside ? 1 : 0;
    pointerPower += (wantPointer - pointerPower) * (1 - Math.exp(-dt * 3));

    const px = mouse.x;
    const py = mouse.y;
    const k = 1 - Math.exp(-dt * 4);
    mouse.x += (target.x - mouse.x) * k;
    mouse.y += (target.y - mouse.y) * k;
    lean.x += (leanTarget.x - lean.x) * k;
    lean.y += (leanTarget.y - lean.y) * k;
    const vk = 1 - Math.exp(-dt * 8);
    vel.x += ((mouse.x - px) / dt - vel.x) * vk;
    vel.y += ((mouse.y - py) / dt - vel.y) * vk;
    const speed = Math.hypot(vel.x, vel.y);
    if (speed > 2) {
      vel.x *= 2 / speed;
      vel.y *= 2 / speed;
    }

    draw();
    raf = requestAnimationFrame(tick);
  }

  function sync() {
    const shouldRun = !still && onScreen && !document.hidden && !lost && !!res;
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

  function resize() {
    const r = host.getBoundingClientRect();
    const scale = Math.min(
      1,
      CONFIG.maxSide / Math.max(r.width, r.height, 1),
      Math.sqrt(CONFIG.maxPixels / Math.max(r.width * r.height, 1)),
    );
    const w = Math.max(1, Math.round(r.width * scale));
    const h = Math.max(1, Math.round(r.height * scale));
    bufScale = w / Math.max(r.width, 1);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    if (!running) draw();
  }

  function onMove(e: PointerEvent) {
    if (e.pointerType === "touch") return;
    lastClient = { x: e.clientX, y: e.clientY };
    pointTo(e.clientX, e.clientY);
    pointerInside = true;
  }
  function onLeave() {
    pointerInside = false;
  }
  function onScroll() {
    if (pointerInside && lastClient) pointTo(lastClient.x, lastClient.y);
  }
  function onLost(e: Event) {
    e.preventDefault();
    lost = true;
    res = null;
    canvas.style.opacity = "0";
    sync();
  }
  function onRestored() {
    try {
      res = build();
    } catch (err) {
      console.warn(err);
      return;
    }
    lost = false;
    resize();
    draw();
    canvas.style.opacity = "1";
    sync();
  }
  function onVisibility() {
    sync();
  }

  res = build();
  resize();
  draw();
  canvas.style.opacity = "1";

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  io.observe(host);
  document.addEventListener("visibilitychange", onVisibility);
  if (!still) {
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
  }
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  sync();

  function dispose() {
    running = false;
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    window.removeEventListener("scroll", onScroll);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    if (res && !lost) {
      gl!.deleteTexture(res.texImage);
      gl!.deleteTexture(res.texGrain);
      gl!.deleteBuffer(res.buf);
      gl!.deleteProgram(res.prog);
    }
    res = null;
    canvas.style.opacity = "0";
  }

  function setGrain(strength: number) {
    grainStrength = strength;
    if (!running) draw();
  }

  return { setGrain, dispose };
}

/**
 * `grain` is a percentage: 0 = none, 100 = the film grain of the original artwork. `focus` shows just a part of the
 * artwork (the whole of it by default).
 */
export function VAIGradientBackground({
  src,
  grain,
  focus = FULL_FRAME,
}: {
  src: string;
  grain: number;
  focus?: Focus;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const controller = useRef<Controller | null>(null);
  const grainRef = useRef(grain);

  useEffect(() => {
    grainRef.current = grain;
    controller.current?.setGrain((grain / 100) * GRAIN_STD);
  }, [grain]);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cancelled = false;
    let img: HTMLImageElement | null = null;

    const run = (loaded: HTMLImageElement) => {
      if (cancelled || controller.current) return;
      try {
        // Reduced motion keeps the look but renders a single still frame.
        controller.current = startGradient(
          canvas,
          host,
          loaded,
          reduce.matches,
          (grainRef.current / 100) * GRAIN_STD,
          focus,
        );
      } catch (err) {
        console.warn(err);
      }
    };
    const start = () => {
      if (img) return run(img);
      const loaded = new Image();
      loaded.crossOrigin = "anonymous";
      loaded.onload = () => {
        img = loaded;
        run(loaded);
      };
      loaded.src = src;
    };
    const stop = () => {
      controller.current?.dispose();
      controller.current = null;
    };
    const onChange = () => {
      stop();
      start();
    };

    start();
    reduce.addEventListener("change", onChange);
    return () => {
      cancelled = true;
      reduce.removeEventListener("change", onChange);
      stop();
    };
  }, [src, focus.x, focus.y, focus.zoom]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0, transition: "opacity 600ms ease" }}
    />
  );
}
