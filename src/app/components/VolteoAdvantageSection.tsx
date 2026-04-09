import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ArrowUpRight } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────
interface Feature {
  label: string;
  description: string;
}

// ── Feature data ───────────────────────────────────────────────────────
const wayshipFeatures: Feature[] = [
  {
    label: "Voice AI — log observations in under 60 seconds",
    description:
      "Speak it from the engine room, deck at night, or rough weather. Wayship Voice AI transcribes, structures, and tags the entry instantly — no tablet hunting, no form navigation. It works where keyboards don't.",
  },
  {
    label: "Ask the ship what it knows — LLM chat over vessel history",
    description:
      "Query years of operational logs in plain language. Ask about any system, prior incident, or handover note — Wayship surfaces relevant entries across all crew rotations and flags what needs attention.",
  },
  {
    label: "Digital logbooks & MARPOL compliance — ABS type approved",
    description:
      "Full suite of bridge and engine logbooks replacing paper, plus all MARPOL record books per MEPC 312(74). ABS type approved, ISO 21745 certified, flag-accepted across Liberia, Bahamas, Malta, and Singapore.",
  },
  {
    label: "Structured crew handovers — knowledge stays on the ship",
    description:
      "Auto-generated handover reports compiled from every outgoing crew entry. Incoming officers board knowing this specific vessel — its history, its quirks, its open observations — not just the procedures.",
  },
];

const smartPortFeatures: Feature[] = [
  {
    label: "Berth scheduling & optimization engine",
    description:
      "Maximize throughput with AI-optimized berth allocation. The engine factors vessel dimensions, cargo type, tide windows, and equipment availability to eliminate idle time and scheduling conflicts.",
  },
  {
    label: "Real-time vessel arrival predictions",
    description:
      "Know exactly when vessels will arrive. AIS data, weather models, and historical patterns combine to produce ETA predictions accurate to within 15 minutes, 12 hours in advance.",
  },
  {
    label: "Secondary port revenue intelligence",
    description:
      "Uncover hidden revenue streams. The platform benchmarks your port against regional peers and identifies underpriced services, idle berth time, and anchorage opportunities.",
  },
  {
    label: "Port authority compliance automation",
    description:
      "File declarations in seconds, not hours. Automated workflows generate and submit required port state control documentation, eliminating manual errors and compliance delays.",
  },
];

const tabs = [
  {
    key: "wayship",
    label: "Wayship",
    title: "All New Wayship",
    subtitle: "Learn more about Wayship",
    href: "/wayship",
    description:
      "Speak it. Type it. It's structured, tagged, and live on your fleet dashboard in under 60 seconds. Wayship turns crew observation into actionable fleet knowledge — trusted by 200+ vessels daily.",
    features: wayshipFeatures,
  },
  {
    key: "smartport",
    label: "Smart Port",
    title: "Smart Port Intelligence",
    subtitle: "Learn more about Smart Port",
    href: "#",
    description:
      "Maximize revenue at secondary and specialized ports through real-time berth management, vessel flow optimization, and predictive analytics that keep ports moving efficiently.",
    features: smartPortFeatures,
  },
];

// ── Shared card wrapper ────────────────────────────────────────────────
function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 md:p-8">
      <div
        className="w-full max-w-[288px] rounded-xl overflow-hidden"
        style={{
          background: "#0e2626",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.30), 0 4px 16px rgba(0,0,0,0.18)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ── 1. Voice command UI ────────────────────────────────────────────────
const WAVE_HEIGHTS = [6, 12, 8, 20, 14, 24, 10, 18, 22, 8, 16, 24, 10, 14, 6, 20, 12, 8];

function VoiceCommandUI() {
  return (
    <UICard>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Captain Voice</p>
            <p className="text-white text-xs font-medium mt-0.5">Active Session</p>
          </div>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-white/40 text-[10px]">Live</span>
          </div>
        </div>

        {/* Mic + ripple rings */}
        <div className="flex justify-center py-3">
          <div className="relative w-[72px] h-[72px] flex items-center justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-emerald-400/25"
                style={{ width: 36 + i * 18, height: 36 + i * 18 }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 0.1, 0.5] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, ease: "easeOut" }}
              />
            ))}
            <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
                <rect x="4" y="0" width="6" height="9" rx="3" fill="#34d399" />
                <path d="M1 7c0 3.3 2.7 6 6 6s6-2.7 6-6" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="7" y1="13" x2="7" y2="15" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>

        {/* Waveform */}
        <div className="flex items-center justify-center gap-0.5 h-7">
          {WAVE_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-full bg-white/40"
              style={{ width: 2.5 }}
              animate={{ height: [3, h, 3] }}
              transition={{ duration: 0.5 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 }}
            />
          ))}
        </div>

        {/* Command */}
        <div className="bg-white/[0.05] rounded-lg p-3 space-y-1.5">
          <p className="text-white/30 text-[9px] uppercase tracking-widest">Last command</p>
          <p className="text-white/90 text-xs">"Navigate to port slot 7B"</p>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            <p className="text-emerald-400 text-[10px]">Slot 7B confirmed · 10:47</p>
          </div>
        </div>
      </div>
    </UICard>
  );
}

// ── 2. Predictive maintenance UI ───────────────────────────────────────
const MAINTENANCE_ITEMS = [
  { name: "Engine", value: 96, color: "#34d399" },
  { name: "Propeller", value: 82, color: "#34d399" },
  { name: "Navigation", value: 88, color: "#34d399" },
  { name: "Fuel Pump", value: 34, color: "#fbbf24", alert: true },
];

function PredictiveMaintenanceUI() {
  return (
    <UICard>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">System Health</p>
            <p className="text-white text-xs font-medium mt-0.5">MV Pacific Rover</p>
          </div>
          <span className="text-white/30 text-[10px]">2m ago</span>
        </div>

        <div className="space-y-3">
          {MAINTENANCE_ITEMS.map((item, i) => (
            <div key={item.name}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  {item.alert && (
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                  )}
                  <span className="text-white/60 text-[10px]">{item.name}</span>
                </div>
                <span className="text-[10px] tabular-nums" style={{ color: item.color }}>
                  {item.value}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.65, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className="flex items-start gap-2 rounded-lg p-3"
          style={{ background: "rgba(251,191,36,0.08)", border: "1px solid rgba(251,191,36,0.2)" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-0.5"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <div>
            <p className="text-amber-400 text-[10px] font-medium">Critical alert</p>
            <p className="text-white/40 text-[10px] mt-0.5">Fuel pump inspection within 18h</p>
          </div>
        </motion.div>
      </div>
    </UICard>
  );
}

// ── 3. Fleet analytics UI ──────────────────────────────────────────────
const CHART_POINTS: [number, number][] = [
  [0, 70], [22, 54], [40, 62], [56, 38], [72, 48], [88, 26], [104, 38], [124, 16], [144, 28], [164, 10], [182, 20],
];
const chartLine = CHART_POINTS.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
const chartArea = `${chartLine} L182,82 L0,82 Z`;

const FLEET_METRICS = [
  { label: "Speed", value: "14.2kn" },
  { label: "Fuel eff.", value: "87%" },
  { label: "On-time", value: "94%" },
];

function FleetAnalyticsUI() {
  return (
    <UICard>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Fleet Performance</p>
            <p className="text-white text-xs font-medium mt-0.5">12 vessels · Live</p>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 8L4 4.5L7 6.5L9.5 2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[10px] font-semibold">+12.4%</span>
          </div>
        </div>

        <div className="relative h-[64px] rounded-lg overflow-hidden" style={{ background: "rgba(255,255,255,0.04)" }}>
          <svg viewBox="0 0 182 82" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
            <defs>
              <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path
              d={chartArea}
              fill="url(#aGrad)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            />
            <motion.path
              d={chartLine}
              stroke="#34d399"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {FLEET_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              className="rounded-lg p-2 text-center"
              style={{ background: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.3 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-white text-xs font-semibold tabular-nums">{m.value}</p>
              <p className="text-white/35 text-[9px] mt-0.5">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </UICard>
  );
}

// ── 4. Crew hub UI ─────────────────────────────────────────────────────
const CREW_MESSAGES = [
  { avatar: "CK", color: "#6366f1", name: "Chief Officer Kim", text: "ETA updated for slot 7B", time: "10:24" },
  { avatar: "ME", color: "#0891b2", name: "Chief Engineer", text: "Fuel check complete ✓", time: "10:31" },
  { avatar: "BR", color: "#059669", name: "Bridge Officer", text: "Moorings cleared, ready", time: "10:38" },
];

function CrewHubUI() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setVisibleCount(1), 250),
      setTimeout(() => setShowTyping(true), 900),
      setTimeout(() => { setShowTyping(false); setVisibleCount(2); }, 1700),
      setTimeout(() => setShowTyping(true), 2300),
      setTimeout(() => { setShowTyping(false); setVisibleCount(3); }, 3100),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <UICard>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Crew Hub</p>
            <p className="text-white text-xs font-medium mt-0.5">Bridge Channel</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white/40 text-[10px]">3 online</span>
          </div>
        </div>

        <div className="space-y-2.5 min-h-[120px]">
          {CREW_MESSAGES.slice(0, visibleCount).map((msg, i) => (
            <motion.div
              key={i}
              className="flex gap-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold text-white"
                style={{ background: msg.color }}
              >
                {msg.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white/60 text-[10px] font-medium">{msg.name}</span>
                  <span className="text-white/25 text-[9px]">{msg.time}</span>
                </div>
                <p className="text-white/80 text-[11px] mt-0.5">{msg.text}</p>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {showTyping && (
              <motion.div
                className="flex gap-2 items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0" />
                <div
                  className="flex items-center gap-1 px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.07)" }}
                >
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      className="w-1 h-1 rounded-full bg-white/40"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, delay: d * 0.12, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </UICard>
  );
}

// ── 5. Berth scheduling UI (Smart Port) ────────────────────────────────
const BERTHS = [
  { id: "B-01", vessel: "MV Pacific Rover", status: "occupied", fill: 1.0, color: "#6366f1" },
  { id: "B-02", vessel: "Docking...", status: "docking", color: "#f59e0b" },
  { id: "B-03", vessel: "Available", status: "available", fill: 0, color: "#34d399" },
  { id: "B-04", vessel: "Minerva Legacy", status: "occupied", fill: 1.0, color: "#0891b2" },
];

function BerthSchedulingUI() {
  return (
    <UICard>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Berth Allocation</p>
            <p className="text-white text-xs font-medium mt-0.5">Port Alpha · T2</p>
          </div>
          <span className="text-white/30 text-[10px]">Live</span>
        </div>

        <div className="space-y-2">
          {BERTHS.map((berth, i) => (
            <motion.div
              key={berth.id}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, delay: i * 0.09, ease: [0.23, 1, 0.32, 1] }}
            >
              <span className="text-white/30 text-[9px] w-7 shrink-0 tabular-nums">{berth.id}</span>
              <div className="flex-1 h-6 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                <motion.div
                  className="h-full flex items-center px-2 rounded"
                  style={{
                    background: `${berth.color}28`,
                    borderLeft: `2px solid ${berth.color}`,
                  }}
                  initial={{ width: 0 }}
                  animate={
                    berth.status === "docking"
                      ? { width: ["25%", "70%", "25%"] }
                      : berth.status === "available"
                      ? { width: "18%" }
                      : { width: "100%" }
                  }
                  transition={
                    berth.status === "docking"
                      ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.6, delay: i * 0.09, ease: [0.23, 1, 0.32, 1] }
                  }
                >
                  <span className="text-[9px] truncate whitespace-nowrap" style={{ color: berth.color }}>
                    {berth.vessel}
                  </span>
                </motion.div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: berth.color }} />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-0.5">
          {[["#6366f1", "Occupied"], ["#f59e0b", "Docking"], ["#34d399", "Available"]].map(([color, label]) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: color }} />
              <span className="text-white/35 text-[9px]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </UICard>
  );
}

// ── 6. Vessel arrival predictions UI ──────────────────────────────────
const VESSELS = [
  { name: "MV Coral Star", base: 847, status: "On schedule", statusColor: "text-white/40" },
  { name: "Minerva Legacy", base: 2134, status: "Early +12m", statusColor: "text-emerald-400" },
  { name: "Pacific Voyager", base: 5672, status: "Delayed −5m", statusColor: "text-rose-400" },
];

function VesselArrivalUI() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (base: number) => {
    const r = Math.max(0, base - tick);
    const h = Math.floor(r / 3600);
    const m = Math.floor((r % 3600) / 60);
    const s = r % 60;
    if (h > 0) return `${h}h ${String(m).padStart(2, "0")}m`;
    return `${m}m ${String(s).padStart(2, "0")}s`;
  };

  return (
    <UICard>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Next Arrivals</p>
            <p className="text-white text-xs font-medium mt-0.5">AIS · Auto-updated</p>
          </div>
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
        </div>

        <div className="space-y-2">
          {VESSELS.map((v, i) => (
            <motion.div
              key={v.name}
              className="flex items-center justify-between p-2.5 rounded-lg"
              style={{ background: "rgba(255,255,255,0.05)" }}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div>
                <p className="text-white/85 text-[11px] font-medium">{v.name}</p>
                <p className={`text-[9px] mt-0.5 ${v.statusColor}`}>{v.status}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-xs font-semibold tabular-nums">{fmt(v.base)}</p>
                <p className="text-white/25 text-[9px]">ETA</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </UICard>
  );
}

// ── 7. Revenue intelligence UI ─────────────────────────────────────────
const REV_BARS = [
  { month: "Sep", value: 68 },
  { month: "Oct", value: 75 },
  { month: "Nov", value: 62 },
  { month: "Dec", value: 82 },
  { month: "Jan", value: 71 },
  { month: "Feb", value: 91 },
];

function RevenueIntelUI() {
  return (
    <UICard>
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Revenue Intel</p>
            <p className="text-white text-xs font-medium mt-0.5">Port Alpha · 6-mo</p>
          </div>
          <div className="text-right">
            <p className="text-emerald-400 text-xs font-bold">$2.4M</p>
            <p className="text-white/30 text-[9px]">↑ 18% YoY</p>
          </div>
        </div>

        <div className="flex items-end gap-1.5" style={{ height: 64 }}>
          {REV_BARS.map((bar, i) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full relative flex items-end" style={{ height: 52 }}>
                <motion.div
                  className="w-full rounded-t"
                  style={{
                    background: i === REV_BARS.length - 1 ? "#34d399" : "rgba(255,255,255,0.14)",
                    minHeight: 2,
                  }}
                  initial={{ height: 0 }}
                  animate={{ height: (bar.value / 100) * 52 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
              <span className="text-white/25 text-[8px]">{bar.month}</span>
            </div>
          ))}
        </div>

        <motion.div
          className="rounded-lg p-3"
          style={{ background: "rgba(52,211,153,0.09)", border: "1px solid rgba(52,211,153,0.18)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.65 }}
        >
          <p className="text-emerald-400 text-[10px] font-medium">Opportunity detected</p>
          <p className="text-white/40 text-[9px] mt-0.5">Anchorage fees 23% below regional benchmark</p>
        </motion.div>
      </div>
    </UICard>
  );
}

// ── 8. Compliance automation UI ────────────────────────────────────────
const COMPLIANCE_ITEMS = [
  "Vessel Safety Certificate",
  "Crew Certification Docs",
  "Port State Control Form",
  "Cargo Manifest Submitted",
  "Environmental Compliance",
];

function ComplianceUI() {
  const [checked, setChecked] = useState(0);

  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      count++;
      setChecked(count);
      if (count >= COMPLIANCE_ITEMS.length) clearInterval(id);
    }, 520);
    return () => clearInterval(id);
  }, []);

  return (
    <UICard>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/40 text-[9px] uppercase tracking-widest">Compliance Check</p>
            <p className="text-white text-xs font-medium mt-0.5">Pre-arrival Filing</p>
          </div>
          <AnimatePresence>
            {checked >= COMPLIANCE_ITEMS.length && (
              <motion.div
                className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", duration: 0.35, bounce: 0.3 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-emerald-400 text-[9px] font-medium">Compliant</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
            <motion.div
              className="h-full rounded-full bg-emerald-400"
              animate={{ width: `${(checked / COMPLIANCE_ITEMS.length) * 100}%` }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            />
          </div>
          <p className="text-white/30 text-[9px] mt-1">{checked} of {COMPLIANCE_ITEMS.length} verified</p>
        </div>

        <div className="space-y-1.5">
          {COMPLIANCE_ITEMS.map((item, i) => (
            <motion.div
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.06 }}
            >
              <div
                className="w-[14px] h-[14px] rounded flex items-center justify-center shrink-0"
                style={{
                  background: i < checked ? "#34d399" : "rgba(255,255,255,0.08)",
                  border: i < checked ? "none" : "1px solid rgba(255,255,255,0.15)",
                  transition: "background 0.25s",
                }}
              >
                {i < checked && (
                  <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                    <motion.path
                      d="M1 3.5l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.22 }}
                    />
                  </svg>
                )}
              </div>
              <span
                className="text-[10px]"
                style={{ color: i < checked ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.25)", transition: "color 0.25s" }}
              >
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </UICard>
  );
}

// ── Feature UI map ─────────────────────────────────────────────────────
const FEATURE_UIS: Record<string, React.FC[]> = {
  wayship: [VoiceCommandUI, PredictiveMaintenanceUI, FleetAnalyticsUI, CrewHubUI],
  smartport: [BerthSchedulingUI, VesselArrivalUI, RevenueIntelUI, ComplianceUI],
};

// ── Main section ───────────────────────────────────────────────────────
export function VolteoAdvantageSection() {
  const [activeTab, setActiveTab] = useState("wayship");
  const [openFeature, setOpenFeature] = useState(0);
  const [previewFeature, setPreviewFeature] = useState(0);

  const activeData = tabs.find((t) => t.key === activeTab)!;

  // Sync with URL hash
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;
      if (hash === "#smartport") setActiveTab("smartport");
      if (hash === "#wayship") setActiveTab("wayship");
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Reset on tab change
  useEffect(() => {
    setOpenFeature(0);
    setPreviewFeature(0);
  }, [activeTab]);

  const handleFeatureClick = (i: number) => {
    if (openFeature === i) {
      setOpenFeature(-1);
    } else {
      setOpenFeature(i);
      setPreviewFeature(i);
    }
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const FeatureUI = FEATURE_UIS[activeTab]?.[previewFeature];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: [0.23, 1, 0.32, 1] },
    }),
  };

  return (
    <section className="bg-[#f3f2ee]" id="advantage">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">

        {/* Title */}
        <motion.div
          className="pt-16 md:pt-24"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <h2
            className="text-[#103435] tracking-tight"
            style={{ fontSize: "clamp(32px, 3.5vw, 54px)" }}
          >
            <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
              The Volteo{" "}
            </span>
            <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300 }}>
              Advantage
            </span>
          </h2>
        </motion.div>

        {/* Product Panel */}
        <motion.div
          className="mt-10 mb-20 md:mb-28 border border-[#D9D9D9]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.12}
        >
          {/* Tab Bar */}
          <div className="flex border-b border-[#D9D9D9]">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`relative flex items-center justify-center gap-2 px-8 py-4 transition-colors duration-150 ease-out active:scale-[0.99] will-change-transform ${
                  activeTab === tab.key ? "bg-[#eeece5]" : "bg-transparent hover:bg-[#eeece5]/50"
                }`}
                style={{ flex: 1, borderRight: "1px solid #D9D9D9" }}
              >
                <span
                  className="transition-colors duration-150"
                  style={{
                    fontFamily: "'TT Hoves Pro', sans-serif",
                    fontWeight: activeTab === tab.key ? 500 : 400,
                    fontSize: 18,
                    color: activeTab === tab.key ? "#000" : "#464646",
                  }}
                >
                  {tab.label}
                </span>
                {activeTab === tab.key && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#103435]"
                    layoutId="tab-indicator"
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            >

              {/* ── Row 1: Heading (left) | Description (right) ─────── */}
              <div className="flex flex-col lg:flex-row border-b border-[#D9D9D9]">

                {/* Left: title + link */}
                <div className="lg:w-1/2 px-8 pt-8 pb-7 border-b lg:border-b-0">
                  <h3
                    className="text-black mb-4"
                    style={{
                      fontFamily: "'TT Hoves Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(22px, 2vw, 34px)",
                    }}
                  >
                    {activeData.title}
                  </h3>
                  {activeData.href?.startsWith("/") ? (
                    <Link
                      to={activeData.href}
                      className="inline-flex items-center gap-1.5 border-b border-[#2f615a] pb-0.5 text-[#2f615a] transition-opacity hover:opacity-70"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
                    >
                      {activeData.subtitle}
                      <ArrowUpRight size={15} />
                    </Link>
                  ) : (
                    <a
                      href={activeData.href ?? "#"}
                      className="inline-flex items-center gap-1.5 border-b border-[#2f615a] pb-0.5 text-[#2f615a] transition-opacity hover:opacity-70"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
                    >
                      {activeData.subtitle}
                      <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>

                {/* Right: description */}
                <div className="lg:w-1/2 px-8 pt-8 pb-7 flex items-start">
                  <p
                    className="text-[#464646] leading-[1.6] max-w-[480px]"
                    style={{
                      fontFamily: "'TT Hoves Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: "clamp(13px, 1.05vw, 16px)",
                    }}
                  >
                    {activeData.description}
                  </p>
                </div>

              </div>

              {/* ── Row 2: Feature list (left) | Animated UI (right) ── */}
              <div className="flex flex-col lg:flex-row min-h-[380px]">

                {/* Feature accordion */}
                <div className="lg:w-1/2 lg:border-r border-[#D9D9D9]">
                  {activeData.features.map((feature, i) => {
                    const isOpen = openFeature === i;
                    const isPreview = previewFeature === i;
                    return (
                      <div key={i} className="border-b border-[#D9D9D9] last:border-b-0">
                        <button
                          onClick={() => handleFeatureClick(i)}
                          className={`w-full flex items-center justify-between px-8 py-4 text-left transition-colors duration-200 group ${
                            isPreview ? "bg-[#eeece5]" : "hover:bg-[#eeece5]/60"
                          }`}
                        >
                          <span
                            className={`transition-colors duration-150 ${isPreview ? "text-[#1d1d1d]" : "text-[#464646] group-hover:text-[#1d1d1d]"}`}
                            style={{
                              fontFamily: "'TT Hoves Pro', sans-serif",
                              fontWeight: isPreview ? 500 : 400,
                              fontSize: "clamp(13px, 1vw, 16px)",
                            }}
                          >
                            {feature.label}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: "spring", duration: 0.3, bounce: 0.15 }}
                            className="shrink-0 ml-4"
                          >
                            <Plus
                              size={18}
                              className={`transition-colors duration-150 ${isOpen ? "text-[#103435]" : "text-[#2f615a]"}`}
                            />
                          </motion.div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                              style={{ overflow: "hidden" }}
                            >
                              <p
                                className="px-8 pb-5 text-[#5a5a5a] leading-[1.6]"
                                style={{
                                  fontFamily: "'TT Hoves Pro', sans-serif",
                                  fontWeight: 400,
                                  fontSize: "clamp(12px, 0.95vw, 14px)",
                                }}
                              >
                                {feature.description}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Animated feature UI */}
                <div
                  className="lg:w-1/2 overflow-hidden relative min-h-[320px]"
                  style={{ background: "linear-gradient(145deg, #0e2828 0%, #091e1e 100%)" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTab}-${previewFeature}`}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                      {FeatureUI && <FeatureUI />}
                    </motion.div>
                  </AnimatePresence>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
