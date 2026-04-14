import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Banknote, Building2, Landmark, ShieldCheck, Truck } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContentDivider } from "./RailDivider";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const lc: CSSProperties = {
  fontFamily: "'LT Cushion', serif",
  fontWeight: 300,
  fontStyle: "normal",
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] ${className}`}>{children}</div>;
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
    <p
      className="mb-4 text-[#464646] uppercase tracking-[0.12em]"
      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 11 }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-[#103435] leading-[1.08] tracking-[-1.5px] ${className}`} style={{ fontSize: "clamp(30px, 3.2vw, 50px)" }}>
      {children}
    </h2>
  );
}

function Body({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`text-[#464646] leading-[1.65] ${className}`}
      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 17px)" }}
    >
      {children}
    </p>
  );
}

function SmartportHero() {
  const activity = [
    { name: "MV Siddharth · AAN submitted, ICEGATE sync", time: "8m", kind: "g" as const },
    { name: "Port dues · IRN generated, GST filed", time: "22m", kind: "g" as const },
    { name: "Land lease Plot 14-B · Renewal in 7 days", time: "1h", kind: "a" as const },
    { name: "Gate pass #43839 · HDFC payment cleared", time: "2h", kind: "g" as const },
  ];

  return (
    <Section id="hero" className="relative overflow-hidden pt-[72px]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `
            linear-gradient(rgba(47, 97, 90, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47, 97, 90, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div
        className="pointer-events-none absolute -right-20 -top-40 h-[560px] w-[700px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47, 97, 90, 0.12) 0%, transparent 68%)" }}
        aria-hidden
      />
      <Wrap className="relative py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.05}>
              <span className="mb-8 inline-flex items-center gap-2 border border-[#103435]/20 bg-[#103435]/8 px-3 py-1.5"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 11, fontWeight: 500, color: "#2f615a", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                <motion.span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-600"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  aria-hidden
                />
                Secondary &amp; regional ports · Globally deployable
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.1}
              className="mb-6 text-[#103435] leading-[1.05] tracking-[-2px]"
              style={{ fontSize: "clamp(38px, 4.8vw, 70px)" }}
            >
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                Secondary ports handle
                <br />
                real cargo. Now they can
                <br />
              </span>
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>
                compete for more of it.
              </span>
            </motion.h1>
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15} className="mb-8 max-w-[440px]">
              <Body>
                Most ports don&apos;t have Rotterdam&apos;s infrastructure. Smartport closes that gap — giving secondary ports the digital platform that&apos;s only ever been available to major terminals.
              </Body>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.18}
              className="mb-8 flex flex-wrap gap-3"
            >
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-[#0e3233] px-6 py-3 text-white transition-colors hover:bg-[#416668]"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
              >
                Request a demo
                <ArrowUpRight size={15} />
              </Link>
              <a
                href="#case-study"
                className="inline-flex items-center border border-[#D9D9D9] px-6 py-3 text-[#464646] transition-colors hover:border-[#0e3233]/30"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
              >
                See the APMB case study
              </a>
            </motion.div>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.22}
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
            >
              {["Live across 12 ports", "$42M+ revenue processed", "Production since 2018", "99.9% uptime"].map((t, i) => (
                <span
                  key={t}
                  className={`font-mono text-[11px] text-[#615D5D] ${i > 0 ? "border-l border-[#D9D9D9] pl-4" : ""}`}
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          <div className="flex flex-col gap-4 pt-1">
            <div className="overflow-hidden border border-[#D9D9D9] bg-[#f3f2ee]">
              <div className="flex items-center justify-between border-b border-[#D9D9D9] bg-[#ebe9e3]/80 px-4 py-3">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">Port operations · Live</span>
                <span className="rounded-sm border border-[#2f615a]/30 bg-[#2f615a]/10 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">
                  ● Active
                </span>
              </div>
              <div className="p-4">
                {activity.map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between gap-4 border-b border-[#E4E2DC] py-2 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-[12.5px] text-[#464646]">
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.kind === "g" ? "bg-[#2f615a]" : "bg-[#ff9905]"}`}
                      />
                      {row.name}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] text-[#615D5D]">{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="overflow-hidden border border-[#416668]/35 bg-[#f3f2ee]">
              <div className="flex items-center justify-between border-b border-[#416668]/20 bg-[#416668]/10 px-4 py-2.5">
                <span className="font-mono text-[9px] uppercase tracking-wider text-[#416668]">Port network</span>
                <span className="rounded-sm border border-[#2f615a]/25 bg-[#2f615a]/10 px-2 py-0.5 font-mono text-[10px] text-[#0e3233]">
                  1 cluster live
                </span>
              </div>
              <div className="flex flex-col gap-2 p-3">
                <div className="flex items-center gap-3 rounded-md border border-[#D9D9D9] bg-[#ebe9e3] px-3 py-2.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#2f615a] shadow-[0_0_0_2px_rgba(47,97,90,0.2)]" />
                  <span className="flex-1 text-[12px] text-[#464646]">APMB · Andhra Pradesh, India</span>
                  <span className="font-mono text-[9.5px] text-[#615D5D]">12 ports</span>
                </div>
                <div className="flex items-center gap-3 rounded-md border border-dashed border-[#D9D9D9] bg-[#f3f2ee] px-3 py-2.5">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#ff9905]/50" />
                  <span className="flex-1 text-[12px] text-[#615D5D]">Your cluster</span>
                  <span className="font-mono text-[9.5px] text-[#615D5D]/70">Deploying</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrap>
    </Section>
  );
}

const gapCards = [
  {
    num: "01 — The routing problem",
    title: "Documentation that requires a phone call.",
    body: "Tariffs aren't published. Clearance timelines are unknown. Payment requires follow-up. Major ports have solved this with software. Secondary ports compete without it.",
    foot: "→ Smartport makes you as predictable as any major terminal",
  },
  {
    num: "02 — The revenue problem",
    title: "Services rendered. Revenue not captured.",
    body: "Fees not tracked, cash without receipts, land leased below market rate. The gap between revenue potential and revenue collected is structural — and invisible until it's digitized.",
    foot: "→ Smartport surfaces revenue that was always there",
  },
  {
    num: "03 — The compliance problem",
    title: "Regulatory complexity. No infrastructure for it.",
    body: "Customs integration, tax filings, e-invoicing — each jurisdiction adds layers. Major ports have dedicated teams and enterprise software. Secondary ports have spreadsheets.",
    foot: "→ Smartport makes compliance automatic",
  },
];

function GapSection() {
  return (
    <Section id="gap" className="relative overflow-hidden py-20 md:py-28">
      <Wrap className="relative">
        <div className="mb-12 grid grid-cols-1 items-end gap-8 lg:mb-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <Label>The competitive gap</Label>
            <SectionTitle className="mb-0">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Agents route to certainty.</span>
              <br />
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>
                Most secondary ports can&apos;t offer it.
              </span>
            </SectionTitle>
          </div>
          <Body className="max-w-none lg:max-w-[520px]">
            When a shipping agent decides where to route a vessel, they&apos;re choosing a process, not just a berth. Unclear timelines, paper forms, cash payments — every point of friction is a routing decision lost.
          </Body>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#D9D9D9] bg-[#D9D9D9] md:grid-cols-3">
          {gapCards.map((c, i) => (
            <motion.div
              key={c.num}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i * 0.08}
              className="bg-[#f3f2ee] p-8 md:p-10"
            >
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-[#615D5D]/80">{c.num}</p>
              <h3 className="mb-3 text-[#1d1d1d] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: "clamp(15px, 1.2vw, 17px)" }}>
                {c.title}
              </h3>
              <p className="mb-6 leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1vw, 14.5px)" }}>
                {c.body}
              </p>
              <div className="border-t border-[#D9D9D9] pt-4 font-mono text-[11.5px] text-[#2f615a]">{c.foot}</div>
            </motion.div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

const stakeholders = [
  {
    label: "Port Authority",
    desc: "Revenue visibility, compliance dashboards, alerts — in real time.",
    icon: Landmark,
  },
  {
    label: "Shipping Agents",
    desc: "Docs, clearances, payments — entirely online. The certainty that wins routing decisions.",
    icon: Building2,
  },
  {
    label: "Customs & Regulators",
    desc: "Customs data submitted digitally. Tax filed automatically. Compliance without manual work.",
    icon: ShieldCheck,
  },
  {
    label: "Gate & Security",
    desc: "Barcoded passes from the same system that cleared the vessel. The loop closes.",
    icon: Truck,
  },
  {
    label: "Finance",
    desc: "Accounting exports, e-invoices, Daily Cash Book — from the platform that generated every transaction.",
    icon: Banknote,
  },
];

function PlatformSection() {
  return (
    <Section id="platform" className="relative py-20 md:py-28">
      <Wrap>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <Label>How it works</Label>
            <SectionTitle className="mb-4">
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                One platform.
                <br />
                Every stakeholder.
                <br />
              </span>
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>Zero gaps.</span>
            </SectionTitle>
            <Body className="mb-8 max-w-[520px]">
              Smartport doesn&apos;t sit on top of port operations. It <span className="font-medium text-[#103435]">is</span> port operations. Every fee flows through it. Every clearance originates in it. Every gate pass is issued from it.
            </Body>
            <div className="overflow-hidden border border-[#D9D9D9]">
              {stakeholders.map((s, idx) => (
                <div
                  key={s.label}
                  className={`flex gap-4 px-5 py-4 transition-colors hover:bg-[#eeece5]/50 ${idx < stakeholders.length - 1 ? "border-b border-[#D9D9D9]" : ""}`}
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#2f615a]/25 bg-[#2f615a]/10">
                    <s.icon className="h-3.5 w-3.5 text-[#2f615a]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.06em] text-[#2f615a]">{s.label}</p>
                    <p className="text-[13px] leading-relaxed text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
            className="rounded-2xl border border-[#D9D9D9] bg-[#eeece5] p-7 md:p-8"
          >
            <p className="mb-6 font-mono text-[9.5px] uppercase tracking-[0.08em] text-[#615D5D]">Unified stakeholder ecosystem</p>
            <div className="mb-4 rounded-lg border border-[#2f615a]/30 bg-[#2f615a]/10 px-4 py-3 text-center">
              <p className="text-[13px] font-medium text-[#0e3233]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                SMARTPORT
              </p>
              <p className="font-mono text-[10px] text-[#615D5D]">One platform · All stakeholders</p>
            </div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-[#615D5D]/80">
              <span className="h-px flex-1 bg-[#D9D9D9]" />
              connected to
              <span className="h-px flex-1 bg-[#D9D9D9]" />
            </div>
            <div className="mb-5 grid grid-cols-2 gap-2">
              {[
                ["Port Authority", "Revenue · Compliance"],
                ["Shipping Agents", "Docs · Payments"],
                ["Regulators", "Customs · GST · TDS"],
                ["Gate & Security", "Barcode scanning"],
                ["Finance", "Tally XML · DCB"],
                ["Private Ports", "IES · Data reporting"],
              ].map(([nn, ns]) => (
                <div key={nn} className="rounded-lg border border-[#D9D9D9] bg-[#f3f2ee] px-3 py-2.5">
                  <p className="text-[12px] font-medium text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    {nn}
                  </p>
                  <p className="font-mono text-[10px] text-[#615D5D]">{ns}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-[#D9D9D9] bg-[#D9D9D9]">
              {[
                ["$42.35M", "Revenue"],
                ["43,839", "Gate passes"],
                ["4,196", "Vessel calls"],
              ].map(([v, l]) => (
                <div key={l} className="bg-[#f3f2ee] px-3 py-3 text-center">
                  <div className="font-mono text-[13px] font-medium text-[#2f615a]">{v}</div>
                  <div className="font-mono text-[9px] uppercase tracking-wider text-[#615D5D]">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

function CaseStudySection() {
  return (
    <Section id="case-study" className="relative py-20 md:py-28">
      <Wrap>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-16"
        >
          <Label>Case study · APMB, India</Label>
          <SectionTitle className="max-w-3xl">
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
              What it looks like
              <br />
              when a port cluster gets
              <br />
            </span>
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>
              the infrastructure it deserves.
            </span>
          </SectionTitle>
        </motion.div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0.05}>
            <blockquote
              className="mb-6 border-l-2 border-[#2f615a] pl-5 leading-[1.5] text-[#464646]"
              style={{ ...lc, fontSize: 20, fontStyle: "italic" }}
            >
              12 minor ports. Paper, phone calls, cash. Today — one platform, full compliance, zero revenue leakage.
            </blockquote>
            <p className="mb-6 leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 17px)" }}>
              Andhra Pradesh Maritime Board manages 12 minor ports on India&apos;s eastern coastline. In 2018, operations ran on fragmented systems, paper documentation, and cash-based collections. Compliance was manual. Revenue was opaque.
            </p>
            <p className="mb-8 leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.05vw, 17px)" }}>
              Smartport replaced the entire operational stack. Every vessel call is now a digital workflow. Every rupee is tracked and GST-compliant. Adani Gangavaram and Krishnapatnam — two of India&apos;s largest private ports — use Smartport&apos;s IES module for data reporting.
            </p>
            <div className="overflow-hidden border border-[#D9D9D9] bg-[#f3f2ee]">
              {[
                ["Live since", "2018 · 6 years in production"],
                ["Cluster", "12 minor ports · AP coastline"],
                ["Compliance", "ICEGATE · ClearTax · IRN · TDS"],
                ["Uptime", "99.9% SLA · 24/7"],
              ].map(([l, v], i) => (
                <div key={l} className={`flex items-center justify-between px-5 py-3 ${i < 3 ? "border-b border-[#D9D9D9]" : ""}`}>
                  <span className="font-mono text-[11.5px] text-[#615D5D]">{l}</span>
                  <span className="text-right text-[12.5px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} custom={0.1} className="flex flex-col gap-4">
            <div className="overflow-hidden border border-[#D9D9D9] bg-[#f3f2ee]">
              <div className="h-0.5 bg-[#2f615a]" />
              <div className="p-7 md:p-8">
                <div className="mb-2 leading-none text-[#103435]" style={{ ...lc, fontSize: "clamp(40px, 4vw, 52px)" }}>
                  $42<em className="not-italic text-[#2f615a]">M+</em>
                </div>
                <p className="text-[13px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  Revenue processed through Smartport
                </p>
                <p className="mt-2 font-mono text-[10.5px] text-[#615D5D]">Complete GST-compliant audit trail · Zero cash leakage</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#D9D9D9] bg-[#D9D9D9]">
              <div className="bg-[#f3f2ee] p-5">
                <div className="mb-1 leading-none text-[#103435]" style={{ ...lc, fontSize: 28 }}>
                  14<em className="not-italic text-[#2f615a]">.3M</em>
                </div>
                <p className="text-[12px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  Metric tons managed
                </p>
              </div>
              <div className="bg-[#f3f2ee] p-5">
                <div className="mb-1 leading-none text-[#103435]" style={{ ...lc, fontSize: 28 }}>
                  43<em className="not-italic text-[#2f615a]">k+</em>
                </div>
                <p className="text-[12px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  Gate passes — digital
                </p>
              </div>
              <div className="bg-[#f3f2ee] p-5">
                <div className="mb-1 leading-none text-[#103435]" style={{ ...lc, fontSize: 28 }}>
                  4<em className="not-italic text-[#2f615a]">,196</em>
                </div>
                <p className="text-[12px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  Vessel calls digitized
                </p>
              </div>
              <div className="bg-[#f3f2ee] p-5">
                <div className="mb-1 leading-none text-[#103435]" style={{ ...lc, fontSize: 28 }}>
                  16<em className="not-italic text-[#2f615a]">+</em>
                </div>
                <p className="text-[12px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                  Modules · one SSO
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-xl border border-[#2f615a]/25 bg-[#2f615a]/10 p-6 md:flex-row md:items-center md:gap-6">
              <div className="shrink-0 leading-none text-[#2f615a]" style={{ ...lc, fontSize: 40 }}>
                34<em className="not-italic">+</em>
              </div>
              <p className="text-[13px] leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
                <strong className="font-medium text-[#103435]">Major upgrades delivered in two years</strong> — ICEGATE, GST, lands, IES, HRMS, Data Lake. No system migrations.
              </p>
            </div>
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

function SmartportCTASection() {
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

      <div className="relative z-10 mx-auto max-w-[1512px] px-8 py-24 md:px-16 md:py-32 lg:px-[115px]">
        <motion.div
          className="mx-auto max-w-[580px] text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-6 inline-flex items-center gap-2 border border-[#fcf7e3]/20 bg-[#fcf7e3]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[#fcf7e3]/80">
            <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[#fcf7e3]/90" aria-hidden />
            Ready when you are
          </p>
          <h2
            className="mb-5 leading-[1.1] tracking-[-1.5px] text-[#fcf7e3]"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw, 52px)",
              textShadow: "0 1px 24px rgba(0,0,0,0.25)",
            }}
          >
            Your port competes on merit.
            <br />
            <span style={lc}>Let the platform match it.</span>
          </h2>
          <p
            className="mb-10 leading-[1.65] text-[#f3f2ee]/80"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Production-proven across 12 ports since 2018. Ready to deploy for any regional port authority that&apos;s ready to compete.
          </p>
          <div className="mb-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 bg-[#fcf7e3] px-7 py-3 text-[#0e3233] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-colors hover:bg-white"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
            >
              Request a demo
              <ArrowUpRight size={15} />
            </Link>
            <a
              href="#"
              className="border border-[#fcf7e3]/25 px-7 py-3 text-[#fcf7e3]/90 transition-colors hover:border-[#fcf7e3]/45 hover:bg-[#fcf7e3]/5"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
            >
              Talk to a specialist
            </a>
          </div>
          <p className="font-mono text-[11px] text-[#fcf7e3]/45">
            Proven since 2018 · ICEGATE &amp; GST compliant · 99.9% uptime · No IT team required
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function SmartportPage() {
  useEffect(() => {
    document.title = "Smartport — Competitive Infrastructure for Secondary Ports | Volteo Maritime";
    return () => {
      document.title = "Volteo Home Page Design";
    };
  }, []);

  return (
    <motion.div className="relative min-h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: EASE }}>
      <div className="pointer-events-none absolute inset-0 z-[60]">
        <div className="relative mx-auto h-full max-w-[1512px]">
          <div className="absolute bottom-0 left-[12px] top-0 w-px bg-[#D9D9D9] md:left-[44px] lg:left-[95px]" />
          <div className="absolute bottom-0 right-[12px] top-0 w-px bg-[#D9D9D9] md:right-[44px] lg:right-[95px]" />
        </div>
      </div>

      <Header />

      <main className="bg-[#f3f2ee] pt-0">
        <div id="advantage" className="sr-only" aria-hidden />
        <SmartportHero />
        <ContentDivider />
        <GapSection />
        <ContentDivider />
        <PlatformSection />
        <ContentDivider />
        <CaseStudySection />
        <ContentDivider />
        <SmartportCTASection />
      </main>

      <Footer />
    </motion.div>
  );
}
