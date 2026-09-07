import heroBg from "@/assets/waytide-hero-bg.png";
import edgeFade from "@/assets/waytide-cta-edgefade.png";

export function WaytideCTASection() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: "60vh",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={edgeFade}
        alt=""
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <h2
          className="text-[#171717] max-w-[720px]"
          style={{
            fontFamily: "'LT Cushion', serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4vw, 44px)",
            lineHeight: 1.2,
          }}
        >
          Ask Way anything
          <br />
          about your vessel
        </h2>

        <button
          type="button"
          className="mt-8 text-white cursor-pointer hover:opacity-90 transition-opacity duration-150"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            padding: "12px 28px",
            borderRadius: 8,
            background: "#33C659",
            boxShadow: "0 -2px 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
