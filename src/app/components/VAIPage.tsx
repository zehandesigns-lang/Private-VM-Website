import { useCallback, useState } from "react";
import { useLocation } from "react-router";
import introVideo from "@/assets/vai-intro.mp4";
import pageBg from "@/assets/vai-page-bg.png";
import { VAIBuiltOnSection } from "./VAIBuiltOnSection";
import { VAIFooter } from "./VAIFooter";
import { VAIGradientBackground } from "./VAIGradientBackground";
import { VAIHeroSection } from "./VAIHeroSection";
import { VAIIntro } from "./VAIIntro";
import { VAIQuoteSection } from "./VAIQuoteSection";
import { VAIStatementSection } from "./VAIStatementSection";
import { VAIWaytideSection } from "./VAIWaytideSection";
import { GRAIN_MAX, VAITweakPanel } from "./VAITweakPanel";

// Percent of the original artwork's film grain (0 = none). The slider only shows on localhost or with ?tweak in the URL.
const DEFAULT_GRAIN = 0;
const GRAIN_KEY = "vai-grain";

function readStoredGrain() {
  try {
    const stored = localStorage.getItem(GRAIN_KEY);
    const value = stored === null ? NaN : Number(stored);
    return Number.isFinite(value) ? Math.min(GRAIN_MAX, Math.max(0, value)) : DEFAULT_GRAIN;
  } catch {
    return DEFAULT_GRAIN;
  }
}

export function VAIPage() {
  const { search } = useLocation();
  const showTweaks = import.meta.env.DEV || new URLSearchParams(search).has("tweak");
  const [grain, setGrain] = useState(() => (showTweaks ? readStoredGrain() : DEFAULT_GRAIN));

  // The intro clip plays over the page while it loads, and the hero's entrance waits for it. Reduced motion skips it.
  const [playIntro] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [ready, setReady] = useState(!playIntro);
  const introDone = useCallback(() => setReady(true), []);

  const updateGrain = (value: number) => {
    setGrain(value);
    try {
      localStorage.setItem(GRAIN_KEY, String(value));
    } catch {
      // storage unavailable; the slider still works for this visit
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "#f3f2ee" }}>
      <main className="flex-1">
        {/* One continuous background behind the hero and the Waytide section; the PNG is the fallback while the shader loads. */}
        <div
          className="relative overflow-hidden"
          style={{ backgroundImage: `url(${pageBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
          <VAIGradientBackground src={pageBg} grain={showTweaks ? grain : DEFAULT_GRAIN} />
          <VAIHeroSection ready={ready} />
          <VAIWaytideSection />
        </div>
        <VAIStatementSection />
        <VAIBuiltOnSection />
        <VAIQuoteSection />
      </main>
      <VAIFooter grain={showTweaks ? grain : DEFAULT_GRAIN} />
      {showTweaks && <VAITweakPanel grain={grain} onGrain={updateGrain} />}
      {playIntro && <VAIIntro src={introVideo} onDone={introDone} />}
    </div>
  );
}
