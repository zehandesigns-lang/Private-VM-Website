import { useEffect, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContentDivider, SideRailOverlay } from "./RailDivider";
import { CustomerLogoTicker } from "./CustomerLogoTicker";
import { VolteoTextLink } from "./VolteoTextLink";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";
import imgEasternPacific from "@/assets/logos/eastern-pacific.png";
import imgUmms from "@/assets/logos/umms.png";
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: d, ease: EASE },
  }),
};

// fleet: "full" | "partial" — controls the on-hover label per Venkata's review.
// NOTE: Best-guess Full/Partial split below — please verify against Figma comment markers.
const LOGOS = [
  { src: imgEasternPacific, alt: "Eastern Pacific Shipping", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "full" },
  { src: imgUmms, alt: "UMMS", maxH: "max-h-[40px] md:max-h-[48px]", fleet: "full" },
  { src: imgTk, alt: "Teekay", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "full" },
  { src: imgWilhelmsen, alt: "Wilhelmsen", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "full" },
  { src: imgUnionMarine, alt: "Union Marine Management", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "partial" },
  { src: imgZamil, alt: "Zamil Marine", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "partial" },
  { src: imgCmaCgm, alt: "CMA CGM", maxH: "max-h-[40px] md:max-h-[48px]", fleet: "partial" },
  { src: imgMtm, alt: "MTM", maxH: "max-h-[44px] md:max-h-[52px]", fleet: "partial" },
] as const;

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
      {/* Tab bar — sticky at top of viewport */}
      <div className="sticky top-0 z-40 grid grid-cols-2 border border-[#D9D9D9] overflow-hidden">
        <button
          type="button"
          onClick={() => setTab("wayship")}
          className={`relative flex items-center justify-between gap-4 border-r border-[#D9D9D9] px-5 py-5 text-left transition-colors ${
            tab === "wayship" ? "bg-[#e8e6e0]" : "bg-[#f3f2ee] hover:bg-[#ebe9e3]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#2f615a]/25 bg-[#2f615a]/10">
              <span className="text-[#0e3233] text-xs font-semibold">W</span>
            </div>
            <div className="min-w-0">
              <p className="text-[#103435] flex flex-wrap items-center gap-2" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: tab === "wayship" ? 500 : 400, fontSize: 15 }}>
                Wayship
                <span className="inline-block bg-[#2f615a]/15 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-[#0e3233]">
                  All-New
                </span>
              </p>
              <p className="text-[#615D5D] text-[11px] font-mono mt-0.5 hidden sm:block">Vessel operations platform</p>
            </div>
          </div>
          <span className="text-[#615D5D] shrink-0">→</span>
          {tab === "wayship" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#103435]" />}
        </button>
        <button
          type="button"
          onClick={() => setTab("smartport")}
          className={`relative flex items-center justify-between gap-4 px-5 py-5 text-left transition-colors ${
            tab === "smartport" ? "bg-[#e8e6e0]" : "bg-[#f3f2ee] hover:bg-[#ebe9e3]"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#416668]/35 bg-[#416668]/12">
              <span className="text-[#0e3233] text-xs font-semibold">S</span>
            </div>
            <div className="min-w-0">
              <p className="text-[#103435]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: tab === "smartport" ? 500 : 400, fontSize: 15 }}>
                Smartport
              </p>
              <p className="text-[#615D5D] text-[11px] font-mono mt-0.5 hidden sm:block">Port productivity suite</p>
            </div>
          </div>
          <span className="text-[#615D5D] shrink-0">→</span>
          {tab === "smartport" && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#103435]" />}
        </button>
      </div>

      {/* Wayship content */}
      <div className={tab !== "wayship" ? "hidden" : ""}>
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-2 border border-t-0 border-[#D9D9D9] overflow-hidden">
          <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] p-8 md:p-10 lg:p-12">
            <h3
              className="text-[#103435] leading-[1.15] mb-4"
              style={{ ...lc, fontSize: "clamp(22px, 2.5vw, 30px)" }}
            >
              The operational intelligence layer your fleet always needed
            </h3>
            <p className="text-[#464646] leading-[1.75] mb-8" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>
              Maritime runs on institutional knowledge — and that knowledge walks off the gangway with every crew rotation. Wayship captures it, structures it, and makes it available to every officer and engineer who steps aboard, helping them get up to speed quickly, regardless of how many times they&apos;ve sailed on the vessel before.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Voice-to-action for hands-free knowledge capture — works fully offline.",
                "AI assistant that surfaces insights from historical vessel data, on demand.",
                "Full suite of digital records across deck and engine operations — with automatic validation, offline capability, and real-time sync when connected.",
                "Unified dashboard across every vessel — consolidating operational records, compliance status, and crew performance into clear, actionable fleet-level reporting for shore teams.",
              ].map((line) => (
                <li key={line} className="flex gap-2 text-[#464646] text-[13.5px] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#2f615a]" />
                  {line}
                </li>
              ))}
            </ul>
            <VolteoTextLink href="/wayship">Learn more about Wayship</VolteoTextLink>
          </div>
          <div className="bg-[#ebe9e3] p-6 md:p-8 flex items-center justify-center">
            <div className="border border-[#D9D9D9] bg-[#f3f2ee] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] px-4 py-3 bg-[#f3f2ee]/80">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Fleet knowledge · Live</span>
                <span className="bg-[#2f615a]/15 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">347 online</span>
              </div>
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-3 gap-px bg-[#D9D9D9] overflow-hidden">
                  {[
                    ["350+", "Vessels"],
                    ["150M+", "Entries"],
                    ["$100M+", "of productivity unlocked"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-[#f3f2ee] p-3 text-center">
                      <div className="font-mono text-lg text-[#103435]">{v}</div>
                      <div className="font-mono text-[9px] uppercase text-[#615D5D]">{l}</div>
                    </div>
                  ))}
                </div>
                {[
                  ["CMA CGM Harmony · Chief Engineer handover", "2h ago", "g"],
                  ["Olympic Bay · Engine room SOP updated", "4h ago", "g"],
                  ["Atlantic Pearl · Crew checklist pending", "5h ago", "a"],
                  ["CMA CGM Bali · Voice entry logged", "7h ago", "g"],
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
          </div>
        </div>
      </div>

      {/* Smartport content */}
      <div className={tab !== "smartport" ? "hidden" : ""}>
        <div className="grid grid-cols-1 items-stretch lg:grid-cols-2 border border-t-0 border-[#D9D9D9] overflow-hidden">
          <div className="border-b lg:border-b-0 lg:border-r border-[#D9D9D9] p-8 md:p-10 lg:p-12">
            <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[#416668]">
              <span className="h-1 w-1 shrink-0 bg-[#416668]" aria-hidden />
              Smartport
            </p>
            <h3
              className="text-[#103435] leading-[1.15] mb-4"
              style={{ ...lc, fontSize: "clamp(22px, 2.5vw, 30px)" }}
            >
              When operations run on paper, inefficiency compounds with every vessel call.{" "}
              <em className="not-italic text-[#2f615a]">Smartport is here to fix that.</em>
            </h3>
            <p className="text-[#464646] leading-[1.75] mb-8" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}>
              Secondary and emerging ports handle the long tail of global shipping — but they&apos;ve always competed with one hand tied behind their back. Smartport gives them the planning tools, analytics, and operator-facing visibility to attract more vessel calls and turn berths into revenue.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                "Vessel traffic management that keeps anchorages, arrivals and departures organised — before congestion builds.",
                "End-to-end cargo tracking from pre-arrival to departure",
                "Resource allocation tools that match port assets to vessel calls — dynamically, not on a spreadsheet.",
                "Real-time analytics and reporting across all port operations — surfacing inefficiencies, turnaround trends, and revenue performance in one dashboard.",
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
          <div className="flex h-full min-h-[420px] w-full items-center justify-center bg-[#ebe9e3] p-6 md:p-8 lg:min-h-0 lg:py-10">
            <div className="flex w-full max-w-[560px] min-h-[min(520px,72vh)] flex-col border border-[#D9D9D9] bg-[#f3f2ee] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
              <div className="flex shrink-0 items-center justify-between border-b border-[#D9D9D9] px-4 py-3.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Port revenue dashboard</span>
                <span className="bg-[#2f615a]/15 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">Live</span>
              </div>
              <div className="flex min-h-0 flex-1 flex-col p-5 md:p-6">
                <div className="mb-5 grid grid-cols-2 gap-px overflow-hidden bg-[#D9D9D9]">
                  {[
                    ["$45m", "Revenue"],
                    ["35%", "Productivity gains"],
                  ].map(([v, l]) => (
                    <div key={l} className="bg-[#f3f2ee] px-3 py-4 text-center">
                      <div className={`font-mono text-xl ${l === "Revenue" ? "text-[#2f615a]" : "text-[#103435]"}`}>{v}</div>
                      <div className="font-mono text-[9px] uppercase text-[#615D5D]">{l}</div>
                    </div>
                  ))}
                </div>
                <p className="mb-3 shrink-0 font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Port call pipeline · Live</p>
                <div className="-mx-1 min-h-0 flex-1 overflow-x-auto pb-1">
                  <div className="flex h-full min-h-[260px] items-stretch gap-2 min-w-[min(100%,520px)]">
                    {(
                      [
                        { title: "Pre-arrival", vessels: ["CMA CGM Harmony"] as const },
                        { title: "Arrival", vessels: ["Olympic Bay"] as const },
                        { title: "Operational", vessels: ["Atlantic Pearl"] as const },
                        { title: "Departure", vessels: ["CMA CGM Bali"] as const },
                        { title: "Post-Departure", vessels: [] as const },
                      ] as const
                    ).map((col) => (
                      <div
                        key={col.title}
                        className="flex h-full min-h-[260px] min-w-[92px] flex-1 flex-col rounded-sm border border-[#D9D9D9] bg-[#ebe9e3]/60"
                      >
                        <div className="shrink-0 border-b border-[#D9D9D9] px-1.5 py-2">
                          <p
                            className="text-[#615D5D] leading-tight"
                            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600, fontSize: 8, letterSpacing: "0.04em" }}
                          >
                            {col.title}
                          </p>
                        </div>
                        <div className="flex min-h-0 flex-1 flex-col gap-1.5 p-1.5">
                          {col.vessels.length === 0 ? (
                            <div
                              className="min-h-[72px] flex-1 rounded-sm border border-dashed border-[#D9D9D9]/80 bg-[#f3f2ee]/40"
                              aria-hidden
                            />
                          ) : (
                            col.vessels.map((v) => (
                              <div
                                key={v}
                                className="rounded-sm border border-[#D9D9D9] bg-[#f3f2ee] px-1.5 py-2 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
                              >
                                <p
                                  className="text-[#103435] leading-snug"
                                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 9.5 }}
                                >
                                  {v}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <span style={lc}>your fleet</span>
          </h2>
          <p
            className="text-[#f3f2ee]/80 leading-[1.65] mb-10"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Whether you operate 5 vessels or 500, most fleets are less than 4 weeks from their first deployment — and a fundamentally better way of vessel operations.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <Link
              to="/book-demo"
              className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
            >
              Get a Demo
              <ArrowUpRight size={15} />
            </Link>
          </div>
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
          {/* Hero — same dither + radial stack as bottom CTA, inverted (cream) foreground */}
          <section id="hero" className="relative z-0 w-full overflow-hidden">
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

            <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-24 md:py-28 lg:py-32">
              <div className="flex flex-col items-center text-center">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05} className="mb-6">
                  <div className="inline-flex flex-wrap items-center justify-center gap-2 border border-[#fcf7e3]/20 bg-[#fcf7e3]/10 px-3 py-2">
                    <span className="h-1.5 w-1.5 shrink-0 bg-[#fcf7e3]/90 animate-pulse" aria-hidden />
                    <VolteoTextLink
                      href="/event-monitor"
                      className="!border-[#fcf7e3]/45 !text-[#fcf7e3] hover:!opacity-80"
                    >
                      Meet us at Booth S05, Singapore Maritime Week 2026
                    </VolteoTextLink>
                  </div>
                </motion.div>
                <motion.h1
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.1}
                  className="text-[#fcf7e3] leading-[1.05] tracking-[-1px] mb-6"
                  style={{
                    fontSize: "clamp(36px, 4.5vw, 56px)",
                    textShadow: "0 1px 24px rgba(0,0,0,0.25)",
                  }}
                >
                  <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                    Celebrating 6 years of
                    <br />
                  </span>
                  <span style={lc} className="text-[#d8ebe8]">
                    reimagining maritime
                  </span>
                </motion.h1>
                <motion.p
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  custom={0.15}
                  className="text-[#f3f2ee]/80 max-w-[440px] mx-auto leading-[1.8] mb-8"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 16 }}
                >
                  World's leading maritime teams rely on Wayship to transform vessel operations data into structured, searchable intelligence, and Smartport to run secondary ports at their fullest potential
                </motion.p>
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.2} className="flex flex-wrap gap-3 justify-center">
                  <a
                    href="#rewind"
                    className="inline-flex items-center gap-2 bg-[#fcf7e3] text-[#0e3233] px-6 py-3 hover:bg-white transition-colors duration-150 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
                  >
                    Our story →
                  </a>
                  <a
                    href="#advantage"
                    className="inline-flex items-center border border-[#fcf7e3]/25 text-[#fcf7e3]/90 px-6 py-3 hover:border-[#fcf7e3]/45 hover:bg-[#fcf7e3]/5 transition-colors duration-150"
                    style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
                  >
                    Explore products
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          <CustomerLogoTicker variant="light" />

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
                    <span style={lc}>six years were like</span>
                  </h2>
                </div>
                <p className="text-[#464646] leading-[1.8]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                  From a hypothesis to $145m+ in value created — across vessel operations, crew performance, and port productivity.
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
                    vessels rely on Wayship every single day
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-[#0e3233] bg-[#e7efe8] border border-[#2f615a]/25 px-2 py-1 rounded-full w-fit">
                    <span className="text-[#2f615a]" aria-hidden>
                      ↑
                    </span>
                    <span>600+ strong by Q4 2026</span>
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
                    in maritime assets managed across our customer fleet
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
                    of productivity unlocked by Wayship, bringing focus back to core operations
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
                    of additional revenue generated for specialised secondary ports via Smartport
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
                  <span style={lc}>transform their operations</span>
                </h2>
                <p className="text-[#464646] leading-[1.8]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}>
                  Eight world-class operators — from Asia Pacific to Europe
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px max-w-[960px] mx-auto overflow-hidden border border-[#D9D9D9] bg-[#D9D9D9]">
                {LOGOS.map((logo) => (
                  <div
                    key={logo.alt}
                    className="group relative flex min-h-[100px] md:min-h-[120px] items-center justify-center bg-[#f3f2ee] p-6"
                  >
                    <img
                      src={logo.src}
                      alt={logo.alt}
                      className={`w-auto object-contain opacity-90 grayscale ${logo.maxH} transition-opacity duration-200 group-hover:opacity-0`}
                    />
                    <span
                      className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.12em] text-[#103435] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      {logo.fleet === "full" ? "Full fleet" : "Partial fleet"}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 pt-8 border-t border-[#D9D9D9] max-w-[960px] mx-auto">
                <p className="text-center md:text-left text-[#464646] text-[15px] max-w-md" style={{ ...lc, fontSize: 15 }}>
                  Approved by major flag states and leading classification bodies
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["ISO 21745", "MEPC 312 (74)", "Works offline at sea"].map((t) => (
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
                <span style={lc}>Sea and shore.</span>
              </h2>
              <AdvantageTabs />
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
