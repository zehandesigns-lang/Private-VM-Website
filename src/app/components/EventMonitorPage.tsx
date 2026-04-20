import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";
import sfxScissorsCut from "@/assets/sfx/scissors-cut.mp3";
import { Link } from "react-router";

const RADIAL_STACK = `
  radial-gradient(ellipse 130% 70% at 50% -35%, rgba(252, 247, 227, 0.14), transparent 52%),
  radial-gradient(ellipse 55% 45% at 100% 105%, rgba(0, 0, 0, 0.45), transparent 50%),
  radial-gradient(ellipse 50% 40% at 0% 80%, rgba(65, 102, 104, 0.28), transparent 55%),
  linear-gradient(168deg, #0e3233 0%, #0b282a 42%, #0d2f30 100%)
`;

const tt = { fontFamily: "'TT Hoves Pro', sans-serif" } as const;
const lc = { fontFamily: "'LT Cushion', serif", fontWeight: 300 as const, fontStyle: "normal" as const };
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
// Gravity-like: starts slow, accelerates into the slot. Single smooth curve so the
// paper never appears to pause mid-fall.
const FALL_EASE: [number, number, number, number] = [0.35, 0, 0.65, 0.35];

/** Deterministic pseudo-random so scribbles stay stable per paper id. */
function rand(seed: number) {
  let x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

/** A single paper sheet — tilted rectangle with handwritten squiggle lines. */
function PaperSheet({ seed = 1, width = 170 }: { seed?: number; width?: number }) {
  const ink = "#1a1a1a";
  const paper = "#F3F2EE";

  // Build squiggle lines
  const lines = useMemo(() => {
    const out: { d: string; y: number; strokeWidth: number }[] = [];
    const yStart = 42;
    const lineCount = 7;
    const gap = 18;
    for (let i = 0; i < lineCount; i++) {
      const baseY = yStart + i * gap;
      const startX = 22 + rand(seed + i * 3) * 14;
      const endX = 200 - rand(seed + i * 5) * 30;
      const segs = 5 + Math.floor(rand(seed + i * 7) * 3);
      let d = `M ${startX} ${baseY}`;
      for (let s = 1; s <= segs; s++) {
        const t = s / segs;
        const x = startX + (endX - startX) * t;
        const wobble = (rand(seed + i * 11 + s) - 0.5) * 7;
        const mid = startX + (endX - startX) * (t - 0.5 / segs);
        d += ` Q ${mid} ${baseY + wobble} ${x} ${baseY + wobble * 0.35}`;
      }
      out.push({ d, y: baseY, strokeWidth: 2.2 + rand(seed + i) * 0.8 });
    }
    return out;
  }, [seed]);

  const height = width * (168 / 230);

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 230 168"
      fill="none"
      style={{
        filter:
          "drop-shadow(0 14px 28px rgba(0,0,0,0.35)) drop-shadow(0 4px 10px rgba(0,0,0,0.25))",
      }}
      aria-hidden
    >
      {/* Sheet body — slight parallelogram skew like the provided paper.svg */}
      <path
        d="M 14 6 L 220 2 L 216 162 L 10 166 Z"
        fill={paper}
        stroke="rgba(0,0,0,0.08)"
        strokeWidth="1"
      />
      {/* Torn/folded corner suggestion */}
      <path
        d="M 14 6 L 30 6 L 14 22 Z"
        fill="rgba(0,0,0,0.05)"
      />
      {/* Title bar */}
      <rect x="22" y="18" width={80 + rand(seed) * 60} height="3.5" fill={ink} opacity="0.9" rx="1.5" />
      <rect x="22" y="26" width={40 + rand(seed + 1) * 30} height="2" fill={ink} opacity="0.55" rx="1" />
      {/* Handwriting */}
      {lines.map((l, i) => (
        <path
          key={i}
          d={l.d}
          stroke={ink}
          strokeWidth={l.strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      ))}
    </svg>
  );
}

type Paper = {
  id: number;
  /** Horizontal offset from screen center, in pixels (keeps the bunch tight on any width). */
  leftOffsetPx: number;
  topPct: number;
  rotate: number;
  width: number;
  seed: number;
  z: number;
  /** Only back-row papers fall. Front-row papers are purely decorative — they
   *  stay in place to visually mask the respawn moment of the back papers. */
  falls: boolean;
};

/** Total horizontal span of the bunch, in pixels. Wide enough to fill a large
 *  monitor horizontally; with 46 densely-packed papers, the cluster still reads
 *  as a single bunch with plenty of overlap. */
const BUNCH_WIDTH_PX = 1600;

/** Build a tight cluster of papers gathered at the top-center — one bunch, half-visible. */
function buildStack(count: number): Paper[] {
  const out: Paper[] = [];
  // Gaussian-ish sample so papers bunch near center and taper at the edges.
  const gauss = () => (Math.random() + Math.random() + Math.random()) / 3 - 0.5; // ~[-0.5, 0.5]
  for (let i = 0; i < count; i++) {
    const leftOffsetPx = gauss() * BUNCH_WIDTH_PX;
    // Two depth layers so papers read as overlapping from behind the top edge.
    // Back = higher up, smaller z (rendered BEHIND front papers — can fall).
    // Front = lower (more visible), larger z (rendered IN FRONT — decorative,
    // never falls, so there's no ugly respawn visible to the viewer).
    const back = i % 2 === 0;
    // Push the stack upward so only the lower halves are visible.
    // Back row sits even higher (more hidden) than the front row.
    const topPct = (back ? -6 : -2) + (Math.random() - 0.5) * 1.6;
    out.push({
      id: i,
      leftOffsetPx,
      topPct,
      rotate: (Math.random() - 0.5) * 32,
      width: 160 + Math.random() * 55,
      seed: 7 + i * 13,
      // Front papers render above back papers; within a row, later index goes on top.
      z: (back ? 0 : 200) + i,
      falls: back,
    });
  }
  return out;
}

type PaperState = "stacked" | "falling" | "gone";

function StackedPaper({
  paper,
  state,
  baseDx,
  baseDy,
  wobbleKey,
}: {
  paper: Paper;
  state: PaperState;
  baseDx: number;
  baseDy: number;
  wobbleKey: number;
}) {
  const wobble = useAnimation();
  // Keep the latest base deltas available to the fall handler without making them
  // effect dependencies (so parent re-renders can't restart an in-flight fall).
  const baseRef = useRef({ dx: baseDx, dy: baseDy });
  useEffect(() => {
    baseRef.current = { dx: baseDx, dy: baseDy };
  }, [baseDx, baseDy]);

  // Jostle when a neighbor falls out.
  useEffect(() => {
    if (wobbleKey === 0 || state !== "stacked") return;
    const intensity = 0.4 + Math.random() * 1.2;
    const dir = Math.random() > 0.5 ? 1 : -1;
    wobble.start({
      rotate: [paper.rotate, paper.rotate + dir * intensity, paper.rotate - dir * intensity * 0.5, paper.rotate],
      y: [0, -1 - Math.random() * 2, 0.5, 0],
      transition: { duration: 0.55, ease: "easeOut" },
    });
  }, [wobbleKey, state, paper.rotate, wobble]);

  // Fall / reset animations driven strictly by `state`. Targets are read from a ref
  // so parent re-renders never interrupt a fall mid-flight.
  useEffect(() => {
    if (state === "falling") {
      const { dx, dy } = baseRef.current;
      const jitter = (Math.random() - 0.5) * 120; // lateral landing jitter — computed ONCE per fall
      const targetDx = dx + jitter;
      const targetDy = dy;
      const swing = (Math.random() - 0.5) * 40;
      const endRotate = paper.rotate + swing;
      // Position animates as a single continuous curve so the path never stutters.
      // Scale & opacity stay at 1 for most of the fall, then collapse as the paper
      // enters the slot — their per-property timings run independently, which avoids
      // the multi-keyframe easing that was causing the perceived mid-fall pause.
      wobble.start({
        x: targetDx,
        y: targetDy,
        rotate: endRotate,
        scale: [1, 1, 0.06],
        opacity: [1, 1, 0],
        transition: {
          duration: 1.0,
          ease: FALL_EASE,
          rotate: { duration: 1.0, ease: "easeInOut" },
          scale: { duration: 1.0, ease: "easeIn", times: [0, 0.86, 1] },
          opacity: { duration: 1.0, ease: "easeIn", times: [0, 0.86, 1] },
        },
      });
    } else if (state === "gone") {
      wobble.set({ x: 0, y: 0, rotate: paper.rotate, scale: 0.06, opacity: 0 });
    } else if (state === "stacked") {
      // Snap back instantly — no fade-in, so it never overlaps with the next falling paper.
      wobble.set({ x: 0, y: 0, rotate: paper.rotate, scale: 1, opacity: 1 });
    }
  }, [state, paper.rotate, wobble]);

  return (
    <motion.div
      className="absolute will-change-transform"
      style={{
        left: `calc(50% + ${paper.leftOffsetPx}px)`,
        top: `${paper.topPct}%`,
        transform: "translate(-50%, -50%)",
        zIndex: paper.z,
      }}
      initial={{ x: 0, y: 0, rotate: paper.rotate, scale: 1, opacity: 1 }}
      animate={wobble}
    >
      <PaperSheet seed={paper.seed} width={paper.width} />
    </motion.div>
  );
}

/** Paper eater — wide pedestal with a dark accepting slot. */
function PaperEater({ chompCount }: { chompCount: number }) {
  const slotCtl = useAnimation();
  const bodyCtl = useAnimation();
  const flashCtl = useAnimation();

  useEffect(() => {
    if (chompCount === 0) return;
    slotCtl.start({
      scaleY: [1, 0.35, 1.55, 1],
      transition: { duration: 0.55, ease: "easeOut", times: [0, 0.22, 0.58, 1] },
    });
    bodyCtl.start({
      y: [0, 3, -1.5, 0],
      transition: { duration: 0.52, ease: "easeOut" },
    });
    flashCtl.start({
      opacity: [0, 0.9, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [chompCount, slotCtl, bodyCtl, flashCtl]);

  return (
    <motion.svg
      viewBox="0 0 3459 277"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      style={{ overflow: "visible" }}
      animate={bodyCtl}
    >
      <defs>
        <linearGradient id="pedestal-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#E8E6E0" />
          <stop offset="55%" stopColor="#D9D9D9" />
          <stop offset="100%" stopColor="#b8b8b8" />
        </linearGradient>
        <linearGradient id="slot-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0a0a0a" />
          <stop offset="50%" stopColor="#242424" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <filter id="slot-glow" x="-5%" y="-100%" width="110%" height="300%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* Pedestal body */}
      <path d="M3229 0H197L0 277H3459L3229 0Z" fill="url(#pedestal-grad)" />
      {/* Top highlight line */}
      <path d="M3229 0H197L192 6H3234L3229 0Z" fill="#fcf7e3" opacity="0.35" />
      {/* Inner shadow on bevel */}
      <path d="M3229 0H197L190 12H3236L3229 0Z" fill="rgba(0,0,0,0.12)" />

      {/* Glow behind slot (pulses on chomp) */}
      <motion.ellipse
        cx="1763"
        cy="128"
        rx="1400"
        ry="20"
        fill="#fcf7e3"
        filter="url(#slot-glow)"
        initial={{ opacity: 0 }}
        animate={flashCtl}
      />

      {/* Slot — the mouth */}
      <motion.rect
        x="550"
        y="94.5"
        width="2426"
        height="68"
        rx="3"
        fill="url(#slot-grad)"
        style={{ transformOrigin: "1763px 128.5px" }}
        animate={slotCtl}
      />

      {/* VOLTEO brand label on the pedestal */}
      <text
        x="1763"
        y="228"
        textAnchor="middle"
        fill="#0e3233"
        style={{
          fontFamily: "'TT Hoves Pro', sans-serif",
          fontWeight: 600,
          fontSize: 44,
          letterSpacing: "0.35em",
        }}
      >
        VOLTEO
      </text>
      <text
        x="1763"
        y="258"
        textAnchor="middle"
        fill="#464646"
        style={{
          fontFamily: "'TT Hoves Pro', sans-serif",
          fontWeight: 400,
          fontSize: 16,
          letterSpacing: "0.28em",
        }}
      >
        MARITIME · SIX YEARS
      </text>
    </motion.svg>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5 align-baseline">
      <span className="text-[#fcf7e3] leading-none" style={{ ...lc, fontSize: "1.05em" }}>
        {v}
      </span>
      <span
        className="text-[#fcf7e3]/65"
        style={{ ...tt, fontWeight: 400, fontSize: "0.55em", letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        {l}
      </span>
    </span>
  );
}

export function EventMonitorPage() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 1920, h: 1080 });
  const cutSfxRef = useRef<HTMLAudioElement | null>(null);
  const soundEnabledRef = useRef(false);
  const [soundOn, setSoundOn] = useState(() => {
    try {
      const v = window.localStorage.getItem("volteo:event-monitor:soundOn");
      return v === null ? true : v === "true";
    } catch {
      return true;
    }
  });
  const soundOnRef = useRef(soundOn);
  useEffect(() => {
    soundOnRef.current = soundOn;
    try {
      window.localStorage.setItem("volteo:event-monitor:soundOn", String(soundOn));
    } catch {
      // ignore
    }
    const a = cutSfxRef.current;
    if (a) a.muted = !soundOn;
  }, [soundOn]);

  useEffect(() => {
    document.title = "SMW 26 — Volteo";
    return () => {
      document.title = "Volteo Home Page Design";
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) setDims({ w: r.width, h: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Prepare the cutter sound effect. Browsers may block autoplay until a user gesture,
  // so we "prime" audio on first pointer/key interaction, then play on each cut.
  useEffect(() => {
    const a = new Audio(sfxScissorsCut);
    a.preload = "auto";
    a.volume = 0.9;
    a.muted = !soundOnRef.current;
    cutSfxRef.current = a;

    const prime = () => {
      if (!soundOnRef.current) return;
      const audio = cutSfxRef.current;
      if (!audio) return;
      // Attempt to unlock audio on first user gesture.
      audio.muted = true;
      const p = audio.play();
      Promise.resolve(p)
        .then(() => {
          audio.pause();
          audio.currentTime = 0;
          audio.muted = !soundOnRef.current;
          soundEnabledRef.current = true;
        })
        .catch(() => {
          // If priming fails, we'll still try to play during future gestures.
        });
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
    };

    window.addEventListener("pointerdown", prime, { once: true });
    window.addEventListener("keydown", prime, { once: true });
    return () => {
      window.removeEventListener("pointerdown", prime);
      window.removeEventListener("keydown", prime);
      cutSfxRef.current = null;
    };
  }, []);

  const papers = useMemo(() => buildStack(46), []);
  const [states, setStates] = useState<PaperState[]>(() => papers.map(() => "stacked"));
  const [chompCount, setChompCount] = useState(0);
  const [wobbleKey, setWobbleKey] = useState(0);

  // Always read the freshest state from the orchestrator without re-subscribing the effect.
  const statesRef = useRef(states);
  useEffect(() => {
    statesRef.current = states;
  }, [states]);

  // Strictly sequential orchestrator: one paper falls → chomp → respawn → pause → next.
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Always boot the cycle from a clean slate so nothing can be stuck in "falling"
    // or "gone" (e.g. after HMR or a navigation-preserved state).
    setStates((prev) => prev.map(() => "stacked"));

    let cancelled = false;
    // Hard lock: no second paper can enter flight while one is still airborne.
    let inFlight = false;
    const timers: number[] = [];

    const dropNext = (first = false) => {
      if (cancelled || inFlight) return;
      const pause = first ? 700 : 350 + Math.random() * 450;
      const t = window.setTimeout(() => {
        if (cancelled || inFlight) return;

        // Only pick from the back-row papers (which visually sit behind the
        // decorative front papers). The front papers mask the respawn moment,
        // so the transition from "gone" → "stacked" is hidden from view.
        const current = statesRef.current;
        const stackedIdxs: number[] = [];
        current.forEach((s, i) => {
          if (s === "stacked" && papers[i].falls) stackedIdxs.push(i);
        });
        if (stackedIdxs.length === 0) {
          // Should never happen in normal flow, but fall back safely.
          const fallback = window.setTimeout(() => dropNext(), 400);
          timers.push(fallback);
          return;
        }

        const pick = stackedIdxs[Math.floor(Math.random() * stackedIdxs.length)];
        inFlight = true;

        setStates((prev) => {
          const n = [...prev];
          n[pick] = "falling";
          return n;
        });
        setWobbleKey((k) => k + 1);

        // Land → chomp (exactly 1s after the fall starts — matches the fall duration)
        const tChomp = window.setTimeout(() => {
          if (cancelled) return;
          const sfx = cutSfxRef.current;
          if (soundOnRef.current && sfx) {
            try {
              // Restart the same sound for each cut.
              sfx.currentTime = 0;
              const p = sfx.play();
              Promise.resolve(p)
                .then(() => {
                  soundEnabledRef.current = true;
                })
                .catch(() => {
                  // Autoplay may be blocked until a user gesture.
                  // We'll keep the visuals going regardless.
                });
            } catch {
              // Ignore audio errors.
            }
          }
          setChompCount((c) => c + 1);
          setStates((p) => {
            const n = [...p];
            n[pick] = "gone";
            return n;
          });

          // Respawn the paper back at the top, then schedule the next drop.
          // The respawn is an instant snap (see StackedPaper), so no fade-in ever
          // overlaps with the next paper's fall — guaranteeing only one paper in motion.
          const tRespawn = window.setTimeout(() => {
            if (cancelled) return;
            setStates((p) => {
              const n = [...p];
              n[pick] = "stacked";
              return n;
            });
            // Release the lock only now — the previous paper is fully back in the
            // stack before we allow the next one to take flight.
            inFlight = false;
            dropNext();
          }, 520);
          timers.push(tRespawn);
        }, 1000);
        timers.push(tChomp);
      }, pause);
      timers.push(t);
    };

    dropNext(true);

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [prefersReducedMotion]);

  // Target slot coordinates (center of eater's mouth).
  const TARGET_X_PCT = 50;
  // The eater's slot sits around 46% down its SVG; with the eater flush to the
  // bottom at full width, the slot lands near ~92% of screen height.
  const TARGET_Y_PCT = 92;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100svh] bg-[#0e3233] overflow-hidden select-none"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* Minimal chrome for monitor mode */}
      <div className="absolute top-6 left-6 z-[25]">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-[#fcf7e3]/20 bg-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#fcf7e3]/80 backdrop-blur-md hover:bg-black/30"
          style={tt}
        >
          <span aria-hidden>←</span>
          Back to home
        </Link>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-[#0e3233]" aria-hidden />
      <div className="absolute inset-0" aria-hidden style={{ background: RADIAL_STACK }} />
      <AnimatedDitherBackground className="pointer-events-none z-[1] opacity-[0.6]" ditherMix={0.34} />

      {/* Soft shadow glow just above the eater to ground it visually */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[22vh] z-[2] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 65% 120% at 50% 100%, rgba(0,0,0,0.55), transparent 70%)",
        }}
      />

      {/* Eyebrow */}
      <div className="absolute top-[92px] left-1/2 -translate-x-1/2 z-[20] flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#fcf7e3]/70 animate-ping opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#fcf7e3]" />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#fcf7e3]/75">
          Volteo · Six years of reimagining maritime
        </span>
      </div>

      {/* Sound toggle */}
      <button
        type="button"
        onClick={() => setSoundOn((v) => !v)}
        className="absolute top-[86px] right-6 z-[21] rounded-full border border-[#fcf7e3]/20 bg-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-[#fcf7e3]/80 backdrop-blur-md hover:bg-black/30"
        style={tt}
      >
        {soundOn ? "Sound on" : "Sound off"}
      </button>

      {/* Falling paper layer */}
      <div className="absolute inset-0 z-[11] pointer-events-none">
        {papers.map((p, i) => {
          const baseX = dims.w / 2 + p.leftOffsetPx;
          const baseY = (p.topPct / 100) * dims.h;
          const targetX = (TARGET_X_PCT / 100) * dims.w;
          const targetY = (TARGET_Y_PCT / 100) * dims.h;
          return (
            <StackedPaper
              key={p.id}
              paper={p}
              state={states[i]}
              baseDx={targetX - baseX}
              baseDy={targetY - baseY}
              wobbleKey={wobbleKey}
            />
          );
        })}
      </div>

      {/* Headline — sits between stack and eater, text-shadow keeps it crisp */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[44%] -translate-y-1/2 z-[15] w-full max-w-[1500px] px-10 text-center pointer-events-none">
        <motion.h1
          className="text-[#fcf7e3] tracking-[-0.025em]"
          style={{
            ...tt,
            fontWeight: 500,
            lineHeight: 0.98,
            fontSize: "clamp(48px, 6.4vw, 120px)",
            textShadow: "0 2px 40px rgba(0,0,0,0.55), 0 1px 12px rgba(0,0,0,0.45)",
          }}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          Shipping shouldn&apos;t still{" "}
          <span className="whitespace-nowrap">
            run on{" "}
            <span style={lc} className="relative inline-block text-[#fcf7e3]">
              paper.
              <motion.svg
                className="absolute left-0 -bottom-2 w-full h-[0.3em]"
                viewBox="0 0 400 30"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M 6 18 Q 80 4 180 16 T 394 12"
                  fill="none"
                  stroke="#fcf7e3"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.1, delay: 1.1, ease: EASE }}
                />
              </motion.svg>
            </span>
          </span>
        </motion.h1>

        <motion.p
          className="mt-8 md:mt-10 text-[#fcf7e3]/85 mx-auto"
          style={{
            ...tt,
            fontWeight: 400,
            fontSize: "clamp(20px, 1.69vw, 33px)",
            lineHeight: 1.5,
            maxWidth: 960,
            textShadow: "0 1px 20px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0, ease: EASE }}
        >
          Six years. <Stat v="5M" l="type & class approved records" /> across{" "}
          <Stat v="350+" l="vessels" /> operated by{" "}
          <Stat v="8" l="top-tier ship managers" />.
        </motion.p>
      </div>

      {/* Paper eater — flush with the bottom of the screen */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 z-[12] w-full pointer-events-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
      >
        <PaperEater chompCount={chompCount} />
      </motion.div>
    </div>
  );
}
