/**
 * Animated preview for the Products mega-menu.
 * Wayship: voice waveform, LLM chat snippet, digital logbook rows.
 * Smartport: berth / live-ops style timeline bars.
 */

const previewStyles = `
@keyframes wtp-voice-bar {
  0%, 100% { transform: scaleY(0.28); opacity: 0.65; }
  50% { transform: scaleY(1); opacity: 1; }
}
@keyframes wtp-chat-shimmer {
  0% { opacity: 0.35; }
  50% { opacity: 1; }
  100% { opacity: 0.35; }
}
@keyframes wtp-log-row {
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
}
@keyframes wtp-typing-dot {
  0%, 100% { transform: scale(1); opacity: 0.55; }
  50% { transform: scale(1.2); opacity: 1; }
}
@keyframes wtp-live-ping {
  0% { transform: scale(1); opacity: 0.45; }
  70%, 100% { transform: scale(2.1); opacity: 0; }
}
@keyframes wtp-berth-fill {
  0% { transform: scaleY(0.22); opacity: 0.5; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0.4); opacity: 0.65; }
}
@keyframes wtp-timeline-move {
  0% { transform: translateX(-8%); }
  100% { transform: translateX(8%); }
}

@media (prefers-reduced-motion: reduce) {
  .wtp-voice-bar,
  .wtp-chat-line,
  .wtp-log-line,
  .wtp-berth-bar,
  .wtp-timeline-glow,
  .wtp-live-ring,
  .wtp-typing-dot {
    animation: none !important;
  }
  .wtp-voice-bar { transform: scaleY(0.55); opacity: 0.85; }
  .wtp-chat-line { opacity: 0.9; }
  .wtp-log-line { opacity: 0.75; }
  .wtp-berth-bar { transform: scaleY(0.72); opacity: 0.85; }
  .wtp-timeline-glow { transform: translateX(0); opacity: 0.7; }
  .wtp-live-ring { opacity: 0; }
}
`;

function VoiceBars() {
  const heights = [0.4, 0.85, 0.55, 1, 0.7, 0.45, 0.95, 0.6, 0.35, 0.8, 0.5, 0.75];
  return (
    <div className="flex items-end justify-center gap-[3px] h-[52px] px-2" aria-hidden>
      {heights.map((origin, i) => (
        <span
          key={i}
          className="wtp-voice-bar w-[3px] rounded-full bg-[#0e3233]/75 origin-bottom"
          style={{
            height: `${origin * 100}%`,
            animation: `wtp-voice-bar ${1.1 + (i % 4) * 0.12}s ease-in-out ${i * 0.06}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function WayshipPreview() {
  return (
    <div
      className="relative h-full min-h-[220px] w-full overflow-hidden bg-gradient-to-br from-[#faf9f6] via-[#f3f1eb] to-[#e8e6df] p-3 flex flex-col gap-2"
      role="img"
      aria-label="Wayship preview: voice assistant, AI chat, and digital logbook"
    >
      <div className="flex items-center justify-between gap-2 shrink-0">
        <span
          className="text-[11px] font-semibold tracking-tight text-[#0e3233]"
          style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}
        >
          Wayship
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-medium text-[#416668]">
          <span className="relative flex h-2 w-2">
            <span
              className="wtp-live-ring absolute inline-flex h-full w-full rounded-full bg-[#2d6a4f]"
              style={{ animation: "wtp-live-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2d6a4f]" />
          </span>
          Live
        </span>
      </div>

      <div className="flex gap-2 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-end w-[72px] shrink-0 rounded-md border border-[#D9D9D9]/80 bg-white/60 backdrop-blur-[2px] px-1 pt-2 pb-2">
          <span
            className="text-[9px] uppercase tracking-[0.08em] text-[#0e3233]/55 mb-1 text-center leading-tight"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}
          >
            Voice AI
          </span>
          <VoiceBars />
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="rounded-md border border-[#D9D9D9]/80 bg-white/70 px-2.5 py-2 shadow-sm">
            <p
              className="text-[9px] uppercase tracking-wide text-[#0e3233]/50 mb-1"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}
            >
              AI Assistant
            </p>
            <div className="space-y-1.5">
              <div
                className="wtp-chat-line h-1.5 rounded-full bg-[#0e3233]/18"
                style={{ width: "92%", animation: "wtp-chat-shimmer 2.4s ease-in-out infinite" }}
              />
              <div
                className="wtp-chat-line h-1.5 rounded-full bg-[#0e3233]/14"
                style={{ width: "68%", animation: "wtp-chat-shimmer 2.4s ease-in-out 0.35s infinite" }}
              />
              <div className="flex gap-1 pt-0.5">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="wtp-typing-dot h-1 w-1 rounded-full bg-[#416668]/55"
                    style={{ animation: `wtp-typing-dot 1.15s ease-in-out ${d * 0.18}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-md border border-[#D9D9D9]/80 bg-[#0e3233]/[0.04] px-2.5 py-1.5 flex-1 min-h-0">
            <p
              className="text-[9px] uppercase tracking-wide text-[#0e3233]/55 mb-1"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}
            >
              Digital Records
            </p>
            <div className="space-y-1 font-mono text-[9px] leading-tight text-[#262627]/90">
              <div
                className="wtp-log-line flex justify-between gap-2 border-b border-[#D9D9D9]/50 pb-0.5"
                style={{ animation: "wtp-log-row 3s ease-in-out infinite" }}
              >
                <span className="text-[#416668]">08:00</span>
                <span className="truncate opacity-90">Watch handover</span>
              </div>
              <div
                className="wtp-log-line flex justify-between gap-2 border-b border-[#D9D9D9]/50 pb-0.5"
                style={{ animation: "wtp-log-row 3s ease-in-out 0.5s infinite" }}
              >
                <span className="text-[#416668]">12:14</span>
                <span className="truncate opacity-90">Tank sounding</span>
              </div>
              <div
                className="wtp-log-line flex justify-between gap-2"
                style={{ animation: "wtp-log-row 3s ease-in-out 1s infinite" }}
              >
                <span className="text-[#416668]">16:02</span>
                <span className="truncate opacity-90">Safety round</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SmartportPreview() {
  return (
    <div
      className="relative h-full min-h-[220px] w-full overflow-hidden bg-gradient-to-br from-[#f8f9fa] via-[#eef2f3] to-[#e4e8ea] p-3 flex flex-col gap-2"
      role="img"
      aria-label="Smartport preview: berth occupancy and port timeline"
    >
      <div className="flex items-center justify-between shrink-0">
        <span
          className="text-[11px] font-semibold tracking-tight text-[#0e3233]"
          style={{ fontFamily: "'TT Hoves Pro', sans-serif" }}
        >
          Smartport
        </span>
        <span className="text-[10px] font-medium text-[#5c6f70]">Live berth view</span>
      </div>

      <div className="flex gap-1.5 flex-1 min-h-[56px] items-end">
        {(
          [
            ["A1", 34],
            ["A2", 46],
            ["B1", 28],
            ["B2", 40],
            ["C1", 36],
          ] as const
        ).map(([label, h], i) => (
          <div key={label} className="flex-1 flex flex-col items-center gap-1 min-w-0 h-full justify-end">
            <div
              className="wtp-berth-bar w-full rounded-t-sm bg-gradient-to-t from-[#0e3233]/85 to-[#416668]/75 origin-bottom"
              style={{
                height: h,
                animation: `wtp-berth-fill ${2.2 + i * 0.15}s ease-in-out ${i * 0.12}s infinite`,
              }}
            />
            <span className="text-[8px] font-medium text-[#464646]/90 tabular-nums">{label}</span>
          </div>
        ))}
      </div>

      <div className="relative h-7 rounded-md border border-[#D9D9D9]/70 bg-white/50 overflow-hidden">
        <div
          className="wtp-timeline-glow absolute inset-y-0 left-0 w-[28%] rounded-md bg-gradient-to-r from-transparent via-[#2d6a4f]/25 to-transparent"
          style={{ animation: "wtp-timeline-move 4s ease-in-out infinite alternate" }}
        />
        <div className="absolute inset-x-2 inset-y-1.5 flex items-center justify-between text-[8px] text-[#464646]/80 font-mono">
          <span>ETA window</span>
          <span>Compliance</span>
        </div>
      </div>
    </div>
  );
}

export type ProductWalkthroughKey = "wayship" | "smartport";

export function ProductWalkthroughPreview({ product }: { product: ProductWalkthroughKey }) {
  return (
    <>
      <style>{previewStyles}</style>
      <div className="border border-[#D9D9D9] bg-[#eeece5] overflow-hidden rounded-none h-full">
        {product === "wayship" ? <WayshipPreview /> : <SmartportPreview />}
      </div>
    </>
  );
}
