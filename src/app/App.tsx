import { useEffect, useRef, useState } from "react";
import { useLocation, useRoutes, Navigate } from "react-router";
import { ReactLenis, type LenisRef } from "lenis/react";
import { WayshipPage } from "./components/WayshipPage";
import { WayshipPageV2 } from "./components/WayshipPageV2";
import { HomePageV2 } from "./components/HomePageV2";
import { PageRouteTransition } from "./components/PageRouteTransition";
import { AboutPageV2 } from "./components/AboutPageV2";
import { BookDemoPage } from "./components/BookDemoPage";
import { SmartportPage } from "./components/SmartportPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { PledgeWallPage } from "./components/PledgeWallPage";
import { LoadingScreen } from "./components/LoadingScreen";
import { EventMonitorPage } from "./components/EventMonitorPage";

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

export default function App() {
  const location = useLocation();
  const lenisRef = useRef<LenisRef>(null);
  const [skipIntro] = useState(() => shouldSkipSiteIntroOnBoot());
  const [siteLoaderFinished, setSiteLoaderFinished] = useState(skipIntro);
  const [introScrollUnlocked, setIntroScrollUnlocked] = useState(skipIntro);

  const lockForIntro = location.pathname === "/" && !siteLoaderFinished && !introScrollUnlocked;

  // Stop/start Lenis in sync with the intro scroll lock
  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis) return;
    if (lockForIntro) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lockForIntro]);

  const routeElement = useRoutes(
    [
      { path: "/", element: <HomePageV2 /> },
      // Backwards-compatible alias for any old bookmarks/links.
      { path: "/home-v2", element: <Navigate to="/" replace /> },
      { path: "/wayship", element: <WayshipPage /> },
      { path: "/wayshipv2", element: <WayshipPageV2 /> },
      { path: "/smartport", element: <SmartportPage /> },
      { path: "/about", element: <AboutPageV2 /> },
      { path: "/book-demo", element: <BookDemoPage /> },
      { path: "/resources", element: <ResourcesPage /> },
      { path: "/pledge", element: <PledgeWallPage /> },
      { path: "/event-monitor", element: <EventMonitorPage /> },
    ],
  );

  const showSiteLoader = location.pathname === "/" && !siteLoaderFinished;

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        // Exponential ease-out — creates inertia momentum feel like Frontify
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.5,
        syncTouch: true,
      }}
    >
      {showSiteLoader && (
        <LoadingScreen
          onReveal={() => {
            setIntroScrollUnlocked(true);
          }}
          onComplete={() => {
            volteoSiteIntroDoneGlobal = true;
            setSiteLoaderFinished(true);
          }}
        />
      )}
      <PageRouteTransition>{routeElement}</PageRouteTransition>
    </ReactLenis>
  );
}
