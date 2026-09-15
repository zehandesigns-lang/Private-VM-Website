import { useEffect, useRef, useState } from "react";
import { WaytideHeader } from "./WaytideHeader";
import { WaytideHeroSection } from "./WaytideHeroSection";
import { WaytideRopesSection, WaytideThreadsSection } from "./WaytideMentionSection";
import { WaytideNoDashboardsSection } from "./WaytideNoDashboardsSection";
import { WaytideDailyCheckinsSection } from "./WaytideDailyCheckinsSection";
import { WaytideHowItWorksSection } from "./WaytideHowItWorksSection";
import { WaytideCTASection } from "./WaytideCTASection";
import { WaytideFAQSection } from "./WaytideFAQSection";
import { WaytideFooter } from "./WaytideFooter";
import { WaytideRevealSection } from "./WaytideRevealSection";

// Nav order: Ropes, Threads, Daily Checkins, How Way works, FAQ's.
export function WaytidePage() {
  const [activeNavIndex, setActiveNavIndex] = useState<number | null>(null);
  const ropesRef = useRef<HTMLDivElement>(null);
  const threadsRef = useRef<HTMLDivElement>(null);
  const dailyCheckinsRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const threshold = window.innerHeight * 0.5;
      let idx: number | null = null;
      if (ropesRef.current && ropesRef.current.getBoundingClientRect().top <= threshold) idx = 0;
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
      <WaytideHeroSection />

      <div ref={ropesRef}>
        <WaytideRopesSection />
      </div>

      <div ref={threadsRef}>
        <WaytideThreadsSection />
      </div>

      <div ref={dailyCheckinsRef}>
        <WaytideDailyCheckinsSection />
      </div>

      <WaytideNoDashboardsSection />

      <div ref={howItWorksRef}>
        <WaytideHowItWorksSection />
      </div>

      <div ref={faqRef}>
        <WaytideFAQSection />
      </div>

      <WaytideCTASection />

      <div className="relative">
        <WaytideFooter />
        <WaytideRevealSection />
      </div>
    </div>
  );
}
