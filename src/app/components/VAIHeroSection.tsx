import shipImg from "@/assets/vai-ship.png";
import vaiLogo from "@/assets/vai-logo.svg";
import { VAIShipDither } from "./VAIShipDither";

// Entrance sequence, in seconds after the intro clip has finished (`ready`): the heading rises in line by line, then the
// subheading, then the logo and the ship come in together. Each step starts when the one before it is about half done.
const SEQ = {
  heading: 0.25, // first line; the second follows `headingStagger` later
  headingStagger: 0.2,
  sub: 0.95,
  art: 1.5, // logo fade and the start of the ship's dither sweep
};
const sec = (n: number) => `${Math.round(n * 100) / 100}s`;

// Geometry is in Figma units (desktop frame 1512x1064). --k scales with the hero width; --ks is the text scale and
// also shrinks when the hero is short. The copy is centred between the logo and the top of the ship, which at the
// design size lands exactly on the Figma positions. Mobile uses its own, narrower frame (886 units wide).
const css = `
.vai-hero {
  container-type: size;
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 100vh;
  height: 100svh;
  min-height: 86vw;
}
.vai-hero__stage {
  position: absolute;
  inset: 0;
  --k: calc(100cqw / 886);
  --ks: var(--k);
  --logo-x: 55; --logo-y: 64; --logo-w: 123;
  --h-size: 100; --h-w: 735;
  --text-top: 134; --text-bottom: 202;
  --ship-x: 96.75; --ship-w: 700; --ship-bottom: -123;
}
@media (min-width: 768px) {
  .vai-hero { min-height: calc(43.5vw + 75px); }
  .vai-hero__stage {
    --k: calc(100cqw / 1512);
    --ks: min(calc(100cqw / 1512), calc(100cqh / 1064));
    --logo-x: 73; --logo-y: 69; --logo-w: 105.75;
    --h-size: 125; --h-w: 919;
    --text-top: 129; --text-bottom: 324;
    --ship-x: 62; --ship-w: 1120; --ship-bottom: -197;
  }
}
.vai-hero__logo {
  position: absolute;
  left: calc(var(--k) * var(--logo-x));
  top: calc(var(--k) * var(--logo-y));
  width: calc(var(--k) * var(--logo-w));
}
.vai-hero__text {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(var(--k) * var(--text-top));
  bottom: calc(var(--k) * var(--text-bottom));
  padding-top: calc(var(--ks) * 9);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.vai-hero__heading {
  margin: 0;
  width: calc(var(--ks) * var(--h-w));
  font-size: calc(var(--ks) * var(--h-size));
  line-height: 1.25;
  letter-spacing: -0.04em;
}
/* Entrance sequence (see SEQ): the heading rises in line by line, the same motion as the "Built on Volteo" heading, then
   the subheading, then the logo and the ship together. It starts when the intro clip is done (data-ready), and until
   then these wait out of sight. The ship times its own dither sweep from the same moment, and its HUD fades in behind
   the sweep. */
.vai-hero__line { display: block; }
.vai-hero[data-ready="false"] :is(.vai-hero__line, .vai-hero__sub, .vai-hero__logo, .vai-hero__hud) { opacity: 0; }
@media (prefers-reduced-motion: no-preference) {
  .vai-hero[data-ready="true"] .vai-hero__line { animation: vai-hero-rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; }
  .vai-hero[data-ready="true"] .vai-hero__line:nth-child(1) { animation-delay: ${sec(SEQ.heading)}; }
  .vai-hero[data-ready="true"] .vai-hero__line:nth-child(2) { animation-delay: ${sec(SEQ.heading + SEQ.headingStagger)}; }
  .vai-hero[data-ready="true"] .vai-hero__sub {
    --blur: 4px;
    animation: vai-hero-rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) ${sec(SEQ.sub)} backwards;
  }
  .vai-hero[data-ready="true"] .vai-hero__logo { animation: vai-hero-fade 1.2s ease-out ${sec(SEQ.art)} backwards; }
  .vai-hero[data-ready="true"] .vai-hero__hud { animation: vai-hero-hud 1.8s ease-out ${sec(SEQ.art + 0.9)} backwards; }
}
@keyframes vai-hero-rise {
  from { opacity: 0; transform: translateY(0.3em); filter: blur(var(--blur, 8px)); }
  to { opacity: 1; transform: none; filter: none; }
}
@keyframes vai-hero-fade {
  from { opacity: 0; filter: blur(6px); }
  to { opacity: 1; filter: none; }
}
@keyframes vai-hero-hud {
  from { opacity: 0; }
  to { opacity: 1; }
}
.vai-hero__sub {
  margin: calc(var(--ks) * -24) 0 0;
  width: calc(var(--ks) * 899);
  max-width: 100%;
  font-size: calc(var(--ks) * 40);
  line-height: 2.5;
}
.vai-hero__ship {
  position: absolute;
  left: calc(var(--k) * var(--ship-x));
  bottom: calc(var(--k) * var(--ship-bottom));
  width: calc(var(--k) * var(--ship-w));
  aspect-ratio: 1600 / 1000;
}
`;

const headingStyle = {
  fontFamily: "'OldStyle 1', 'Amiri Quran', Georgia, serif",
  fontWeight: 400,
  color: "#fff",
  textAlign: "center",
} as const;

const subStyle = {
  fontFamily: "'Amiri Quran', 'Amiri', Georgia, serif",
  fontWeight: 400,
  color: "#fff",
  textAlign: "center",
} as const;

const INK = "#f3ead2";

function ShipHud() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1600 1000"
      className="vai-hero__hud absolute inset-0 w-full h-full"
      fill="none"
      stroke={INK}
      strokeOpacity={0.5}
    >
      <line x1="490" y1="0" x2="490" y2="1000" strokeDasharray="6 8" strokeOpacity={0.35} />
      <line x1="0" y1="690" x2="1600" y2="690" strokeDasharray="6 8" strokeOpacity={0.35} />
      <rect x="180" y="230" width="1290" height="470" strokeDasharray="3 6" strokeOpacity={0.25} />
      <circle cx="490" cy="244" r="54" strokeOpacity={0.35} />
      <circle cx="378" cy="318" r="30" strokeOpacity={0.3} />
      <circle cx="1000" cy="392" r="70" strokeOpacity={0.3} />
      <circle cx="1450" cy="528" r="80" strokeOpacity={0.25} />
      <circle cx="190" cy="548" r="44" strokeOpacity={0.25} />
      <circle cx="830" cy="690" r="340" strokeOpacity={0.16} />
      <polyline points="190,548 378,318 490,244 700,392 1000,392 1290,474 1450,528" strokeOpacity={0.45} />
      <line x1="590" y1="302" x2="1450" y2="528" strokeOpacity={0.25} />
      <g fill={INK} stroke="none">
        <circle cx="490" cy="244" r="3.5" />
        <circle cx="378" cy="318" r="3.5" />
        <circle cx="700" cy="392" r="3.5" />
        <circle cx="1000" cy="392" r="3.5" />
        <circle cx="1290" cy="474" r="3.5" />
        <circle cx="1450" cy="528" r="3.5" />
        <circle cx="190" cy="548" r="3.5" />
        <circle cx="590" cy="302" r="3.5" />
        <circle cx="96" cy="455" r="5" fillOpacity={0.7} />
        <circle cx="1504" cy="455" r="5" fillOpacity={0.7} />
      </g>
      <path
        d="M120 820 L126 838 L144 844 L126 850 L120 868 L114 850 L96 844 L114 838 Z"
        fill={INK}
        fillOpacity={0.55}
        stroke="none"
      />
    </svg>
  );
}

/** `ready` is when the page's intro clip is done and the entrance sequence can begin. */
export function VAIHeroSection({ ready }: { ready: boolean }) {
  return (
    <section className="vai-hero" data-ready={ready}>
      <style>{css}</style>
      <div className="vai-hero__stage">
        <div className="vai-hero__ship" aria-hidden>
          <VAIShipDither src={shipImg} delay={SEQ.art} start={ready} />
          <ShipHud />
        </div>

        <img src={vaiLogo} alt="VAI" className="vai-hero__logo" />

        <div className="vai-hero__text">
          <h1 className="vai-hero__heading" style={headingStyle}>
            <span className="vai-hero__line">Intelligence layer</span>{" "}
            <span className="vai-hero__line">of maritime</span>
          </h1>
          <p className="vai-hero__sub" style={subStyle}>
            Responsible AI to empower vessels data
          </p>
        </div>
      </div>
    </section>
  );
}
