import { useRef } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import cardArt from "@/assets/vai-waytide-card.jpg";

// The card scales from START_SCALE to 1 as the section scrolls up from the bottom of the screen, and is at full size
// a little before the section lines up with the viewport (SETTLE) so it rests at 100%.
const START_SCALE = 0.8;
const SETTLE = 0.9;

// The section is one screen tall (taller only if the card needs the room). The card keeps its original size, 61.64% of
// the width (the Figma frame: 932px of 1512px), and sits a little above centre (free space split 34.5 / 65.5). From
// 1024px up, type and the caption bar follow the Figma proportions and scale with the card width (cqw); below that the
// sizes are fixed.
const css = `
.vai-wt {
  position: relative;
  container-type: size;
  height: 100vh;
  height: 100svh;
  display: grid;
  grid-template-rows: 0.3447fr auto 0.6553fr;
  justify-items: center;
}
.vai-wt__frame {
  grid-row: 2;
  width: min(100cqw - 48px, 760px);
  aspect-ratio: 1 / 1;
  will-change: transform;
}
.vai-wt__card {
  container-type: inline-size;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  color: inherit;
  text-decoration: none;
}
.vai-wt__card:focus-visible { outline: 2px solid #171717; outline-offset: 4px; }
.vai-wt__title {
  position: absolute;
  inset: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font: 400 42px/1 'Amiri Quran', 'Amiri', Georgia, serif;
  color: #fff;
  text-align: center;
}
.vai-wt__title span { transform: translateY(-0.32em); }
.vai-wt__bar {
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  padding: 12px 14px;
  background: #fff;
}
.vai-wt__caption { font: 400 15px/1.3 'Amiri Quran', 'Amiri', Georgia, serif; color: #000; }
.vai-wt__more {
  display: inline-flex;
  align-items: center;
  gap: 0.75em;
  font: 400 12px/1 'IBM Plex Mono', ui-monospace, monospace;
  color: #898989;
  white-space: nowrap;
  transition: color 0.2s ease;
}
.vai-wt__arrow { transition: transform 0.2s ease; }
.vai-wt__card:hover .vai-wt__more { color: #171717; }
.vai-wt__card:hover .vai-wt__arrow { transform: translateX(3px); }
@media (min-width: 640px) {
  .vai-wt__frame { aspect-ratio: 858 / 559; }
  .vai-wt__title { font-size: 52px; }
  .vai-wt__bar { left: 4%; right: 4%; bottom: 4%; flex-wrap: nowrap; padding: 14px 18px; }
  .vai-wt__caption { font-size: 17px; }
  .vai-wt__more { font-size: 13px; }
}
@media (min-width: 1024px) {
  .vai-wt { min-height: calc(40.16vw + 80px); }
  .vai-wt__frame { width: 61.64cqw; }
  .vai-wt__title { font-size: 7.296cqw; }
  .vai-wt__bar { left: 11.54%; right: auto; width: 77.16%; bottom: 4.83%; height: 10.02%; padding: 0 2cqw 0 1.75cqw; }
  .vai-wt__caption { font-size: 2.575cqw; line-height: 1; transform: translateY(-0.145em); }
  .vai-wt__more { font-size: 1.502cqw; }
}
`;

export function VAIWaytideSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // 0 when the section's top reaches the bottom of the viewport, 1 when it reaches the top (section fills the screen).
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const scale = useTransform(scrollYProgress, [0, SETTLE], [START_SCALE, 1], { clamp: true });

  return (
    <section ref={ref} className="vai-wt">
      <style>{css}</style>
      <motion.div className="vai-wt__frame" style={{ scale: reduceMotion ? 1 : scale }}>
        <Link to="/waytide" className="vai-wt__card" style={{ backgroundImage: `url(${cardArt})` }}>
          <h2 className="vai-wt__title">
            <span>Waytide</span>
          </h2>
          <div className="vai-wt__bar">
            <span className="vai-wt__caption">Building Waytide, the teamchat experience for maritime</span>
            <span className="vai-wt__more">
              Learn more
              <ArrowRight className="vai-wt__arrow" size="1em" strokeWidth={1.5} />
            </span>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
