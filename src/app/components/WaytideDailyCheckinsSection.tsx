import type { CSSProperties } from "react";
import heroBg from "@/assets/waytide-hero-bg.png";

const cardStyle = {
  fontFamily: "'LT Cushion', serif",
  fontWeight: 400,
  fontSize: 17,
  lineHeight: 1.4,
} as const;

const nameStyle = {
  color: "#1F8A3D",
  fontWeight: 500,
} as const;

function ChrisCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`bg-white border border-[#E4E2DC] rounded-2xl px-5 py-4 ${className ?? ""}`} style={style}>
      <p className="text-[#171717]" style={cardStyle}>
        Way learned from <span style={nameStyle}>🧑‍✈️ Chris</span> that MV Solara always burns
        slightly more on the return leg from Fujairah.
      </p>
    </div>
  );
}

function RohanCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={`bg-white border border-[#E4E2DC] rounded-2xl px-5 py-4 ${className ?? ""}`} style={style}>
      <p className="text-[#171717]" style={cardStyle}>
        Way learned from <span style={nameStyle}>🧑🏽 Rohan</span> to flag consumption anomalies
        for MV Solara at 5%, not the fleet default of 8%.
      </p>
    </div>
  );
}

export function WaytideDailyCheckinsSection() {
  return (
    <section
      className="px-6 md:px-16 py-24 md:py-32"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[680px] mx-auto text-center">
        <h2
          className="text-[#171717] mb-6"
          style={{
            fontFamily: "'LT Cushion', serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4vw, 44px)",
            lineHeight: 1.15,
          }}
        >
          Don't forget your daily
          <br />
          check-ins
        </h2>

        <p
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#6b6b6b",
          }}
        >
          Daily checkins is a way to add to what &ldquo;Way&rdquo; can help you with, the more Way
          knows about what happened on the voyage the more it can help.
        </p>
      </div>

      <div
        className="flex flex-col items-center gap-6 mx-auto mt-14 md:flex-row md:items-start md:justify-between md:gap-8 md:mt-20"
        style={{ maxWidth: 1100 }}
      >
        <ChrisCard className="w-full md:w-auto md:mt-[70px]" style={{ maxWidth: 400 }} />
        <RohanCard className="w-full md:w-auto" style={{ maxWidth: 400 }} />
      </div>
    </section>
  );
}
