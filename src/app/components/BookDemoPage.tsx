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

/** Payload keys must match Power Automate "When an HTTP request is received" JSON schema. */
function buildDemoRequestPayload(input: {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  fleetSize: string;
  role: string;
  product: "wayship" | "smartport";
  comments: string;
}) {
  return {
    "first name": input.firstName,
    "last name": input.lastName,
    "work email": input.workEmail,
    company: input.company,
    "fleet size": input.fleetSize,
    role: input.role,
    product: input.product,
    comments: input.comments,
  };
}

const DEMO_SUBMIT_ENDPOINT = "/api/powerautomate-demo";

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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showFillTestData, setShowFillTestData] = useState(import.meta.env.DEV);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [role, setRole] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    if (import.meta.env.DEV) return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1" || params.get("fillTestData") === "1") setShowFillTestData(true);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    const f = first.trim();
    const l = last.trim();
    const em = email.trim();
    const co = company.trim();
    if (!f || !l) return;
    if (!em || !em.includes("@")) return;
    if (!co) return;
    if (!fleetSize) return;
    if (!role) return;

    const body = buildDemoRequestPayload({
      firstName: f,
      lastName: l,
      workEmail: em,
      company: co,
      fleetSize,
      role,
      product: interest,
      comments: comments.trim(),
    });

    setLoading(true);
    try {
      const res = await fetch(DEMO_SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        let detail = "";
        try {
          const text = await res.text();
          const parsed = JSON.parse(text) as { error?: { code?: string; message?: string } };
          if (parsed?.error?.code === "DirectApiAuthorizationRequired") {
            detail =
              " Microsoft returned an auth error: set the HTTP trigger to “Anyone” (or use a signed URL with sig=), save the flow, then paste the new POST URL into POWER_AUTOMATE_HTTP_URL (local + Vercel environment variables).";
          } else if (parsed?.error?.message) {
            detail = ` (${parsed.error.message})`;
          }
        } catch {
          /* ignore parse errors */
        }
        setSubmitError(
          res.status === 401 || res.status === 403
            ? `This form could not be accepted by Microsoft (HTTP ${res.status}).${detail || " Check Power Automate trigger access settings."}`
            : `Something went wrong (HTTP ${res.status}). Please try again or email us directly.${detail}`,
        );
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
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
              <h1
                className="text-[#fcf7e3] leading-[1.05] tracking-[-2px] mb-6"
                style={{ fontSize: "clamp(36px, 4.5vw, 52px)", ...tt, fontWeight: 500 }}
              >
                Wayship for the vessel.
                <br />
                Smartport for the port.
                <br />
                <span style={lc} className="text-[#fcf7e3]">
                  Built by Volteo, so your operations don&apos;t fall short.
                </span>
              </h1>
              <p
                className="text-[#f3f2ee]/80 leading-[1.75] max-w-[440px] mb-8"
                style={{ ...tt, fontWeight: 400, fontSize: "clamp(15px, 1.1vw, 17px)" }}
              >
                Wayship captures operational intelligence across 350+ vessels. Smartport gives secondary ports the digital infrastructure to run efficiently and profitably. Book a 30-minute demo with our product specialists to see what that looks like for your operation.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-8 border-t border-[#fcf7e3]/10">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#fcf7e3]/35 shrink-0">Trusted by</span>
                <div className="flex flex-wrap items-center gap-2 text-[13px] text-[#fcf7e3]/55" style={{ ...tt, fontWeight: 500 }}>
                  {["EPS", "Teekay", "TORM", "CMA CGM"].map((name, i, a) => (
                    <span key={name} className="flex items-center gap-2">
                      {name}
                      {i < a.length - 1 ? <span className="text-[#fcf7e3]/20">·</span> : null}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#D9D9D9] bg-white overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.14)]">
              {!submitted ? (
                <form onSubmit={onSubmit} className="p-6 md:p-7 space-y-3 bg-white">
                  {showFillTestData ? (
                    <div className="flex justify-end -mt-1 mb-1">
                      <button
                        type="button"
                        onClick={() => {
                          setFirst("Zehan");
                          setLast("Modan");
                          setEmail("zehandesigns@gmail.com");
                          setCompany("Bowsight");
                          setFleetSize("0 – 10 vessels");
                          setRole("Fleet Manager");
                          setInterest("wayship");
                          setComments("I want to see if this works.");
                          setSubmitError(null);
                        }}
                        className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D] hover:text-[#0e3233] underline underline-offset-2 decoration-[#D9D9D9] hover:decoration-[#0e3233]/40"
                      >
                        Fill test data
                      </button>
                    </div>
                  ) : null}
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
                        value={last}
                        onChange={(e) => setLast(e.target.value)}
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
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="h-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm"
                        style={{ ...tt, fontWeight: 400 }}
                        placeholder="Company"
                        autoComplete="organization"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Fleet size</span>
                      <select
                        value={fleetSize}
                        onChange={(e) => setFleetSize(e.target.value)}
                        className={selectLightClassName}
                        style={{
                          ...tt,
                          fontWeight: 400,
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='rgba(38,38,38,0.45)' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="" disabled>
                          Select range
                        </option>
                        <option value="0 – 10 vessels">0 – 10 vessels</option>
                        <option value="11 – 50 vessels">11 – 50 vessels</option>
                        <option value="51 – 100 vessels">51 – 100 vessels</option>
                        <option value="100+ vessels">100+ vessels</option>
                      </select>
                    </label>
                  </div>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#615D5D]">Your role</span>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className={selectLightClassName}
                      style={{
                        ...tt,
                        fontWeight: 400,
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='11' height='7' viewBox='0 0 11 7' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='rgba(38,38,38,0.45)' stroke-width='1.3' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                      }}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      <option value="Fleet Manager">Fleet Manager</option>
                      <option value="Technical Superintendent">Technical Superintendent</option>
                      <option value="Operations Manager">Operations Manager</option>
                      <option value="Chartering Manager">Chartering Manager</option>
                      <option value="Head of Technology / CTO">Head of Technology / CTO</option>
                      <option value="CEO / Owner / Principal">CEO / Owner / Principal</option>
                      <option value="Other">Other</option>
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
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="min-h-[72px] rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12 md:text-sm leading-relaxed"
                      style={{ ...tt, fontWeight: 400 }}
                      placeholder="e.g. crew handovers, port revenue capture, compliance workflows…"
                    />
                  </label>
                  {submitError ? (
                    <p className="font-mono text-[11px] text-red-700/90 bg-red-50 border border-red-200/80 rounded-md px-3 py-2" role="alert">
                      {submitError}
                    </p>
                  ) : null}
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-auto rounded-md bg-[#0e3233] py-3 text-[15px] font-medium text-white shadow-none hover:bg-[#416668] disabled:opacity-70"
                    style={{ ...tt, fontWeight: 500 }}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="size-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 0 1 8-8v3.1A4.9 4.9 0 0 0 7.1 12H4Z"
                          />
                        </svg>
                        Submitting…
                      </>
                    ) : (
                      <>
                        Get a Demo
                        <ArrowUpRight size={16} className="opacity-90" />
                      </>
                    )}
                  </Button>
                  <p className="font-mono text-[10px] text-center text-[#717182] tracking-[0.03em] pt-1">
                    No spam, pinky promise!
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
      <section id="products" className="relative bg-[#f3f2ee] py-20 md:py-28">
        <Wrap>
          <p
            className="text-[#464646] uppercase tracking-[0.12em] mb-4"
            style={{ ...tt, fontWeight: 500, fontSize: 11 }}
          >
            Our platforms
          </p>
          <h2
            className="text-[#103435] leading-[1.08] tracking-[-1.5px] max-w-[560px] mb-12 md:mb-14"
            style={{ fontSize: "clamp(30px, 3.2vw, 44px)", ...tt, fontWeight: 500 }}
          >
            Two platforms.
            <br />
            <span style={lc} className="text-[#103435]">
              Sea and shore.
            </span>
          </h2>

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
                Voice-to-action, AI Assistant, and reliable digital records — Class, Flag &amp; MARPOL compliant
              </p>
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

      <div className="relative bg-[#f3f2ee]">
        <SideRailOverlay />
        <RailDivider />
        <Footer />
      </div>
    </div>
  );
}
