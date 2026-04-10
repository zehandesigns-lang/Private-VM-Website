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

// ── Shared card wrappers ───────────────────────────────────────────────
// Light card — for Wayship features (site theme: cream, no radius)
function UICardLight({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
      <div
        className="w-full max-w-[450px] overflow-hidden"
        style={{
          background: "#f3f2ee",
          border: "1px solid #D9D9D9",
          boxShadow: "0 4px 20px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// Dark card — for SmartPort features (keeps existing dark theme)
function UICard({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-10">
      <div
        className="w-full max-w-[432px] rounded-xl overflow-hidden"
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

// ── Shared light row ────────────────────────────────────────────────────
function LRow({ label, value, delay = 0, accent = false }: { label: string; value: string; delay?: number; accent?: boolean }) {
  return (
    <motion.div
      className="flex justify-between items-baseline px-3 py-1.5 border-b border-[#D9D9D9] last:border-0"
      initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.16, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="text-[#464646] text-[9px] font-mono tracking-wide">{label}</span>
      <span className={`text-[10px] ${accent ? "text-[#103435]" : "text-[#1d1d1d]"}`}
        style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: accent ? 600 : 500 }}>{value}</span>
    </motion.div>
  );
}

function LHeader({ title, meta, pulse }: { title: string; meta: string; pulse?: boolean }) {
  return (
    <div className="flex items-center justify-between px-3 py-2.5 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
      <p className="text-[#103435] text-[9px] uppercase tracking-[0.1em]"
        style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}>{title}</p>
      <div className="flex items-center gap-1.5">
        {pulse && (
          <motion.span className="w-1.5 h-1.5 bg-red-500"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.9, repeat: Infinity }} />
        )}
        <span className="text-[#464646] text-[9px]">{meta}</span>
      </div>
    </div>
  );
}

// ── 1. Voice AI capture UI ─────────────────────────────────────────────
const WAVE_HEIGHTS = [5, 10, 7, 17, 12, 22, 9, 16, 20, 7, 14, 22, 9, 12, 5, 18, 10, 7];

function VoiceCommandUI() {
  const [phase, setPhase] = useState<"recording" | "structured">("recording");

  useEffect(() => {
    const t = setTimeout(() => setPhase("structured"), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <UICardLight>
      <LHeader title="Voice AI · Recording" meta="Rec" pulse />
      <div className="px-3 pt-3 pb-3 space-y-2.5">
        {/* Context pill */}
        <div className="border border-[#D9D9D9] px-3 py-2" style={{ background: "#eeece5" }}>
          <p className="text-[#103435] text-[10px]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
            Aux engine #2 · 02:14 · Chief Engineer
          </p>
          <p className="text-[#464646] text-[9px] mt-0.5">Port of Colombo approach</p>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-[2px] h-7 px-1">
          {WAVE_HEIGHTS.map((h, i) => (
            <motion.div key={i}
              style={{ width: 2.5, background: "#103435" }}
              animate={phase === "recording" ? { height: [2, h, 2] } : { height: 2, opacity: 0.2 }}
              transition={{ duration: 0.35 + (i % 4) * 0.06, repeat: phase === "recording" ? Infinity : 0, ease: "easeInOut", delay: i * 0.025 }}
            />
          ))}
        </div>

        {/* Spoken */}
        <p className="text-[#464646] text-[10px] leading-[1.5] italic border-l-2 border-[#103435] pl-2">
          "Aux two running warm — lube oil temp up 8 degrees. Happened once before in April."
        </p>

        {/* Divider */}
        <AnimatePresence>
          {phase === "structured" && (
            <motion.div className="flex items-center gap-2"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.14 }}>
              <div className="flex-1 h-px bg-[#D9D9D9]" />
              <span className="text-[#103435] text-[8px] uppercase tracking-widest"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}>structured instantly</span>
              <div className="flex-1 h-px bg-[#D9D9D9]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Structured entry */}
        <AnimatePresence>
          {phase === "structured" && (
            <motion.div className="border border-[#D9D9D9]"
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#D9D9D9]" style={{ background: "#eeece5" }}>
                <span className="text-[#103435] text-[9px] uppercase tracking-widest"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}>Entry logged</span>
                <span className="text-emerald-700 text-[9px] flex items-center gap-1">
                  <motion.span className="w-1 h-1 bg-emerald-600 inline-block"
                    animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity }} />
                  Live
                </span>
              </div>
              {[["System", "Auxiliary engine #2"], ["Category", "#machinery · #advisory"], ["Observation", "Lube oil temp +8°C"], ["Logged by", "Chief Engineer · 02:14"]].map(([k, v], i) => (
                <LRow key={k} label={k} value={v} delay={i * 0.05} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </UICardLight>
  );
}

// ── 2. LLM chat UI ─────────────────────────────────────────────────────
const CHAT_QA = [
  { q: "What's the status of aux engine 2?", a: "3 observations logged. Lube oil temp elevated +8°C at last rounds — tagged #advisory. Same pattern from April. No critical flags." },
  { q: "What did the outgoing crew recommend?", a: "From April 18 handover: \"Recommend oil change at Colombo — resolved it last time. Escalate if temp exceeds 85°C before arrival.\"" },
];

function LLMChatUI() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);
    const t2 = setTimeout(() => setStep(2), 1400);
    const t3 = setTimeout(() => setStep(3), 2200);
    const t4 = setTimeout(() => setStep(4), 3200);
    return () => { [t1, t2, t3, t4].forEach(clearTimeout); };
  }, []);

  return (
    <UICardLight>
      <LHeader title="Chat with Wayship · Nordic Swan" meta="Online" />
      <div className="px-3 pt-2.5 pb-3 space-y-2 min-h-[258px]">
        <AnimatePresence>
          {step >= 1 && (
            <motion.div className="ml-auto max-w-[80%]"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}>
              <div className="bg-[#103435] px-3 py-2">
                <p className="text-white text-[10px] leading-[1.5]">{CHAT_QA[0].q}</p>
              </div>
              <p className="text-[#464646] text-[9px] mt-0.5 text-right font-mono">Capt. Mwangi · 06:12</p>
            </motion.div>
          )}
          {step >= 2 && (
            <motion.div className="mr-auto max-w-[88%]"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}>
              <div className="border border-[#D9D9D9] px-3 py-2" style={{ background: "#eeece5" }}>
                <p className="text-[#1d1d1d] text-[10px] leading-[1.55]">{CHAT_QA[0].a}</p>
              </div>
              <p className="text-[#464646] text-[9px] mt-0.5 font-mono">Wayship · 06:12</p>
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div className="ml-auto max-w-[80%]"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}>
              <div className="bg-[#103435] px-3 py-2">
                <p className="text-white text-[10px] leading-[1.5]">{CHAT_QA[1].q}</p>
              </div>
              <p className="text-[#464646] text-[9px] mt-0.5 text-right font-mono">Capt. Mwangi · 06:13</p>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div className="mr-auto max-w-[88%]"
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}>
              <div className="border border-[#D9D9D9] px-3 py-2" style={{ background: "#eeece5" }}>
                <p className="text-[#1d1d1d] text-[10px] leading-[1.55] italic">{CHAT_QA[1].a}</p>
              </div>
              <p className="text-[#464646] text-[9px] mt-0.5 font-mono">Wayship · 06:13</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input */}
        <div className="flex items-center gap-2 border-t border-[#D9D9D9] pt-2 mt-1">
          <div className="flex-1 border border-[#D9D9D9] px-2 py-1.5" style={{ background: "#eeece5" }}>
            <p className="text-[#464646]/50 text-[9px]">Ask about any system or prior observation…</p>
          </div>
          <div className="w-6 h-6 bg-[#103435] flex items-center justify-center shrink-0">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 5h8M6 2l3 3-3 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </UICardLight>
  );
}

// ── 3. Digital logbooks & MARPOL UI ────────────────────────────────────
const LOGBOOK_ROWS = [
  { book: "Bridge Logbook", ref: "BL-2024-0418", status: "Signed", ok: true },
  { book: "Engine Room Log", ref: "ERL-2024-0418", status: "Signed", ok: true },
  { book: "ORB Part I", ref: "MEPC 312(74)", status: "Current", ok: true },
  { book: "Ballast Record Book", ref: "MEPC 369(80)", status: "Current", ok: true },
  { book: "SIRE Package", ref: "Auto-generated", status: "Ready", ok: true },
];

function DigitalLogbooksUI() {
  return (
    <UICardLight>
      <LHeader title="E-Logbooks · Nordic Swan" meta="ABS Approved" />
      <div className="divide-y divide-[#D9D9D9]">
        {LOGBOOK_ROWS.map((row, i) => (
          <motion.div key={row.book}
            className="flex items-center justify-between px-3 py-2"
            initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}>
            <div>
              <p className="text-[#1d1d1d] text-[10px]"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>{row.book}</p>
              <p className="text-[#464646] text-[9px] font-mono mt-0.5">{row.ref}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-700 text-[9px]">{row.status}</span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5l2.5 2.5L8 2.5" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div className="flex items-center justify-between px-3 py-2.5 border-t border-[#D9D9D9]"
        style={{ background: "#eeece5" }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.42 }}>
        <span className="text-[#103435] text-[9px] uppercase tracking-widest"
          style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}>ISO 21745 · MARPOL · 5 Flag States</span>
        <div className="flex items-center gap-1">
          <motion.span className="w-1.5 h-1.5 bg-emerald-600"
            animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
          <span className="text-emerald-700 text-[9px]">Audit ready</span>
        </div>
      </motion.div>
    </UICardLight>
  );
}

// ── 4. Structured handovers UI ─────────────────────────────────────────
const HANDOVER_ITEMS = [
  "247 machinery observations transferred",
  "Aux engine #2 history — 3 entries",
  "Port notes: Colombo, Singapore, Rotterdam",
  "Open advisory: lube oil temp watch",
  "12 defect records with resolution notes",
];

function StructuredHandoversUI() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timers = HANDOVER_ITEMS.map((_, i) => setTimeout(() => setCount(i + 1), 300 + i * 350));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <UICardLight>
      <LHeader title="Crew Handover · Nordic Swan" meta="18 Apr 2024" />
      <div className="px-3 pt-2.5 pb-1 space-y-1.5">
        {/* Transfer bar */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-center">
            <p className="text-[#103435] text-[9px] uppercase tracking-wide"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}>Capt. Eriksson</p>
            <p className="text-[#464646] text-[8px]">Outgoing</p>
          </div>
          <div className="flex-1 mx-3">
            <div className="h-px bg-[#D9D9D9] relative">
              <motion.div className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-[#103435]"
                initial={{ width: 0 }} animate={{ width: `${(count / HANDOVER_ITEMS.length) * 100}%` }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />
              <motion.div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#103435]"
                style={{ left: `${(count / HANDOVER_ITEMS.length) * 100}%`, translateX: "-50%", translateY: "-50%" }}
                animate={{ left: `${(count / HANDOVER_ITEMS.length) * 100}%` }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />
            </div>
            <p className="text-[#103435] text-[8px] text-center mt-1 font-mono">{count}/{HANDOVER_ITEMS.length} transferred</p>
          </div>
          <div className="text-center">
            <p className="text-[#103435] text-[9px] uppercase tracking-wide"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}>Capt. Mwangi</p>
            <p className="text-[#464646] text-[8px]">Incoming</p>
          </div>
        </div>

        {/* Items */}
        <div className="border border-[#D9D9D9] divide-y divide-[#D9D9D9]">
          {HANDOVER_ITEMS.map((item, i) => (
            <AnimatePresence key={item}>
              {i < count && (
                <motion.div className="flex items-center gap-2 px-3 py-1.5"
                  initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.14, ease: [0.23, 1, 0.32, 1] }}>
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5l2 2L7.5 2" stroke="#059669" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-[#1d1d1d] text-[9px]"
                    style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 }}>{item}</span>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {count === HANDOVER_ITEMS.length && (
          <motion.div className="mx-3 mb-3 px-3 py-2 border border-[#103435]/20 flex items-center justify-between"
            style={{ background: "rgba(16,52,53,0.05)" }}
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}>
            <span className="text-[#103435] text-[9px]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>Handover complete</span>
            <span className="text-emerald-700 text-[9px]">Knowledge stays on the ship ✓</span>
          </motion.div>
        )}
      </AnimatePresence>
    </UICardLight>
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
  wayship: [VoiceCommandUI, LLMChatUI, DigitalLogbooksUI, StructuredHandoversUI],
  smartport: [BerthSchedulingUI, VesselArrivalUI, RevenueIntelUI, ComplianceUI],
};

function useIsLargeViewport() {
  const [isLg, setIsLg] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : false
  );

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => setIsLg(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isLg;
}

// ── Main section ───────────────────────────────────────────────────────
export function VolteoAdvantageSection() {
  const [activeTab, setActiveTab] = useState("wayship");
  const [openFeature, setOpenFeature] = useState(0);
  const [previewFeature, setPreviewFeature] = useState(0);
  const isLg = useIsLargeViewport();

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

  const handleMobileFeatureTab = (i: number) => {
    setPreviewFeature(i);
    setOpenFeature(i);
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

              {/* ── Row 2: mobile = preview on top + horizontal tabs; desktop = accordion | preview ── */}
              {isLg ? (
                <div className="flex flex-row min-h-[570px]">
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

                  <div
                    className="lg:w-1/2 overflow-hidden relative min-h-[480px]"
                    style={{ background: "#eeece5" }}
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
              ) : (
                <div className="flex flex-col border-t border-[#D9D9D9]">
                  <div
                    className="relative w-full overflow-hidden min-h-[300px] sm:min-h-[360px]"
                    style={{ background: "#eeece5" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`m-${activeTab}-${previewFeature}`}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.01 }}
                        transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      >
                        {FeatureUI && <FeatureUI />}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="border-t border-[#D9D9D9] bg-[#f3f2ee]">
                    <div
                      className="flex gap-2 overflow-x-auto overscroll-x-contain px-4 py-3 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                      role="tablist"
                      aria-label="Product features"
                    >
                      {activeData.features.map((feature, i) => {
                        const selected = previewFeature === i;
                        return (
                          <button
                            key={i}
                            type="button"
                            role="tab"
                            aria-selected={selected}
                            id={`advantage-feature-tab-${activeTab}-${i}`}
                            onClick={() => handleMobileFeatureTab(i)}
                            className={`shrink-0 snap-start max-w-[min(280px,78vw)] rounded-none border px-3 py-2.5 text-left transition-colors duration-150 ${
                              selected
                                ? "border-[#103435] bg-[#eeece5] shadow-sm"
                                : "border-[#D9D9D9] bg-white/80 active:bg-[#eeece5]/80"
                            }`}
                            style={{
                              fontFamily: "'TT Hoves Pro', sans-serif",
                              fontWeight: selected ? 500 : 400,
                              fontSize: 12,
                              lineHeight: 1.35,
                              color: selected ? "#1d1d1d" : "#464646",
                            }}
                          >
                            {feature.label}
                          </button>
                        );
                      })}
                    </div>
                    <div
                      className="px-4 pb-5 pt-1 border-t border-[#D9D9D9]/80"
                      role="tabpanel"
                      aria-labelledby={`advantage-feature-tab-${activeTab}-${previewFeature}`}
                    >
                      <p
                        className="text-[#5a5a5a] leading-[1.65]"
                        style={{
                          fontFamily: "'TT Hoves Pro', sans-serif",
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        {activeData.features[previewFeature]?.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
