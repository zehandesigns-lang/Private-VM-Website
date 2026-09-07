const tealBlurBg = {
  backgroundImage: [
    "radial-gradient(ellipse 55% 70% at 12% 15%, rgba(226, 235, 160, 0.35), transparent 60%)",
    "radial-gradient(ellipse 65% 80% at 88% 10%, rgba(160, 224, 210, 0.4), transparent 55%)",
    "radial-gradient(ellipse 70% 60% at 90% 85%, rgba(120, 200, 190, 0.35), transparent 55%)",
    "radial-gradient(ellipse 90% 90% at 50% 100%, rgba(10, 55, 50, 0.5), transparent 65%)",
    "linear-gradient(160deg, #3fa091 0%, #1e7a6c 45%, #175f56 100%)",
  ].join(", "),
} as const;

export function WaytideRevealSection() {
  return (
    <section
      className="sticky bottom-0 z-10 overflow-hidden flex items-end justify-center pb-[6vh]"
      style={{ minHeight: "60vh", ...tealBlurBg }}
    >
      <span
        className="whitespace-nowrap text-white select-none"
        style={{
          fontFamily: "'LT Cushion', serif",
          fontWeight: 500,
          fontSize: "clamp(140px, 24vw, 380px)",
          lineHeight: 1,
        }}
      >
        WayTide
      </span>
    </section>
  );
}
