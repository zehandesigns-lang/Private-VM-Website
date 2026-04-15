import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContentDivider, SideRailOverlay } from "./RailDivider";
import { VolteoTextLink } from "./VolteoTextLink";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";
import imgEasternPacific from "@/assets/logos/eastern-pacific.png";
import imgTorm from "@/assets/logos/torm.png";
import imgCmaCgm from "@/assets/logos/cma-cgm.png";
import imgTk from "@/assets/logos/tk.png";
import imgUnionMarine from "@/assets/logos/union-marine.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import imgZamil from "@/assets/logos/zamil.png";
import imgMtm from "@/assets/logos/mtm.png";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** LT Cushion: light weight, upright (no italic) */
const lc: CSSProperties = {
  fontFamily: "'LT Cushion', serif",
  fontWeight: 300,
  fontStyle: "normal",
};

/** TT Hoves Pro Medium — paired with `lc` in section headlines */
const ttHovesMedium: CSSProperties = {
  fontFamily: "'TT Hoves Pro', sans-serif",
  fontWeight: 500,
  fontStyle: "normal",
};

/** Mixed TT Hoves + LT Cushion section headings */
const mixedHeadlineTracking: Pick<CSSProperties, "letterSpacing"> = {
  letterSpacing: "-0.03em",
};

/** TT Hoves for hero testimonial quote body */
const ttHovesQuote: CSSProperties = {
  fontFamily: "'TT Hoves Pro', sans-serif",
  fontWeight: 400,
  fontStyle: "normal",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

const LOGOS = [
  { src: imgEasternPacific, alt: "Eastern Pacific Shipping", maxH: "max-h-[44px] md:max-h-[52px]" },
  { src: imgTorm, alt: "TORM", maxH: "max-h-[40px] md:max-h-[48px]" },
  { src: imgTk, alt: "Teekay", maxH: "max-h-[44px] md:max-h-[52px]" },
  { src: imgWilhelmsen, alt: "Wilhelmsen", maxH: "max-h-[44px] md:max-h-[52px]" },
  { src: imgUnionMarine, alt: "Union Marine Management", maxH: "max-h-[44px] md:max-h-[52px]" },
  { src: imgZamil, alt: "Zamil Marine", maxH: "max-h-[44px] md:max-h-[52px]" },
  { src: imgCmaCgm, alt: "CMA CGM", maxH: "max-h-[40px] md:max-h-[48px]" },
  { src: imgMtm, alt: "MTM", maxH: "max-h-[44px] md:max-h-[52px]" },
] as const;

function TestimonialCard({
  quote,
  initials,
  name,
  placeholder,
  role,
}: {
  quote: string;
  initials: string;
  name: string;
  placeholder: boolean;
  role: string;
}) {
  return (
    <div className="relative border border-[#D9D9D9] bg-[#f3f2ee] p-6 md:p-7">
      <span
        className="absolute left-5 top-3 text-[48px] leading-none text-[#2f615a]/20"
        style={{ ...ttHovesQuote, fontWeight: 500 }}
        aria-hidden
      >
        &ldquo;
      </span>
      <p
        className="relative z-[1] pt-8 text-[#464646] leading-[1.65]"
        style={{ ...ttHovesQuote, fontSize: 15 }}
      >
        {quote}
      </p>
      <div className="mt-5 flex items-center gap-3 border-t border-[#D9D9D9] pt-4">
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#2f615a]/30 bg-[#2f615a]/10 text-[10px] text-[#0e3233]"
          style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
        >
          {initials}
        </div>
        <div>
          <p className="text-[#103435]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 13 }}>
            {name}
            {placeholder && (
              <span className="ml-1.5 font-mono text-[10px] text-[#615D5D]">· Placeholder</span>
            )}
          </p>
          <p className="text-[#615D5D] text-[11px] font-mono">{role}</p>
        </div>
      </div>
    </div>
  );
}

function StatCell({
  accent,
  children,
  delay,
}: {
  accent: string;
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      custom={delay}
      className="relative border border-[#D9D9D9] bg-[#f3f2ee] p-8 md:p-9 transition-colors hover:bg-[#ebe9e3]"
    >
      <div className="absolute left-0 right-0 top-0 h-0.5" style={{ background: accent }} />
      {children}
    </motion.div>
  );
}

function AdvantageTabs() {
  const [tab, setTab] = useState<"wayship" | "smartport">("wayship");

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 border border-[#D9D9D9] overflow-hidden">
        <button
          type="button"
          onClick={() => setTab("wayship")}
          className={`flex items-center justify-between gap-4 border-b border-[#D9D9D9] md:border-b-0 md:border-r px-6 py-5 md:py-6 text-left transition-colors ${
            tab === "wayship" ? "bg-[#e8e6e0]" : "bg-[#f3f2ee] hover:bg-[#ebe9e3]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#2f615a]/25 bg-[#2f615a]/10">
              <span className="text-[#0e3233] text-xs font-semibold">W</span>
            </div>
            <div className="min-w-0">
              <p className="text-[#103435] flex flex-wrap items-center gap-2" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 16 }}>
                Wayship
                <span className="inline-block bg-[#2f615a]/15 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#0e3233]">
                  NEW v6
                </span>
              </p>
              <p className="text-[#615D5D] text-[11px] font-mono mt-0.5">Crew operations & knowledge platform</p>
            </div>
          </div>
          <span className="text-[#615D5D] shrink-0">→</span>
        </button>
        <button
          type="button"
          onClick={() => setTab("smartport")}
          className={`flex items-center justify-between gap-4 px-6 py-5 md:py-6 text-left transition-colors ${
            tab === "smartport" ? "bg-[#e8e6e0]" : "bg-[#f3f2ee] hover:bg-[#ebe9e3]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#416668]/35 bg-[#416668]/12">
              <span className="text-[#0e3233] text-xs font-semibold">S</span>
            </div>
            <div className="min-w-0">
              <p className="text-[#103435]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 16 }}>
                Smartport
              </p>
              <p className="text-[#615D5D] text-[11px] font-mono mt-0.5">Port productivity & revenue platform</p>
            </div>
          </div>
          <span className="text-[#615D5D] shrink-0">→</span>
        </button>
      </div>

      {tab === "wayship" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-t-0 border-[#D9D9D9] overflow-hidden">
          <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] p-8 md:p-10 lg:p-12">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#2f615a]">
              <span className="h-1 w-1 shrink-0 bg-[#2f615a]" aria-hidden />
              All-new Wayship 6
            </p>
            <h3
              className="text-[#103435] leading-[1.15] mb-4"
              style={{ ...lc, fontSize: "clamp(22px, 2.5vw, 30px)" }}
            >
              The knowledge layer your fleet has always <em className="not-italic text-[#2f615a]">needed.</em>
            </h3>
            <p className="text-[#464646] leading-[1.75] mb-8" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>
              Maritime runs on institutional knowledge — and that knowledge walks off the gangway at every crew rotation. Wayship captures it, structures it, and makes it available to every officer who steps aboard, regardless of how many times they&apos;ve been on that vessel before.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Structured knowledge capture, vessel-specific SOPs and checklists",
                "Crew onboarding and competency tracking across rotation cycles",
                "Voice AI for hands-free entry — works fully offline at sea",
                "Fleet-level reporting and vessel-to-shore knowledge transfer",
                "ABS type approved · ISO 21745 certified · Works on any vessel type",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-[#464646] text-[13.5px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#2f615a]" />
                  {line}
                </li>
              ))}
            </ul>
            <VolteoTextLink href="/wayship">Learn more about Wayship</VolteoTextLink>
          </div>
          <div className="bg-[#ebe9e3] p-6 md:p-8">
            <div className="border border-[#D9D9D9] bg-[#f3f2ee] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] px-4 py-3 bg-[#f3f2ee]/80">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Fleet knowledge · Live</span>
                <span className="bg-[#2f615a]/15 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">347 online</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-px bg-[#D9D9D9] overflow-hidden">
                  {[
                    ["350+", "Vessels"],
                    ["48k", "Entries / mo"],
                    ["40h+", "Saved / wk"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-[#f3f2ee] p-3 text-center">
                      <div className="font-mono text-lg text-[#103435]">{v}</div>
                      <div className="font-mono text-[9px] uppercase text-[#615D5D]">{l}</div>
                    </div>
                  ))}
                </div>
                {[
                  ["Nordic Swan · Chief Engineer handover", "2h ago", "g"],
                  ["Torm Helene · Engine room SOP updated", "4h ago", "g"],
                  ["CMA Borealis · Crew checklist pending", "5h ago", "a"],
                  ["AE Resolute · Voice entry logged", "7h ago", "g"],
                ].map(([name, time, kind]) => (
                  <div key={name} className="flex justify-between gap-4 border-b border-[#E4E2DC] last:border-0 pb-2 last:pb-0 text-[12.5px]">
                    <span className="flex items-center gap-2 text-[#464646]">
                      <span className={`h-1.5 w-1.5 shrink-0 ${kind === "g" ? "bg-[#2f615a]" : "bg-[#ff9905]"}`} />
                      {name}
                    </span>
                    <span className="font-mono text-[10px] text-[#615D5D] shrink-0">{time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="border border-[#D9D9D9] p-4 bg-[#f3f2ee]">
                <div className="font-mono text-xl text-[#2f615a]">6 yrs</div>
                <div className="text-[11px] text-[#615D5D] mt-1 leading-snug">Deployment data no competitor can match</div>
              </div>
              <div className="border border-[#D9D9D9] p-4 bg-[#f3f2ee]">
                <div className="font-mono text-xl text-[#0e3233]">4 wks</div>
                <div className="text-[11px] text-[#615D5D] mt-1 leading-snug">Time to first vessel deployment</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "smartport" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-t-0 border-[#D9D9D9] overflow-hidden">
          <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] p-8 md:p-10 lg:p-12">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#416668]">
              <span className="h-1 w-1 shrink-0 bg-[#416668]" aria-hidden />
              Smartport
            </p>
            <h3
              className="text-[#103435] leading-[1.15] mb-4"
              style={{ ...lc, fontSize: "clamp(22px, 2.5vw, 30px)" }}
            >
              Turn every berth into a <em className="not-italic text-[#2f615a]">revenue opportunity.</em>
            </h3>
            <p className="text-[#464646] leading-[1.75] mb-8" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>
              Secondary and emerging ports handle the long tail of global shipping — but they&apos;ve always competed with one hand tied behind their back. Smartport gives them the planning tools, analytics, and operator-facing visibility to attract more vessel calls and turn berths into revenue.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Berth planning, vessel scheduling and conflict resolution",
                "Port call performance analytics and turnaround benchmarking",
                "Revenue optimisation tools and cargo allocation",
                "Operator-port communication and pre-arrival coordination",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-[#464646] text-[13.5px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#416668]" />
                  {line}
                </li>
              ))}
            </ul>
            <Link
              to="/smartport"
              className="inline-flex items-center gap-2 text-[#2f615a] font-medium border-b border-[#2f615a] pb-0.5 hover:opacity-70 transition-opacity"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 14 }}
            >
              Learn more about Smartport
              <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="bg-[#ebe9e3] p-6 md:p-8">
            <div className="border border-[#D9D9D9] bg-[#f3f2ee] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Port revenue dashboard</span>
                <span className="bg-[#2f615a]/15 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">Live</span>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-px bg-[#D9D9D9] overflow-hidden mb-4">
                  {[
                    ["$45m", "Revenue"],
                    ["15+", "Ports live"],
                    ["32%", "Turnaround ↑"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-[#f3f2ee] p-3 text-center">
                      <div className={`font-mono text-lg ${l === "Revenue" ? "text-[#2f615a]" : "text-[#103435]"}`}>{v}</div>
                      <div className="font-mono text-[9px] uppercase text-[#615D5D]">{l}</div>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D] mb-3">Incremental vessel calls · This quarter</p>
                {[
                  ["Jebel Ali", 88, "+44"],
                  ["Sohar", 70, "+36"],
                  ["Duqm", 53, "+27"],
                  ["Karachi", 36, "+19"],
                ].map(([name, w, val]) => (
                  <div key={name as string} className="flex items-center gap-2 py-1.5">
                    <span className="w-[72px] shrink-0 text-[11.5px] text-[#464646]">{name as string}</span>
                    <div className="flex-1 h-1.5 bg-[#D9D9D9]/80 overflow-hidden">
                      <div className="h-full bg-[#2f615a]" style={{ width: `${w}%` }} />
                    </div>
                    <span className="font-mono text-[10px] text-[#2f615a] w-8 text-right">{val as string}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 border border-[#416668]/25 p-4 bg-[#f3f2ee]">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[#416668] mb-2">Customer outcome</p>
              <p className="text-[#464646] text-[13.5px] leading-relaxed" style={{ ...lc, fontSize: 13.5 }}>
                &ldquo;Smartport gave our port a competitive edge we didn&apos;t expect from software. More vessel calls. Faster turnarounds.&rdquo;
              </p>
              <p className="font-mono text-[11px] text-[#615D5D] mt-3">[Port Director] · Placeholder</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeV2CTA() {
  return (
    <section id="cta" className="relative z-[70] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0e3233]" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 130% 70% at 50% -35%, rgba(252, 247, 227, 0.16), transparent 52%),
            radial-gradient(ellipse 55% 45% at 100% 105%, rgba(0, 0, 0, 0.45), transparent 50%),
            radial-gradient(ellipse 50% 40% at 0% 80%, rgba(65, 102, 104, 0.35), transparent 55%),
            linear-gradient(168deg, #0e3233 0%, #0b282a 42%, #0d2f30 100%)
          `,
        }}
      />
      <AnimatedDitherBackground className="pointer-events-none z-[1] opacity-[0.72]" ditherMix={0.34} />

      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-24 md:py-32">
        <motion.div
          className="max-w-[580px] mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-6 inline-flex items-center gap-2 border border-[#fcf7e3]/20 bg-[#fcf7e3]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#fcf7e3]/80">
            <span className="h-1.5 w-1.5 shrink-0 bg-[#fcf7e3]/90 animate-pulse" aria-hidden />
            Ready when you are
          </p>
          <h2
            className="text-[#fcf7e3] leading-[1.1] tracking-[-1.5px] mb-5"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw, 50px)",
              textShadow: "0 1px 24px rgba(0,0,0,0.25)",
            }}
          >
            The next six years start with{" "}
            <span style={lc}>your fleet.</span>
          </h2>
          <p
            className="text-[#f3f2ee]/80 leading-[1.65] mb-10"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Whether you operate 5 vessels or 500, Volteo Maritime has the platform to help your fleet run with more clarity, more confidence, and less friction.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              to="/book-demo"
              className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
            >
              Get a demo
              <ArrowUpRight size={15} />
            </Link>
            <a
              href="#"
              className="text-[#fcf7e3]/90 border border-[#fcf7e3]/25 px-7 py-3 hover:border-[#fcf7e3]/45 hover:bg-[#fcf7e3]/5 transition-colors duration-150"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
            >
              Talk to a specialist
            </a>
          </div>
          <p className="text-[#fcf7e3]/45 font-mono text-[11px]">
            No commitment · Live on 350+ vessels · ABS, Liberia, Bahamas, Malta, Singapore approved
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function HomePageV2() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.div className="relative min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: EASE }}>
      <div className="relative">
        <Header />
        <main className="pt-[72px]">
          {/* Hero */}
          <section id="hero" className="relative overflow-hidden">
            <SideRailOverlay className="z-[0]" />
            <div className="relative z-[1] mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-14 md:py-20 lg:py-24">
              <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-start">
                <div>
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="mb-6">
                    <div className="inline-flex flex-wrap items-center gap-2 border border-[#D9D9D9] bg-[#f3f2ee] px-3 py-2">
                      <span className="h-1.5 w-1.5 shrink-0 bg-[#2f615a] animate-pulse" aria-hidden />
                      <VolteoTextLink href="https://www.singaporemaritimeweek.com/">
                        Join the #NoPaperForWork movement at SMW 2026
                      </VolteoTextLink>
                    </div>
                  </motion.div>
                  <motion.h1
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                    className="text-[#103435] leading-[1.05] tracking-[-1px] mb-6"
                    style={{ fontSize: "clamp(36px, 4.5vw, 56px)" }}
                  >
                    <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                      Celebrating 6 years of
                      <br />
                    </span>
                    <span style={lc} className="text-[#2f615a]">
                      reimagining maritime.
                    </span>
                  </motion.h1>
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.15}
                    className="text-[#464646] max-w-[440px] leading-[1.8] mb-8"
                    style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 16 }}
                  >
                    We started with a single question — why does maritime software treat seafarers as data-entry operators? Six years on, the answer is still driving us forward.
                  </motion.p>
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="flex flex-wrap gap-3">
                    <a
                      href="#rewind"
                      className="inline-flex items-center gap-2 bg-[#0e3233] text-white px-6 py-3 hover:bg-[#416668] transition-colors"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
                    >
                      Our story →
                    </a>
                    <a
                      href="#advantage"
                      className="inline-flex items-center border border-[#D9D9D9] text-[#464646] px-6 py-3 hover:border-[#0e3233]/30 transition-colors"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
                    >
                      Explore products
                    </a>
                  </motion.div>
                </div>
                <div className="flex flex-col gap-4">
                  <TestimonialCard
                    quote="Wayship has fundamentally changed how we transfer knowledge at sea. What used to walk off the gangway with every crew rotation now stays on the ship — and compounds over time."
                    initials="NG"
                    name="Nabo Ghosh"
                    placeholder
                    role="Eastern Pacific Shipping"
                  />
                  <TestimonialCard
                    quote={`We went from three days of vessel handover to half a day. On tankers where an hour matters, that's not a feature — that's how you keep crew focused on what actually matters.`}
                    initials="AS"
                    name="Adam Smith"
                    placeholder
                    role="Teekay"
                  />
                </div>
              </div>
            </div>
          </section>

          <ContentDivider />

          <div className="relative">
            <SideRailOverlay />

          {/* Quick rewind */}
          <section id="rewind" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-12 md:mb-16 items-end">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#615D5D] mb-3">Quick rewind</span>
                  <h2
                    className="text-[#103435] leading-[1.13]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 40px)", ...mixedHeadlineTracking }}
                  >
                    <span style={ttHovesMedium}>Here&apos;s a peek into what our last </span>
                    <span style={lc}>six years were like.</span>
                  </h2>
                </div>
                <p className="text-[#464646] leading-[1.8]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                  From a founding thesis to $145m+ in documented value created — across crew operations, port productivity, and six years of deployment data that no competitor can replicate.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#D9D9D9] border border-[#D9D9D9] overflow-hidden">
                <StatCell accent="#0e3233" delay={0.05}>
                  <div
                    className="text-[#103435] leading-none mb-3"
                    style={{ ...lc, fontSize: "clamp(40px, 4vw, 52px)" }}
                  >
                    350+
                  </div>
                  <p className="text-[#464646] text-[13px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    Vessels rely on Wayship every single day
                  </p>
                  <p className="mt-2 font-mono text-[10.5px] text-[#615D5D] flex items-center gap-1">
                    <span className="text-[#2f615a]">↑</span> 600+ strong by Q4 2026
                  </p>
                </StatCell>
                <StatCell accent="#416668" delay={0.1}>
                  <div
                    className="text-[#103435] leading-none mb-3"
                    style={{ ...lc, fontSize: "clamp(40px, 4vw, 52px)" }}
                  >
                    $30b+
                  </div>
                  <p className="text-[#464646] text-[13px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    In maritime assets managed across our customer fleet
                  </p>
                </StatCell>
                <StatCell accent="#2f615a" delay={0.15}>
                  <div
                    className="text-[#103435] leading-none mb-3"
                    style={{ ...lc, fontSize: "clamp(40px, 4vw, 52px)" }}
                  >
                    $100m+
                  </div>
                  <p className="text-[#464646] text-[13px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    Of productivity unlocked by Wayship, bringing focus back to core operations
                  </p>
                </StatCell>
                <StatCell accent="#2f615a" delay={0.2}>
                  <div
                    className="text-[#103435] leading-none mb-3"
                    style={{ ...lc, fontSize: "clamp(40px, 4vw, 52px)" }}
                  >
                    $45m+
                  </div>
                  <p className="text-[#464646] text-[13px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    Of additional revenue generated for specialised secondary ports via Smartport
                  </p>
                </StatCell>
              </div>
            </div>
          </section>

          <ContentDivider />

          {/* Wall of love */}
          <section id="customers" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
              <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#615D5D] mb-3">Wall of love</span>
                <h2
                  className="text-[#103435] leading-tight mb-4"
                  style={{ fontSize: "clamp(26px, 3vw, 38px)", ...mixedHeadlineTracking }}
                >
                  <span style={ttHovesMedium}>Customers who trusted us to help </span>
                  <span style={lc}>transform their operations.</span>
                </h2>
                <p className="text-[#464646] leading-[1.8]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                  Eight world-class operators and port authorities — from the Gulf to the North Atlantic.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-[960px] mx-auto overflow-hidden border border-[#D9D9D9] bg-[#D9D9D9]">
                {LOGOS.map((logo) => (
                  <div
                    key={logo.alt}
                    className="flex min-h-[100px] md:min-h-[120px] items-center justify-center bg-[#f3f2ee] p-6"
                  >
                    <img src={logo.src} alt={logo.alt} className={`w-auto object-contain opacity-90 grayscale ${logo.maxH}`} />
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-8 border-t border-[#D9D9D9] max-w-[960px] mx-auto">
                <p className="text-center md:text-left text-[#464646] text-[15px] max-w-md" style={{ ...lc, fontSize: 15 }}>
                  Type &amp; class approved — proof that maritime&apos;s most rigorous institutions trust us at sea
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["ABS Type Approved", "ISO 21745 Certified", "5 Flag States", "MARPOL Compliant", "Works offline at sea"].map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 border border-[#D9D9D9] bg-[#f3f2ee] px-2.5 py-1 font-mono text-[10px] text-[#464646]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <ContentDivider />

          {/* Advantage */}
          <section id="advantage" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
              <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#615D5D] mb-3">The Volteo advantage</span>
              <h2
                className="text-[#103435] mb-3"
                style={{ fontSize: "clamp(28px, 3.2vw, 40px)", ...mixedHeadlineTracking }}
              >
                <span style={ttHovesMedium}>Two platforms. </span>
                <span style={lc}>One mission.</span>
              </h2>
              <p className="text-[#464646] max-w-xl mb-12 leading-[1.8]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 15 }}>
                Give maritime operators and port authorities the clarity to make better decisions, faster.
              </p>
              <AdvantageTabs />
            </div>
          </section>

          <ContentDivider />

          {/* Resources */}
          <section id="insights" className="relative py-20 md:py-28">
            <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[#615D5D] mb-3">Resources</span>
                  <h2
                    className="text-[#103435]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 40px)", ...mixedHeadlineTracking }}
                  >
                    <span style={ttHovesMedium}>From the </span>
                    <span style={lc}>Volteo desk.</span>
                  </h2>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#2f615a] shrink-0 hover:gap-2 transition-all text-[13px] font-medium"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}
                >
                  See all resources →
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <article className="border border-[#D9D9D9] bg-[#f3f2ee] overflow-hidden flex flex-col hover:border-[#0e3233]/25 transition-colors">
                  <div className="h-1 bg-[#0e3233]" />
                  <div className="p-7 flex flex-col flex-1">
                    <span className="inline-block w-fit border border-[#D9D9D9] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#2f615a] mb-4">
                      Insight
                    </span>
                    <h3 className="text-[#103435] text-xl mb-3 leading-snug" style={lc}>
                      Why crew knowledge walks off the gangway — and what to do about it
                    </h3>
                    <p className="text-[#464646] text-[13.5px] leading-relaxed flex-1 mb-6" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                      Every crew rotation resets vessel-specific memory to zero. Here&apos;s how structured knowledge capture changes that equation — and what six years of deployment data shows about where the knowledge gaps actually are.
                    </p>
                    <div className="flex items-center justify-between border-t border-[#D9D9D9] pt-4">
                      <span className="font-mono text-[11px] text-[#615D5D]">Wayship Research · Oct 2025</span>
                      <a href="#" className="text-[#2f615a] text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                        Read →
                      </a>
                    </div>
                  </div>
                </article>
                <article className="border border-[#D9D9D9] bg-[#f3f2ee] overflow-hidden flex flex-col hover:border-[#2f615a]/35 transition-colors">
                  <div className="h-1 bg-[#2f615a]" />
                  <div className="p-7 flex flex-col flex-1">
                    <span className="inline-block w-fit border border-[#2f615a]/25 bg-[#2f615a]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-[#0e3233] mb-4">
                      Customer Story
                    </span>
                    <h3 className="text-[#103435] text-xl mb-3 leading-snug" style={lc}>
                      How Teekay reduced vessel handover from three days to half a day
                    </h3>
                    <p className="text-[#464646] text-[13.5px] leading-relaxed flex-1 mb-6" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                      When experienced crew rotate off, they take hard-won vessel knowledge with them. Teekay&apos;s team explains how Wayship changed that — and what it means for the safety culture on board.
                    </p>
                    <div className="flex items-center justify-between border-t border-[#D9D9D9] pt-4">
                      <span className="font-mono text-[11px] text-[#615D5D]">Teekay Corporation · Sep 2025</span>
                      <a href="#" className="text-[#2f615a] text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">
                        Read →
                      </a>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>
          </div>
        </main>
      </div>

      <HomeV2CTA />

      <div className="relative">
        <SideRailOverlay />
        <Footer />
      </div>
    </motion.div>
  );
}
