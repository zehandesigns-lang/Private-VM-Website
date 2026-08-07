import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useTransform, useSpring } from "motion/react";
import { Link } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CTASection } from "./CTASection";
import { RailDivider } from "./RailDivider";
import { CustomerLogoTicker } from "./CustomerLogoTicker";
import svgEpsVentures from "@/assets/logos/eps-ventures.svg";
import svgTechstars from "@/assets/logos/techstars.svg";
import svgZeebox from "@/assets/logos/zeebox.svg";
import surenTransparentPortrait from "@/assets/suren-transparent.png";
import imgSingaporeOfficeMap from "@/assets/singapore-office-map-v2.png";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_STRONG: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ltCushion: CSSProperties = {
  fontFamily: "'Source Serif 4', serif",
  fontWeight: 300,
};

const ttHoves: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
};

const ttHovesMedium: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 500,
};

const ttHovesBold: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 600,
};

/* ------------------------------------------------------------------ */
/*  Animated SVG illustrations                                        */
/* ------------------------------------------------------------------ */

function PulseRing({ delay = 0, size = 320 }: { delay?: number; size?: number }) {
  return (
    <motion.div
      className="absolute rounded-full border border-white/[0.06]"
      style={{ width: size, height: size, left: "50%", top: "50%", x: "-50%", y: "-50%" }}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: [0.85, 1.15, 0.85], opacity: [0, 0.4, 0] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "linear" }}
    />
  );
}

function DataFlowSVG() {
  return (
    <svg viewBox="0 0 400 240" fill="none" className="w-full h-auto max-w-[400px]">
      {/* Ship silhouette */}
      <motion.path
        d="M60 180 L100 140 L300 140 L340 180 Z"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE_STRONG }}
      />
      {/* Data streams */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={120 + i * 60}
          y1={135}
          x2={120 + i * 60}
          y2={60}
          stroke="rgba(47,97,90,0.6)"
          strokeWidth="1"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: EASE }}
        />
      ))}
      {/* Decision nodes */}
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          cx={120 + i * 60}
          cy={55}
          r={6}
          fill="rgba(47,97,90,0.5)"
          stroke="rgba(47,97,90,0.8)"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1 + i * 0.12, ease: EASE }}
        />
      ))}
      {/* Intelligence output */}
      <motion.path
        d="M114 55 L200 25 L286 55"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
      />
      <motion.circle
        cx={200}
        cy={20}
        r={8}
        fill="#2f615a"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 0.5, bounce: 0.3, delay: 1.8 }}
      />
    </svg>
  );
}

function NetworkGraphSVG() {
  const nodes = [
    { x: 60, y: 60 }, { x: 160, y: 40 }, { x: 260, y: 65 },
    { x: 110, y: 140 }, { x: 200, y: 120 }, { x: 300, y: 135 },
    { x: 80, y: 200 }, { x: 190, y: 210 }, { x: 290, y: 195 },
  ];
  const edges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [3, 6], [4, 7], [5, 8], [6, 7], [7, 8],
  ];
  return (
    <svg viewBox="0 0 360 260" fill="none" className="w-full h-auto max-w-[360px]">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y}
          x2={nodes[b].x} y2={nodes[b].y}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x} cy={n.y} r={4}
          fill={i === 4 ? "#2f615a" : "rgba(255,255,255,0.2)"}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.6 + i * 0.04, ease: EASE }}
        />
      ))}
      {/* Animated pulse through central node */}
      <motion.circle
        cx={200} cy={120} r={18}
        fill="none"
        stroke="rgba(47,97,90,0.3)"
        strokeWidth="1"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: [0.8, 1.4, 0.8], opacity: [0, 0.6, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
      />
    </svg>
  );
}

function WaveformSVG() {
  const bars = 24;
  return (
    <svg viewBox="0 0 360 120" fill="none" className="w-full h-auto max-w-[360px]">
      {Array.from({ length: bars }).map((_, i) => {
        const h = 20 + Math.sin(i * 0.6) * 35 + Math.cos(i * 0.3) * 15;
        return (
          <motion.rect
            key={i}
            x={i * 15 + 2}
            y={60 - h / 2}
            width={8}
            height={h}
            rx={2}
            fill="rgba(47,97,90,0.5)"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            style={{ transformOrigin: `${i * 15 + 6}px 60px` }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: EASE }}
          />
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Clip-path line reveal helper                                      */
/* ------------------------------------------------------------------ */

function LineReveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.75, delay, ease: EASE_STRONG }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Parallax number counter                                           */
/* ------------------------------------------------------------------ */

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 40, damping: 20 });
  const display = useTransform(springVal, (v) => `${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (inView) motionVal.set(target);
  }, [inView, motionVal, target]);

  useEffect(() => {
    const unsub = display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return unsub;
  }, [display]);

  return <span ref={ref}>0{suffix}</span>;
}

/* ------------------------------------------------------------------ */
/*  Section components                                                */
/* ------------------------------------------------------------------ */

function HeroSection() {
  return (
    <section className="relative bg-[#f3f2ee]">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] pt-[180px] md:pt-[220px] pb-0 grid grid-cols-1 lg:grid-cols-[58fr_42fr] gap-10 lg:gap-14">

        {/* Left: headline — stays top-aligned when the portrait column is taller */}
        <div className="self-start min-w-0">
          <h1
            className="text-[#0e3233] leading-[1.06] tracking-[-1.5px]"
            style={{ fontSize: "clamp(38px,5.2vw,76px)" }}
          >
            <LineReveal delay={0.04}>
              <span style={ttHovesMedium}>We are building the operating layer</span>
            </LineReveal>
            <LineReveal delay={0.13}>
              <span style={ttHovesMedium}>for maritime teams that refuse</span>
            </LineReveal>
            <LineReveal delay={0.22}>
              <span style={ttHovesMedium}>to run blind</span>
            </LineReveal>
          </h1>
          <div className="mt-8 md:mt-10 pb-8 md:pb-10">
            <LineReveal delay={0.32}>
              <span
                className="block text-[#0e3233]"
                style={{ ...ttHovesMedium, fontSize: "clamp(22px, 2.2vw, 30px)", lineHeight: 1.15 }}
              >
                — Surendra Lingareddy
              </span>
            </LineReveal>
            <div className="mt-3">
              <LineReveal delay={0.4}>
                <span
                  className="block text-[#5c5a58]/85"
                  style={{
                    fontFamily: "monospace",
                    fontSize: 13,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  Founder & CEO
                </span>
              </LineReveal>
            </div>
          </div>
        </div>

        {/* Right: portrait — bottom edge aligns with hero bottom (divider sits flush below) */}
        <motion.div
          className="flex justify-center lg:justify-end w-full self-end"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
        >
          <div className="w-full max-w-[min(100%,420px)] shrink-0 leading-none">
            <img
              src={surenTransparentPortrait}
              alt="Portrait at Techstars"
              className="w-full h-auto block"
              draggable={false}
            />
          </div>
        </motion.div>
      </div>

      <RailDivider />
    </section>
  );
}

function FounderNoteSection() {
  const bodyParagraphs = [
    "Vessel operations generate an extraordinary amount of knowledge—every watch, every port call, and every near-miss handled. But almost none of it survives the crew change. Ships are handed over, but understanding is not. The patterns, the workarounds, and the lessons learned voyage by voyage—they all leave with the outgoing crew.",
    "We learned this not from a distance, but from the people carrying that burden: seafarers and shore teams who had accepted knowledge loss as an inevitable condition of the job. The problem was never laziness; it was friction. Logging on paper took time the crew didn't have, and paper logbooks held data no one could retrieve.",
    "Wayship is built around one core belief: capture context-rich knowledge the moment it happens, in the medium that works at sea — accessible to all relevant stakeholders, digitally.",
    "That belief is no longer a hypothesis. Over the last six years, across 350+ vessels, we have captured over 5 million type- and class-approved digital records — proving there is indeed a better way.",
    "With most of the world's fleet still on paper logbooks and siloed noon reports, the opportunity to reimagine maritime operations has never been greater.",
  ];

  return (
    <section id="founder-note" className="relative bg-[#f3f2ee] pt-14 md:pt-20 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <div className="mx-auto max-w-[640px] text-center">
          <motion.p
            className="text-[#5c5a58]/85 mb-6"
            style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase" }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            Founder&apos;s note
          </motion.p>
          <motion.h2
            className="text-[#0e3233] leading-[1.2] tracking-[-0.02em] mb-8 md:mb-10"
            style={{ fontSize: "clamp(22px, 2.6vw, 34px)" }}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.04, ease: EASE }}
          >
            <span style={ttHovesMedium}>What your crew learns at sea should outlast the voyage.</span>{" "}
            <span style={ltCushion}>Today, it walks off the gangway with them.</span>
          </motion.h2>

          <div className="space-y-5">
            {bodyParagraphs.map((text, i) => (
              <motion.p
                key={i}
                className="text-[#5c5a58] leading-[1.75]"
                style={{ ...ttHoves, fontSize: "clamp(17px, 1.2vw, 20px)" }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: 0.08 + i * 0.06, ease: EASE }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function OurInvestorsSection() {
  const investors = [
    { name: "EPS Ventures", logo: svgEpsVentures },
    { name: "Techstars", logo: svgTechstars },
    { name: "Zeebox", logo: svgZeebox },
  ] as const;

  return (
    <section className="relative bg-[#f3f2ee] py-20 md:py-28">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <div className="mx-auto max-w-[640px] text-center mb-12 md:mb-14">
          <motion.h3
            className="text-[#0e3233] leading-[1.2] tracking-[-0.02em]"
            style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            <span style={ttHovesMedium}>Backed by the most credible operators in maritime</span>
          </motion.h3>
        </div>

        <motion.div
          className="mx-auto max-w-[820px] flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 md:gap-x-20"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE_STRONG }}
        >
          {investors.map((inv, i) => (
            <motion.div
              key={inv.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE_STRONG }}
            >
              <img
                src={inv.logo}
                alt={inv.name}
                className="h-[28px] sm:h-[32px] md:h-[36px] w-auto object-contain opacity-70 grayscale transition-opacity duration-300 hover:opacity-100"
                draggable={false}
                loading="lazy"
                decoding="async"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WhereWeAreSection() {
  return (
    <section className="relative bg-[#f3f2ee] py-20 md:py-28">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <div className="mx-auto max-w-[640px] text-center mb-10 md:mb-12">
          <motion.h3
            className="text-[#0e3233] leading-[1.2] tracking-[-0.02em] mb-4"
            style={{ fontSize: "clamp(22px, 2.6vw, 32px)" }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          >
            <span style={ttHovesMedium}>Headquartered in </span>
            <span style={ltCushion}>Singapore</span>
          </motion.h3>
          <motion.p
            className="text-[#5c5a58] leading-[1.75]"
            style={{ ...ttHoves, fontSize: "clamp(16px, 1.1vw, 18px)" }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.08, ease: EASE }}
          >
            Located in the nerve centre of global maritime
          </motion.p>
        </div>

        <motion.div
          className="mx-auto max-w-[960px] border border-[#D9D9D9] bg-white overflow-hidden shadow-[0_8px_40px_rgba(14,50,51,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
        >
          <img
            src={imgSingaporeOfficeMap}
            alt="Map of Southeast Asia highlighting the Singapore Global HQ at 600 North Bridge Road, Parkview Square"
            className="block w-full h-auto"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}

function TrustAuthoritySection() {
  const trustBadges = [
    { label: "ABS Type Approved", tier: "primary" },
    { label: "ISO 21745", tier: "primary" },
    { label: "Liberia", tier: "secondary" },
    { label: "Bahamas", tier: "secondary" },
    { label: "Malta", tier: "secondary" },
    { label: "Singapore", tier: "secondary" },
    { label: "Offline-first", tier: "accent" },
  ];

  return (
    <section className="relative bg-[#0a2526] py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <motion.p
          className="mb-4 text-white/40"
          style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Authority &amp; Trust
        </motion.p>

        <motion.h2
          className="text-white leading-[1.1] tracking-[-1px] mb-5 max-w-[700px]"
          style={{ fontSize: "clamp(30px,3.5vw,48px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          <span style={ttHovesMedium}>Earned at sea </span>
          <span style={ltCushion} className="text-[#5aa89e]">Proven across fleets</span>
        </motion.h2>

        <motion.p
          className="text-white/50 leading-[1.85] max-w-[600px] mb-16"
          style={{ ...ttHoves, fontSize: 15 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
        >
          Our authority is built on years of real-world deployment, class society approvals,
          flag-state acceptance, and repeatable outcomes with operational crews.
        </motion.p>

        {/* Large horizontal trust metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] overflow-hidden mb-14">
          {[
            { value: 350, suffix: "+", label: "Vessels running Volteo daily", color: "#5aa89e" },
            { value: 6, suffix: "+", label: "Years continuously deployed", color: "#2f615a" },
            { value: 5, suffix: "", label: "Flag states accepted", color: "#5aa89e" },
            { value: 99, suffix: "%", label: "Uptime across fleet ops", color: "#2f615a" },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              className="px-7 py-9 bg-[#0a2526]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
            >
              <div className="mb-3 w-8 h-0.5" style={{ background: m.color }} />
              <p className="text-white leading-none mb-2" style={{ ...ltCushion, fontSize: 44 }}>
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </p>
              <p className="text-white/40 leading-[1.5]" style={{ ...ttHoves, fontSize: 13 }}>
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Certification badges */}
        <motion.div
          className="flex flex-wrap gap-2.5"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.25, ease: EASE }}
        >
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 border text-[10px] uppercase tracking-[0.08em] ${
                badge.tier === "primary"
                  ? "border-[#2f615a]/50 text-[#5aa89e] bg-[#2f615a]/10"
                  : badge.tier === "accent"
                  ? "border-white/10 text-white/50 bg-white/[0.03]"
                  : "border-white/[0.08] text-white/35 bg-transparent"
              }`}
              style={{ fontFamily: "monospace" }}
            >
              {badge.tier === "primary" && <span className="w-1.5 h-1.5 rounded-full bg-[#2f615a]" />}
              {badge.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ValuePropsSection() {
  const props = [
    {
      title: "Capture knowledge where work happens",
      description:
        "Intelligence captured at source through voice, structured logs, and contextual workflows designed for life at sea. No more transcription. No more lost handovers.",
      points: [
        "Voice-first capture for hands-busy moments",
        "Vessel-specific memory retained across crew rotations",
        "Lower admin burden, higher operational focus",
      ],
      illustration: <WaveformSVG />,
    },
    {
      title: "Translate data into trusted decisions",
      description:
        "From onboard incidents to port planning, fragmented signals become clear recommendations and next-best actions — contextual, prioritized, and always explainable.",
      points: [
        "Signals prioritized by operational relevance",
        "Decision context surfaced on demand",
        "Faster escalation with less ambiguity",
      ],
      illustration: <DataFlowSVG />,
    },
    {
      title: "Scale outcomes across the fleet",
      description:
        "What works on one vessel can propagate across your entire network — with governance, traceability, and measurable impact at every level.",
      points: [
        "Playbooks standardized across fleets",
        "Shore-to-ship visibility in near real-time",
        "Compounding gains from every deployment cycle",
      ],
      illustration: <NetworkGraphSVG />,
    },
  ];

  return (
    <section className="relative bg-[#0a2526] py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <motion.p
          className="mb-4 text-white/40"
          style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Why Teams Choose Volteo
        </motion.p>

        <motion.h2
          className="text-white leading-[1.1] tracking-[-1px] mb-20 max-w-[600px]"
          style={{ fontSize: "clamp(30px,3.5vw,48px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          <span style={ttHovesMedium}>Value grounded in </span>
          <span style={ltCushion} className="text-[#5aa89e]">real operations</span>
        </motion.h2>

        <div className="space-y-24">
          {props.map((prop, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={prop.title}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center ${
                  isEven ? "" : "lg:[direction:rtl]"
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className={isEven ? "" : "lg:[direction:ltr]"}>
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 border border-[#2f615a]/40 text-[#5aa89e]"
                      style={{ fontFamily: "monospace", fontSize: 12 }}
                    >
                      0{idx + 1}
                    </span>
                    <div className="flex-1 h-px bg-white/[0.06]" />
                  </div>
                  <h3 className="text-white leading-[1.15] mb-4" style={{ ...ttHovesMedium, fontSize: 26 }}>
                    {prop.title}
                  </h3>
                  <p className="text-white/50 leading-[1.85] mb-7" style={{ ...ttHoves, fontSize: 15 }}>
                    {prop.description}
                  </p>
                  <ul className="space-y-3">
                    {prop.points.map((point, pi) => (
                      <motion.li
                        key={point}
                        className="flex items-start gap-3 text-white/45 text-[13.5px] leading-snug"
                        style={ttHoves}
                        initial={{ opacity: 0, x: -8 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.35, delay: pi * 0.06, ease: EASE }}
                      >
                        <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-[#2f615a]" />
                        {point}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className={`flex items-center justify-center p-8 border border-white/[0.06] bg-white/[0.015] ${
                  isEven ? "" : "lg:[direction:ltr]"
                }`}>
                  {prop.illustration}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function JourneyTimeline() {
  const milestones = [
    { year: "2019", title: "The spark", desc: "Founded at the intersection of maritime and emerging tech." },
    { year: "2020", title: "EPS Techstars", desc: "Accepted into the accelerator; began co-building with seafarers." },
    { year: "2021", title: "First fleet", desc: "Deployed across initial fleet of vessels for live operational trials." },
    { year: "2022", title: "ABS approved", desc: "Earned ABS Type Approval — the gold standard in maritime tech." },
    { year: "2023", title: "350+ vessels", desc: "Scaled to hundreds of ships across multiple flag states." },
    { year: "Now", title: "Operational intelligence", desc: "Frictionless platform delivering intelligence the fastest way." },
  ];

  return (
    <section className="relative bg-[#0a2526] py-24 md:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <motion.p
          className="mb-4 text-white/40"
          style={{ fontFamily: "monospace", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          Our Journey
        </motion.p>

        <motion.h2
          className="text-white leading-[1.1] tracking-[-1px] mb-16 max-w-[600px]"
          style={{ fontSize: "clamp(28px,3vw,42px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE }}
        >
          <span style={ttHovesMedium}>From thesis to </span>
          <span style={ltCushion} className="text-[#5aa89e]">trusted platform</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-white/[0.08] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: EASE_STRONG }}
          />

          <div className="space-y-12">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className="relative flex gap-8 md:gap-12 items-start pl-10 md:pl-14"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05, ease: EASE }}
              >
                {/* Dot */}
                <motion.div
                  className="absolute left-[11px] md:left-[15px] top-[6px] w-[9px] h-[9px] border border-[#2f615a] bg-[#0a2526]"
                  style={{ borderRadius: "50%" }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.3, delay: i * 0.05 + 0.15, ease: EASE }}
                />

                <div className="shrink-0 w-[52px]">
                  <p className="text-[#5aa89e] leading-none" style={{ fontFamily: "monospace", fontSize: 13 }}>
                    {m.year}
                  </p>
                </div>
                <div>
                  <p className="text-white/80 mb-1" style={{ ...ttHovesMedium, fontSize: 16 }}>{m.title}</p>
                  <p className="text-white/40 leading-[1.65]" style={{ ...ttHoves, fontSize: 14 }}>{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative bg-[#0a2526] py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
        <PulseRing delay={0} size={400} />
        <PulseRing delay={1.5} size={600} />
      </div>

      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] text-center">
        <motion.h2
          className="text-white leading-[1.08] tracking-[-1px] mb-6 mx-auto max-w-[650px]"
          style={{ fontSize: "clamp(30px,3.8vw,52px)" }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span style={ttHovesMedium}>Ready to see </span>
          <span style={ltCushion} className="text-[#5aa89e]">what's possible?</span>
        </motion.h2>

        <motion.p
          className="text-white/50 leading-[1.8] mb-10 mx-auto max-w-[480px]"
          style={{ ...ttHoves, fontSize: 15 }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
        >
          See how Volteo helps maritime teams capture better data and make faster,
          more confident decisions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
        >
          <motion.div whileTap={{ scale: 0.97, transition: { duration: 0.12, ease: EASE } }}>
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 bg-[#2f615a] hover:bg-[#3a7a72] text-white px-8 py-3.5 text-[15px] transition-colors duration-200"
              style={{ ...ttHovesMedium, letterSpacing: "0.02em" }}
            >
              Book a demo
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-70">
                <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

export function AboutPageV2() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.div
      className="relative min-h-screen bg-[#0a2526]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE }}
    >
      {/* Side rails — run the full page height */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        <div className="relative h-full max-w-[1512px] mx-auto">
          <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]/50" />
          <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]/50" />
        </div>
      </div>

      {/* Header with light-on-dark override */}
      <div className="relative z-50">
        <Header />
      </div>

      <main className="bg-[#f3f2ee]">
        <HeroSection />
        <div className="bg-[#f3f2ee] py-7">
          <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
            <CustomerLogoTicker variant="light" size="compact" />
          </div>
        </div>
        <RailDivider />
        <FounderNoteSection />
        <RailDivider />
        <OurInvestorsSection />
        <RailDivider />
        <WhereWeAreSection />
      </main>

      <div id="join-our-team">
        <CTASection variant="team" />
      </div>

      <Footer />
    </motion.div>
  );
}
