import heroBg from "@/assets/waytide-hero-bg.png";
import bg1 from "@/assets/waytide-threads-bg.png";
import bg2 from "@/assets/waytide-howworks-bg2.png";
import bg3 from "@/assets/waytide-howworks-bg3.png";
import overlay1 from "@/assets/waytide-howworks-card1.png";
import overlay2 from "@/assets/waytide-howworks-card2.png";
import overlay3 from "@/assets/waytide-howworks-card3.png";

const CARDS = [
  {
    bg: bg1,
    overlay: overlay1,
    overlayClassName: "absolute inset-0 w-full h-full object-contain px-6 pt-6",
    overlayStyle: { objectPosition: "bottom" } as const,
    title: "Way gets briefed on your fleet",
    description:
      "Vessel data, voyage history, warranty terms — Way is connected to everything it needs to know your ships, before you ask a single question.",
  },
  {
    bg: bg2,
    overlay: overlay2,
    title: "You ask, in plain language",
    description: "No filters, no fields, no query language. Type a question the way you'd ask a colleague.",
  },
  {
    bg: bg3,
    overlay: overlay3,
    title: "Way answers — from your data",
    description: "Not a generic guess. An answer reasoned from that vessel's own logs, in seconds.",
  },
];

export function WaytideHowItWorksSection() {
  return (
    <section
      className="px-6 md:px-16 py-24 md:py-32"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[1200px] mx-auto">
        <h2
          className="text-center text-[#171717] mb-14"
          style={{
            fontFamily: "'LT Cushion', serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4vw, 44px)",
          }}
        >
          How Way works?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {CARDS.map((card) => (
            <div key={card.title}>
              <div
                className="relative rounded-[24px] overflow-hidden aspect-[3/4] md:aspect-auto md:h-[60vh]"
                style={{
                  backgroundImage: `url(${card.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={card.overlay}
                  alt=""
                  className={card.overlayClassName ?? "absolute inset-0 w-full h-full object-contain p-6"}
                  style={card.overlayStyle}
                />
              </div>

              <h3
                className="text-[#171717] mt-5 mb-2"
                style={{ fontFamily: "'LT Cushion', serif", fontWeight: 500, fontSize: 22 }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "#8a8a8a",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
