import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { motion } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CTASection } from "./CTASection";
import { RailDivider } from "./RailDivider";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const PAGE_BG = "#F9F7F2";

const lc = { fontFamily: "'LT Cushion', serif", fontWeight: 300 as const };
const tt = { fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 as const };
const ttMed = { fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 as const };

type ResourceTab = "case-studies" | "insights";

const TABS: { id: ResourceTab; label: string }[] = [
  { id: "case-studies", label: "Case studies" },
  { id: "insights", label: "Insights" },
];

type CardVisual = "maritime" | "port" | "ops" | "product" | "team";

type ResourceCardData = {
  id: string;
  title: string;
  description: string;
  tag: string;
  visual: CardVisual;
};

const CASE_STUDIES: ResourceCardData[] = [
  {
    id: "cs-1",
    title: "How a mid-size operator unified voice, logbooks, and compliance across 40+ vessels.",
    description:
      "Fewer repeat work orders, clearer audit trails, and crews spending less time on paperwork at sea.",
    tag: "Case study",
    visual: "maritime",
  },
  {
    id: "cs-2",
    title: "Volteo × fleet partner: a grounded rollout from pilot to fleet-wide adoption.",
    description:
      "Change management, training, and measurable wins in the first 90 days — without disrupting sailing schedules.",
    tag: "Case study",
    visual: "team",
  },
  {
    id: "cs-3",
    title: "Product walkthrough: Wayship in under four minutes.",
    description:
      "See voice capture, structured handovers, and approvals in a single flow — built for real bridge and engine-room conditions.",
    tag: "Demo video",
    visual: "product",
  },
  {
    id: "cs-4",
    title: "From paper logbooks to searchable history in weeks.",
    description:
      "How one technical team reduced back-office reconciliation time and improved visibility for shore teams.",
    tag: "Case study",
    visual: "ops",
  },
];

const NEWS: ResourceCardData[] = [
  {
    id: "nw-1",
    title: "Volteo expands ABS-approved digital logbook coverage for tanker segments.",
    description:
      "Updated guidance and product support for operators who need compliance without slowing operations.",
    tag: "News",
    visual: "maritime",
  },
  {
    id: "nw-2",
    title: "Smartport: new berth planning signals for busy container terminals.",
    description:
      "Earlier visibility on congestion and dwell — so port teams can respond before queues form.",
    tag: "News",
    visual: "port",
  },
  {
    id: "nw-3",
    title: "Partner spotlight: working with classification and flag states on safe AI adoption.",
    description:
      "A short note on how we align product releases with regulatory expectations.",
    tag: "News",
    visual: "team",
  },
];

const ON_OUR_MIND: ResourceCardData[] = [
  {
    id: "om-1",
    title: "The real cost of “almost digital” fleets.",
    description:
      "Why partial tools create more work than paper — and what a coherent workflow actually looks like.",
    tag: "On our mind",
    visual: "ops",
  },
  {
    id: "om-2",
    title: "Designing for loud rooms, gloves, and 3 a.m. alarms.",
    description:
      "What we’ve learned shipping voice-first UX for ships and ports.",
    tag: "On our mind",
    visual: "product",
  },
  {
    id: "om-3",
    title: "Benchmarks vs. behaviour: what good adoption metrics miss.",
    description:
      "A framework we use internally to tell signal from vanity in operational software.",
    tag: "On our mind",
    visual: "port",
  },
];

const INSIGHTS: ResourceCardData[] = [...NEWS, ...ON_OUR_MIND];

const TAB_CONTENT: Record<ResourceTab, ResourceCardData[]> = {
  "case-studies": CASE_STUDIES,
  insights: INSIGHTS,
};

function isResourceTab(s: string | null): s is ResourceTab {
  return s === "case-studies" || s === "insights";
}

function CardMedia({ visual }: { visual: CardVisual }) {
  const palettes: Record<CardVisual, { bg: string; accent: string; label: string }> = {
    maritime: { bg: "#0e3233", accent: "#2f615a", label: "Fleet" },
    port: { bg: "#1a3d40", accent: "#416668", label: "Port" },
    ops: { bg: "#113637", accent: "#5a8a87", label: "Ops" },
    product: { bg: "#0b282a", accent: "#2f615a", label: "Product" },
    team: { bg: "#103435", accent: "#8a9e9c", label: "People" },
  };
  const p = palettes[visual];
  return (
    <div
      className="relative w-full overflow-hidden aspect-[16/10]"
      style={{
        background: `linear-gradient(145deg, ${p.bg} 0%, ${p.accent}55 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <span
          className="text-[10px] uppercase tracking-[0.14em] text-white/70"
          style={ttMed}
        >
          {p.label}
        </span>
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  tag,
  visual,
  large,
}: ResourceCardData & { large?: boolean }) {
  return (
    <article className="flex flex-col bg-transparent">
      <CardMedia visual={visual} />
      <div className="pt-5 flex flex-col flex-1">
        <h3
          className={`text-[#0e3233] leading-[1.2] tracking-tight ${large ? "text-[26px] md:text-[30px]" : "text-[22px] md:text-[24px]"}`}
          style={lc}
        >
          {title}
        </h3>
        <p
          className="mt-3 text-[#464646] leading-[1.6] flex-1"
          style={{ ...tt, fontSize: 15 }}
        >
          {description}
        </p>
        <div className="mt-6">
          <span
            className="inline-block border border-[#D9D9D9] rounded-full px-3 py-1.5 text-[#464646]"
            style={{ ...tt, fontSize: 12 }}
          >
            {tag}
          </span>
        </div>
      </div>
    </article>
  );
}

function ResourceGrid({ cards }: { cards: ResourceCardData[] }) {
  if (cards.length === 0) {
    return (
      <p className="text-[#464646] text-center py-16" style={tt}>
        Nothing here yet — check back soon.
      </p>
    );
  }

  const [first, second, ...rest] = cards;

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-10 lg:mb-12">
        <div className="lg:col-span-7">
          <ResourceCard {...first} large />
        </div>
        {second ? (
          <div className="lg:col-span-5">
            <ResourceCard {...second} />
          </div>
        ) : null}
      </div>
      {rest.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {rest.map((c) => (
            <ResourceCard key={c.id} {...c} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ResourcesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab: ResourceTab = useMemo(() => {
    const t = searchParams.get("tab");
    return isResourceTab(t) ? t : "case-studies";
  }, [searchParams]);

  const cards = TAB_CONTENT[activeTab];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  const setTab = (id: ResourceTab) => {
    setSearchParams({ tab: id }, { replace: true });
  };

  return (
    <div className="relative min-h-screen" style={{ background: PAGE_BG }}>
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <div className="relative h-full max-w-[1512px] mx-auto">
          <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]/80" />
          <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]/80" />
        </div>
      </div>

      <Header />

      <main className="pt-[72px]">
        <section className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] pt-14 pb-0 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center max-w-[720px] mx-auto pb-10 md:pb-12"
          >
            <h1
              className="text-[#0e3233] text-[44px] md:text-[56px] leading-none tracking-tight"
              style={lc}
            >
              Resources
            </h1>
            <p
              className="mt-5 text-[#464646] leading-[1.6]"
              style={{ ...tt, fontSize: 16 }}
            >
              Case studies, announcements, and ideas from the Volteo team — including customer stories and product demos in one place.
            </p>
          </motion.div>
        </section>

        {/* Tabs: rectangular, centered, directly above the horizontal divider */}
        <div className="mx-auto max-w-[1512px] w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: EASE }}
            className="px-8 md:px-16 lg:px-[115px] pb-0 flex justify-center"
          >
            <div
              className="inline-flex max-w-full flex-nowrap overflow-x-auto sm:overflow-visible items-stretch border border-[#D9D9D9] bg-[#f3f2ee] divide-x divide-[#D9D9D9]"
              role="tablist"
              aria-label="Resource categories"
            >
              {TABS.map((tab) => {
                const selected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setTab(tab.id)}
                    className={`shrink-0 rounded-none px-4 md:px-5 py-3 text-left text-[14px] md:text-[15px] transition-colors duration-200 ${
                      selected
                        ? "bg-[#0e3233] text-white"
                        : "bg-[#f3f2ee] text-[#464646] hover:bg-[#e8e6e0] hover:text-[#0e3233]"
                    }`}
                    style={ttMed}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <RailDivider />

        <section className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-14 md:py-20">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <ResourceGrid cards={cards} />
          </motion.div>
        </section>
      </main>

      <CTASection />
      <Footer />
    </div>
  );
}
