import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { WaytideHeader } from "./WaytideHeader";
import { WayMascot } from "./WayMascot";
import { WaytideMemorySection } from "./WaytideMemorySection";
import { WaytideThreadsSection } from "./WaytideThreadsSection";
import { WaytideDailyCheckinsSection } from "./WaytideDailyCheckinsSection";
import { WaytideHowItWorksSection } from "./WaytideHowItWorksSection";
import { WaytideFAQSection } from "./WaytideFAQSection";
import { WaytideCTASection } from "./WaytideCTASection";
import { WaytideFooter } from "./WaytideFooter";
import { WaytideRevealSection } from "./WaytideRevealSection";
import heroBg from "@/assets/waytide-hero-bg.png";
import scrollArrow from "@/assets/waytide-scroll-arrow.png";

const headline: CSSProperties = {
  fontFamily: "'LT Cushion', serif",
  fontWeight: 500,
  fontStyle: "normal",
};

export function WaytidePage() {
  const [showWay, setShowWay] = useState(false);
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const memoryRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<HTMLDivElement>(null);
  const dailyCheckinsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5;
      let idx: number | null = null;
      if (memoryRef.current && memoryRef.current.getBoundingClientRect().top <= threshold) idx = 0;
      if (threadsRef.current && threadsRef.current.getBoundingClientRect().top <= threshold) idx = 1;
      if (dailyCheckinsRef.current && dailyCheckinsRef.current.getBoundingClientRect().top <= threshold) idx = 2;
      if (howItWorksRef.current && howItWorksRef.current.getBoundingClientRect().top <= threshold) idx = 3;
      if (faqRef.current && faqRef.current.getBoundingClientRect().top <= threshold) idx = 4;
      setActiveNavIndex(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <WaytideHeader activeIndex={activeNavIndex} />

      <section
        className="relative flex flex-col items-center justify-center text-center px-6"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.h1
          onMouseEnter={() => setShowWay(true)}
          onMouseLeave={() => setShowWay(false)}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-[900px] text-[#171717] cursor-default"
          style={{
            ...headline,
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
          }}
        >
          Maritime has its
          <br />
          first AI teammate
        </motion.h1>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#171717]/70"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 20 }}>
            Scroll down
          </span>
          <img src={scrollArrow} alt="" className="w-8 h-8" />
        </motion.div>
      </section>

      <div ref={memoryRef}>
        <WaytideMemorySection />
      </div>

      <div ref={threadsRef}>
        <WaytideThreadsSection />
      </div>

      <div ref={dailyCheckinsRef}>
        <WaytideDailyCheckinsSection />
      </div>

      <div ref={howItWorksRef}>
        <WaytideHowItWorksSection />
      </div>

      <div ref={faqRef} className="relative z-10">
        <WaytideFAQSection />
      </div>

      <WaytideCTASection />

      <div className="relative">
        <WaytideFooter />
        <WaytideRevealSection />
      </div>

      <motion.div
        className="fixed bottom-0 right-8 md:right-16 pointer-events-none z-40"
        initial={{ y: "115%" }}
        animate={{ y: showWay ? "0%" : "115%" }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div style={{ transform: "scaleX(-1) rotate(15deg)" }}>
          <WayMascot key={showWay ? "way-visible" : "way-hidden"} size={220} blink />
        </div>
      </motion.div>
    </div>
  );
}
