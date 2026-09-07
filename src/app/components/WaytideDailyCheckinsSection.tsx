import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { WayMascot } from "./WayMascot";
import { SpeakReminderModal } from "./SpeakReminderModal";
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

export function WaytideDailyCheckinsSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      className="px-6 md:px-16 py-24 md:py-32"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <WayMascot size={32} />
            <span
              className="text-[#171717]"
              style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 20 }}
            >
              Daily Checkins
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
            I will only learn more if you
            <br />
            do your checkins
          </h2>

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity duration-150"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: 16,
              color: "#1F8A3D",
              textDecoration: "underline",
            }}
          >
            What's that?
          </button>
        </div>

        <div className="relative" style={{ height: 320 }}>
          <div
            className="absolute bg-white border border-[#E4E2DC] rounded-2xl px-5 py-4"
            style={{ top: 0, left: 0, maxWidth: 420 }}
          >
            <p className="text-[#171717]" style={cardStyle}>
              Way learned from <span style={nameStyle}>🧑‍✈️ Chris</span> that MV Solara always
              burns slightly more on the return leg from Fujairah.
            </p>
          </div>

          <div
            className="absolute bg-white border border-[#E4E2DC] rounded-2xl px-5 py-4"
            style={{ top: 150, left: 70, maxWidth: 420 }}
          >
            <p className="text-[#171717]" style={cardStyle}>
              Way learned from <span style={nameStyle}>🧑🏽 Rohan</span> to flag consumption
              anomalies for MV Solara at 5%, not the fleet default of 8%.
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showModal && <SpeakReminderModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
