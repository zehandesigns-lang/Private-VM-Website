import heroBg from "@/assets/waytide-hero-bg.png";
import threadsIcon from "@/assets/waytide-threads-icon.png";
import threadsBg from "@/assets/waytide-threads-bg.png";
import { WaytideThreadsChatCard } from "./WaytideThreadsChatCard";

export function WaytideThreadsSection() {
  return (
    <section
      className="px-6 md:px-16 py-24 md:py-32"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-[2fr_3fr] gap-12 md:gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <img src={threadsIcon} alt="" className="w-8 h-8 object-contain" />
            <span
              className="text-[#171717]"
              style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 20 }}
            >
              Threads
            </span>
          </div>

          <h2
            className="text-[#171717] mb-5"
            style={{
              fontFamily: "'LT Cushion', serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 4vw, 44px)",
              lineHeight: 1.15,
            }}
          >
            1:1 Conversations
            <br />
            with me
          </h2>

          <p
            className="max-w-[420px]"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 400,
              fontSize: 17,
              lineHeight: 1.5,
              color: "#6b6b6b",
            }}
          >
            No dashboard to check, ask and get a straight answer, right when you need it.
          </p>
        </div>

        <div
          className="relative rounded-[32px] overflow-hidden aspect-[4/3] md:aspect-[16/11]"
          style={{
            backgroundImage: `url(${threadsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <WaytideThreadsChatCard />
          </div>
        </div>
      </div>
    </section>
  );
}
