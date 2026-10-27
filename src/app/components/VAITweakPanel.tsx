export const GRAIN_MAX = 200;

export function VAITweakPanel({ grain, onGrain }: { grain: number; onGrain: (value: number) => void }) {
  return (
    <div
      className="fixed right-4 top-4 z-[70] flex items-center gap-3 rounded-xl px-4 py-3 text-white"
      style={{
        background: "rgba(16, 22, 16, 0.72)",
        backdropFilter: "blur(12px)",
        fontFamily: "'Geist', sans-serif",
        fontSize: 12,
      }}
    >
      <label htmlFor="vai-grain" style={{ fontWeight: 600 }}>
        Grain
      </label>
      <input
        id="vai-grain"
        type="range"
        min={0}
        max={GRAIN_MAX}
        step={1}
        value={grain}
        onChange={(e) => onGrain(Number(e.target.value))}
        style={{ width: 160, accentColor: "#fff" }}
      />
      <span style={{ width: 36, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{grain}%</span>
    </div>
  );
}
