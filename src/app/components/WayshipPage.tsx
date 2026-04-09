import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useInView } from "motion/react";
import { ArrowUpRight, ArrowLeft, Plus, Check } from "lucide-react";
import { VolteoLogo } from "./VolteoLogo";
import epsLogo from "@/assets/logos/eastern-pacific.png";
import imgTorm from "@/assets/logos/torm.png";
import imgTk from "@/assets/logos/tk.png";

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

function Divider() {
  return <div className="h-px bg-[#D9D9D9] w-full" />;
}

// ── Wayship Nav ─────────────────────────────────────────────────────────
function WayshipNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(243,242,238,0.95)" : "rgba(243,242,238,0.98)",
        backdropFilter: "blur(12px)",
      }}
    >
      <Wrap>
        <div className="flex items-center justify-between h-[72px]">
          <Link to="/" className="flex items-center gap-3 group">
            <ArrowLeft size={16} className="text-[#464646] group-hover:text-[#103435] transition-colors" />
            <VolteoLogo color="#113637" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {[["#voice", "Voice AI"], ["#features", "Features"], ["#compliance", "Compliance"], ["#roi", "Why Wayship"]].map(([href, label]) => (
              <a key={label} href={href}
                className="text-[#464646] hover:text-[#103435] transition-colors duration-150"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 15, fontWeight: 500 }}>
                {label}
              </a>
            ))}
          </nav>
          <a href="#cta"
            className="hidden md:block bg-[#0e3233] hover:bg-[#1a5052] text-white px-5 py-2.5 transition-colors duration-150"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>
            Book a demo
          </a>
        </div>
      </Wrap>
      <div className="h-px bg-[#D9D9D9]" />
    </motion.header>
  );
}

// ── Hero ────────────────────────────────────────────────────────────────
function WayshipHero() {
  return (
    <Section id="hero" className="pt-[72px] min-h-screen flex flex-col">
      <Wrap className="flex-1 flex flex-col justify-center py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left */}
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
              <span className="inline-flex items-center gap-2 bg-[#103435]/8 border border-[#103435]/20 px-3 py-1.5 mb-8"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 11, fontWeight: 500, color: "#2f615a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-600"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }} />
                Fleet intelligence platform
              </span>
            </motion.div>

            <motion.h1
              className="text-[#103435] leading-[1.05] tracking-[-2px] mb-6"
              style={{ fontSize: "clamp(38px, 4.8vw, 70px)" }}
              variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
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
              variants={fadeUp} initial="hidden" animate="visible" custom={0.18}
            >
              Speak it. Type it. It's structured, tagged, and live on your fleet dashboard in under 60 seconds. Wayship turns crew observation into actionable fleet knowledge — in real time.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4 mb-10"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.24}>
              <a href="#cta"
                className="bg-[#0e3233] hover:bg-[#1a5052] text-white px-6 py-3 transition-colors duration-150 inline-flex items-center gap-2"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>
                Request a demo
                <ArrowUpRight size={15} />
              </a>
              <a href="#voice"
                className="text-[#2f615a] border-b border-[#2f615a] pb-0.5 hover:opacity-70 transition-opacity inline-flex items-center gap-1.5"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                See how it works
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div className="flex items-center gap-8"
              variants={fadeUp} initial="hidden" animate="visible" custom={0.3}>
              {[["200+", "Active vessels"], ["2,000+", "Seafarers daily"], ["40+", "Crew hrs saved/week"]].map(([num, lbl], i) => (
                <div key={lbl} className={`${i > 0 ? "pl-8 border-l border-[#D9D9D9]" : ""}`}>
                  <p className="text-[#103435]" style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontSize: "clamp(22px, 2vw, 30px)" }}>{num}</p>
                  <p className="text-[#464646] mt-0.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 11, fontWeight: 400, letterSpacing: "0.06em", textTransform: "uppercase" }}>{lbl}</p>
                </div>
              ))}
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

        {/* Trust strip */}
        <motion.div
          className="mt-16 pt-8"
          variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
        >
          <Divider />
          <div className="pt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="text-[#464646] uppercase tracking-widest text-[10px]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>Trusted by</p>
            <div className="flex items-center gap-8 flex-wrap">
              {[
                { src: epsLogo, alt: "Eastern Pacific Shipping", h: "h-10" },
                { src: imgTorm, alt: "TORM", h: "h-8" },
                { src: imgTk, alt: "Teekay", h: "h-8" },
              ].map((logo) => (
                <img key={logo.alt} src={logo.src} alt={logo.alt}
                  className={`${logo.h} w-auto object-contain`}
                  style={{ mixBlendMode: "luminosity", opacity: 0.7 }} />
              ))}
            </div>
            <div className="hidden md:flex items-center gap-3 ml-auto flex-wrap">
              {["ABS Type Approved", "ISO 21745 Certified", "MARPOL Compliant"].map((badge) => (
                <span key={badge}
                  className="inline-flex items-center gap-1.5 border border-[#D9D9D9] px-3 py-1"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 11, color: "#464646" }}>
                  <Check size={10} className="text-emerald-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </Wrap>
    </Section>
  );
}

// Floating cards for hero
function HeroCards() {
  return (
    <>
      {/* Card A — Fleet overview */}
      <motion.div
        className="absolute top-0 left-0 w-[300px] rounded-xl p-5"
        style={{ background: "#0e2626", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/40 text-[9px] uppercase tracking-widest font-mono">Fleet overview</span>
          <span className="flex items-center gap-1">
            <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
            <span className="text-emerald-400 text-[10px]">Live</span>
          </span>
        </div>
        {[["Nordic Swan", "14 entries today", "bg-emerald-400"],
          ["Torm Helene", "9 entries today", "bg-emerald-400"],
          ["CMA Voyager", "Syncing…", "bg-amber-400"],
          ["AE Resolute", "6 entries today", "bg-blue-400"]].map(([name, meta, dot]) => (
          <div key={name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} />
              <span className="text-white/70 text-xs">{name}</span>
            </div>
            <span className="text-white/30 text-[10px] font-mono">{meta}</span>
          </div>
        ))}
      </motion.div>

      {/* Card B — Knowledge captured */}
      <motion.div
        className="absolute top-20 right-0 w-[210px] rounded-xl p-4"
        style={{ background: "rgba(14,56,56,0.95)", border: "1px solid rgba(52,211,153,0.2)", boxShadow: "0 20px 50px rgba(0,0,0,0.25)" }}
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <p className="text-white/40 text-[9px] uppercase tracking-widest mb-2 font-mono">Knowledge captured</p>
        <p className="text-emerald-400 font-mono leading-none mb-1" style={{ fontSize: 32, fontWeight: 500 }}>2,847</p>
        <p className="text-white/40 text-[10px] leading-[1.5] mb-3">Crew entries logged<br />across all vessels</p>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div className="h-full bg-emerald-400 rounded-full"
            initial={{ width: 0 }} animate={{ width: "78%" }}
            transition={{ duration: 1.2, delay: 0.6, ease: EASE }} />
        </div>
      </motion.div>

      {/* Card C — Voice entry */}
      <motion.div
        className="absolute bottom-0 left-5 w-[280px] rounded-xl p-4"
        style={{ background: "#0e2626", border: "1px solid rgba(255,255,255,0.07)", boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/40 text-[9px] uppercase tracking-widest font-mono">Latest · Torm Helene</span>
          <span className="text-emerald-400 text-[9px] border border-emerald-400/30 px-1.5 py-0.5 rounded">Voice AI</span>
        </div>
        <p className="text-white/75 text-xs leading-[1.55] italic mb-2">
          "Unusual vibration at 13.5 knots — propeller inspection recommended before next port."
        </p>
        <p className="text-white/30 text-[10px] font-mono">2h ago · Chief Engineer</p>
      </motion.div>
    </>
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
    <Section className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>The challenge</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Operational knowledge walks</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>off the gangway</span>
            </SectionTitle>
            <Body className="mb-10 max-w-[440px]">
              Every crew rotation, vessel-specific knowledge disappears. What the outgoing engineer knew about that pump — the noise it makes at load, the fix that worked last time — it's gone. Until something breaks.
            </Body>
            <div className="space-y-6">
              {problems.map((p, i) => (
                <motion.div key={p.title} className="flex gap-4 items-start"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.08}>
                  <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                    style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.18)" }}>
                    <span className="text-red-400/60 text-xs font-mono">✕</span>
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
            <div className="rounded-xl p-7" style={{ background: "#0e2626", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono mb-5">Vessel: Nordic Swan · 2024</p>

              <div className="pb-5 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 text-sm font-medium">Capt. Eriksson + crew</span>
                  <span className="text-white/30 text-[10px] font-mono">Jan – Apr 2024</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-2">
                  <motion.div className="h-full bg-blue-400 rounded-full"
                    initial={{ width: 0 }} whileInView={{ width: "100%" }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: EASE }} />
                </div>
                <p className="text-white/50 text-xs leading-[1.6]">
                  <span className="text-blue-300">247 structured entries</span> logged — machinery observations, defect history, port notes.
                </p>
              </div>

              <div className="py-5 border-b border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/30 text-sm">Crew rotation</span>
                  <span className="text-white/30 text-[10px] font-mono">18 Apr 2024</span>
                </div>
                <div className="rounded-lg p-3.5" style={{ background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.15)" }}>
                  <p className="text-red-400/60 text-[9px] uppercase tracking-widest font-mono mb-1.5">Without Wayship</p>
                  <p className="text-white/50 text-xs leading-[1.6]">4 months of vessel-specific knowledge leaves with the crew. No structured handover. Incoming master starts from scratch.</p>
                </div>
              </div>

              <div className="pt-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/80 text-sm font-medium">Capt. Mwangi + crew</span>
                  <span className="text-white/30 text-[10px] font-mono">Apr – Aug 2024</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden mb-2">
                  <motion.div className="h-full bg-emerald-400 rounded-full"
                    initial={{ width: 0 }} whileInView={{ width: "100%" }}
                    viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: EASE }} />
                </div>
                <p className="text-white/50 text-xs leading-[1.6]">
                  <span className="text-emerald-300">With Wayship:</span> full context transferred. Incoming crew board with 247 entries of vessel history — searchable, structured, ready to query.
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
const WAVE_H = [16, 26, 20, 34, 28, 42, 36, 50, 38, 52, 46, 42, 34, 26, 30, 38, 46, 40, 34, 28, 20, 14];

function VoiceSection() {
  return (
    <Section id="voice" className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <div className="rounded-xl overflow-hidden" style={{ background: "#091e1e", border: "1px solid rgba(255,255,255,0.07)" }}>
              {/* Topbar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5" style={{ background: "rgba(255,255,255,0.025)" }}>
                {["bg-red-400/50", "bg-amber-400/50", "bg-emerald-400/50"].map((c, i) => <div key={i} className={`w-2 h-2 rounded-full ${c}`} />)}
                <span className="text-white/30 text-[10px] font-mono ml-2">Wayship 6 · Voice capture</span>
              </div>
              <div className="p-5 space-y-4">
                {/* Context pill */}
                <div className="flex items-start gap-3 rounded-lg px-4 py-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  <span className="text-base">⚙️</span>
                  <div>
                    <p className="text-white/70 text-xs">Engine room rounds · 02:14 · Chief Engineer</p>
                    <p className="text-white/30 text-[10px] mt-0.5">Aux engine #2 · Port of Colombo approach</p>
                  </div>
                </div>
                {/* Waveform */}
                <div>
                  <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono mb-2">Recording…</p>
                  <div className="flex items-center gap-[2.5px] h-14">
                    {WAVE_H.map((h, i) => (
                      <motion.div key={i} className="rounded-full bg-blue-400/70" style={{ width: 3 }}
                        animate={{ height: [4, h, 4] }}
                        transition={{ duration: 0.5 + (i % 5) * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }} />
                    ))}
                  </div>
                </div>
                {/* Spoken text */}
                <p className="text-white/60 text-sm italic leading-[1.6]">
                  "Aux two running warm — lube oil temp up 8 degrees at this load. Happened once before in April. Worth watching before arrival."
                </p>
                {/* Arrow */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.3)" }} />
                  <span className="text-blue-300/70 text-[10px] font-mono whitespace-nowrap">→ structured instantly</span>
                  <div className="flex-1 h-px" style={{ background: "rgba(37,99,235,0.3)" }} />
                </div>
                {/* Structured entry */}
                <div className="rounded-lg p-4" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-blue-300/70 text-[9px] uppercase tracking-widest font-mono">Entry logged</span>
                    <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                      <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                        animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                      Live on dashboard
                    </span>
                  </div>
                  {[["System", "Auxiliary engine #2"], ["Category", "#machinery · #advisory"], ["Observation", "Lube oil temp +8°C at load"], ["Prior history", "Linked · April entry"], ["Logged by", "Chief Engineer · 02:14"]].map(([k, v]) => (
                    <div key={k} className="flex justify-between items-baseline py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-white/30 text-[10px] font-mono">{k}</span>
                      <span className="text-white/65 text-[11px]">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0.1}>
            <Label>Wayship 6 · New</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Speak it.</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>It's captured.</span>
            </SectionTitle>
            <Body className="mb-8 max-w-[440px]">
              Crew shouldn't have to choose between doing the job and documenting it. Voice AI turns the moment of observation into a structured, tagged, searchable entry — in under 60 seconds, in any condition.
            </Body>
            <div className="space-y-7">
              {[
                ["Works where keyboards don't", "Engine room, deck at night, rough weather. If a crew member can speak, they can log. No tablet hunting, no form navigation, no memory required later."],
                ["Structures the entry automatically", "Free speech becomes tagged, categorised, and linked to prior observations automatically. The system does the organising — the crew just observes."],
                ["Live on the fleet dashboard instantly", "Shore teams see critical observations in real time. No delay from handover reports. No information lost between crew and superintendent."],
              ].map(([title, desc], i) => (
                <motion.div key={title as string} className="flex gap-4"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.08}>
                  <span className="text-[#2f615a] font-mono text-sm font-medium shrink-0 mt-0.5">0{i + 1}</span>
                  <div>
                    <p className="text-[#1d1d1d] mb-1.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>{title as string}</p>
                    <p className="text-[#5a5a5a] leading-[1.65]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>{desc as string}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </Wrap>
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

function ChatSection() {
  const [visible, setVisible] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const timers = CHAT_MESSAGES.map((_, i) => setTimeout(() => setVisible(i + 1), 600 + i * 900));
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  return (
    <Section id="chat" className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>Wayship 6 · New</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Ask the ship what</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>it knows.</span>
            </SectionTitle>
            <Body className="mb-8 max-w-[440px]">
              Captains don't need another dashboard to read. They need answers. Wayship 6 lets you query your vessel's full operational history in plain language — current state, past incidents, crew observations across rotations.
            </Body>
            <div className="space-y-7">
              {[
                ["Decisions grounded in vessel history", "When something looks wrong, ask Wayship. It tells you whether this has happened before, what the last crew found, and what resolved it."],
                ["Context that survives crew rotation", "An incoming captain can query six months of vessel history on boarding day — without a single debrief."],
                ["Natural language, not filter menus", "No training required. Ask questions the way you'd ask a colleague. Wayship surfaces the relevant entries and flags what needs attention."],
              ].map(([title, desc], i) => (
                <motion.div key={title as string} className="flex gap-4"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.08}>
                  <span className="text-[#2f615a] font-mono text-sm font-medium shrink-0 mt-0.5">0{i + 1}</span>
                  <div>
                    <p className="text-[#1d1d1d] mb-1.5" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>{title as string}</p>
                    <p className="text-[#5a5a5a] leading-[1.65]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>{desc as string}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Chat mockup */}
          <motion.div ref={ref} variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-80px" }} custom={0.1}>
            <div className="rounded-xl overflow-hidden" style={{ background: "#091e1e", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/5" style={{ background: "rgba(255,255,255,0.025)" }}>
                <span className="text-white/40 text-[10px] font-mono">Chat with Wayship · Nordic Swan</span>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <motion.span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                  Online
                </span>
              </div>
              <div className="p-4 space-y-3 min-h-[320px]">
                <AnimatePresence>
                  {CHAT_MESSAGES.slice(0, visible).map((msg, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className={`flex flex-col gap-1 max-w-[90%] ${msg.role === "user" ? "ml-auto items-end" : "items-start"}`}
                    >
                      <div className={`rounded-xl px-4 py-2.5 text-xs leading-[1.6] ${
                        msg.role === "user"
                          ? "bg-[#0e3233] text-white rounded-br-sm"
                          : "text-white/70 rounded-bl-sm"
                      }`}
                        style={msg.role === "ai" ? { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" } : {}}>
                        {msg.text.split("\n").map((line, j) => (
                          <span key={j}>
                            {line.startsWith("**") && line.endsWith("**")
                              ? <strong className="text-white font-medium">{line.slice(2, -2)}</strong>
                              : line}
                            {j < msg.text.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <span className="text-white/25 text-[9px] font-mono px-1">
                        {msg.role === "user" ? `${msg.from} · ` : "Wayship · "}{msg.time}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="border-t border-white/5 px-4 py-3 flex items-center gap-3">
                <div className="flex-1 rounded-lg px-3 py-2 text-white/25 text-xs"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  Ask about any system, incident, or prior observation…
                </div>
                <div className="w-8 h-8 bg-[#0e3233] rounded-lg flex items-center justify-center shrink-0">
                  <ArrowUpRight size={13} className="text-white" />
                </div>
              </div>
            </div>
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

function FeaturesSection() {
  return (
    <Section id="features" className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <motion.div className="mb-14" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <Label>Platform capabilities</Label>
          <SectionTitle>
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Six years of reliability.</span>{" "}
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>Now supercharged.</span>
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
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(14,50,51,0.07)", border: "1px solid rgba(14,50,51,0.14)" }}>
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
    <Section id="compliance" className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>Compliance & approvals</Label>
            <SectionTitle className="mb-5">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Not just compliant.</span>{" "}
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>Approved.</span>
            </SectionTitle>
            <Body className="mb-8 max-w-[420px]">
              Class approval and flag acceptance aren't features — they're procurement gates. Wayship clears them all.
            </Body>
            <div className="space-y-0 border-t border-[#D9D9D9]">
              {COMP_ITEMS.map((item, i) => (
                <motion.div key={item.title} className="flex items-start gap-3.5 py-4 border-b border-[#D9D9D9]"
                  variants={fadeUp} initial="hidden" whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }} custom={i * 0.07}>
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)" }}>
                    <Check size={9} className="text-emerald-500" />
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
            <div className="rounded-xl p-6" style={{ background: "#0e2626", border: "1px solid rgba(255,255,255,0.07)" }}>
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono mb-5">Class & flag approvals</p>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-lg p-4" style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)" }}>
                  <p className="text-white/85 text-sm font-medium mb-1">ABS</p>
                  <p className="text-white/35 text-[10px] font-mono">Type Approval · Electronic Logbook</p>
                </div>
                <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <p className="text-white/85 text-sm font-medium mb-1">ISO 21745</p>
                  <p className="text-white/35 text-[10px] font-mono">Certified · Marine E-Logbooks</p>
                </div>
              </div>
              <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono mb-3">Flag state approvals</p>
              <div className="flex flex-wrap gap-2">
                {["Liberia", "Bahamas", "Malta", "Singapore"].map((flag) => (
                  <span key={flag} className="px-3 py-1 rounded text-[11px] text-blue-300/70 font-mono"
                    style={{ background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.2)" }}>
                    {flag}
                  </span>
                ))}
                <span className="px-3 py-1 rounded text-[11px] text-white/25 font-mono"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                  + More in progress
                </span>
              </div>
            </div>
            <div className="rounded-xl p-5" style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.15)" }}>
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
    <Section id="roi" className="border-t border-[#D9D9D9]">
      <Wrap className="py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Dashboard mockup */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <div className="rounded-xl overflow-hidden" style={{ background: "#091e1e", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/5" style={{ background: "rgba(255,255,255,0.025)" }}>
                {["bg-red-400/50", "bg-amber-400/50", "bg-emerald-400/50"].map((c, i) => <div key={i} className={`w-2 h-2 rounded-full ${c}`} />)}
                <span className="text-white/30 text-[10px] font-mono ml-2">Wayship Fleet Dashboard · Live</span>
              </div>
              <div className="p-4">
                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[["207", "Vessels active"], ["2,847", "Entries / month"], ["9", "Flagged critical"]].map(([v, l]) => (
                    <div key={l} className="rounded-lg p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <p className="text-white font-mono text-lg font-medium">{v}</p>
                      <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono mt-0.5">{l}</p>
                    </div>
                  ))}
                </div>
                {/* Mini chart */}
                <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div className="flex justify-between mb-3">
                    <span className="text-white/25 text-[9px] uppercase tracking-widest font-mono">Entries by system — 30 days</span>
                    <span className="text-white/25 text-[9px] font-mono">All vessels</span>
                  </div>
                  <div className="flex items-end gap-1 h-12">
                    {[75, 50, 88, 42, 95, 60, 72, 55, 80, 48, 66, 38].map((h, i) => (
                      <motion.div key={i} className="flex-1 rounded-t-sm"
                        style={{ background: i % 2 === 0 ? "rgba(37,99,235,0.75)" : "rgba(59,130,246,0.55)" }}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.04, ease: EASE }} />
                    ))}
                  </div>
                </div>
                {/* Activity feed */}
                <div className="space-y-0">
                  {[
                    { dot: "bg-red-400/75", text: "Critical: Main engine lube oil pressure drop — Torm Helene", time: "4m ago" },
                    { dot: "bg-amber-400", text: "Advisory: Cargo hold ventilation reduced — Nordic Swan", time: "41m ago" },
                    { dot: "bg-blue-400", text: "[Voice AI] Observation logged: favourable current +1.1 kts — AE Resolute", time: "1h ago" },
                    { dot: "bg-emerald-400", text: "Handover complete: 247 entries transferred to incoming crew — CMA Voyager", time: "3h ago" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2.5 border-b border-white/5 last:border-0">
                      <div className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1.5 ${item.dot}`} />
                      <p className="text-white/55 text-[11px] leading-[1.5] flex-1">{item.text}</p>
                      <span className="text-white/25 text-[9px] font-mono whitespace-nowrap">{item.time}</span>
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
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>will notice.</span>
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

// ── Testimonial ──────────────────────────────────────────────────────────
function TestimonialSection() {
  return (
    <Section className="border-t border-b border-[#D9D9D9]">
      <Wrap className="py-16 md:py-20">
        <motion.div className="max-w-[680px] mx-auto text-center"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <p className="text-[#D9D9D9] mb-4" style={{ fontFamily: "'LT Cushion', serif", fontSize: 56, lineHeight: 1 }}>"</p>
          <p className="text-[#103435] leading-[1.55] mb-8"
            style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(20px, 1.8vw, 28px)" }}>
            Before Wayship, when a crew rotated off we lost everything they knew about that vessel. Now that knowledge stays on the ship — not the seafarer.
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "rgba(14,50,51,0.1)", border: "1px solid rgba(14,50,51,0.18)" }}>
              <span className="text-[#0e3233] text-xs font-medium font-mono">SR</span>
            </div>
            <div className="text-left">
              <p className="text-[#1d1d1d]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 14 }}>Senior Superintendent</p>
              <p className="text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 13 }}>Technical Operations</p>
            </div>
            <div className="h-6 w-px bg-[#D9D9D9] mx-1" />
            <p className="text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 14 }}>TORM</p>
          </div>
        </motion.div>
      </Wrap>
    </Section>
  );
}

// ── Deployment strip ─────────────────────────────────────────────────────
function DeployStrip() {
  const items = ["Live in under 4 weeks", "No hardware required", "Works fully offline at sea", "ABS type approved", "Adapts to your SMS format", "Dedicated onboarding support"];
  return (
    <div className="border-b border-[#D9D9D9] bg-[#eeece5]">
      <Wrap>
        <div className="py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-[#2f615a]" />
              <span className="text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 13 }}>{item}</span>
            </div>
          ))}
        </div>
      </Wrap>
    </div>
  );
}

// ── CTA ──────────────────────────────────────────────────────────────────
function WayshipCTA() {
  return (
    <Section id="cta" className="bg-[#0e2626]">
      <Wrap className="py-24 md:py-32">
        <motion.div className="max-w-[580px] mx-auto text-center"
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
          <h2 className="text-white leading-[1.1] tracking-[-1.5px] mb-5"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: "clamp(32px, 3.5vw, 52px)" }}>
            Start capturing what your fleet{" "}
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "italic" }}>already knows</span>
          </h2>
          <p className="text-white/55 leading-[1.65] mb-10"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}>
            Most fleets are 30 days from their first structured crew handover and a crew that actually has time to do their job. Let's show you how it works on your vessel type.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <a href="#" className="bg-white text-[#0e2626] px-7 py-3 hover:bg-[#f3f2ee] transition-colors duration-150 inline-flex items-center gap-2"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}>
              Request a demo
              <ArrowUpRight size={15} />
            </a>
            <a href="#" className="text-white/60 border border-white/20 px-7 py-3 hover:border-white/40 hover:text-white/90 transition-colors duration-150"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
              Talk to a specialist
            </a>
          </div>
          <p className="text-white/30 font-mono text-[11px]">
            No commitment · Live on 200+ vessels · ABS, Liberia, Bahamas, Malta, Singapore
          </p>
        </motion.div>
      </Wrap>
    </Section>
  );
}

// ── Wayship Footer ───────────────────────────────────────────────────────
function WayshipFooter() {
  return (
    <footer className="bg-[#0e2626] border-t border-white/8">
      <Wrap>
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <VolteoLogo color="#f3f2ee" className="opacity-70" />
          </div>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Security", "Contact"].map((l) => (
              <a key={l} href="#" className="text-white/30 hover:text-white/60 transition-colors duration-150"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 12 }}>{l}</a>
            ))}
          </div>
          <p className="text-white/20 font-mono text-[11px]">© 2025 Volteo Maritime</p>
        </div>
      </Wrap>
    </footer>
  );
}

// ── Main export ──────────────────────────────────────────────────────────
export function WayshipPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Wayship — Operational Intelligence for the Modern Fleet";
    return () => { document.title = "Volteo Home Page Design"; };
  }, []);

  return (
    <div className="bg-[#f3f2ee]">
      <WayshipNav />
      <WayshipHero />
      <ProblemSection />
      <VoiceSection />
      <ChatSection />
      <FeaturesSection />
      <ComplianceSection />
      <ROISection />
      <TestimonialSection />
      <DeployStrip />
      <WayshipCTA />
      <WayshipFooter />
    </div>
  );
}
