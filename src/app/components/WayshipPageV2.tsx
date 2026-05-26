import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { Link } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CTASection } from "./CTASection";
import { ContentDivider } from "./RailDivider";
import epsLogo from "@/assets/logos/eastern-pacific.png";
import imgTk from "@/assets/logos/tk.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import { ABS_TYPE_APPROVAL_LOGO, WAYSHIP_TIMELINE_VIDEO_URL } from "@/app/constants/wayship";

// ── Tokens ─────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

// ── Shared wrappers ─────────────────────────────────────────────────────
function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] ${className}`}>
      {children}
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`bg-[#f3f2ee] ${className}`}>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[#464646] uppercase tracking-[0.12em] mb-4"
      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 11 }}>
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[#103435] leading-[1.08] tracking-[-1.5px] ${className}`}
      style={{ fontSize: "clamp(30px, 3.2vw, 50px)" }}>
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[#464646] leading-[1.65] ${className}`}
      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 17px)" }}>
      {children}
    </p>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────
function WayshipHero() {
  return (
    <Section id="hero" className="pt-[72px] min-h-[70vh] flex flex-col">
      <Wrap className="flex-1 flex flex-col justify-center py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.h1
              className="text-[#103435] leading-[1.05] tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(38px, 4.8vw, 70px)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.05}
            >
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                The fastest way to capture{" "}
              </span>
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
                operational intelligence
              </span>
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                {" "}across your fleet
              </span>
            </motion.h1>

            <motion.p
              className="text-[#464646] leading-[1.65] mb-8 max-w-[480px]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 18 }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
            >
              Speak it. Type it. It's structured, tagged, and live on your fleet dashboard in under 60 seconds. Wayship turns vessel operations data into structured, searchable intelligence — delivered at the right moment, for the right decision.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.18}>
              <Link
                to="/book-demo"
                className="bg-[#0e3233] hover:bg-[#1a5052] text-white px-6 py-3 transition-colors duration-150 inline-flex items-center gap-2"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
              >
                Get a Demo
                <ArrowUpRight size={15} />
              </Link>
              <a href="#voice"
                className="text-[#2f615a] border-b border-[#2f615a] pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-1.5"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                See how it works
              </a>
            </motion.div>

            {/* Trust strip — directly below CTAs per design */}
            <motion.div
              className="mt-10 max-w-full"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.24}
            >
              <div className="pt-6 flex flex-wrap items-center gap-x-10 gap-y-4 min-w-0">
                <p className="text-[#464646] uppercase tracking-widest text-[10px] shrink-0 self-center" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>Trusted by</p>
                <div className="flex items-center gap-8 flex-wrap">
                  {[
                    { src: epsLogo, alt: "Eastern Pacific Shipping", h: "h-10" },
                    { src: imgTk, alt: "Teekay", h: "h-8" },
                    { src: imgWilhelmsen, alt: "Wilhelmsen", h: "h-8" },
                  ].map((logo) => (
                    <img key={logo.alt} src={logo.src} alt={logo.alt}
                      className={`${logo.h} w-auto object-contain grayscale opacity-70`} />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — floating cards */}
          <motion.div
            className="hidden lg:block relative h-[380px]"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <HeroCards />
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

// Floating cards for hero
function HeroCards() {
  const cardBase = { background: "#f3f2ee", border: "1px solid #D9D9D9", boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)" };
  return (
    <>
      {/* Card A — Fleet overview */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] overflow-hidden"
        style={cardBase}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
          <span className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Fleet overview</span>
          <span className="flex items-center gap-1.5">
            <motion.span className="w-1.5 h-1.5 bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="text-emerald-700 text-[9px]">Live</span>
          </span>
        </div>
        <div className="px-4 py-1">
          {[["CMA CGM Imagination", "14 entries today", "bg-emerald-500"],
            ["Pacific Jasper", "9 entries today", "bg-emerald-500"],
            ["Logan Explorer", "Syncing…", "bg-amber-400"],
            ["Seaboard Galaxy", "6 entries today", "bg-blue-500"]].map(([name, meta, dot]) => (
            <div key={name} className="flex items-center justify-between py-1.5 border-b border-[#D9D9D9] last:border-0">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 shrink-0 ${dot}`} />
                <span className="text-[#1d1d1d] text-xs">{name}</span>
              </div>
              <span className="text-[#5a5a5a] text-[10px] font-mono">{meta}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Card B — Data points captured */}
      <motion.div
        className="absolute top-20 right-0 w-[210px] overflow-hidden"
        style={cardBase}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-4 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
          <span className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Data Points Captured</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-[#103435] font-mono leading-none mb-1"
            style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: 32 }}>4,847</p>
          <p className="text-[#5a5a5a] text-[10px] leading-[1.5] mb-3">submissions logged across the fleet<br />in last 24 hours</p>
          <div className="h-1 bg-[#D9D9D9] overflow-hidden">
            <motion.div className="h-full bg-[#103435]"
              initial={{ width: 0 }} animate={{ width: "78%" }}
              transition={{ duration: 1.2, delay: 0.6, ease: EASE }} />
          </div>
        </div>
      </motion.div>

      {/* Card C — Voice entry */}
      <motion.div
        className="absolute bottom-0 left-5 w-[280px] overflow-hidden"
        style={cardBase}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
          <span className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Latest · Pacific Jasper</span>
          <span className="text-emerald-700 text-[9px] border border-emerald-600/30 px-1.5 py-0.5">Voice AI</span>
        </div>
        <div className="px-4 py-3">
          <p className="text-[#464646] text-xs leading-[1.55] italic mb-2 border-l-2 border-[#103435] pl-2.5">
            "Unusual vibration at 13.5 knots — propeller inspection recommended before next port."
          </p>
          <p className="text-[#5a5a5a] text-[10px] font-mono">2h ago · Chief Engineer</p>
        </div>
      </motion.div>
    </>
  );
}

// ── Knowledge Cards — Storytelling Bridge ───────────────────────────────
type CardVariant = "tall" | "short";

// Fixed-pixel stage so centering is exact.
// Columns step at 131px (121px card + 10px gap). 7 cols → stage width = 786 + 121 = 907px.
// Stage height = tallest stack: short(54) + 8gap + tall(139) = 201 → 210px.
const STAGE_W = 907;
const STAGE_H = 210;

const CARD_PLACEMENTS: { left: number; top: number; variant: CardVariant; marker?: boolean }[] = [
  { left:   0, top:   0, variant: "tall",  marker: true  },
  { left: 131, top:   0, variant: "short"               },
  { left: 131, top:  62, variant: "tall"                }, // short(54)+8gap below
  { left: 262, top:  10, variant: "tall"                },
  { left: 393, top:   0, variant: "tall"                },
  { left: 393, top: 147, variant: "short"               }, // tall(139)+8gap below
  { left: 524, top:  20, variant: "short"               },
  { left: 655, top:   0, variant: "tall"                },
  { left: 786, top:  30, variant: "tall"                },
];

function CardSvg({ variant, marker }: { variant: CardVariant; marker?: boolean }) {
  const isTall = variant === "tall";
  const h = isTall ? 139 : 54;
  return (
    <div style={{ position: "relative", width: 121, height: h, flexShrink: 0 }}>
      {isTall ? (
        <svg width="121" height="139" viewBox="0 0 121 139" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="121" height="139" fill="#E7E5DC"/>
          <rect x="8" y="9"  width="105" height="6" fill="#555555"/>
          <rect x="8" y="18" width="105" height="6" fill="#555555"/>
          <rect x="8" y="27" width="45"  height="6" fill="#555555"/>
          <rect x="8" y="36" width="45"  height="6" fill="#555555"/>
          <rect x="8" y="45" width="90"  height="6" fill="#555555"/>
          <rect x="8" y="54" width="70"  height="6" fill="#555555"/>
          <rect x="8" y="63" width="70"  height="6" fill="#555555"/>
          <rect x="8" y="72" width="90"  height="6" fill="#555555"/>
        </svg>
      ) : (
        <svg width="121" height="54" viewBox="0 0 121 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="121" height="54" fill="#E7E5DC"/>
          <rect x="8" y="9"  width="105" height="6" fill="#555555"/>
          <rect x="8" y="18" width="105" height="6" fill="#555555"/>
          <rect x="8" y="27" width="45"  height="6" fill="#555555"/>
        </svg>
      )}
      {marker && (
        <div style={{
          position: "absolute",
          top: -10,
          left: 22,
          width: 20,
          height: 20,
          background: "#d4f55c",
        }} />
      )}
    </div>
  );
}

// ── Skeleton word reveal ─────────────────────────────────────────────────
// Each word has three visual states:
//   invisible  – index >= skeletonFront: transparent placeholder, keeps layout stable
//   skeleton   – revealedCount <= index < skeletonFront: animated shimmer bar
//   revealed   – index < revealedCount: actual word fades in, shimmer fades out
function SkeletonWord({
  word,
  revealed,
  visible,
  wordIndex = 0,
}: {
  word: string;
  revealed: boolean;
  visible: boolean;
  wordIndex?: number;
}) {
  // Stagger shimmer phase within the visible window (cap at 12 to keep delay short)
  const STAGGER = 0.032;
  const shimmerDelay = (wordIndex % 12) * STAGGER;

  return (
    <span style={{ display: "inline-block", position: "relative" }}>
      {/* Skeleton bar — only pulses when the word is in the visible-but-unrevealed window */}
      <motion.span
        style={{
          position: "absolute", left: 0, right: 0,
          top: "14%", bottom: "10%",
          background: "rgba(255,255,255,0.22)", borderRadius: 3, display: "block",
        }}
        animate={
          revealed
            ? { opacity: 0 }
            : visible
            ? { opacity: [0.18, 0.60, 0.18] }
            : { opacity: 0 }
        }
        transition={
          revealed
            ? { duration: 0.2 }
            : visible
            ? { duration: 1.4, delay: shimmerDelay, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.25 }
        }
      />
      {/* Actual word — fades in once revealed */}
      <motion.span
        style={{ display: "inline-block" }}
        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      >
        {word}
      </motion.span>
    </span>
  );
}

// Render words with scroll-driven skeleton wave.
// skeletonFront is an absolute index; words in [revealedCount, skeletonFront) shimmer,
// words >= skeletonFront are invisible placeholders that hold layout.
function renderScrollWords(
  text: string,
  revealedCount: number,
  wordOffset = 0,
  skeletonFront = 0,
) {
  return text.split(" ").map((word, i) => {
    const globalIdx = wordOffset + i;
    const revealed = globalIdx < revealedCount;
    const visible = !revealed && globalIdx < skeletonFront;
    return (
      <span key={i}>
        <SkeletonWord
          word={word}
          revealed={revealed}
          visible={visible}
          wordIndex={globalIdx}
        />{" "}
      </span>
    );
  });
}

// Letter stagger constants
const LETTER_DURATION = 0.21;
const LETTER_STAGGER = 0.015;

// Top-level letter stagger — reusable outside StorytellingSection
function renderLettersStagger(
  text: string,
  visible: boolean,
  globalStart = 0,
  yOffset = 10,
) {
  return text.split("").map((char, i) => (
    <motion.span
      key={globalStart + i}
      style={{ display: "inline-block", whiteSpace: "pre" }}
      initial={{ opacity: 0, y: yOffset }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
      transition={{
        duration: LETTER_DURATION,
        delay: (globalStart + i) * LETTER_STAGGER,
        ease: EASE,
      }}
    >
      {char}
    </motion.span>
  ));
}

function StorytellingSection({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  const [triggered, setTriggered] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [evaporating, setEvaporating] = useState(false);
  const [text2Visible, setText2Visible] = useState(false);
  const [para1Visible, setPara1Visible] = useState(false);
  const [paraExiting, setParaExiting] = useState(false);
  const [meetVisible, setMeetVisible] = useState(false);
  const [activeVoiceTab, setActiveVoiceTab] = useState(0);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const animStartRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealedWords1, setRevealedWords1] = useState(0);
  const [revealedWords2, setRevealedWords2] = useState(0);
  const [revealedWords3, setRevealedWords3] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // bg: stays green while storytelling runs, then fades to cream by 0.767.
  // All breakpoints scaled by 5/6 (300vh → 360vh container).
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.01, 0.717, 0.767],
    ["#f3f2ee", "#2B4242", "#2B4242", "#f3f2ee"]
  );

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // All breakpoints scaled by 5/6 (300vh → 360vh container).
    setTextVisible(v > 0.021 && v < 0.188);
    setTriggered(v > 0.071 && v < 0.188);
    setEvaporating(v >= 0.188);
    setPara1Visible(v >= 0.333);
    setParaExiting(v >= 0.717);
    setMeetVisible(v >= 0.767);

    const p1Total = 46;
    const p2Total = 7 + 15;
    const p3Total = 4 + 18;

    setRevealedWords1(v >= 0.333
      ? Math.round(Math.min(1, (v - 0.333) / (0.428 - 0.333)) * p1Total)
      : 0);
    setRevealedWords2(v >= 0.428
      ? Math.round(Math.min(1, (v - 0.428) / (0.522 - 0.428)) * p2Total)
      : 0);
    setRevealedWords3(v >= 0.522
      ? Math.round(Math.min(1, (v - 0.522) / (0.633 - 0.522)) * p3Total)
      : 0);
  });

  // Phrase 2 appears via timer once evaporation starts; hides when paragraphs begin
  useEffect(() => {
    if (evaporating && !para1Visible) {
      const timer = setTimeout(() => setText2Visible(true), 950);
      return () => clearTimeout(timer);
    }
    setText2Visible(false);
  }, [evaporating, para1Visible]);

  // 15-second tab animation loop — runs while meetVisible is true
  const TOTAL_MS = 15000;
  const HALF_MS  = TOTAL_MS / 2;
  useEffect(() => {
    if (!meetVisible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      animStartRef.current = null;
      setActiveVoiceTab(0);
      setVoiceProgress(0);
      videoRef.current?.pause();
      return;
    }
    // Start video from beginning when section comes into view
    const video = videoRef.current;
    if (video && WAYSHIP_TIMELINE_VIDEO_URL) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
    animStartRef.current = null;
    const tick = (ts: number) => {
      if (!animStartRef.current) animStartRef.current = ts;
      const elapsed = (ts - animStartRef.current) % TOTAL_MS;
      setVoiceProgress((elapsed / TOTAL_MS) * 100);
      setActiveVoiceTab(elapsed < HALF_MS ? 0 : 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [meetVisible]);

  function renderLetters(text: string, globalStart: number, visible: boolean, yOffset = 6) {
    return text.split("").map((char, i) => (
      <motion.span
        key={globalStart + i}
        style={{ display: "inline-block", whiteSpace: "pre" }}
        initial={{ opacity: 0, y: yOffset }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: yOffset }}
        transition={{
          duration: LETTER_DURATION,
          delay: (globalStart + i) * LETTER_STAGGER,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {char}
      </motion.span>
    ));
  }

  const seg1 = "Knowledge ";
  const seg2 = "accumulates with";
  const seg3 = "every nautical mile.";
  const seg4 = "And evaporates with";
  const seg5 = "every handover.";

  const para1 = "With every crew rotation, context-rich know-how disappears under towers of paperwork. What the outgoing engineer knew about that pump — the noise it makes at load, the fix that worked last time — all of it becomes invisible to the oncoming crew.";
  const para2Title = "Insights buried in paper and inboxes";
  const para2Body  = "Critical observations trapped in handwritten logs, messy spreadsheets, and endless email threads";
  const para3Title = "Repeated incidents, avoidable costs";
  const para3Body  = "The same failures recur across vessels because nothing connects the fleet's past experience to everyday actions";

  const ltCushion: React.CSSProperties = {
    fontFamily: "'LT Cushion', serif", fontWeight: 300,
    fontSize: "clamp(20px, 2.4vw, 36px)", color: "rgba(255,255,255,0.85)",
  };
  const ttHoves: React.CSSProperties = {
    fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600,
    fontSize: "clamp(20px, 2.4vw, 36px)", color: "rgba(255,255,255,0.92)",
  };

  const p2TitleWords = para2Title.split(" ").length;
  const p3TitleWords = para3Title.split(" ").length;

  // How many words ahead of the reveal cursor to show as shimmer skeletons.
  // This creates a moving "skeleton wave" — only these N words glow at any time.
  const SKELETON_LOOKAHEAD = 10;
  const p1Total = para1.split(" ").length;
  const p2Total = p2TitleWords + para2Body.split(" ").length;
  const p3Total = p3TitleWords + para3Body.split(" ").length;

  // Each paragraph's skeleton wave only starts once the previous paragraph is fully revealed,
  // so skeletons cascade sequentially: para1 → para2 → para3.
  const skeletonFront1 = Math.min(p1Total, revealedWords1 + SKELETON_LOOKAHEAD);
  const skeletonFront2 = revealedWords1 >= p1Total
    ? Math.min(p2Total, revealedWords2 + SKELETON_LOOKAHEAD)
    : 0;
  const skeletonFront3 = revealedWords2 >= p2Total
    ? Math.min(p3Total, revealedWords3 + SKELETON_LOOKAHEAD)
    : 0;

  return (
    <div ref={containerRef} style={{ height: "360vh" }}>
      <motion.div
        className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center gap-14"
        style={{ backgroundColor }}
      >
        {/* ── Phrase 1 ── */}
        <motion.div
          className="w-full px-8 text-center"
          style={{ lineHeight: 1.3 }}
          animate={{ opacity: evaporating ? 0 : 1 }}
          transition={{ duration: 0.2, ease: EASE }}
        >
          <div>
            <span style={ltCushion}>{renderLetters(seg1, 0, textVisible)}</span>
            <span style={ttHoves}>{renderLetters(seg2, seg1.length, textVisible)}</span>
          </div>
          <div>
            <span style={ttHoves}>{renderLetters(seg3, seg1.length + seg2.length, textVisible)}</span>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="overflow-hidden pointer-events-none select-none">
          <div className="relative" style={{ width: STAGE_W, height: STAGE_H }}>
            {CARD_PLACEMENTS.map((card, i) => (
              <motion.div
                key={i}
                style={{ position: "absolute", left: card.left, top: card.top, transformOrigin: "center center" }}
                animate={
                  evaporating
                    ? { filter: "blur(10px) brightness(2.5)", opacity: 0, scale: 1.18, y: -14 }
                    : triggered
                    ? { scale: 1, opacity: 1, filter: "blur(0px) brightness(1)", y: 0 }
                    : { scale: 0, opacity: 0, filter: "blur(0px) brightness(1)", y: 0 }
                }
                transition={
                  evaporating
                    ? { duration: 0.65, delay: i * 0.09, ease: [0.4, 0, 1, 1] }
                    : triggered
                    ? {
                        scale:   { type: "spring", duration: 0.5, bounce: 0.18, delay: i * 0.1 },
                        opacity: { duration: 0.25, delay: i * 0.1, ease: EASE },
                        filter:  { duration: 0.2,  delay: i * 0.1 },
                        y:       { duration: 0.5,  delay: i * 0.1, ease: EASE },
                      }
                    : { duration: 0.3 }
                }
              >
                <CardSvg variant={card.variant} marker={card.marker} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Phrase 2 — full-screen centered overlay ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="mx-auto w-full max-w-[1512px] px-8 md:px-16 lg:px-[115px] text-center" style={{ lineHeight: 1.2 }}>
            <div>
              <span style={{ ...ltCushion, fontSize: "clamp(28px, 3.6vw, 56px)" }}>
                {renderLetters(seg4, 0, text2Visible, 0)}
              </span>
            </div>
            <div>
              <span style={{ ...ttHoves, fontSize: "clamp(28px, 3.6vw, 56px)" }}>
                {renderLetters(seg5, seg4.length, text2Visible, 0)}
              </span>
            </div>
          </div>
        </div>

        {/* ── Paragraphs panel — skeleton wave precedes reveal cursor ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          animate={
            paraExiting
              ? { opacity: 0, filter: "blur(14px)", y: -28 }
              : para1Visible
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(0px)", y: 0 }
          }
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="mx-auto w-full max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
            <div className="mx-auto max-w-[860px]" style={{ textAlign: "left" }}>

              {/* Para 1 */}
              <p style={{
                fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500,
                fontSize: "clamp(15px, 1.96vw, 31px)", color: "rgba(255,255,255,0.88)",
                lineHeight: 1.35, marginBottom: "clamp(20px, 2.1vw, 36px)",
              }}>
                {renderScrollWords(para1, revealedWords1, 0, skeletonFront1)}
              </p>

              {/* Para 2 */}
              <p style={{
                fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500,
                fontSize: "clamp(15px, 1.96vw, 31px)", color: "rgba(255,255,255,0.88)",
                lineHeight: 1.35, marginBottom: "clamp(20px, 2.1vw, 36px)",
              }}>
                {renderScrollWords(para2Title + " " + para2Body, revealedWords2, 0, skeletonFront2)}
              </p>

              {/* Para 3 */}
              <p style={{
                fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500,
                fontSize: "clamp(15px, 1.96vw, 31px)", color: "rgba(255,255,255,0.88)",
                lineHeight: 1.35,
              }}>
                {renderScrollWords(para3Title + " " + para3Body, revealedWords3, 0, skeletonFront3)}
              </p>

            </div>
          </div>
        </motion.div>

        {/* ── Meet Wayship + AI-Native + Voice content — staggered reveal ── */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center overflow-hidden pointer-events-none"
          style={{ paddingTop: "clamp(80px, 10vh, 120px)", paddingBottom: "clamp(10px, 1.5vh, 20px)" }}
          animate={meetVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div
            className="w-full max-w-[1512px] px-8 md:px-16 lg:px-[115px] flex flex-col items-center"
            style={{ gap: "clamp(8px, 1.1vh, 16px)", height: "100%" }}
          >

            {/* ── "Meet the all-new Wayship 6" ── */}
            <h2
              className="text-center tracking-[-1.5px] shrink-0"
              style={{ fontSize: "clamp(26px, 3vw, 48px)", lineHeight: 1.15 }}
            >
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, color: "rgba(16,52,53,0.75)" }}>
                {renderLettersStagger("Meet the all-new ", meetVisible)}
              </span>
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, color: "#103435" }}>
                {renderLettersStagger("Wayship 6", meetVisible, "Meet the all-new ".length)}
              </span>
            </h2>

            {/* ── AI-Native Features label ── */}
            <motion.h3
              className="text-center text-black tracking-[-0.8px] shrink-0"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 40, lineHeight: 1.1, marginTop: 100 }}
              initial={{ opacity: 0, y: 6 }}
              animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: EASE } } : { opacity: 0, y: 6 }}
            >
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>AI-Native </span>
              <span style={{ fontWeight: 500 }}>Features</span>
            </motion.h3>

            {/* ── 2-col layout: left = video, right = feature descriptions ── */}
            <motion.div
              className="w-full grid grid-cols-1 lg:grid-cols-2 border border-[rgba(102,102,102,0.24)] overflow-hidden shrink-0"
              style={{ flex: "1 1 0", minHeight: 0 }}
              initial={{ opacity: 0, y: 12 }}
              animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45, ease: EASE } } : { opacity: 0, y: 12 }}
            >
              {/* Left — video (min-height prevents collapse when video is position:absolute) */}
              <div className="relative overflow-hidden min-h-[280px] lg:min-h-[320px] h-full" style={{ background: "#0a2526" }}>
                {WAYSHIP_TIMELINE_VIDEO_URL ? (
                  <video
                    ref={videoRef}
                    src={WAYSHIP_TIMELINE_VIDEO_URL}
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* Right — feature descriptions stacked vertically */}
              <motion.div
                className="relative flex flex-col justify-center"
                style={{ background: "#f3f2ee", padding: "clamp(32px, 5%, 56px) clamp(28px, 5%, 56px)" }}
                initial={{ opacity: 0, y: 8 }}
                animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.6, ease: EASE } } : { opacity: 0, y: 8 }}
              >
                {/* Timeline progress bar */}
                <div className="absolute left-0 top-0 h-[3px] w-full bg-[#e8e6de]" />
                <div className="absolute left-0 top-0 h-[3px] bg-[#1d1d1d]" style={{ width: `${voiceProgress}%` }} />

                <div className="flex flex-col gap-8">
                  {/* VOICE AI tab */}
                  <motion.div
                    className="flex flex-col gap-[clamp(8px,1vh,14px)]"
                    animate={{ opacity: activeVoiceTab === 0 ? 1 : 0.45 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <motion.div
                      className="inline-flex items-center self-start"
                      style={{ padding: "8px 10px", border: "1px solid", gap: 10 }}
                      animate={{
                        background: activeVoiceTab === 0 ? "#42ead4" : "#ffffff",
                        borderRadius: activeVoiceTab === 0 ? 0 : 44,
                        borderColor: activeVoiceTab === 0 ? "#ededed" : "#f2f3ec",
                      }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <motion.span
                        className="block rounded-full bg-[#103435] shrink-0"
                        style={{ width: 8, height: 8 }}
                        animate={{ opacity: activeVoiceTab === 0 ? 1 : 0, scale: activeVoiceTab === 0 ? 1 : 0.5 }}
                        transition={{ duration: 0.15, ease: EASE }}
                      />
                      <motion.p
                        className="font-mono whitespace-nowrap"
                        style={{ fontSize: 13, fontWeight: 500 }}
                        animate={{ color: activeVoiceTab === 0 ? "#113637" : "#929389" }}
                        transition={{ duration: 0.18, ease: EASE }}
                      >SPEECH AI</motion.p>
                    </motion.div>
                    <p className="text-black" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(16px, 1.5vw, 24px)", lineHeight: 1.15 }}>Speak ...<br />and its done!</p>
                    <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.05vw, 16px)", color: "#85867b", lineHeight: 1.55 }}>
                      Your crew shouldn't have to choose between doing the job and documenting it. Wayship's advanced automatic speech recognition turns the moment of observation into a structured, tagged, searchable entry — 4x faster than typing.
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <div className="h-px w-full bg-[#D9D9D9]" />

                  {/* CHAT WITH YOUR DATA tab */}
                  <motion.div
                    className="flex flex-col gap-[clamp(8px,1vh,14px)]"
                    animate={{ opacity: activeVoiceTab === 1 ? 1 : 0.45 }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
                    <motion.div
                      className="inline-flex items-center self-start"
                      style={{ padding: "8px 10px", border: "1px solid", gap: 10 }}
                      animate={{
                        background: activeVoiceTab === 1 ? "#42ead4" : "#ffffff",
                        borderRadius: activeVoiceTab === 1 ? 0 : 44,
                        borderColor: activeVoiceTab === 1 ? "#ededed" : "#f2f3ec",
                      }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <motion.span
                        className="block rounded-full bg-[#103435] shrink-0"
                        style={{ width: 8, height: 8 }}
                        animate={{ opacity: activeVoiceTab === 1 ? 1 : 0, scale: activeVoiceTab === 1 ? 1 : 0.5 }}
                        transition={{ duration: 0.15, ease: EASE }}
                      />
                      <motion.p
                        className="font-mono whitespace-nowrap"
                        style={{ fontSize: 13, fontWeight: 500 }}
                        animate={{ color: activeVoiceTab === 1 ? "#113637" : "#929389" }}
                        transition={{ duration: 0.18, ease: EASE }}
                      >AI ASSISTANT</motion.p>
                    </motion.div>
                    <p className="text-black" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(16px, 1.5vw, 24px)", lineHeight: 1.15, maxWidth: 320 }}>Your data just got its voice. And it has a lot to say.</p>
                    <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.05vw, 16px)", color: "#85867b", lineHeight: 1.55 }}>
                      Ask anything about your vessel's full operational history in plain language — current state, past incidents, recorded observations across rotations, all in one connected space.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

// ── Problem Section ─────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      title: "Crew rotates every 4–6 months",
      desc: "Every changeover resets vessel-specific memory to zero. New crew board informed about procedures — not about this ship.",
    },
    {
      title: "Knowledge buried in paper and inboxes",
      desc: "Critical observations live in handwritten notes, PDFs, and emails — invisible to shore teams and the next crew.",
    },
    {
      title: "Repeated incidents, avoidable costs",
      desc: "The same failures recur across vessels because there's no system that connects past experience to future decisions.",
    },
  ];

  return (
    <Section>
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>The challenge</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Operational knowledge walks</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>off the gangway</span>
            </SectionTitle>
            <Body className="mb-10 max-w-[440px]">
              Every crew rotation, vessel-specific knowledge disappears. What the outgoing engineer knew about that pump — the noise it makes at load, the fix that worked last time — it's gone. Until something breaks.
            </Body>
            <div className="space-y-6">
              {problems.map((p, i) => (
                <motion.div key={p.title} className="flex gap-4 items-start"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.08}>
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.18)" }}>
                    <span className="text-red-600/60 text-xs font-mono">✕</span>
                  </div>
                  <div>
                    <p className="text-[#1d1d1d] mb-1.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>{p.title}</p>
                    <p className="text-[#5a5a5a] leading-[1.6]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline card */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0.1}>
            <div style={{ background: "#f3f2ee", border: "1px solid #D9D9D9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div className="px-5 py-3 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                <p className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Vessel: CMA CGM Imagination · 2024</p>
              </div>

              <div className="px-5 py-5 border-b border-[#D9D9D9]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#1d1d1d] text-sm font-medium">Capt. Eriksson + crew</span>
                  <span className="text-[#5a5a5a] text-[10px] font-mono">Jan – Apr 2024</span>
                </div>
                <div className="h-1.5 bg-[#D9D9D9] overflow-hidden mb-2">
                  <motion.div className="h-full bg-[#103435]"
                    initial={{ width: 0 }} whileInView={{ width: "100%" }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} />
                </div>
                <p className="text-[#464646] text-xs leading-[1.6]">
                  <span className="text-[#103435] font-medium">247 structured entries</span> logged — machinery observations, defect history, port notes.
                </p>
              </div>

              <div className="px-5 py-5 border-b border-[#D9D9D9]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#5a5a5a] text-sm">Crew rotation</span>
                  <span className="text-[#5a5a5a] text-[10px] font-mono">18 Apr 2024</span>
                </div>
                <div className="p-3.5" style={{ background: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.15)" }}>
                  <p className="text-red-600/60 text-[9px] uppercase tracking-widest font-mono mb-1.5">Without Wayship</p>
                  <p className="text-[#464646] text-xs leading-[1.6]">4 months of vessel-specific knowledge leaves with the crew. No structured handover. Incoming master starts from scratch.</p>
                </div>
              </div>

              <div className="px-5 py-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#1d1d1d] text-sm font-medium">Capt. Mwangi + crew</span>
                  <span className="text-[#5a5a5a] text-[10px] font-mono">Apr – Aug 2024</span>
                </div>
                <div className="h-1.5 bg-[#D9D9D9] overflow-hidden mb-2">
                  <motion.div className="h-full bg-emerald-600"
                    initial={{ width: 0 }} whileInView={{ width: "100%" }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} />
                </div>
                <p className="text-[#464646] text-xs leading-[1.6]">
                  <span className="text-emerald-700 font-medium">With Wayship:</span> full context transferred. Incoming crew board with 247 entries of vessel history — searchable, structured, ready to query.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

// ── Voice AI Section ────────────────────────────────────────────────────
// Bar heights from the Figma design (10 bars, position-sorted, in px).
const VOICE_WAVE_H = [23, 30, 23, 15, 44, 20, 23, 30, 23, 15];

function VoiceSection({ storyRef: _storyRef }: { storyRef: React.RefObject<HTMLDivElement> }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(sectionRef, { once: true, margin: "0px 0px 300px 0px" });

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0 },
    animate: revealed
      ? { opacity: 1, transition: { duration: 0.5, delay, ease: EASE } }
      : { opacity: 0 },
  });

  return (
    <Section id="voice">
      <div ref={sectionRef}>
      <Wrap className="pt-14 md:pt-20 pb-0">

        {/* ── AI-Native Features heading ── */}
        <div className="flex flex-col items-center gap-[14px] mb-12">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1, transition: { duration: 0.4, ease: EASE } } : { opacity: 0 }}
          >
            <span className="block w-2 h-2 rounded-full bg-[#42ead4]" />
            <p className="font-mono uppercase whitespace-nowrap" style={{ fontSize: 12, color: "#929389", fontWeight: 500 }}>
              WAYSHIP 6
            </p>
          </motion.div>
          <h3
            className="text-center text-black tracking-[-0.8px]"
            style={{ fontSize: "clamp(22px, 2.6vw, 36px)", lineHeight: 1.1 }}
          >
            <motion.span
              style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic", display: "inline" }}
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.08, ease: EASE } } : { opacity: 0, y: 8 }}
            >
              AI-Native{" "}
            </motion.span>
            <motion.span
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, display: "inline" }}
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.14, ease: EASE } } : { opacity: 0, y: 8 }}
            >
              Features
            </motion.span>
          </h3>
        </div>

        {/* 2-col layout: left = dark video card, right = feature descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[rgba(102,102,102,0.24)] overflow-hidden">

          {/* Left — dark teal video card */}
          <motion.div
            className="relative overflow-hidden flex flex-col items-center justify-center"
            style={{ background: "#0a2526", minHeight: 480, padding: "clamp(40px, 7%, 80px) clamp(32px, 6%, 64px)" }}
            {...fadeIn(0.12)}
          >
            {/* Avatar + name + waveform header */}
            <div
              className="inline-flex items-center px-[13px] py-[10px]"
              style={{ background: "#0b1e04", gap: 37 }}
            >
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-[51px] h-[51px] overflow-hidden shrink-0 flex items-center justify-center"
                  style={{ background: "#103435" }}
                >
                  <span className="text-white/70 font-mono tracking-[0.2em]" style={{ fontSize: 13 }}>
                    RC
                  </span>
                </div>
                <div className="flex flex-col">
                  <p className="text-white" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: 18, lineHeight: 1.55 }}>
                    Ryan Chen
                  </p>
                  <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14, lineHeight: 1.565, color: "rgba(255,255,255,0.62)" }}>
                    2nd officer
                  </p>
                </div>
              </div>

              {/* Waveform — 10 animated bars */}
              <div className="flex items-center" style={{ height: 44, gap: 2.5 }} aria-hidden="true">
                {VOICE_WAVE_H.map((h, i) => (
                  <motion.div
                    key={i}
                    className="bg-white"
                    style={{ width: 3 }}
                    animate={{ height: [4, h, 4] }}
                    transition={{ duration: 0.55 + (i % 4) * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.045 }}
                  />
                ))}
              </div>
            </div>

            {/* Voice quote */}
            <p
              className="text-white mt-10 text-center"
              style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.6, maxWidth: 420 }}
            >
              "Auxiliary Engine 2. Running hours, uh, 3585. Load is 61 percent. Lube oil is 92 degrees, hmm, that seems high. Fuel oil temperature, let me see, 123, viscosity 12."
            </p>
          </motion.div>

          {/* Right — feature descriptions stacked vertically */}
          <motion.div
            className="relative flex flex-col justify-center"
            style={{ background: "#f3f2ee", padding: "clamp(40px, 6%, 72px) clamp(32px, 6%, 64px)" }}
            {...fadeIn(0.22)}
          >
            {/* Progress bar */}
            <div className="absolute left-0 top-0 h-1 w-full bg-[#e8e6de]" />
            <motion.div
              className="absolute left-0 top-0 h-1 bg-[#1d1d1d]"
              initial={{ width: 0 }}
              animate={revealed ? { width: "17.3%" } : { width: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            />

            <div className="flex flex-col gap-10">
              {/* Speech AI tab (active) */}
              <div className="flex flex-col gap-5">
                <div
                  className="inline-flex items-center gap-[10px] self-start p-[10px] border border-[#ededed]"
                  style={{ background: "#42ead4" }}
                >
                  <span className="block w-2 h-2 rounded-full bg-[#103435]" />
                  <p className="font-mono whitespace-nowrap" style={{ fontSize: 13, color: "#113637", fontWeight: 500 }}>
                    SPEECH AI
                  </p>
                </div>
                <p className="text-black" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.15 }}>
                  Speak ...<br />and its done!
                </p>
                <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.05vw, 16px)", color: "#85867b", lineHeight: 1.6 }}>
                  Your crew shouldn't have to choose between doing the job and documenting it. Wayship's advanced automatic speech recognition turns the moment of observation into a structured, tagged, searchable entry — 4x faster than typing.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full bg-[#D9D9D9]" />

              {/* AI Assistant tab (inactive) */}
              <div className="flex flex-col gap-5">
                <div
                  className="inline-flex items-center self-start p-[10px] bg-white border border-[#f2f3ec]"
                  style={{ borderRadius: 44 }}
                >
                  <p className="font-mono whitespace-nowrap" style={{ fontSize: 13, color: "#929389", fontWeight: 500 }}>
                    AI ASSISTANT
                  </p>
                </div>
                <p className="text-black" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.15, maxWidth: 340 }}>
                  Your data just got its voice. And it has a lot to say.
                </p>
                <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.05vw, 16px)", color: "#85867b", lineHeight: 1.6 }}>
                  Ask anything about your vessel's full operational history in plain language — current state, past incidents, recorded observations across rotations, all in one connected space.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </Wrap>
      </div>
    </Section>
  );
}

// ── Chat Section ────────────────────────────────────────────────────────
const CHAT_MESSAGES = [
  { role: "user", from: "Capt. Mwangi", time: "06:12", text: "What's the status of auxiliary engine 2?" },
  { role: "ai", time: "06:12", text: "**Aux engine #2 — 3 observations logged.**\n\nChief Engineer flagged elevated lube oil temp (+8°C) during last night's rounds at 02:14 — tagged #advisory. Same pattern was observed in April by the outgoing crew. That entry also includes a note: \"resolved after oil change at Colombo.\"\n\nNo critical flags raised. Shore team has been notified." },
  { role: "user", from: "Capt. Mwangi", time: "06:13", text: "Has this happened before on this vessel?" },
  { role: "ai", time: "06:13", text: "**Yes — 2 prior instances found.**\n\nApril 2024 (outgoing crew): same temp rise at similar load, resolved with lube oil change. January 2024: logged as #routine, no follow-up required." },
];

// ── One Report illustration (right panel of hero feature card) ─────────────
function DispatchIllustration() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 585 421"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="585" height="421" fill="#e7e5dc" />

      {/* Large centre document card */}
      <rect x="232" y="78" width="121" height="114" fill="#cdcabc" />
      <rect x="240" y="87"  width="105" height="6" fill="#8d8b85" />
      <rect x="240" y="96"  width="105" height="6" fill="#8d8b85" />
      <rect x="240" y="105" width="45"  height="6" fill="#8d8b85" />
      <rect x="240" y="114" width="45"  height="6" fill="#8d8b85" />
      <rect x="240" y="123" width="90"  height="6" fill="#8d8b85" />
      <rect x="240" y="132" width="70"  height="6" fill="#8d8b85" />
      <rect x="240" y="141" width="70"  height="6" fill="#8d8b85" />
      <rect x="240" y="150" width="90"  height="6" fill="#8d8b85" />

      {/* Connector tree */}
      <path d="M292 192 L292 272" stroke="#8d8b85" strokeWidth="1.5" />
      <path d="M116 272 L467 272"  stroke="#8d8b85" strokeWidth="1.5" />
      <path d="M116 272 L116 303"  stroke="#8d8b85" strokeWidth="1.5" />
      <path d="M292 272 L292 303"  stroke="#8d8b85" strokeWidth="1.5" />
      <path d="M467 272 L467 303"  stroke="#8d8b85" strokeWidth="1.5" />

      {/* Small card — left */}
      <rect x="80"  y="303" width="72" height="41" fill="#cdcabc" />
      <rect x="84.76" y="308.36" width="62.48" height="3.57" fill="#8d8b85" />
      <rect x="84.76" y="313.71" width="62.48" height="3.57" fill="#8d8b85" />
      <rect x="84.76" y="319.07" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="84.76" y="324.42" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="84.76" y="329.78" width="53.55" height="3.57" fill="#8d8b85" />
      <rect x="84.76" y="335.13" width="41.65" height="3.57" fill="#8d8b85" />

      {/* Small card — centre */}
      <rect x="255" y="303" width="72" height="41" fill="#cdcabc" />
      <rect x="260"  y="309" width="21"    height="3"    fill="#8d8b85" />
      <rect x="260"  y="314" width="21"    height="3"    fill="#8d8b85" />
      <rect x="259.76" y="319.07" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="259.76" y="324.42" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="259.76" y="329.78" width="53.55" height="3.57" fill="#8d8b85" />
      <rect x="259.76" y="335.13" width="41.65" height="3.57" fill="#8d8b85" />

      {/* Small card — right */}
      <rect x="431" y="303" width="72" height="41" fill="#cdcabc" />
      <rect x="436"  y="309" width="21"    height="3"    fill="#8d8b85" />
      <rect x="436"  y="314" width="21"    height="3"    fill="#8d8b85" />
      <rect x="435.76" y="319.07" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="435.76" y="324.42" width="26.78" height="3.57" fill="#8d8b85" />
      <rect x="435.76" y="329.78" width="53.55" height="3.57" fill="#8d8b85" />
      <rect x="435.76" y="335.13" width="41.65" height="3.57" fill="#8d8b85" />
    </svg>
  );
}

// ── Core Features Section ─────────────────────────────────────────────────
const CORE_FEATURES_3 = [
  {
    title: "Digital Log books",
    desc: "Full suite of bridge and engine logbooks replacing paper — automatic data validation, offline capability, real-time sync when connected.",
  },
  {
    title: "MARPOL Record books",
    desc: "All MARPOL record books per MEPC 312(74) and Ballast Record Book per MEPC 369(80). Class and flag approved — exactly what auditors expect.",
  },
  {
    title: "100+ Check lists",
    desc: "Tailored to operational checklists, permits, surveys, audits, and inspections. 8+ collaborative permit types with multi-level approval workflows.",
  },
];

function CoreFeaturesSection() {
  return (
    <Section id="core-features">
      <Wrap className="py-20 md:py-28">

        {/* Heading */}
        <motion.div
          className="mb-8 text-center"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-[#1d1d1d] tracking-[-1.5px]" style={{ lineHeight: 1.1, fontSize: "clamp(28px, 3.2vw, 40px)" }}>
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Your fave features, </span>
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>Now even Better</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[10px]">

          {/* ── Large 1 REPORT card ── */}
          <motion.div
            className="border border-[#D9D9D9] relative overflow-hidden w-full"
            style={{ minHeight: 421 }}
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          >
            {/* 1 REPORT badge — top-left */}
            <div className="absolute left-[38px] top-[31px] z-10">
              <div className="inline-flex items-center p-[10px] border border-[#ededed]" style={{ background: "#42ead4" }}>
                <p className="font-mono whitespace-nowrap" style={{ fontSize: 14, color: "#113637", fontWeight: 500 }}>1Report</p>
              </div>
            </div>

            {/* Text content — bottom-left */}
            <motion.div className="absolute left-[38px] z-10" style={{ bottom: 44, maxWidth: 520 }}>
              <h3 className="text-black mb-3" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.48px" }}>
                Single Entry. Multiple Reports.
              </h3>
              <p className="mb-3" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 16, color: "#85867b", lineHeight: 1.55 }}>
                Your crew shouldn't be filling the same voyage data separately for noon report, emissions compliance, cargo operations, BDN, and statement of facts.
              </p>
              <p className="mb-5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 16, color: "#85867b", lineHeight: 1.55 }}>
                1Report captures all of it in a single, structured entry — then programmatically routes what's relevant to each party, via API or automated emails. IMOS, Signal, internal and external stakeholders — each gets exactly what they need, automatically.
              </p>
              <motion.div className="flex flex-wrap gap-2">
                {["IMOS", "Signal", "Custom API"].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center px-3 py-1.5 bg-white border border-[#D9D9D9]"
                    style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, color: "#929389", letterSpacing: "-0.26px" }}
                  >
                    {label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Illustration — right half */}
            <div className="hidden md:block absolute top-0 bottom-0 right-0" style={{ left: "49%" }}>
              <DispatchIllustration />
            </div>
          </motion.div>

          {/* ── 3-column features row ── */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 border border-[#D9D9D9]"
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }} custom={0.1}
          >
            {CORE_FEATURES_3.map((item, i) => (
              <motion.div
                key={item.title}
                className="flex flex-col gap-[21px] items-start p-8 border-b md:border-b-0 md:border-l border-[#D9D9D9] first:border-l-0 last:border-b-0"
                style={{ minHeight: 291 }}
                variants={fadeUp} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: "-60px" }} custom={i * 0.07}
              >
                <p className="text-[#1d1d1d]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 18 }}>
                  {item.title}
                </p>
                <p style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 16, color: "#85867b", lineHeight: 1.55 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </Wrap>
    </Section>
  );
}

// ── Features Grid ────────────────────────────────────────────────────────
const FEATURES = [
  { title: "Digital Logbooks", desc: "Full suite of bridge and engine logbooks replacing paper — automatic data validation, offline capability, real-time sync when connected.", chip: "Works offline" },
  { title: "MARPOL Record Books", desc: "All MARPOL record books per MEPC 312(74) and Ballast Record Book per MEPC 369(80). Class and flag approved — exactly what auditors expect.", chip: "MEPC 312(74) · 369(80)" },
  { title: "Configurable Checklists", desc: "Tailored to operational checklists, permits, surveys, audits, and inspections. 8+ collaborative permit types with multi-level approval workflows.", chip: "Fully configurable" },
  { title: "Noon Reporting", desc: "One entry, zero duplication. Noon reporting eliminates parallel form-filling. Data flows to your performance and routing partners via scalable API.", chip: "API-ready" },
  { title: "Cross-fleet Search", desc: "Search years of operational history across every vessel in your fleet. Find how a failure mode was handled before — across rotations, across vessels, across time.", chip: "Full-text + filters" },
  { title: "Structured Handovers", desc: "Auto-generated handover reports compiled from outgoing crew entries. Incoming officers board knowing the vessel — not just the procedures.", chip: "Auto-generated" },
];

const FLAG_LIST = [
  { src: "/flag-sg.svg", name: "Singapore" },
  { src: "/flag-uae.svg", name: "UAE" },
  { src: "/flag-uk.svg", name: "UK" },
  { src: "/flag-us.svg", name: "U.S.A" },
];

function FlagApprovalSection() {
  return (
    <section className="bg-white relative">
      <Wrap className="py-20 md:py-28">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2
            className="text-black tracking-[-0.8px]"
            style={{ fontSize: "clamp(26px, 2.8vw, 40px)", lineHeight: 1.15 }}
          >
            <span className="block" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
              Approved for use on
            </span>
            <span className="block" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
              All Vessel Types
            </span>
          </h2>
        </motion.div>

        {/* Compliance content panel */}
        <motion.div
          className="max-w-[595px] mx-auto flex flex-col gap-[35px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Flags section */}
          <div className="flex flex-col gap-[38px]">
            {/* Row: label + link */}
            <div className="flex items-center justify-between">
              <p
                className="whitespace-nowrap"
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 18,
                  color: "#929389",
                  letterSpacing: "-0.36px",
                }}
              >
                25+ FLAGS ACCEPT WAYSHIP
              </p>
              <a
                href="#"
                className="border-b border-black text-black whitespace-nowrap"
                style={{
                  fontFamily: "'TT Hoves Pro', sans-serif",
                  fontSize: 14,
                  letterSpacing: "-0.28px",
                }}
              >
                View All Flags
              </a>
            </div>

            {/* Flag cards */}
            <div className="flex gap-[17px]">
              {FLAG_LIST.map(({ src, name }) => (
                <div
                  key={name}
                  className="flex-1 flex flex-col items-center gap-[12px] px-[26px] py-[19px] border-[0.7px] border-[#d9d9d9]"
                >
                  <img src={src} alt={name} className="w-11 h-11 shrink-0" />
                  <p
                    className="whitespace-nowrap"
                    style={{
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 16,
                      color: "#929389",
                      letterSpacing: "-0.32px",
                    }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full" style={{ background: "hsla(47, 4%, 93%, 1)" }} />

          {/* ABS Type Approval bar */}
          <div className="border-[0.7px] border-[#d9d9d9] flex items-center justify-between px-[17px]">
            <p style={{ fontSize: 24, letterSpacing: "-0.48px", lineHeight: 1.2 }}>
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
                Type Approved{" "}
              </span>
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                by ABS
              </span>
            </p>
            <div
              className="shrink-0 w-[113px] h-[113px]"
              style={{ mixBlendMode: "luminosity" }}
            >
              <img
                src={ABS_TYPE_APPROVAL_LOGO}
                alt="ABS Type Approval"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}

function FeaturesSection() {
  return (
    <Section id="features">
      <Wrap className="py-20 md:py-28">
        <motion.div className="mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <Label>Platform capabilities</Label>
          <SectionTitle>
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Six years of reliability</span>{" "}
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>Now supercharged</span>
          </SectionTitle>
          <Body className="mt-4 max-w-[500px]">
            The foundation that 2,000+ seafarers depend on every day — plus the AI layer that makes all that accumulated knowledge actually useful.
          </Body>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-[#D9D9D9]">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              className="p-7 border-b border-r border-[#D9D9D9] hover:bg-[#eeece5] transition-colors duration-200 group"
              style={{
                borderRight: (i + 1) % 3 === 0 ? "none" : undefined,
                borderBottom: i >= FEATURES.length - 3 ? "none" : undefined,
              }}
              variants={fadeUp} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: "-60px" }} custom={i * 0.06}
            >
              <div className="w-8 h-8 flex items-center justify-center mb-4 border border-[#D9D9D9]"
                style={{ background: "#eeece5" }}>
                <Plus size={14} className="text-[#2f615a]" />
              </div>
              <p className="text-[#1d1d1d] mb-2.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 16 }}>{f.title}</p>
              <p className="text-[#5a5a5a] leading-[1.65] mb-4" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 13.5 }}>{f.desc}</p>
              <span className="inline-block border border-[#D9D9D9] px-2.5 py-1 text-[#464646] group-hover:border-[#2f615a] group-hover:text-[#2f615a] transition-colors duration-150"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 11 }}>
                {f.chip}
              </span>
            </motion.div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

// ── Compliance Section ───────────────────────────────────────────────────
const COMP_ITEMS = [
  { title: "All MARPOL Record Books", sub: "Per MEPC 312(74) — ORB Part I & II, GRB, CRB, ODM" },
  { title: "Ballast Record Book", sub: "Per MEPC 369(80) — full BWM compliance" },
  { title: "Bridge & Engine Logbooks", sub: "Full suite — official entry format, validated, audit-ready" },
  { title: "ISO 21745 Certified", sub: "Marine electronic logbooks — international standard" },
  { title: "SIRE & ISM Documentation", sub: "Inspection-ready records generated from crew daily entries" },
];

function ComplianceSection() {
  return (
    <Section id="compliance">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>Compliance & approvals</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Not just compliant</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>Approved</span>
            </SectionTitle>
            <Body className="mb-8 max-w-[420px]">
              Class approval and flag acceptance aren't features — they're procurement gates. Wayship clears them all.
            </Body>
            <div className="space-y-0 border-t border-[#D9D9D9]">
              {COMP_ITEMS.map((item, i) => (
                <motion.div key={item.title} className="flex items-start gap-3.5 py-4 border-b border-[#D9D9D9]"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.07}>
                  <div className="w-5 h-5 flex items-center justify-center shrink-0 mt-0.5 border border-[#D9D9D9]"
                    style={{ background: "#eeece5" }}>
                    <Check size={9} className="text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[#1d1d1d]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 14 }}>{item.title}</p>
                    <p className="text-[#5a5a5a] text-[11px] mt-0.5 font-mono">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0.12}>
            {/* Approvals panel */}
            <div style={{ background: "#f3f2ee", border: "1px solid #D9D9D9", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div className="px-5 py-3 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                <p className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Class & flag approvals</p>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-4 border border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                    <p className="text-[#103435] text-sm font-medium mb-1"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>ABS</p>
                    <p className="text-[#5a5a5a] text-[10px] font-mono">Type Approval · Electronic Logbook</p>
                  </div>
                  <div className="p-4 border border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                    <p className="text-[#103435] text-sm font-medium mb-1"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>ISO 21745</p>
                    <p className="text-[#5a5a5a] text-[10px] font-mono">Certified · Marine E-Logbooks</p>
                  </div>
                </div>
                <p className="text-[#5a5a5a] text-[9px] uppercase tracking-widest font-mono mb-3">Flag state approvals</p>
                <div className="flex flex-wrap gap-2">
                  {["Liberia", "Bahamas", "Malta", "Singapore"].map((flag) => (
                    <span key={flag} className="px-3 py-1 text-[11px] text-[#103435] font-mono border border-[#D9D9D9]"
                      style={{ background: "#eeece5" }}>
                      {flag}
                    </span>
                  ))}
                  <span className="px-3 py-1 text-[11px] text-[#5a5a5a] font-mono border border-[#D9D9D9]">
                    + More in progress
                  </span>
                </div>
              </div>
            </div>
            <div className="p-5 border border-[#D9D9D9]" style={{ background: "rgba(16,185,129,0.04)" }}>
              <p className="text-[#5a5a5a] leading-[1.65]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>
                Wayship adapts to your SMS format and IT restrictions. Change management and data-sharing standards are built in — not bolted on.
              </p>
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

// ── ROI Section ──────────────────────────────────────────────────────────
function ROISection() {
  return (
    <Section id="roi">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Dashboard mockup */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <div style={{ background: "#f3f2ee", border: "1px solid #D9D9D9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                <span className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Wayship Fleet Dashboard · Live</span>
                <div className="flex items-center gap-1.5">
                  <motion.span className="w-1.5 h-1.5 bg-emerald-600"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                  <span className="text-emerald-700 text-[9px]">Live</span>
                </div>
              </div>
              <div className="p-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[["207", "Vessels active"], ["2,847", "Entries / month"], ["9", "Flagged critical"]].map(([v, l]) => (
                    <div key={l} className="p-3 border border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                      <p className="text-[#103435] font-mono text-lg font-medium"
                        style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>{v}</p>
                      <p className="text-[#5a5a5a] text-[9px] uppercase tracking-widest font-mono mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                {/* Mini chart */}
                <div className="p-3 mb-3 border border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                  <div className="flex justify-between mb-3">
                    <span className="text-[#5a5a5a] text-[9px] uppercase tracking-widest font-mono">Entries by system — 30 days</span>
                    <span className="text-[#5a5a5a] text-[9px] font-mono">All vessels</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[75, 50, 88, 42, 95, 60, 72, 55, 80, 48, 66, 38].map((h, i) => (
                      <motion.div key={i} className="flex-1"
                        style={{ background: i % 2 === 0 ? "rgba(14,50,51,0.75)" : "rgba(14,50,51,0.45)" }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }} />
                    ))}
                  </div>
                </div>
                {/* Activity feed */}
                <div>
                  {[
                    { dot: "bg-red-500", text: "Critical: Main engine lube oil pressure drop — Pacific Jasper", time: "4m ago" },
                    { dot: "bg-amber-500", text: "Advisory: Cargo hold ventilation reduced — CMA CGM Imagination", time: "41m ago" },
                    { dot: "bg-blue-500", text: "[Voice AI] Observation logged: favourable current — Seaboard Galaxy", time: "1h ago" },
                    { dot: "bg-emerald-600", text: "Handover complete: 247 entries transferred to incoming crew — Logan Explorer", time: "3h ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-[#D9D9D9] last:border-0">
                      <div className={`w-1.5 h-1.5 shrink-0 mt-1.5 ${item.dot}`} />
                      <p className="text-[#464646] text-[11px] leading-[1.5] flex-1">{item.text}</p>
                      <span className="text-[#8a8a8a] text-[9px] font-mono whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Numbers */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0.1}>
            <Label>Real-world outcomes</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Numbers your superintendent</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>will notice</span>
            </SectionTitle>
            <Body className="mb-10 max-w-[420px]">
              Six years of deployment across 200+ vessels gives us data on what actually changes when knowledge stops walking off the gangway.
            </Body>
            <div className="space-y-8 border-t border-[#D9D9D9] pt-8">
              {[
                ["30%", "Reduction in overall workload", "Across ship and shore teams — from eliminated duplicate entry, faster compliance documentation, and structured handovers replacing informal briefings."],
                ["40+", "Crew hours saved per vessel per week", "Hours that go back to what crew are actually there to do — safe navigation, maintenance, and operations."],
                ["4 wk", "Time to first vessel deployment", "No hardware required. Adapts to your SMS format and IT environment. We've done this across 200+ vessels — the process is proven."],
              ].map(([fig, title, desc]) => (
                <div key={title as string} className="flex gap-6 items-start">
                  <p className="text-[#2f615a] font-mono leading-none shrink-0 mt-1"
                    style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(28px, 2.5vw, 36px)" }}>
                    {fig}
                  </p>
                  <div>
                    <p className="text-[#1d1d1d] mb-1.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>{title as string}</p>
                    <p className="text-[#5a5a5a] leading-[1.65]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 13.5 }}>{desc as string}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

// ── Deployment strip ─────────────────────────────────────────────────────
function DeployStrip() {
  const items = ["Live in under 4 weeks", "No hardware required", "Works fully offline at sea", "ABS type approved", "Adapts to your SMS format", "Dedicated onboarding support"];
  return (
    <Wrap>
      <div className="bg-[#eeece5] py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-[#2f615a]" />
            <span className="text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 13 }}>{item}</span>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

// ── Main export ──────────────────────────────────────────────────────────
export function WayshipPageV2() {
  const storyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Green overlay on hero: fades in as hero scrolls out (40%→100% of hero height)
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOverlayOpacity = useTransform(heroScroll, [0.35, 1], [0, 1]);

  // Rail color: transitions from default grey → teal as bg darkens, then back
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start start", "end end"],
  });
  const railColor = useTransform(
    storyProgress,
    [0, 0.01, 0.717, 0.767],
    ["#D9D9D9", "#385859", "#385859", "#D9D9D9"]
  );

  useEffect(() => {
    document.title =
      "Wayship by Volteo Maritime - Operational Intelligence for the modern fleet";
    return () => { document.title = "Volteo Home Page Design"; };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Page rails (match home page) */}
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <div className="relative h-full max-w-[1512px] mx-auto">
          <motion.div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px" style={{ background: railColor }} />
          <motion.div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px" style={{ background: railColor }} />
        </div>
      </div>

      <Header />

      <main className="bg-[#f3f2ee]">
        {/* Anchor aliases so the home header links still land somewhere sensible */}
        <div id="advantage" />
        <div ref={heroRef} className="relative">
          <WayshipHero />
          {/* Green overlay that fades in as hero scrolls out */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "#2B4242", opacity: heroOverlayOpacity }}
          />
        </div>
        <StorytellingSection containerRef={storyRef} />
        <ContentDivider />
        <CoreFeaturesSection />
        <ContentDivider />
        <FlagApprovalSection />
        <ContentDivider />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
