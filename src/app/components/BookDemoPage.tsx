import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";
import { RailDivider, SideRailOverlay } from "./RailDivider";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "./ui/utils";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const tt = { fontFamily: "'TT Hoves Pro', sans-serif" } as const;
const lc = { fontFamily: "'LT Cushion', serif", fontWeight: 300 as const };

const CTA_RADIAL_STACK = `
  radial-gradient(ellipse 130% 70% at 50% -35%, rgba(252, 247, 227, 0.16), transparent 52%),
  radial-gradient(ellipse 55% 45% at 100% 105%, rgba(0, 0, 0, 0.45), transparent 50%),
  radial-gradient(ellipse 50% 40% at 0% 80%, rgba(65, 102, 104, 0.35), transparent 55%),
  linear-gradient(168deg, #0e3233 0%, #0b282a 42%, #0d2f30 100%)
`;

/** Native selects: same radius + surface as `Input` (rounded-md, design tokens). */
const selectLightClassName = cn(
  "flex h-9 w-full rounded-md border border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] pl-3 pr-9 py-1 text-sm text-[#262627] outline-none transition-[color,box-shadow]",
  "focus-visible:border-[#0e3233]/35 focus-visible:ring-[3px] focus-visible:ring-[#0e3233]/12",
  "appearance-none cursor-pointer bg-[length:11px_7px] bg-[right_12px_center] bg-no-repeat disabled:opacity-50"
);

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] ${className}`}>{children}</div>;
}

export function BookDemoPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const [interest, setInterest] = useState<"wayship" | "smartport">("wayship");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [first, setFirst] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const f = first.trim();
    const em = email.trim();
    if (!f) return;
    if (!em || !em.includes("@")) return;
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 750);
  };

  return (
    <div className="relative min-h-screen bg-[#0e3233]">
      <Header />

      {/* Hero + form */}
      <section id="form" className="relative overflow-hidden pt-[72px] pb-20 md:pb-28 border-b border-[#fcf7e3]/10">
        <div className="absolute inset-0 bg-[#0e3233]" aria-hidden />
        <div className="absolute inset-0" aria-hidden style={{ background: CTA_RADIAL_STACK }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          aria-hidden
          style={{
            backgroundImage: `
              linear-gradient(rgba(65, 102, 104, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(65, 102, 104, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <AnimatedDitherBackground className="pointer-events-none z-[1] opacity-[0.55]" ditherMix={0.32} />

        <Wrap className="relative z-10 pt-12 md:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 xl:gap-20 items-start">
            <div>
              <p
                className="inline-flex items-center gap-2 border border-[#fcf7e3]/20 bg-[#fcf7e3]/10 px-3 py-1.5 mb-8 font-mono text-[10px] uppercase tracking-[0.08em] text-[#fcf7e3]/85"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#5aa89e] animate-pulse" aria-hidden />
                Request a demo
              </p>
              <h1
                className="text-[#fcf7e3] leading-[1.05] tracking-[-2px] mb-6"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", ...tt, fontWeight: 500 }}
              >
                Your fleet.
                <br />
                Your port.
                <br />
                <span style={lc} className="text-[#fcf7e3]">
                  See what the right platform does for both.
                </span>
              </h1>
              <p
                className="text-[#f3f2ee]/80 leading-[1.75] max-w-[440px] mb-8"
                style={{ ...tt, fontWeight: 400, fontSize: "clamp(15px, 1.1vw, 17px)" }}
              >
                Wayship captures operational knowledge across 200+ vessels. Smartport gives secondary ports the digital infrastructure major terminals take for granted. A 30-minute demo covers both — tailored to your operation.
              </p>
              <div className="flex flex-wrap items-center gap-x-0 gap-y-2 mb-10 font-mono text-[11px] text-[#fcf7e3]/45">
                {["200+ vessels live", "Ports on Smartport", "Production-proven", "Trusted approvals"].map((t, i) => (
                  <span key={t} className="flex items-center">
                    {i > 0 ? <span className="mx-3 hidden sm:inline text-[#fcf7e3]/15">|</span> : null}
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-[#fcf7e3]/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#fcf7e3]/35 shrink-0">Trusted by</span>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#fcf7e3]/55" style={{ ...tt, fontWeight: 500 }}>
                  {["Teekay", "TORM", "Anglo-Eastern", "CMA CGM"].map((name, i, a) => (
                    <span key={name} className="flex items-center gap-2">
                      {name}
                      {i < a.length - 1 ? <span className="text-[#fcf7e3]/20">·</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#D9D9D9] bg-white overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] bg-[#f3f2ee] px-5 py-3.5">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#615D5D]">
                  Request a demo · Volteo Maritime
                </span>
              </div>

              {!submitted ? (
                <form onSubmit={onSubmit} className="p-6 md:p-7 space-y-3 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">First name</span>
                      <Input
                        value={first}
                        onChange={(e) => setFirst(e.target.value)}
                        className="h-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm"
                        style={{ ...tt, fontWeight: 400 }}
                        placeholder="First name"
                        autoComplete="given-name"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Last name</span>
                      <Input
                        className="h-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm"
                        style={{ ...tt, fontWeight: 400 }}
                        placeholder="Last name"
                        autoComplete="family-name"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Work email</span>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm"
                      style={{ ...tt, fontWeight: 400 }}
                      placeholder="you@company.com"
                      autoComplete="email"
                    />
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Company</span>
                      <Input
                        className="h-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm"
                        style={{ ...tt, fontWeight: 400 }}
                        placeholder="Company"
                        autoComplete="organization"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Fleet size</span>
                      <select
                        className={selectLightClassName}
                        style={{
                          ...tt,
                          fontWeight: 400,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='rgba(38,38,38,0.45)' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        }}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select range
                        </option>
                        <option>0 – 10 vessels</option>
                        <option>11 – 50 vessels</option>
                        <option>51 – 100 vessels</option>
                        <option>100+ vessels</option>
                      </select>
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Your role</span>
                    <select
                      className={selectLightClassName}
                      style={{
                        ...tt,
                        fontWeight: 400,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='rgba(38,38,38,0.45)' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      }}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option>Fleet Manager</option>
                      <option>Technical Superintendent</option>
                      <option>Operations Manager</option>
                      <option>Chartering Manager</option>
                      <option>Head of Technology / CTO</option>
                      <option>CEO / Owner / Principal</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D] block mb-2">I want to see</span>
                    <div className="flex flex-wrap gap-2">
                      {(
                        [
                          ["wayship", "Wayship"],
                          ["smartport", "Smartport"],
                        ] as const
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setInterest(key)}
                          className={cn(
                            "rounded-md border px-3.5 py-2 font-mono text-[11px] tracking-[0.04em] transition-colors",
                            interest === key
                              ? "border-[#2f615a] bg-[#2f615a]/10 text-[#0e3233]"
                              : "border-[#D9D9D9] bg-[#f3f2ee] text-[#615D5D] hover:border-[#0e3233]/25 hover:text-[#262627]"
                          )}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex flex-col gap-1.5 pt-2 border-t border-[#D9D9D9]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">
                      Anything specific you&apos;d like to explore?{" "}
                      <span className="text-[#A8A8A8] normal-case">optional</span>
                    </span>
                    <Textarea
                      rows={3}
                      className="min-h-[72px] rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm leading-relaxed"
                      style={{ ...tt, fontWeight: 400 }}
                      placeholder="e.g. crew handovers, port revenue capture, compliance workflows…"
                    />
                  </label>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-auto rounded-md bg-[#0e3233] py-3 text-[15px] font-medium text-white shadow-none hover:bg-[#416668] disabled:opacity-70"
                    style={{ ...tt, fontWeight: 500 }}
                  >
                    {loading ? "Submitting…" : "Request a demo"}
                    {!loading ? <ArrowUpRight size={16} className="opacity-90" /> : null}
                  </Button>
                  <p className="font-mono text-[10px] text-center text-[#717182] tracking-[0.03em] pt-1">
                    We&apos;ll only use your details to schedule your session.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="px-6 py-14 md:py-16 text-center flex flex-col items-center gap-4 bg-white"
                >
                  <div className="w-[52px] h-[52px] rounded-full border border-[#2f615a]/30 bg-[#2f615a]/10 flex items-center justify-center">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
                      <path
                        d="M4.5 11.5 L9 16 L17.5 7"
                        stroke="#2f615a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h2 className="text-[#103435] text-[22px] md:text-[24px] leading-tight" style={{ ...lc }}>
                    You&apos;re booked in.
                  </h2>
                  <p className="text-[#464646] text-[14px] leading-[1.7] max-w-[280px]" style={{ ...tt, fontWeight: 400 }}>
                    Someone from the Volteo team will reach out within one business day to confirm your slot and tailor the session to your fleet.
                  </p>
                  <p className="font-mono text-[10px] text-[#615D5D] mt-1">
                    Scroll down to explore Wayship and Smartport.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </Wrap>
      </section>

      <div className="relative">
        <SideRailOverlay />

      {/* Platforms */}
      <section id="products" className="relative bg-[#f3f2ee] py-20 md:py-28 border-b border-[#D9D9D9]">
        <Wrap>
          <p
            className="text-[#464646] uppercase tracking-[0.12em] mb-4"
            style={{ ...tt, fontWeight: 500, fontSize: 11 }}
          >
            Our platforms
          </p>
          <h2
            className="text-[#103435] leading-[1.08] tracking-[-1.5px] max-w-[560px] mb-4"
            style={{ fontSize: "clamp(30px, 3.2vw, 44px)", ...tt, fontWeight: 500 }}
          >
            Two products.
            <br />
            <span style={lc} className="text-[#103435]">
              Sea and shore.
            </span>
          </h2>
          <p
            className="text-[#464646] leading-[1.75] max-w-[600px] mb-12 md:mb-14"
            style={{ ...tt, fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 17px)" }}
          >
            Wayship captures operational knowledge at the vessel level. Smartport gives regional port authorities the digital infrastructure to compete with major terminals — built on years of real-world maritime operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#D9D9D9] border border-[#D9D9D9] overflow-hidden">
            <div className="relative bg-[#f3f2ee] p-8 md:p-10 hover:bg-[#ebe9e3]/80 transition-colors group flex flex-col">
              <span className="inline-block w-fit font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-none border border-[#D9D9D9] bg-[#f3f2ee] text-[#0e3233] mb-5">
                Wayship · Vessel
              </span>
              <h3
                className="text-[#103435] leading-[1.12] tracking-[-0.5px] mb-3"
                style={{ fontSize: "clamp(22px, 2.2vw, 28px)", ...tt, fontWeight: 500 }}
              >
                Knowledge doesn&apos;t walk off the gangway{" "}
                <span style={lc} className="text-[#103435]">
                  anymore.
                </span>
              </h3>
              <p className="text-[#464646] text-[14px] leading-[1.8] mb-6" style={{ ...tt, fontWeight: 400 }}>
                Voice AI, LLM chat, and structured capture so crew knowledge stays with the vessel — not the rotation.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  "Voice and text capture tuned for noisy, real-world ship conditions",
                  "Fleet dashboards and handovers without a heavy IT integration",
                  "Aligned with how superintendents and operators already work",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5 text-[#464646] text-[13.5px] leading-snug" style={{ ...tt, fontWeight: 400 }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#416668]" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                to="/wayship"
                className="mt-auto inline-flex w-fit items-center gap-2 border border-[#D9D9D9] bg-[#f3f2ee] px-5 py-2.5 text-[#0e3233] hover:bg-[#e8e6e0] transition-colors duration-150"
                style={{ ...tt, fontWeight: 500, fontSize: 15 }}
              >
                Explore Wayship
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
            </div>
            <div className="relative bg-[#f3f2ee] p-8 md:p-10 hover:bg-[#ebe9e3]/80 transition-colors flex flex-col">
              <span className="inline-block w-fit font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-none border border-[#D9D9D9] bg-[#f3f2ee] text-[#0e3233] mb-5">
                Smartport · Port
              </span>
              <h3
                className="text-[#103435] leading-[1.12] tracking-[-0.5px] mb-3"
                style={{ fontSize: "clamp(22px, 2.2vw, 28px)", ...tt, fontWeight: 500 }}
              >
                Secondary ports.{" "}
                <span style={lc} className="text-[#103435]">
                  Major-terminal infrastructure.
                </span>
              </h3>
              <p className="text-[#464646] text-[14px] leading-[1.8] mb-6" style={{ ...tt, fontWeight: 400 }}>
                Scheduling, billing, customs integration, and operator-facing visibility — packaged for ports that need to move fast.
              </p>
              <ul className="flex flex-col gap-2.5 mb-8">
                {[
                  "Live-ops surfaces for berth planning and vessel flow",
                  "Revenue and compliance workflows built for regional scale",
                  "No dedicated IT team required to get value on day one",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5 text-[#464646] text-[13.5px] leading-snug" style={{ ...tt, fontWeight: 400 }}>
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#416668]" />
                    {line}
                  </li>
                ))}
              </ul>
              <Link
                to="/smartport"
                className="mt-auto inline-flex w-fit items-center gap-2 border border-[#D9D9D9] bg-[#f3f2ee] px-5 py-2.5 text-[#0e3233] hover:bg-[#e8e6e0] transition-colors duration-150"
                style={{ ...tt, fontWeight: 500, fontSize: 15 }}
              >
                Explore Smartport
                <ArrowUpRight size={16} strokeWidth={2} />
              </Link>
            </div>
          </div>
        </Wrap>
      </section>
      </div>

      {/* CTA strip */}
      <section id="contact" className="relative z-[70] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[#0e3233]" aria-hidden />
        <div className="absolute inset-0" aria-hidden style={{ background: CTA_RADIAL_STACK }} />
        <AnimatedDitherBackground className="pointer-events-none z-[1] opacity-[0.72]" ditherMix={0.34} />
        <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-20 md:py-28 text-center">
          <p className="mb-6 inline-flex items-center gap-2 border border-[#fcf7e3]/20 bg-[#fcf7e3]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#fcf7e3]/80">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#fcf7e3]/90 animate-pulse" aria-hidden />
            Ready when you are
          </p>
          <h2
            className="text-[#fcf7e3] leading-[1.1] tracking-[-1.5px] mb-5 max-w-[580px] mx-auto"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw, 50px)",
              textShadow: "0 1px 24px rgba(0,0,0,0.25)",
            }}
          >
            Production-proven with demanding operators.{" "}
            <span style={lc} className="text-[#fcf7e3]">
              Your operation next.
            </span>
          </h2>
          <p
            className="text-[#f3f2ee]/80 leading-[1.65] mb-10 max-w-[460px] mx-auto"
            style={{ ...tt, fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            A 30-minute demo is the fastest way to see how Wayship and Smartport fit your fleet or port.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <a
              href="#form"
              className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
              style={{ ...tt, fontWeight: 500, fontSize: 15 }}
            >
              Book a demo
              <ArrowUpRight size={15} />
            </a>
            <Link
              to="/wayship"
              className="text-[#fcf7e3]/90 border border-[#fcf7e3]/25 px-7 py-3 hover:border-[#fcf7e3]/45 hover:bg-[#fcf7e3]/5 transition-colors duration-150 inline-flex items-center gap-2"
              style={{ ...tt, fontWeight: 400, fontSize: 15 }}
            >
              Explore Wayship
            </Link>
          </div>
          <p className="text-[#fcf7e3]/45 font-mono text-[11px]">
            No commitment · Live on 200+ vessels · ABS, Liberia, Bahamas, Malta, Singapore
          </p>
        </div>
      </section>

      <div className="relative bg-[#f3f2ee]">
        <SideRailOverlay />
        <RailDivider />
        <Footer />
      </div>
    </div>
  );
}
