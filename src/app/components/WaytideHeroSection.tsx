import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { WayMascot } from "./WayMascot";
import heroBg from "@/assets/waytide-hero-bg.png";
import chatCardBgImg from "@/assets/waytide-hero-chat-bg.png";
import jamesAvatar from "@/assets/waytide-hero-captain-james.png";
import michaelAvatar from "@/assets/waytide-hero-michael.png";
import wilsonAvatar from "@/assets/waytide-mention-wilson.png";
import oilerAvatar from "@/assets/waytide-mention-oiler.png";
import greetingArrow from "@/assets/waytide-greeting-arrow.png";

type Rect = { top: number; left: number; width: number; height: number };
const ZERO_RECT: Rect = { top: 0, left: 0, width: 0, height: 0 };

const TAGLINE_LINES = [
  "Waytide is a reimagined",
  "team chat experience built",
  "for seafarers from ground up",
];
const TAGLINE_FINAL_FONT_SIZE = 40;
const TAGLINE_FINAL_PAD_X = 96;
const TAGLINE_BOTTOM_PAD = 24;
const SUBTITLE_TEXT = "with a smart AI data analyst";
const SUBTITLE_FONT_SIZE = 24;
const SUBTITLE_LINE_HEIGHT = SUBTITLE_FONT_SIZE * 1.3;
const GREETING_LINE_HEIGHT = 30;
// Avatar row (46px circles + 16px bottom margin) + 3 text lines + subtitle spacing, at final sizes.
const TAGLINE_FINAL_CONTENT_HEIGHT =
  46 + 16 + 3 * TAGLINE_FINAL_FONT_SIZE * 1.19 + 24 + SUBTITLE_LINE_HEIGHT;

export function Avatar({
  initial,
  color,
  image,
  imagePosition = "center",
}: {
  initial: string;
  color: string;
  image?: string;
  imagePosition?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        className="rounded-full object-cover shrink-0"
        style={{ width: 32, height: 32, objectPosition: imagePosition }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0"
      style={{ width: 32, height: 32, background: color }}
    >
      <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 13, color: "#fff" }}>
        {initial}
      </span>
    </div>
  );
}

const TILE_SIZE = 75;
const TILE_RADIUS = 14;

// Smallest odd tile count that fully covers `size` — odd so there's always a single,
// unambiguous middle tile whose center can align exactly with the container's center.
function oddTileCount(size: number): number {
  const n = Math.max(1, Math.ceil(size / TILE_SIZE));
  return n % 2 === 0 ? n + 1 : n;
}

function TileMosaic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState({ cols: 1, rows: 1 });

  useLayoutEffect(() => {
    function measure() {
      const el = containerRef.current;
      if (!el) return;
      const { width, height } = el.getBoundingClientRect();
      setGrid({ cols: oddTileCount(width), rows: oddTileCount(height) });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { cols, rows } = grid;
  const centerCol = Math.floor(cols / 2);
  const centerRow = Math.floor(rows / 2);

  // Stage all four crew avatars in a diamond around Way when there's room.
  const avatarColOffset = Math.min(3, centerCol, cols - 1 - centerCol);
  const canShowAvatars = avatarColOffset >= 3 && centerRow - 1 >= 0 && centerRow + 1 <= rows - 1;
  const topRow = centerRow - 1;
  const bottomRow = centerRow + 1;
  const leftCol = centerCol - avatarColOffset;
  const rightCol = centerCol + avatarColOffset;
  const avatarTiles = canShowAvatars
    ? [
        { row: topRow, col: leftCol, avatar: jamesAvatar, position: "center" },
        { row: topRow, col: rightCol, avatar: wilsonAvatar, position: "top" },
        { row: bottomRow, col: leftCol, avatar: michaelAvatar, position: "center" },
        { row: bottomRow, col: rightCol, avatar: oilerAvatar, position: "top" },
      ]
    : [];

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${TILE_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${TILE_SIZE}px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const r = Math.floor(i / cols);
          const c = i % cols;
          const isWayTile = r === centerRow && c === centerCol;
          const avatarTile = avatarTiles.find((a) => a.row === r && a.col === c);

          if (isWayTile) {
            return (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: TILE_SIZE, height: TILE_SIZE, borderRadius: TILE_RADIUS, background: "#FFF5B8" }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 46, height: 46, background: "#FFE222", border: "3px solid rgba(255,255,255,0.33)" }}
                >
                  <WayMascot size={32} />
                </div>
              </div>
            );
          }

          if (avatarTile) {
            return (
              <div
                key={i}
                className="flex items-center justify-center"
                style={{ width: TILE_SIZE, height: TILE_SIZE, borderRadius: TILE_RADIUS, background: "#F2F2F2" }}
              >
                <img
                  src={avatarTile.avatar}
                  alt=""
                  className="rounded-full object-cover"
                  style={{
                    width: 46,
                    height: 46,
                    objectPosition: avatarTile.position,
                    animation: `waytide-avatar-flip 500ms ease-out ${avatarTiles.indexOf(avatarTile) * 150}ms both`,
                  }}
                />
              </div>
            );
          }

          return (
            <div
              key={i}
              style={{
                width: TILE_SIZE,
                height: TILE_SIZE,
                borderRadius: TILE_RADIUS,
                border: "1px solid rgba(244,244,244,0.42)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export function WaytideHeroSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const taglinePlaceholderRef = useRef<HTMLDivElement>(null);
  const avatarRowRef = useRef<HTMLDivElement>(null);
  const [startRect, setStartRect] = useState<Rect>(ZERO_RECT);
  const [endRect, setEndRect] = useState<Rect>(ZERO_RECT);
  const [lineCenterOffsets, setLineCenterOffsets] = useState<number[]>([0, 0, 0]);
  const [avatarRowCenterOffset, setAvatarRowCenterOffset] = useState(0);
  const [subtitleCenterOffset, setSubtitleCenterOffset] = useState(0);
  const [pastThreshold, setPastThreshold] = useState(false);

  useLayoutEffect(() => {
    function measure() {
      const section = sectionRef.current;
      const cell = taglinePlaceholderRef.current;
      if (!section || !cell) return;
      const sectionBox = section.getBoundingClientRect();
      const cellBox = cell.getBoundingClientRect();
      setStartRect({
        top: cellBox.top - sectionBox.top,
        left: cellBox.left - sectionBox.left,
        width: cellBox.width,
        height: cellBox.height,
      });
      setEndRect({ top: 0, left: 0, width: sectionBox.width, height: sectionBox.height });

      // Final available content width once the card is fully expanded (symmetric padding).
      const finalContentWidth = sectionBox.width - 2 * TAGLINE_FINAL_PAD_X;

      // Measure each line's rendered width at the card's final font size, offscreen.
      const measurer = document.createElement("span");
      measurer.style.position = "fixed";
      measurer.style.visibility = "hidden";
      measurer.style.whiteSpace = "nowrap";
      measurer.style.top = "-9999px";
      measurer.style.left = "-9999px";
      measurer.style.fontFamily = "'Geist', sans-serif";
      measurer.style.fontWeight = "500";
      measurer.style.fontSize = `${TAGLINE_FINAL_FONT_SIZE}px`;
      measurer.style.letterSpacing = "-0.02em";
      document.body.appendChild(measurer);
      const offsets = TAGLINE_LINES.map((line) => {
        measurer.textContent = line;
        const lineWidth = measurer.getBoundingClientRect().width;
        return Math.max(0, (finalContentWidth - lineWidth) / 2);
      });
      document.body.removeChild(measurer);
      setLineCenterOffsets(offsets);

      // Measure the subtitle's width (Kalam) to center it the same way.
      const subtitleMeasurer = document.createElement("span");
      subtitleMeasurer.style.position = "fixed";
      subtitleMeasurer.style.visibility = "hidden";
      subtitleMeasurer.style.whiteSpace = "nowrap";
      subtitleMeasurer.style.top = "-9999px";
      subtitleMeasurer.style.left = "-9999px";
      subtitleMeasurer.style.fontFamily = "'Kalam', cursive";
      subtitleMeasurer.style.fontWeight = "400";
      subtitleMeasurer.style.fontSize = `${SUBTITLE_FONT_SIZE}px`;
      subtitleMeasurer.textContent = SUBTITLE_TEXT;
      document.body.appendChild(subtitleMeasurer);
      const subtitleWidth = subtitleMeasurer.getBoundingClientRect().width;
      document.body.removeChild(subtitleMeasurer);
      setSubtitleCenterOffset(Math.max(0, (finalContentWidth - subtitleWidth) / 2));

      const avatarRow = avatarRowRef.current;
      if (avatarRow) {
        const avatarRowWidth = avatarRow.getBoundingClientRect().width;
        setAvatarRowCenterOffset(Math.max(0, (finalContentWidth - avatarRowWidth) / 2));
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ["start start", "end end"] });

  // Tracks whether the avatars have fully risen (progress past the end), reversibly:
  // crossing back below the threshold (scrolling up) flips it back to false. Polled via
  // rAF rather than an event subscription — more reliable than scroll/"change" events,
  // which don't fire for instantaneous/programmatic scroll jumps in some environments.
  useEffect(() => {
    let rafId: number;
    function poll() {
      const isPast = scrollYProgress.get() > 0.97;
      setPastThreshold((prev) => (prev === isPast ? prev : isPast));
      rafId = requestAnimationFrame(poll);
    }
    rafId = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafId);
  }, [scrollYProgress]);

  const cardTop = useTransform(scrollYProgress, [0, 1], [startRect.top, endRect.top]);
  const cardLeft = useTransform(scrollYProgress, [0, 1], [startRect.left, endRect.left]);
  const cardWidth = useTransform(scrollYProgress, [0, 1], [startRect.width, endRect.width]);
  const cardHeight = useTransform(scrollYProgress, [0, 1], [startRect.height, endRect.height]);
  const cardRadius = useTransform(scrollYProgress, [0, 1], [31, 0]);
  const cardFontSize = useTransform(scrollYProgress, [0, 1], [22, TAGLINE_FINAL_FONT_SIZE]);
  const cardPadX = useTransform(scrollYProgress, [0, 1], [24, TAGLINE_FINAL_PAD_X]);

  const line1X = useTransform(scrollYProgress, [0, 1], [0, lineCenterOffsets[0]]);
  const line2X = useTransform(scrollYProgress, [0, 1], [0, lineCenterOffsets[1]]);
  const line3X = useTransform(scrollYProgress, [0, 1], [0, lineCenterOffsets[2]]);
  const avatarRowX = useTransform(scrollYProgress, [0, 1], [0, avatarRowCenterOffset]);

  // Lifts the (bottom-anchored) content block up to sit vertically centered once the card is fully expanded.
  const contentCenterShift =
    TAGLINE_BOTTOM_PAD + TAGLINE_FINAL_CONTENT_HEIGHT / 2 - endRect.height / 2;
  const contentY = useTransform(scrollYProgress, [0, 1], [0, contentCenterShift]);

  // The subtitle's reserved space only grows in near the very end of the scroll (right as it's
  // about to reveal), so the tagline text stays flush against the card's bottom the rest of the
  // time instead of leaving a dead gap below it for space the subtitle doesn't need yet.
  const subtitleMarginTop = useTransform(scrollYProgress, [0, 0.8, 0.97], [0, 0, 24]);
  const subtitleReservedHeight = useTransform(scrollYProgress, [0, 0.8, 0.97], [0, 0, SUBTITLE_LINE_HEIGHT]);

  const othersOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const othersScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  // Avatars rise up one by one from behind a mask (no fade), staggered.
  const avatar1Y = useTransform(scrollYProgress, [0.7, 0.8], [46, 0]);
  const avatar2Y = useTransform(scrollYProgress, [0.78, 0.88], [46, 0]);
  const avatar3Y = useTransform(scrollYProgress, [0.86, 0.96], [46, 0]);

  // Section 1 (headline): slides straight up off-screen, no fade.
  const section1Y = useTransform(scrollYProgress, [0, 0.6], [0, -1300]);
  // Section 2 (chat card): slides at 165deg (standard math unit circle: 0deg = right, 90deg = up, counterclockwise) off-screen, no fade.
  const section2X = useTransform(scrollYProgress, [0, 0.6], [0, -1350]);
  const section2Y = useTransform(scrollYProgress, [0, 0.6], [0, -360]);

  return (
    <div ref={wrapperRef} className="relative" style={{ height: "calc(100vh + 400px)" }}>
      <style>{`
        @keyframes waytide-typewriter-reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0% 0 0); }
        }
      `}</style>
      <section
        ref={sectionRef}
        className="sticky top-0 overflow-hidden px-6 md:px-12 pt-20 pb-8 md:pt-24 md:h-screen"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-[1400px] mx-auto grid md:grid-cols-[7fr_3fr] md:grid-rows-[334fr_381fr] gap-x-3 gap-y-1 md:h-full">
          {/* Top left: headline */}
          <motion.div className="flex items-end" style={{ y: section1Y }}>
            <h1
              className="text-[#171717]"
              style={{
                fontFamily: "'LT Cushion', serif",
                fontWeight: 500,
                fontSize: "clamp(36px, 4.6vw, 64px)",
                lineHeight: 1.089,
                letterSpacing: "-0.03em",
              }}
            >
              AI that makes sense
              <br />
              for maritime
            </h1>
          </motion.div>

          {/* Top right: invisible placeholder marking the tagline card's resting bounds */}
          <div ref={taglinePlaceholderRef} />

          {/* Bottom left: chat card */}
          <motion.div
            className="relative rounded-[22px] overflow-hidden"
            style={{
              x: section2X,
              y: section2Y,
              backgroundImage: `url(${chatCardBgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <TileMosaic />
          </motion.div>

          {/* Bottom right: scroll cue */}
          <motion.div
            className="flex flex-col items-start gap-1 pt-2 text-[#171717]/40"
            style={{ opacity: othersOpacity, scale: othersScale }}
          >
            <style>{`
              @keyframes waytide-scroll-cue-bounce {
                0%, 100% { transform: translateY(0); opacity: 0.3; }
                50% { transform: translateY(6px); opacity: 1; }
              }
            `}</style>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ animation: `waytide-scroll-cue-bounce 1.2s ease-in-out ${i * 0.15}s infinite` }}>
                <ChevronDown size={20} strokeWidth={2.5} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Growing tagline card: animates from its resting grid cell to full section coverage */}
        <motion.div
          className="absolute bg-white flex flex-col justify-end"
          style={{
            top: cardTop,
            left: cardLeft,
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardRadius,
            paddingLeft: cardPadX,
            paddingRight: cardPadX,
            paddingBottom: TAGLINE_BOTTOM_PAD,
            border: "1px solid #E4E2DC",
          }}
        >
          <motion.div style={{ y: contentY }}>
            <motion.div
              ref={avatarRowRef}
              className="flex -space-x-2 mb-4"
              style={{ x: avatarRowX, width: "fit-content", position: "relative" }}
            >
              <div className="rounded-full overflow-hidden" style={{ width: 46, height: 46 }}>
                <motion.img
                  src={michaelAvatar}
                  alt=""
                  className="rounded-full object-cover border-2 border-white"
                  style={{ width: 46, height: 46, y: avatar1Y }}
                />
              </div>
              <div className="rounded-full overflow-hidden" style={{ width: 46, height: 46 }}>
                <motion.img
                  src={jamesAvatar}
                  alt=""
                  className="rounded-full object-cover border-2 border-white"
                  style={{ width: 46, height: 46, y: avatar2Y }}
                />
              </div>
              <div className="rounded-full overflow-hidden" style={{ width: 46, height: 46 }}>
                <motion.div
                  className="rounded-full flex items-center justify-center border-2 border-white"
                  style={{ width: 46, height: 46, background: "#FFE222", y: avatar3Y }}
                >
                  <WayMascot size={32} />
                </motion.div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "100%",
                  bottom: "100%",
                  marginLeft: 0,
                  marginBottom: 2,
                  height: GREETING_LINE_HEIGHT,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    transform: pastThreshold ? "translateY(0%)" : "translateY(100%)",
                    transition: pastThreshold ? "none" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                  }}
                >
                  <div
                    key={pastThreshold ? "greeting-in" : "greeting-out"}
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 4,
                      whiteSpace: "nowrap",
                      width: "fit-content",
                      clipPath: pastThreshold ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                      animation: pastThreshold
                        ? "waytide-typewriter-reveal 0.45s steps(14) 0.85s both"
                        : "none",
                    }}
                  >
                    <div style={{ width: 28, height: 28, marginBottom: 4, flexShrink: 0 }}>
                      <img
                        src={greetingArrow}
                        alt=""
                        style={{ width: 28, height: 28, transform: "rotate(-120deg) scaleX(-1)" }}
                      />
                    </div>
                    <span style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 18, color: "#171717" }}>
                      Hii! I am&nbsp; Way
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div>
              {TAGLINE_LINES.map((line, i) => (
                <motion.div
                  key={line}
                  style={{
                    x: [line1X, line2X, line3X][i],
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 500,
                    fontSize: cardFontSize,
                    lineHeight: 1.19,
                    letterSpacing: "-0.02em",
                    color: "#171717",
                    whiteSpace: "nowrap",
                    width: "fit-content",
                  }}
                >
                  {line}
                </motion.div>
              ))}
            </div>

            <motion.div
              style={{
                marginTop: subtitleMarginTop,
                x: subtitleCenterOffset,
                width: "fit-content",
                height: subtitleReservedHeight,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  transform: pastThreshold ? "translateY(0%)" : "translateY(100%)",
                  transition: pastThreshold ? "none" : "transform 0.5s cubic-bezier(0.23,1,0.32,1)",
                }}
              >
                <div
                  key={pastThreshold ? "subtitle-in" : "subtitle-out"}
                  style={{
                    fontFamily: "'Kalam', cursive",
                    fontWeight: 400,
                    fontSize: SUBTITLE_FONT_SIZE,
                    color: "#171717",
                    whiteSpace: "nowrap",
                    width: "fit-content",
                    clipPath: pastThreshold ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    animation: pastThreshold
                      ? "waytide-typewriter-reveal 0.6s steps(20) 0.2s both"
                      : "none",
                  }}
                >
                  {SUBTITLE_TEXT}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
