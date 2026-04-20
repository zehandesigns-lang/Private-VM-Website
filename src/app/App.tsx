import { useEffect, useState } from "react";
import { useLocation, useRoutes, Navigate } from "react-router";
import { WayshipPage } from "./components/WayshipPage";
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
  const [skipIntro] = useState(() => shouldSkipSiteIntroOnBoot());
  const [siteLoaderFinished, setSiteLoaderFinished] = useState(skipIntro);
  const [introScrollUnlocked, setIntroScrollUnlocked] = useState(skipIntro);

  useEffect(() => {
    const lockForIntro = location.pathname === "/" && !siteLoaderFinished && !introScrollUnlocked;
    document.body.style.overflow = lockForIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [introScrollUnlocked, siteLoaderFinished, location.pathname]);

  const routeElement = useRoutes(
    [
      { path: "/", element: <HomePageV2 /> },
      // Backwards-compatible alias for any old bookmarks/links.
      { path: "/home-v2", element: <Navigate to="/" replace /> },
      { path: "/wayship", element: <WayshipPage /> },
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
    <>
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
    </>
  );
}
