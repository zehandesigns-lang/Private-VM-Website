import { useEffect, useRef, useState } from "react";
import art from "@/assets/vai-built-on.png";

// The section is one screen tall. Everything is positioned in the artwork's own pixel space (1433 x 980) and scales to
// fit the section (by width or height, whichever is tighter), so the whole graph always stays in view.
const W = 1433;
const H = 980;

const NODES: Record<string, [number, number]> = {
  N1: [199.1, 341.3],
  N2: [516.9, 217.3],
  N3: [1058.1, 222.9],
  N4: [1319.6, 484.9],
  N5: [1238.3, 784.3],
  N6: [434.6, 783.3],
};
const NODE_ORDER = ["N1", "N2", "N3", "N4", "N5", "N6"];

const LINKS: [string, string][] = [
  ["N1", "N2"],
  ["N1", "N3"],
  ["N1", "N5"],
  ["N1", "N6"],
  ["N2", "N3"],
  ["N3", "N4"],
  ["N3", "N6"],
  ["N4", "N5"],
  ["N4", "N6"],
  ["N5", "N6"],
];

// cx, cy, rx, ry
const ORBITS: [number, number, number, number][] = [
  [193.4, 335.4, 146.2, 146.2],
  [522.5, 214.5, 280.8, 146.2],
  [977.5, 222.6, 224.3, 146.2],
  [1265.2, 480.1, 180, 290.6],
  [293, 568.5, 146.2, 146.2],
  [440.4, 758.5, 146.2, 146.2],
  [804.5, 789.9, 280.8, 146.2],
  [1214, 777.1, 146.2, 146.2],
];

// One per node, in NODE_ORDER.
const LABELS: { text: string; x: number; y: number }[] = [
  { text: "volteo", x: 122.3, y: 340.6 },
  { text: "IMOS", x: 532.4, y: 196.5 },
  { text: "volteo", x: 1066, y: 210.4 },
  { text: "volteo", x: 1336.3, y: 465 },
  { text: "volteo", x: 1204.7, y: 820.7 },
  { text: "volteo", x: 381, y: 824.2 },
];

// Timeline (seconds after the section comes into view): nodes light up one after another, lines draw between them as
// soon as both ends exist, orbits trace themselves alongside, then the heading rises in.
const nodeDelay = (id: string) => NODE_ORDER.indexOf(id) * 0.14;
const linkDelay = (a: string, b: string, i: number) => Math.max(nodeDelay(a), nodeDelay(b)) + 0.12 + i * 0.03;
const orbitDelay = (i: number) => 0.1 + i * 0.1;
const delay = (s: number) => ({ animationDelay: `${s.toFixed(2)}s` });

const orbitPath = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx} ${cy - ry}A${rx} ${ry} 0 1 1 ${cx} ${cy + ry}A${rx} ${ry} 0 1 1 ${cx} ${cy - ry}`;

const css = `
.vai-bo {
  position: relative;
  container-type: size;
  height: 100vh;
  height: 100svh;
  min-height: 40vw;
}
.vai-bo__stage {
  --h1: 1.9s;
  --h2: 2.1s;
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  color: #fff;
}
/* The graph and heading keep the artwork's proportions and scale to fit the screen-tall section, centred on the gradient. */
.vai-bo__frame {
  --u: min(100cqw / ${W}, 100cqh / ${H});
  position: relative;
  width: calc(var(--u) * ${W});
  height: calc(var(--u) * ${H});
}
.vai-bo__graph { position: absolute; inset: 0; width: 100%; height: 100%; }
.vai-bo__orbit,
.vai-bo__link { fill: none; stroke: #fff; stroke-opacity: 0.35; stroke-width: 1.2; stroke-dasharray: 1; stroke-dashoffset: 1; }
.vai-bo__node { fill: #fff; opacity: 0; transform: scale(0); transform-box: fill-box; transform-origin: center; }
.vai-bo__ping { fill: none; stroke: #fff; stroke-width: 1; opacity: 0; transform-box: fill-box; transform-origin: center; }
.vai-bo__label { font-family: 'OldStyle 1', 'Amiri Quran', Georgia, serif; font-size: 22px; letter-spacing: -0.04em; fill: #fff; opacity: 0; }
.vai-bo__heading {
  position: absolute;
  left: calc(var(--u) * 757.3);
  top: calc(var(--u) * 403.4);
  transform: translateX(-50%);
  width: max-content;
  margin: 0;
  font-family: 'OldStyle 1', 'Amiri Quran', Georgia, serif;
  font-weight: 400;
  font-size: calc(var(--u) * 70);
  line-height: 1.25;
  letter-spacing: -0.04em;
  text-align: center;
  color: #fff;
}
.vai-bo__line { display: block; opacity: 0; }

.vai-bo[data-state="play"] .vai-bo__orbit { animation: vai-bo-draw 1.4s cubic-bezier(0.4, 0, 0.2, 1) both; }
.vai-bo[data-state="play"] .vai-bo__link { animation: vai-bo-draw 0.85s cubic-bezier(0.4, 0, 0.2, 1) both; }
.vai-bo[data-state="play"] .vai-bo__node { animation: vai-bo-pop 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.25) both; }
.vai-bo[data-state="play"] .vai-bo__ping { animation: vai-bo-ping 1.3s ease-out both; }
.vai-bo[data-state="play"] .vai-bo__label { animation: vai-bo-fade 0.7s ease-out both; }
.vai-bo[data-state="play"] .vai-bo__line { animation: vai-bo-rise 1s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
.vai-bo[data-state="play"] .vai-bo__line:nth-child(1) { animation-delay: var(--h1); }
.vai-bo[data-state="play"] .vai-bo__line:nth-child(2) { animation-delay: var(--h2); }

.vai-bo[data-state="static"] .vai-bo__orbit,
.vai-bo[data-state="static"] .vai-bo__link { stroke-dashoffset: 0; }
.vai-bo[data-state="static"] .vai-bo__node,
.vai-bo[data-state="static"] .vai-bo__label,
.vai-bo[data-state="static"] .vai-bo__line { opacity: 1; transform: none; }

@keyframes vai-bo-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes vai-bo-pop {
  0% { opacity: 0; transform: scale(0); }
  60% { opacity: 1; transform: scale(1.5); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes vai-bo-ping {
  0% { opacity: 0.55; transform: scale(1); }
  100% { opacity: 0; transform: scale(6); }
}
@keyframes vai-bo-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes vai-bo-rise {
  from { opacity: 0; transform: translateY(0.3em); filter: blur(8px); }
  to { opacity: 1; transform: none; filter: none; }
}

@media (max-width: 767px) {
  .vai-bo__stage { --h1: 0.1s; --h2: 0.3s; }
  .vai-bo__frame { display: contents; }
  .vai-bo__graph { display: none; }
  .vai-bo__heading { position: static; transform: none; padding: 0 24px; font-size: 40px; }
}
`;

type PlayState = "idle" | "play" | "static";

export function VAIBuiltOnSection() {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<PlayState>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setState("static");
      return;
    }
    // Start once enough of the section is on screen (a third of it, or half the viewport on short screens).
    const io = new IntersectionObserver(
      ([entry]) => {
        const need = Math.min(entry.boundingClientRect.height * 0.35, window.innerHeight * 0.5);
        if (entry.intersectionRect.height >= need) {
          setState("play");
          io.disconnect();
        }
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i / 20) },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="vai-bo" data-state={state}>
      <style>{css}</style>
      <div className="vai-bo__stage" style={{ backgroundImage: `url(${art})` }}>
        <div className="vai-bo__frame">
          <svg className="vai-bo__graph" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
            {ORBITS.map(([cx, cy, rx, ry], i) => (
              <path key={i} className="vai-bo__orbit" pathLength={1} d={orbitPath(cx, cy, rx, ry)} style={delay(orbitDelay(i))} />
            ))}
            {LINKS.map(([a, b], i) => (
              <path
                key={a + b}
                className="vai-bo__link"
                pathLength={1}
                d={`M${NODES[a][0]} ${NODES[a][1]}L${NODES[b][0]} ${NODES[b][1]}`}
                style={delay(linkDelay(a, b, i))}
              />
            ))}
            {NODE_ORDER.map((id) => (
              <g key={id}>
                <circle className="vai-bo__ping" cx={NODES[id][0]} cy={NODES[id][1]} r={4.6} style={delay(nodeDelay(id) + 0.12)} />
                <circle className="vai-bo__node" cx={NODES[id][0]} cy={NODES[id][1]} r={4.6} style={delay(nodeDelay(id))} />
              </g>
            ))}
            {LABELS.map((l, i) => (
              <text key={i} className="vai-bo__label" x={l.x} y={l.y} style={delay(nodeDelay(NODE_ORDER[i]) + 0.3)}>
                {l.text}
              </text>
            ))}
          </svg>
          <h2 className="vai-bo__heading">
            <span className="vai-bo__line">Built on Volteo.</span>{" "}
            <span className="vai-bo__line">Open to everything.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
