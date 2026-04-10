import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { motion } from "motion/react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { QuickRewindSection } from "./components/QuickRewindSection";
import { VolteoAdvantageSection } from "./components/VolteoAdvantageSection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { RailDivider } from "./components/RailDivider";
import { LoadingScreen } from "./components/LoadingScreen";
import { WayshipPage } from "./components/WayshipPage";

const EASE_STRONG: [number, number, number, number] = [0.23, 1, 0.32, 1];

function HomePage() {
  const [loadingDone, setLoadingDone] = useState(false);
  const [revealed, setRevealed] = useState(false);
  /** Unlocks scroll as soon as hero is revealed — must not wait for loader exit animation (was blocking touch for ~340ms on mobile). */
  const [scrollUnlocked, setScrollUnlocked] = useState(false);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => { document.documentElement.style.scrollBehavior = ""; };
  }, []);

  useEffect(() => {
    document.body.style.overflow = scrollUnlocked ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [scrollUnlocked]);

  return (
    <>
      {!loadingDone && (
        <LoadingScreen
          onReveal={() => {
            setRevealed(true);
            setScrollUnlocked(true);
          }}
          onComplete={() => setLoadingDone(true)}
        />
      )}
      <motion.div
        className="relative min-h-screen bg-[#f3f2ee]"
        initial={{ opacity: 0, y: 28 }}
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.65, ease: EASE_STRONG }}
      >
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-[60]">
            <div className="relative h-full max-w-[1512px] mx-auto">
              <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px" style={{ background: "#D9D9D9" }} />
              <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px" style={{ background: "#D9D9D9" }} />
            </div>
          </div>
          <Header />
          <main>
            <HeroSection />
            <RailDivider />
            <QuickRewindSection />
            <RailDivider />
            <VolteoAdvantageSection />
            <RailDivider />
          </main>
        </div>
        <CTASection />
        <div className="relative">
          <div className="absolute inset-0 pointer-events-none z-[60]">
            <div className="relative h-full max-w-[1512px] mx-auto">
              <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px" style={{ background: "#D9D9D9" }} />
              <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px" style={{ background: "#D9D9D9" }} />
            </div>
          </div>
          <Footer />
        </div>
      </motion.div>
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/wayship" element={<WayshipPage />} />
    </Routes>
  );
}