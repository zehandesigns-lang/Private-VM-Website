import revealBg from "@/assets/waytide-hero-chat-bg.png";

export function WaytideRevealSection() {
  return (
    <section
      className="sticky bottom-0 z-10 overflow-hidden flex items-end justify-center pb-[6vh]"
      style={{
        minHeight: "60vh",
        backgroundImage: `url(${revealBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
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
