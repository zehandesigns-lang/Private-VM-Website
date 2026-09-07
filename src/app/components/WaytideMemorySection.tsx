import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import heroBg from "@/assets/waytide-hero-bg.png";
import riveFile from "@/assets/rive/i-know-everything.riv";
import { WayshipToWaytideModal } from "./WayshipToWaytideModal";

export function WaytideMemorySection() {
  const [showModal, setShowModal] = useState(false);
  const { RiveComponent } = useRive({
    src: riveFile,
    animations: ["Timeline 1", "Timeline 2", "Timeline 3"],
    autoplay: true,
    layout: new Layout({ fit: Fit.Contain, alignment: Alignment.Center }),
  });

  return (
    <section
      className="relative flex flex-col items-center text-center px-6 py-24 md:py-32"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p
        className="text-[#171717] mb-3"
        style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 20 }}
      >
        Hii! I am Way
      </p>
      <h2
        className="max-w-[700px] text-[#171717]"
        style={{
          fontFamily: "'LT Cushion', serif",
          fontWeight: 500,
          fontSize: "clamp(28px, 4vw, 44px)",
          lineHeight: 1.15,
        }}
      >
        I know everything that was
        <br />
        ever recorded on your vessel,
      </h2>

      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="mt-4 bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity duration-150"
        style={{
          fontFamily: "'Geist', sans-serif",
          fontWeight: 700,
          fontSize: 16,
          color: "#1F8A3D",
          textDecoration: "underline",
        }}
      >
        But how?
      </button>

      <div className="w-full max-w-[250px] aspect-square mt-12">
        <RiveComponent />
      </div>

      <AnimatePresence>
        {showModal && <WayshipToWaytideModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
}
