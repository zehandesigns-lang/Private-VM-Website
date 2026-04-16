import { useRoutes, Navigate } from "react-router";
import { WayshipPage } from "./components/WayshipPage";
import { HomePageV2 } from "./components/HomePageV2";
import { PageRouteTransition } from "./components/PageRouteTransition";
import { AboutPageV2 } from "./components/AboutPageV2";
import { BookDemoPage } from "./components/BookDemoPage";
import { SmartportPage } from "./components/SmartportPage";
import { ResourcesPage } from "./components/ResourcesPage";
import { PledgeWallPage } from "./components/PledgeWallPage";

export default function App() {
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
    ],
  );

  return (
    <PageRouteTransition>{routeElement}</PageRouteTransition>
  );
}
