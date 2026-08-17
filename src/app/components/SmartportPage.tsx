import { useEffect, type CSSProperties } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ContentDivider } from "./RailDivider";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const lc: CSSProperties = {
  fontFamily: "'Source Serif 4', serif",
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

function SplitHeading({
  sans,
  serif,
  className = "",
  as = "h2",
  inline = false,
}: {
  sans: React.ReactNode;
  serif: React.ReactNode;
  className?: string;
  as?: "h1" | "h2";
  inline?: boolean;
}) {
  const Tag = as;
  return (
    <Tag
      className={`text-[#103435] leading-[1.08] tracking-[-1.5px] ${className}`}
      style={{ fontSize: as === "h1" ? "clamp(38px, 4.8vw, 70px)" : "clamp(30px, 3.2vw, 50px)", textWrap: "balance" }}
    >
      <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>{sans}</span>
      {inline ? " " : <br />}
      <span style={lc}>{serif}</span>
    </Tag>
  );
}

function CaseStudyStatsIllustration() {
  return (
    <div className="flex flex-col gap-4 lg:justify-center">
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
        {[
          ["14", ".3M", "Metric tons managed"],
          ["43", "k+", "Gate passes — digital"],
          ["4", ",196", "Vessel calls digitized"],
          ["16", "+", "Modules · one SSO"],
        ].map(([n, suffix, label]) => (
          <div key={label} className="bg-[#f3f2ee] p-5">
            <div className="mb-1 leading-none text-[#103435]" style={{ ...lc, fontSize: 28 }}>
              {n}
              <em className="not-italic text-[#2f615a]">{suffix}</em>
            </div>
            <p className="text-[12px] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
              {label}
            </p>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 border border-[#2f615a]/25 bg-[#2f615a]/10 p-6 md:flex-row md:items-center md:gap-6">
        <div className="shrink-0 leading-none text-[#2f615a]" style={{ ...lc, fontSize: 40 }}>
          34<em className="not-italic">+</em>
        </div>
        <p className="text-[13px] leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>
          <strong className="font-medium text-[#103435]">Major upgrades delivered in two years</strong> — ICEGATE, GST, lands, IES, HRMS, Data Lake. No system migrations.
        </p>
      </div>
    </div>
  );
}

function SmartportHero() {
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
        <div className="mx-auto flex max-w-[860px] flex-col items-center text-center">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.1} className="mb-6">
            <SplitHeading
              as="h1"
              className="leading-[1.05] tracking-[-2px]"
              sans="Drive Port Productivity."
              serif="Minimize Turnaround Times."
            />
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.15} className="mb-8 max-w-[560px]">
            <p
              className="text-[#464646] leading-[1.65]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 18 }}
            >
              Smartport is the unified cloud platform that digitizes and automates the manual, paperwork-heavy business processes of secondary ports — from vessel call to cargo handling.
            </p>
          </motion.div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.18}
            className="flex flex-wrap justify-center gap-3"
          >
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 bg-[#0e3233] px-6 py-3 text-white transition-colors hover:bg-[#416668]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
            >
              Get a Demo
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
        </div>
      </Wrap>
    </Section>
  );
}

function PredictabilitySection() {
  const paragraphs = [
    "For secondary ports, competing with mega-hubs isn\u2019t about matching physical footprint \u2014 it\u2019s about mastering operational predictability.",
    "By eliminating towers of paperwork and siloed data, Smartport unlocks a highly efficient ecosystem that moves vessels in and out of berth with clockwork precision, giving liner freight forwarding agents the one commitment they value above all else: absolute clarity in port processes.",
    "As a unified digital platform, Smartport replaces disconnected systems with real-time coordination across vessel traffic, berth allocation, yard activities, billing, and regulatory tasks \u2014 optimizing productivity at every single stage.",
  ];

  return (
    <Section id="predictability">
      <Wrap className="py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <SplitHeading
              sans={<>Leveling the playing<br className="hidden md:block" />field through</>}
              serif={<>Operational<br className="hidden md:block" />Predictability</>}
              inline
            />
          </motion.div>
          <motion.div
            className="flex flex-col gap-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.08}
          >
            {paragraphs.map((text) => (
              <Body key={text}>{text}</Body>
            ))}
          </motion.div>
        </div>
      </Wrap>
    </Section>
  );
}

const platformCapabilityCards = [
  {
    title: "Vessel Call Management",
    body: "Manage full lifecycle — pre-arrival to departure. Track every vessel by IMO with Digital AAN, cargo declarations, and clearance certificates, all automated.",
  },
  {
    title: "Terminal and Gate Operations",
    body: "50+ pass categories with digital check-in/out for crew, stevedores, and vehicles — no paperwork, no queues.",
  },
  {
    title: "Cargo Handling and Inventory Management",
    body: "Real-time tracking of every cargo movement from quay to yard. Automated yard planning cuts dwell times and maximizes throughput.",
  },
  {
    title: "Yards, Lands and Godowns Management",
    body: "Digital lease lifecycle for godowns and port lands. Renewal alerts, HoD approvals, and inventory tracking",
  },
  {
    title: "Digital Payments and Billing Automation",
    body: "Automated billing for 80+ port services. IRN-based GST invoicing with global payment networks including UPI and NEFT with live reconciliation across banks.",
  },
  {
    title: "Analytics and Reporting",
    body: "Live dashboards for vessel throughput, revenue, and berth utilization. Automated weekly, monthly, and quarterly reports — zero manual compilation.",
  },
];

function UnifiedPlatformSection() {
  return (
    <Section id="unified-platform" className="relative overflow-hidden py-20 md:py-28">
      <Wrap className="relative">
        <motion.div
          className="mb-12 max-w-[720px] lg:mb-16"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <SplitHeading sans="Everything a port runs on," serif="in one unified platform" />
        </motion.div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-[#D9D9D9] bg-[#D9D9D9] md:grid-cols-3">
          {platformCapabilityCards.map((c, i) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              custom={i * 0.06}
              className="bg-[#f3f2ee] p-8 md:p-10"
            >
              <h3 className="mb-3 text-[#1d1d1d] leading-snug" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: "clamp(15px, 1.2vw, 17px)" }}>
                {c.title}
              </h3>
              <p className="leading-[1.65] text-[#464646]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1vw, 14.5px)" }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </Wrap>
    </Section>
  );
}

function CaseStudySection() {
  return (
    <Section id="case-study" className="relative py-20 md:py-28">
      <Wrap>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.05}
          >
            <p
              className="mb-6 text-[#2f615a] underline decoration-[#2f615a] underline-offset-[6px]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}
            >
              Case Study
            </p>
            <SplitHeading
              className="mb-8"
              sans="The APMB transformation:"
              serif="Modernizing the multi-port cluster with purpose-built digital infrastructure"
            />
            <Body className="mb-6 max-w-none">
              The Andhra Pradesh Maritime Board manages 12 minor ports along India&apos;s eastern coastline. In 2018, operations relied on fragmented systems, paper-heavy documentation, and cash-based collections — causing revenue leakage and heavy administrative overhead.
            </Body>
            <Body className="mb-10 max-w-none">
              Smartport replaced the entire operational stack. Today, every vessel call is a digital workflow, and every rupee is tracked and GST-compliant. Adani Gangavaram and Krishnapatnam Port — two of India&apos;s largest private ports — rely on Smartport for seamless port operations.
            </Body>
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 bg-[#0e3233] px-6 py-3 text-white transition-colors hover:bg-[#416668]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
            >
              Request Case Study
              <ArrowUpRight size={15} />
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0.1}
          >
            <CaseStudyStatsIllustration />
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
          className="mx-auto max-w-[640px] text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2
            className="mb-5 leading-[1.1] tracking-[-1.5px] text-[#fcf7e3]"
            style={{
              fontSize: "clamp(32px, 3.5vw, 52px)",
              textShadow: "0 1px 24px rgba(0,0,0,0.25)",
            }}
          >
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Ready to transform</span>
            <br />
            <span style={lc}>your port?</span>
          </h2>
          <p
            className="mb-10 leading-[1.65] text-[#f3f2ee]/80"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            See how Smartport eliminates manual processes, unifies stakeholders, and gives your port the operational predictability.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/book-demo"
              className="inline-flex items-center gap-2 bg-[#fcf7e3] px-7 py-3 text-[#0e3233] shadow-[0_8px_32px_rgba(0,0,0,0.2)] transition-colors hover:bg-white"
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
        <PredictabilitySection />
        <ContentDivider />
        <UnifiedPlatformSection />
        <ContentDivider />
        <CaseStudySection />
        <ContentDivider />
        <SmartportCTASection />
      </main>

      <Footer />
    </motion.div>
  );
}
