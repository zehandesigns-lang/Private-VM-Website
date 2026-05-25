import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Plus, Check } from "lucide-react";
import { Link } from "react-router";
import { useLenis } from "lenis/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CTASection } from "./CTASection";
import { ContentDivider } from "./RailDivider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import epsLogo from "@/assets/logos/eastern-pacific.png";
import imgTk from "@/assets/logos/tk.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import flagBahamas from "@/assets/flags/Bahamas.svg";
import flagLiberia from "@/assets/flags/Liberia.svg";
import flagMalta from "@/assets/flags/Malta.svg";
import flagPanama from "@/assets/flags/Panama.svg";
import { ABS_TYPE_APPROVAL_LOGO, WAYSHIP_TIMELINE_VIDEO_URL } from "@/app/constants/wayship";
import { useIsMobile } from "./ui/use-mobile";

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
    <div className={`mx-auto max-w-[1512px] px-5 sm:px-8 md:px-16 lg:px-[115px] ${className}`}>
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
    <Section id="hero" className="pt-[72px] min-h-screen flex flex-col">
      <Wrap className="flex-1 flex flex-col justify-center py-10 sm:py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
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
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(15px, 1.1vw, 18px)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.12}
            >
              Wayship turns vessel operations data into structured, searchable intelligence — delivered at the right moment, for the right decision.
            </motion.p>

            {/* Trust strip — above CTAs per design */}
            <motion.div
              className="max-w-full"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            >
              <div className="flex flex-wrap items-center gap-x-10 gap-y-4 min-w-0">
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

            <motion.div className="flex flex-wrap items-center gap-4 mt-10"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.24}>
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
          </div>

          {/* Right — floating cards (scaled on tablet, full layout on lg+) */}
          <motion.div
            className="relative mx-auto w-full max-w-[360px] h-[260px] sm:max-w-[400px] sm:h-[300px] lg:mx-0 lg:max-w-none lg:h-[380px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            <div className="absolute left-1/2 top-0 h-[380px] w-[380px] -translate-x-1/2 origin-top scale-[0.68] sm:scale-[0.78] lg:left-0 lg:right-0 lg:translate-x-0 lg:scale-100 lg:w-auto">
              <HeroCards />
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

// ── Invisible drift section ───────────────────────────────────────────────
const DRIFT_CARDS = [
  {
    id: "insights",
    align: "left" as const,
    rotate: -5,
    delay: 0,
    label: "Paper trail",
    title: "Insights buried in paper and inboxes",
    body: "Critical observations trapped in handwritten logs, messy spreadsheets, and endless email threads",
  },
  {
    id: "incidents",
    align: "right" as const,
    rotate: 5,
    delay: 0.12,
    label: "Fleet pattern",
    title: "Repeated incidents, avoidable costs",
    body: "The same failures recur across vessels because nothing connects the fleet's past experience to everyday actions",
  },
];

const driftCardStyle = {
  background: "#eeece5",
  border: "1px solid #D9D9D9",
  boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)",
};

function DriftCard({
  card,
  inView,
}: {
  card: (typeof DRIFT_CARDS)[number];
  inView: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-[min(300px,88vw)] md:w-[min(300px,32vw)] lg:w-[min(320px,28vw)] shrink-0"
      style={{ transformOrigin: "center bottom" }}
      initial={reduceMotion ? false : { y: -120, opacity: 0, rotate: 0 }}
      animate={
        inView
          ? { y: 0, opacity: 1, rotate: card.rotate }
          : reduceMotion
          ? { y: 0, opacity: 1, rotate: card.rotate }
          : { y: -120, opacity: 0, rotate: 0 }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 400, damping: 30, delay: card.delay }
      }
    >
      <motion.div className="overflow-hidden text-left" style={driftCardStyle}>
        <motion.div className="px-5 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#e8e6de" }}>
          <p
            className="text-[#103435] text-[9px] uppercase tracking-widest"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
          >
            {card.label}
          </p>
        </motion.div>
        <motion.div className="px-6 py-5 md:px-7 md:py-6">
          <p
            className="text-[#103435] mb-2.5 leading-[1.25]"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(15px, 1.35vw, 18px)",
            }}
          >
            {card.title}
          </p>
          <p
            className="text-[#464646] leading-[1.55]"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(13px, 1.05vw, 15px)",
            }}
          >
            {card.body}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function InvisibleDriftSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <Section id="invisible-drift" className="min-h-0 py-12 sm:py-16 md:py-20 md:min-h-[80vh] md:overflow-hidden">
      <motion.div ref={sectionRef} className="relative h-full flex flex-col">
        <Wrap className="flex-shrink-0 pt-0 md:pt-10 pb-2 md:pb-4">
          <motion.div
            className="mx-auto max-w-[720px] text-center"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p
              className="text-[#464646] mb-4 md:mb-5 uppercase tracking-[0.12em]"
              style={{
                fontFamily: "'TT Hoves Pro', sans-serif",
                fontWeight: 500,
                fontSize: 11,
              }}
            >
              The invisible drift
            </p>
            <h2
              className="text-[#103435] leading-[1.12] tracking-[-1.2px] mb-4 md:mb-5"
              style={{ fontSize: "clamp(28px, 3.4vw, 48px)" }}
            >
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                Your operational knowledge is{" "}
              </span>
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
                walking off the gangway
              </span>
            </h2>
            <p
              className="text-[#464646] leading-[1.65] mx-auto max-w-[600px]"
              style={{
                fontFamily: "'TT Hoves Pro', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(14px, 1.1vw, 17px)",
              }}
            >
              With every crew rotation, context-rich know-how disappears under towers of paperwork.
              What the outgoing engineer knew about that pump — the noise it makes at load, the fix
              that worked last time — all of it becomes invisible to the oncoming crew.
            </p>
          </motion.div>
        </Wrap>

        <motion.div className="relative flex-shrink-0 w-full max-w-[900px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 mt-4 md:mt-4">
          {DRIFT_CARDS.map((card) => (
            <DriftCard key={card.id} card={card} inView={inView} />
          ))}
        </motion.div>
        {/* Fills remaining viewport height — scroll room before Wayship section */}
        <div className="flex-1 min-h-0" aria-hidden />
      </motion.div>
    </Section>
  );
}

// Floating cards for hero — continuous float loop (matches WayshipPage.tsx)
const HERO_CARD_FLOAT = [
  { y: [0, -10, 0] as const, duration: 6.5, rotate: -4, origin: "right bottom" },
  { y: [0, -7, 0] as const, duration: 5.2, rotate: 5, origin: "left center" },
  { y: [0, -8, 0] as const, duration: 7.1, rotate: -3, origin: "top center" },
] as const;

function HeroCards() {
  const reduceMotion = useReducedMotion();
  const cardBase = { background: "#f3f2ee", border: "1px solid #D9D9D9", boxShadow: "0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)" };
  const floatTransition = (duration: number) =>
    reduceMotion
      ? { duration: 0 }
      : { duration, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <>
      {/* Card A — Fleet overview */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] overflow-hidden"
        style={{
          ...cardBase,
          transformOrigin: HERO_CARD_FLOAT[0].origin,
          rotate: HERO_CARD_FLOAT[0].rotate,
        }}
        initial={false}
        animate={reduceMotion ? undefined : { y: HERO_CARD_FLOAT[0].y }}
        transition={floatTransition(HERO_CARD_FLOAT[0].duration)}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
          <span className="text-[#103435] text-[9px] uppercase tracking-widest font-mono">Fleet overview</span>
          <span className="flex items-center gap-1.5">
            <motion.span
              className="w-1.5 h-1.5 bg-emerald-500"
              initial={false}
              animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
              transition={reduceMotion ? { duration: 0 } : { duration: 1.4, repeat: Infinity }}
            />
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
        style={{
          ...cardBase,
          transformOrigin: HERO_CARD_FLOAT[1].origin,
          rotate: HERO_CARD_FLOAT[1].rotate,
        }}
        initial={false}
        animate={reduceMotion ? undefined : { y: HERO_CARD_FLOAT[1].y }}
        transition={floatTransition(HERO_CARD_FLOAT[1].duration)}
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
        style={{
          ...cardBase,
          transformOrigin: HERO_CARD_FLOAT[2].origin,
          rotate: HERO_CARD_FLOAT[2].rotate,
        }}
        initial={false}
        animate={reduceMotion ? undefined : { y: HERO_CARD_FLOAT[2].y }}
        transition={floatTransition(HERO_CARD_FLOAT[2].duration)}
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

function StorytellingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const meetVisible = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeVoiceTab, setActiveVoiceTab] = useState(0);
  const [voiceProgress, setVoiceProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const animStartRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll-driven heading: slides from the right rail toward center as the section enters view
  const { scrollYProgress: storyScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headingX = useTransform(storyScroll, [0, 0.5], ["17vw", "0vw"]);

  const playTimelineVideo = useCallback((reset = true) => {
    const video = videoRef.current;
    if (!video || !WAYSHIP_TIMELINE_VIDEO_URL) return;
    if (reset) video.currentTime = 0;
    void video.play().catch(() => {});
  }, []);

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
    playTimelineVideo();
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
  }, [meetVisible, playTimelineVideo]);

  return (
    <Section>
      <div
        ref={sectionRef}
        className="min-h-0 md:min-h-screen flex flex-col items-center overflow-hidden"
        style={{ paddingTop: "clamp(96px, 14vh, 200px)", paddingBottom: "clamp(32px, 5vh, 64px)" }}
      >
        <motion.div
          className="w-full max-w-[1512px] px-5 sm:px-8 md:px-16 lg:px-[115px] flex flex-col items-center"
          style={{ gap: "clamp(8px, 1.1vh, 16px)" }}
          initial={{ opacity: 0 }}
          animate={meetVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <motion.h2
            className="text-center tracking-[-2.4px] shrink-0 will-change-transform"
            style={{
              fontSize: "clamp(40px, 5.8vw, 88px)",
              lineHeight: 1.05,
              x: headingX,
            }}
          >
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, color: "rgba(16,52,53,0.75)" }}>
              {renderLettersStagger("Meet the all-new ", meetVisible)}
            </span>
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, color: "#103435" }}>
              {renderLettersStagger("Wayship", meetVisible, "Meet the all-new ".length)}
            </span>
          </motion.h2>

          <motion.h3
            className="text-left text-black tracking-[-0.8px] shrink-0 max-w-[720px] self-start w-full mt-16 sm:mt-20 md:mt-28 lg:mt-[140px]"
            style={{ fontSize: "clamp(22px, 2.6vw, 36px)", lineHeight: 1.15 }}
            initial={{ opacity: 0, y: 6 }}
            animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.3, ease: EASE } } : { opacity: 0, y: 6 }}
          >
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
              Purpose-built Wayship AI,
            </span>
            <br />
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
              designed from the ground up for seafarers
            </span>
          </motion.h3>

          <motion.div
            className="w-full grid grid-cols-1 lg:grid-cols-2 border border-[rgba(102,102,102,0.24)] overflow-hidden shrink-0"
            style={{ minHeight: "clamp(320px, 50vh, 520px)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.45, ease: EASE } } : { opacity: 0, y: 12 }}
          >
            <motion.div className="relative overflow-hidden min-h-[280px] lg:min-h-[320px] h-full" style={{ background: "#0a2526" }}>
              {WAYSHIP_TIMELINE_VIDEO_URL ? (
                <video
                  ref={videoRef}
                  src={WAYSHIP_TIMELINE_VIDEO_URL}
                  loop
                  muted
                  playsInline
                  autoPlay={meetVisible}
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover"
                  onCanPlay={() => meetVisible && playTimelineVideo(false)}
                />
              ) : null}
            </motion.div>

            <motion.div
              className="relative flex flex-col justify-center"
              style={{ background: "#f3f2ee", padding: "clamp(32px, 5%, 56px) clamp(28px, 5%, 56px)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={meetVisible ? { opacity: 1, y: 0, transition: { duration: 0.45, delay: 0.6, ease: EASE } } : { opacity: 0, y: 8 }}
            >
              <div className="absolute left-0 top-0 h-[3px] w-full bg-[#e8e6de]" />
              <motion.div className="absolute left-0 top-0 h-[3px] bg-[#1d1d1d]" style={{ width: `${voiceProgress}%` }} />

              <motion.div className="flex flex-col gap-8">
                <motion.div className="flex flex-col gap-[clamp(8px,1vh,14px)]">
                  <motion.div
                    className="inline-flex items-center self-start"
                    style={{ padding: "8px 10px", border: "1px solid" }}
                    animate={{
                      background: activeVoiceTab === 0 ? "#42ead4" : "#ffffff",
                      borderRadius: activeVoiceTab === 0 ? 0 : 44,
                      borderColor: activeVoiceTab === 0 ? "#ededed" : "#f2f3ec",
                      opacity: activeVoiceTab === 0 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
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

                <div className="h-px w-full bg-[#D9D9D9]" />

                <motion.div className="flex flex-col gap-[clamp(8px,1vh,14px)]">
                  <motion.div
                    className="inline-flex items-center self-start"
                    style={{ padding: "8px 10px", border: "1px solid" }}
                    animate={{
                      background: activeVoiceTab === 1 ? "#42ead4" : "#ffffff",
                      borderRadius: activeVoiceTab === 1 ? 0 : 44,
                      borderColor: activeVoiceTab === 1 ? "#ededed" : "#f2f3ec",
                      opacity: activeVoiceTab === 1 ? 1 : 0.45,
                    }}
                    transition={{ duration: 0.2, ease: EASE }}
                  >
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
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

        {/* ── Wayship AI heading ── */}
        <div className="flex flex-col items-center gap-[14px] mb-12">
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={revealed ? { opacity: 1, transition: { duration: 0.4, ease: EASE } } : { opacity: 0 }}
          >
            <span className="block w-2 h-2 rounded-full bg-[#42ead4]" />
            <p className="font-mono uppercase whitespace-nowrap" style={{ fontSize: 12, color: "#929389", fontWeight: 500 }}>
              WAYSHIP
            </p>
          </motion.div>
          <h3
            className="text-center text-black tracking-[-0.8px] max-w-[720px]"
            style={{ fontSize: "clamp(22px, 2.6vw, 36px)", lineHeight: 1.15 }}
          >
            <motion.span
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, display: "inline" }}
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.08, ease: EASE } } : { opacity: 0, y: 8 }}
            >
              Purpose-built Wayship AI,
            </motion.span>
            <br />
            <motion.span
              style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, display: "inline" }}
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.14, ease: EASE } } : { opacity: 0, y: 8 }}
            >
              designed from the ground up for seafarers
            </motion.span>
          </h3>
        </div>

        {/* 2-col layout: left = dark video card, right = feature descriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-[rgba(102,102,102,0.24)] overflow-hidden">

          {/* Left — dark teal video card */}
          <motion.div
            className="relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] lg:min-h-[480px]"
            style={{ background: "#0a2526", padding: "clamp(28px, 6%, 80px) clamp(20px, 5%, 64px)" }}
            {...fadeIn(0.12)}
          >
            {/* Avatar + name + waveform header */}
            <div
              className="inline-flex flex-col sm:flex-row items-center w-full max-w-full gap-4 sm:gap-9 px-3 sm:px-[13px] py-[10px]"
              style={{ background: "#0b1e04" }}
            >
              <div className="flex items-center gap-[10px] shrink-0">
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
              className="text-white mt-6 sm:mt-10 text-center px-2 w-full max-w-[420px]"
              style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(14px, 1.2vw, 17px)", lineHeight: 1.6 }}
            >
              "Auxiliary Engine 2. Running hours, uh, 3585. Load is 61 percent. Lube oil is 92 degrees, hmm, that seems high. Fuel oil temperature, let me see, 123, viscosity 12."
            </p>
          </motion.div>

          {/* Right — feature descriptions stacked vertically */}
          <motion.div
            className="relative flex flex-col justify-center"
            style={{ background: "#f3f2ee", padding: "clamp(28px, 5%, 72px) clamp(20px, 5%, 64px)" }}
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

// ── 1Report dispatch illustration (right panel of feature card) ───────────
const ONE_REPORT_INPUTS = ["Noon", "Emissions", "Cargo", "BDN", "SOF"];

const ONE_REPORT_DESTINATIONS = [
  { id: "imos", label: "IMOS", sub: "Voyage data", left: "17%" },
  { id: "signal", label: "Signal", sub: "Performance", left: "50%" },
  { id: "api", label: "Custom API", sub: "Stakeholders", left: "83%" },
] as const;

const ROUTE_GEOMETRY = {
  desktop: {
    viewBox: "0 0 520 380",
    paths: [
      "M 260 132 L 260 192 L 88 254",
      "M 260 192 L 260 254",
      "M 260 192 L 432 254",
    ],
    packets: [
      { cx: [260, 260, 88], cy: [132, 192, 254] },
      { cx: [260, 260, 260], cy: [132, 192, 254] },
      { cx: [260, 260, 432], cy: [132, 192, 254] },
    ],
    hubTop: "6%",
    destTop: "62%",
  },
  mobile: {
    viewBox: "0 0 520 450",
    paths: [
      "M 260 175 L 260 248 L 88 318",
      "M 260 248 L 260 318",
      "M 260 248 L 432 318",
    ],
    packets: [
      { cx: [260, 260, 88], cy: [175, 248, 318] },
      { cx: [260, 260, 260], cy: [175, 248, 318] },
      { cx: [260, 260, 432], cy: [175, 248, 318] },
    ],
    hubTop: "4%",
    destTop: "68%",
  },
} as const;

function OneReportDispatchIllustration() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const geo = isMobile ? ROUTE_GEOMETRY.mobile : ROUTE_GEOMETRY.desktop;

  return (
    <div
      ref={ref}
      className="relative h-full min-h-0 w-full flex-1 overflow-hidden bg-[#e7e5dc] md:min-h-0 md:flex-none"
      aria-hidden
    >
      {/* Central 1Report entry card */}
      <motion.div
        className="absolute left-1/2 z-[2] w-[min(240px,48%)] max-md:w-[min(220px,92%)] -translate-x-1/2 overflow-hidden border border-[#d9d9d9] bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
        style={{ top: geo.hubTop }}
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={
          inView
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 16, scale: 0.96 }
        }
        transition={{ duration: 0.55, ease: EASE }}
      >
        <div className="flex items-center gap-2 border-b border-[#e8e6de] bg-[#42ead4]/30 px-3 py-2">
          <span className="font-mono text-[9px] font-medium tracking-widest text-[#103435]">
            1Report
          </span>
          {inView && !reduceMotion && (
            <motion.span
              className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
        <div className="flex flex-wrap gap-1.5 border-b border-[#e8e6de] bg-[#faf9f6] px-3 py-2.5">
          {ONE_REPORT_INPUTS.map((tag, i) => (
            <motion.span
              key={tag}
              className="rounded-full border border-[#d0cec6] bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-wide text-[#929389]"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={
                inView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.92 }
              }
              transition={{ duration: 0.3, delay: 0.12 + i * 0.05, ease: EASE }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <div className="space-y-2 p-3">
          {[
            { w: "100%", delay: 0.15 },
            { w: "88%", delay: 0.22 },
            { w: "72%", delay: 0.29 },
            { w: "94%", delay: 0.36 },
          ].map((line, i) => (
            <motion.div
              key={i}
              className="h-[5px] rounded-sm bg-[#e8e6de]"
              style={{ width: line.w, transformOrigin: "left center" }}
              initial={{ scaleX: 0, opacity: 0.4 }}
              animate={
                inView
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0, opacity: 0.4 }
              }
              transition={{ duration: 0.4, delay: 0.2 + line.delay, ease: EASE }}
            />
          ))}
          <motion.div
            className="mt-2 inline-flex items-center gap-1.5 rounded border border-[#2f615a]/20 bg-[#e7efe8] px-2 py-0.5"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.55, ease: EASE }}
          >
            <span className="font-mono text-[8px] uppercase tracking-wide text-[#2f615a]">
              Routing…
            </span>
          </motion.div>
        </div>
      </motion.div>

      {/* Connector lines — above hub, below destination cards */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
        viewBox={geo.viewBox}
        preserveAspectRatio="xMidYMid meet"
      >
        {geo.paths.map((d, i) => (
          <g key={d}>
            <motion.path
              d={d}
              fill="none"
              stroke="#c5c2b8"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: reduceMotion ? 1 : 0, opacity: 0.35 }}
              animate={
                inView
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: reduceMotion ? 1 : 0, opacity: 0.35 }
              }
              transition={{ duration: 0.7, delay: 0.25 + i * 0.12, ease: EASE }}
            />
          </g>
        ))}
        {!reduceMotion &&
          inView &&
          geo.packets.map((route, i) => (
            <motion.circle
              key={i}
              r={4}
              fill="#42ead4"
              style={{ filter: "drop-shadow(0 0 4px rgba(66, 234, 212, 0.55))" }}
              initial={{ cx: route.cx[0], cy: route.cy[0], opacity: 0 }}
              animate={{
                cx: [...route.cx, route.cx[2]],
                cy: [...route.cy, route.cy[2]],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2,
                delay: 0.85 + i * 0.35,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "linear",
              }}
            />
          ))}
      </svg>

      {/* Destination systems */}
      {ONE_REPORT_DESTINATIONS.map((dest, i) => (
        <motion.div
          key={dest.id}
          className="absolute z-[2] w-[94px] max-md:w-[96px] md:w-[108px] -translate-x-1/2 overflow-hidden border border-[#d9d9d9] bg-[#f3f2ee] shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          style={{ left: dest.left, top: geo.destTop }}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.45, delay: 0.45 + i * 0.1, ease: EASE }}
        >
          <div className="border-b border-[#e8e6de] bg-white px-2.5 py-1.5">
            <p
              className="font-mono text-[10px] font-medium uppercase tracking-wide text-[#103435]"
            >
              {dest.label}
            </p>
          </div>
          <div className="space-y-1.5 p-2 max-md:p-2.5 max-md:pb-3">
            <div className="h-[4px] w-full rounded-sm bg-[#d9d9d9]" />
            <div className="h-[4px] w-4/5 rounded-sm bg-[#d9d9d9]" />
            <p className="pt-1 font-mono text-[8px] leading-snug text-[#929389]">{dest.sub}</p>
          </div>
          {inView && !reduceMotion && (
            <motion.div
              className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#42ead4]"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{
                duration: 0.35,
                delay: 1.1 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Auto-routing label */}
      <motion.p
        className="absolute bottom-[2%] max-md:bottom-[5%] left-1/2 max-w-[92%] -translate-x-1/2 text-center font-mono text-[9px] max-md:text-[7px] uppercase tracking-[0.14em] max-md:tracking-[0.12em] text-[#929389] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.7, ease: EASE }}
      >
        Auto-routed per stakeholder
      </motion.p>
    </div>
  );
}

// ── Core Features Section ─────────────────────────────────────────────────
const CORE_FEATURES_3 = [
  {
    title: "30+ Digital Record Books",
    desc: "A complete suite of bridge and engine digital records that serves as a drop-in replacement for paper logbooks — with automatic validation, offline-first reliability, and fail-safe real-time sync.",
  },
  {
    title: "All MARPOL Records",
    desc: "Digital MARPOL record books per MEPC 312(74) and Ballast Water record per MEPC 369(80) — fully compliant and class-approved.",
  },
  {
    title: "80+ Configurable Checklists",
    desc: "Highly customizable operational checklists, permits, surveys, audits, and inspections with real-time collaboration and multi-level approval workflows.",
  },
];

function CoreFeaturesSection() {
  return (
    <Section id="core-features">
      <Wrap className="py-20 md:py-28">

        {/* Heading */}
        <motion.div
          className="mb-6 sm:mb-8 text-left"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="text-[#1d1d1d] tracking-[-1.5px] max-w-[720px]" style={{ lineHeight: 1.15, fontSize: "clamp(28px, 3.2vw, 40px)" }}>
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Your favorite Wayship experience,</span>
            <br />
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>now even better</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-[10px]">

          {/* ── Large 1 REPORT card ── */}
          <motion.div
            className="border border-[#D9D9D9] relative w-full overflow-hidden min-h-[421px] max-md:flex max-md:flex-col max-md:min-h-0"
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          >
            {/* 1 REPORT badge */}
            <div className="absolute left-5 top-5 z-20 md:left-[38px] md:top-[31px]">
              <div className="inline-flex items-center p-[10px] border border-[#ededed]" style={{ background: "#42ead4" }}>
                <p className="font-mono whitespace-nowrap" style={{ fontSize: 14, color: "#113637", fontWeight: 500 }}>1Report</p>
              </div>
            </div>

            {/* Illustration — #e7e5dc fills panel height on mobile (width stays in card) */}
            <div className="max-md:relative max-md:flex max-md:flex-col max-md:w-full max-md:min-h-[540px] max-md:shrink-0 max-md:overflow-hidden max-md:bg-[#e7e5dc] max-md:pt-16 md:absolute md:inset-y-0 md:right-0 md:left-[49%] md:flex-none md:min-h-0 md:pt-0 md:bg-transparent">
              <OneReportDispatchIllustration />
            </div>

            {/* Text — below illustration on mobile, bottom-left on md+ */}
            <motion.div className="relative z-10 max-md:shrink-0 max-md:border-t max-md:border-[#D9D9D9] max-md:bg-[#f3f2ee] max-md:px-5 max-md:py-6 md:absolute md:left-[38px] md:bottom-[44px] md:max-w-[520px] md:px-0 md:py-0 md:bg-transparent">
              <h3 className="text-black mb-3" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(20px, 2vw, 26px)", lineHeight: 1.25, letterSpacing: "-0.48px" }}>
                Single entry. Multi-system reporting.
              </h3>
              <p className="mb-3 max-md:text-sm md:text-base" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, color: "#85867b", lineHeight: 1.55 }}>
                Your crew shouldn't be filling the same voyage data separately for noon report, emissions compliance, cargo operations, BDN, and statement of facts.
              </p>
              <p className="mb-5 max-md:text-sm md:text-base" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, color: "#85867b", lineHeight: 1.55 }}>
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
                className="flex flex-col gap-[21px] items-start p-6 sm:p-8 border-b md:border-b-0 md:border-l border-[#D9D9D9] first:border-l-0 last:border-b-0 md:min-h-[291px]"
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
  { title: "30+ Digital Record Books", desc: "A complete suite of bridge and engine digital records that serves as a drop-in replacement for paper logbooks — with automatic validation, offline-first reliability, and fail-safe real-time sync.", chip: "Works offline" },
  { title: "All MARPOL Records", desc: "Digital MARPOL record books per MEPC 312(74) and Ballast Water record per MEPC 369(80) — fully compliant and class-approved.", chip: "MEPC 312(74) · 369(80)" },
  { title: "80+ Configurable Checklists", desc: "Highly customizable operational checklists, permits, surveys, audits, and inspections with real-time collaboration and multi-level approval workflows.", chip: "Fully configurable" },
  { title: "Noon Reporting", desc: "One entry, zero duplication. Noon reporting eliminates parallel form-filling. Data flows to your performance and routing partners via scalable API.", chip: "API-ready" },
  { title: "Cross-fleet Search", desc: "Search years of operational history across every vessel in your fleet. Find how a failure mode was handled before — across rotations, across vessels, across time.", chip: "Full-text + filters" },
  { title: "Structured Handovers", desc: "Auto-generated handover reports compiled from outgoing crew entries. Incoming officers board knowing the vessel — not just the procedures.", chip: "Auto-generated" },
];

const FLAG_LIST = [
  { src: flagLiberia, name: "Liberia" },
  { src: flagBahamas, name: "Bahamas" },
  { src: flagPanama, name: "Panama" },
  { src: flagMalta, name: "Malta" },
];

const ALL_FLAG_STATES = [
  "Antigua & Barbuda",
  "Bahamas",
  "Belgium",
  "Bermuda",
  "Brazil",
  "Cyprus",
  "Denmark",
  "Ecuador",
  "Egypt",
  "Estonia",
  "Faroe Islands",
  "Finland",
  "Germany",
  "Gibraltar",
  "Hong Kong",
  "Kiribati",
  "Liberia",
  "Malta",
  "Marshall Islands",
  "Norway",
  "Panama",
  "Portugal",
  "Portugal MAR",
  "United Kingdom",
  "Singapore",
  "Sweden",
  "Tuvalu",
];

const FLAG_STATE_COLUMNS = [
  ALL_FLAG_STATES.slice(0, Math.ceil(ALL_FLAG_STATES.length / 2)),
  ALL_FLAG_STATES.slice(Math.ceil(ALL_FLAG_STATES.length / 2)),
];

/** ~6 list rows visible on mobile before inner scroll (16px × 1.5 line-height + gap-1). */
const FLAGS_DIALOG_MOBILE_MAX_H = "calc(6 * 1.5rem + 5 * 0.25rem)";

function FlagApprovalSection() {
  const [flagsDialogOpen, setFlagsDialogOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (!flagsDialogOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;
    const prevBodyPaddingRight = body.style.paddingRight;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
    lenis?.stop();
    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
      body.style.paddingRight = prevBodyPaddingRight;
      lenis?.start();
    };
  }, [flagsDialogOpen, lenis]);

  return (
    <section className="bg-white relative">
      <Wrap className="py-20 md:py-28">
        {/* Heading */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
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
          className="w-full max-w-[595px] mx-auto flex flex-col gap-8 sm:gap-[35px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Flags section */}
          <div className="flex flex-col gap-[38px]">
            {/* Row: label + link */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="text-base sm:text-lg sm:whitespace-nowrap"
                style={{
                  fontFamily: "'Geist Mono', monospace",
                  color: "#929389",
                  letterSpacing: "-0.36px",
                }}
              >
                25+ FLAGS ACCEPT WAYSHIP
              </p>
              <button
                type="button"
                onClick={() => setFlagsDialogOpen(true)}
                className="border-b border-black text-black self-start sm:self-auto bg-transparent cursor-pointer hover:opacity-70 transition-opacity"
                style={{
                  fontFamily: "'TT Hoves Pro', sans-serif",
                  fontSize: 14,
                  letterSpacing: "-0.28px",
                }}
              >
                View All Flags
              </button>
            </div>

            <Dialog open={flagsDialogOpen} onOpenChange={setFlagsDialogOpen}>
              <DialogContent
                className="sm:max-w-[640px] bg-[#f3f2ee] border border-[#D9D9D9] rounded-none p-8 md:p-10 gap-8 max-md:max-h-[min(90dvh,640px)] max-md:overflow-hidden max-md:flex max-md:flex-col"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}
              >
                <DialogHeader className="text-center sm:text-center shrink-0">
                  <DialogTitle
                    className="text-black tracking-[-0.5px]"
                    style={{
                      fontFamily: "'TT Hoves Pro', sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(22px, 2.4vw, 28px)",
                      lineHeight: 1.2,
                    }}
                  >
                    Accepted by 25+ Flag States
                  </DialogTitle>
                </DialogHeader>
                {/* Mobile: one column, ~6 rows visible, scroll for the rest */}
                <ul
                  className="sm:hidden flex flex-col gap-1 list-none m-0 p-0 min-h-0 overflow-y-auto overscroll-contain pr-1 -mr-1"
                  style={{ maxHeight: FLAGS_DIALOG_MOBILE_MAX_H }}
                >
                  {ALL_FLAG_STATES.map((flag) => (
                    <li
                      key={flag}
                      className="text-[#1d1d1d] shrink-0"
                      style={{
                        fontFamily: "'TT Hoves Pro', sans-serif",
                        fontWeight: 400,
                        fontSize: 16,
                        lineHeight: 1.5,
                      }}
                    >
                      {flag}
                    </li>
                  ))}
                </ul>
                {/* Desktop: two columns, no inner scroll */}
                <div className="hidden sm:grid sm:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-1">
                  {FLAG_STATE_COLUMNS.map((column, colIndex) => (
                    <ul key={colIndex} className="flex flex-col gap-1 list-none m-0 p-0">
                      {column.map((flag) => (
                        <li
                          key={flag}
                          className="text-[#1d1d1d]"
                          style={{
                            fontFamily: "'TT Hoves Pro', sans-serif",
                            fontWeight: 400,
                            fontSize: 16,
                            lineHeight: 1.5,
                          }}
                        >
                          {flag}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              </DialogContent>
            </Dialog>

            {/* Flag cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-[17px]">
              {FLAG_LIST.map(({ src, name }) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-[12px] px-4 py-4 sm:px-[26px] sm:py-[19px] border-[0.7px] border-[#d9d9d9]"
                >
                  <img src={src} alt={name} className="w-10 h-10 sm:w-11 sm:h-11 shrink-0" />
                  <p
                    className="text-center text-sm sm:text-base"
                    style={{
                      fontFamily: "'Geist Mono', monospace",
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

          {/* Type approval — ABS */}
          <div className="border-[0.7px] border-[#d9d9d9] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 px-4 py-4 sm:px-[17px]">
            <p
              className="min-w-0 flex-1"
              style={{ fontSize: "clamp(18px, 2.2vw, 24px)", letterSpacing: "-0.48px", lineHeight: 1.25 }}
            >
              <span
                className="block"
                style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}
              >
                Type approved by
              </span>
              <span
                className="block"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
              >
                American Bureau of Shipping
              </span>
            </p>
            <img
              src={ABS_TYPE_APPROVAL_LOGO}
              alt="American Bureau of Shipping"
              className="h-14 sm:h-[72px] md:h-[90px] w-auto shrink-0 self-start sm:self-center object-contain"
              style={{ mixBlendMode: "luminosity" }}
            />
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}

function FeaturesSection() {
  return (
    <Section id="features">
      <Wrap className="py-14 sm:py-20 md:py-28">
        <motion.div className="mb-10 sm:mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
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
                  {["Liberia", "Bahamas", "Panama", "Malta"].map((flag) => (
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
                    <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-[#D9D9D9] last:border-0 min-w-0">
                      <div className={`w-1.5 h-1.5 shrink-0 mt-1.5 ${item.dot}`} />
                      <p className="text-[#464646] text-[11px] leading-[1.5] flex-1 min-w-0">{item.text}</p>
                      <span className="text-[#8a8a8a] text-[9px] font-mono shrink-0">{item.time}</span>
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
export function WayshipPageV3() {

  useEffect(() => {
    document.title =
      "Wayship by Volteo Maritime - Operational Intelligence for the modern fleet";
    return () => { document.title = "Volteo Home Page Design"; };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      {/* Page rails (match home page) */}
      <div className="absolute inset-0 pointer-events-none z-[60] hidden sm:block">
        <div className="relative h-full max-w-[1512px] mx-auto">
          <motion.div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]" />
          <motion.div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]" />
        </div>
      </div>

      <Header />

      <main className="bg-[#f3f2ee]">
        {/* Anchor aliases so the home header links still land somewhere sensible */}
        <div id="advantage" />
        <WayshipHero />
        <ContentDivider />
        <InvisibleDriftSection />
        <ContentDivider />
        <StorytellingSection />
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
