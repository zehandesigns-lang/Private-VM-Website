import { useEffect, useState } from "react";
import { useLocation, useRoutes } from "react-router";
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
import { HomePageV2 } from "./components/HomePageV2";
import { PageRouteTransition } from "./components/PageRouteTransition";
import { AboutPageV2 } from "./components/AboutPageV2";

const EASE_STRONG: [number, number, number, number] = [0.23, 1, 0.32, 1];

/** Persists for SPA session so client nav back to `/` does not replay the full site loader. */
let volteoSiteIntroDoneGlobal = false;

function shouldSkipSiteIntroOnBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (volteoSiteIntroDoneGlobal) return true;
  const p = window.location.pathname || "/";
  if (p !== "/") {
    volteoSiteIntroDoneGlobal = true;
    return true;
  }
  return false;
}

function HomePage({ revealed }: { revealed: boolean }) {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <motion.div
      className="relative min-h-screen"
      initial={revealed ? false : { opacity: 0, y: 28 }}
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
  );
}

export default function App() {
  const location = useLocation();
  const [skipIntro] = useState(() => shouldSkipSiteIntroOnBoot());

  const [siteLoaderFinished, setSiteLoaderFinished] = useState(skipIntro);
  const [homeContentRevealed, setHomeContentRevealed] = useState(skipIntro);
  const [introScrollUnlocked, setIntroScrollUnlocked] = useState(skipIntro);

  useEffect(() => {
    const lockForIntro =
      location.pathname === "/" && !siteLoaderFinished && !introScrollUnlocked;
    document.body.style.overflow = lockForIntro ? "hidden" : "";
  }, [introScrollUnlocked, siteLoaderFinished, location.pathname]);

  const routeElement = useRoutes(
    [
      { path: "/", element: <HomePage revealed={homeContentRevealed} /> },
      { path: "/home-v2", element: <HomePageV2 /> },
      { path: "/wayship", element: <WayshipPage /> },
      { path: "/about", element: <AboutPageV2 /> },
    ],
    location
  );

  const showSiteLoader = location.pathname === "/" && !siteLoaderFinished;

  return (
    <>
      {showSiteLoader && (
        <LoadingScreen
          onReveal={() => {
            setHomeContentRevealed(true);
            setIntroScrollUnlocked(true);
          }}
          onComplete={() => {
            volteoSiteIntroDoneGlobal = true;
            setSiteLoaderFinished(true);
          }}
        />
      )}
      <PageRouteTransition>{routeElement}</PageRouteTransition>
    </>
  );
}
