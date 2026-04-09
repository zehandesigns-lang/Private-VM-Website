import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import svgPaths from "../../imports/svg-mp9yadf4j7";

const EASE_STRONG: [number, number, number, number] = [0.23, 1, 0.32, 1];
const EASE_DRAWER: [number, number, number, number] = [0.32, 0.72, 0, 1];

// Logo display dimensions (2x natural size)
const LOGO_WIDTH = 230;
const LOGO_HEIGHT = 230 * (36.1324 / 115); // 72.26

// Diamond center within the logo container (in display pixels)
const DIAMOND_X = (34.1644 / 115) * LOGO_WIDTH;  // 68.35
const DIAMOND_Y = (20.4989 / 36.1324) * LOGO_HEIGHT; // 41.0

// Ring + compass mark sizing
const RING_SIZE = 112;     // outer container
const RING_CX = 56;
const RING_CY = 56;
const RING_R = 45;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_R; // 282.74
const COMPASS_SIZE = 52;
const COMPASS_VIEWBOX = "29.8 16.1 8.8 8.8";

// How far letters travel from their resting positions
const SLIDE_DISTANCE = 480;

// Shared logo SVG props
const LOGO_SVG_PROPS = {
  width: LOGO_WIDTH,
  height: LOGO_HEIGHT,
  viewBox: "0 0 115 36.1324",
  fill: "none",
} as const;

function FullLogoSvg() {
  return (
    <svg {...LOGO_SVG_PROPS}>
      <path d={svgPaths.p3f4e63b0} fill="#f3f2ee" />
      <path d={svgPaths.p23798c80} fill="#f3f2ee" />
      <path d={svgPaths.p14ebd700} fill="#f3f2ee" />
      <path d={svgPaths.p2a8c800} fill="#f3f2ee" />
      <path d={svgPaths.p13984c80} fill="#f3f2ee" />
      <path d={svgPaths.p1838f370} fill="#f3f2ee" />
      <path d={svgPaths.p1eeb6100} fill="#f3f2ee" />
    </svg>
  );
}

interface LoadingScreenProps {
  onComplete: () => void;
  onReveal: () => void;
}

export function LoadingScreen({ onComplete, onReveal }: LoadingScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [exiting, setExiting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      const t1 = setTimeout(onReveal, 400);
      const t2 = setTimeout(onComplete, 700);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
    // t1: ring + spin complete → reveal letters
    // t2: letters landed → start exit, simultaneously signal content to rise
    // t3: exit done → unmount
    const t1 = setTimeout(() => setShowLogo(true), 880);
    const t2 = setTimeout(() => { setExiting(true); onReveal(); }, 1520);
    const t3 = setTimeout(onComplete, 1860);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete, onReveal, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#113637]"
        animate={{ opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <FullLogoSvg />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#113637] overflow-hidden"
      initial={{ y: 0 }}
      animate={{ y: exiting ? "-100%" : 0 }}
      transition={{ duration: 0.34, ease: EASE_DRAWER }}
    >
      <div className="relative w-full h-full">

        {/* ── Phase 1: Ring + spinning compass mark ─────────────────
            Centered on screen. Fades out with blur as letters arrive. */}
        <motion.div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: RING_SIZE,
            height: RING_SIZE,
            transform: "translate(-50%, -50%)",
          }}
          animate={
            showLogo
              ? { opacity: 0, filter: "blur(10px)" }
              : { opacity: 1, filter: "blur(0px)" }
          }
          transition={{ duration: 0.22, ease: EASE_STRONG }}
        >
          {/* Ring SVG */}
          <svg
            width={RING_SIZE}
            height={RING_SIZE}
            style={{ position: "absolute", inset: 0 }}
            overflow="visible"
          >
            <defs>
              <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Dim track */}
            <circle
              cx={RING_CX}
              cy={RING_CY}
              r={RING_R}
              stroke="#f3f2ee"
              strokeOpacity="0.12"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Animated arc — same ease as diamond rotation */}
            <motion.circle
              cx={RING_CX}
              cy={RING_CY}
              r={RING_R}
              stroke="#f3f2ee"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              filter="url(#ring-glow)"
              transform={`rotate(-90 ${RING_CX} ${RING_CY})`}
              strokeDasharray={RING_CIRCUMFERENCE}
              initial={{ strokeDashoffset: RING_CIRCUMFERENCE }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.85, ease: "linear" }}
            />
          </svg>

          {/* Spinning diamond (scale + fade in first, then rotate 360°) */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 360 }}
            transition={{
              scale: { duration: 0.2, ease: EASE_STRONG },
              opacity: { duration: 0.2, ease: EASE_STRONG },
              rotate: { duration: 0.85, ease: EASE_STRONG },
            }}
          >
            <svg
              width={COMPASS_SIZE}
              height={COMPASS_SIZE}
              viewBox={COMPASS_VIEWBOX}
              fill="none"
            >
              <path d={svgPaths.p1eeb6100} fill="#f3f2ee" />
            </svg>
          </motion.div>
        </motion.div>

        {/* ── Phase 2: Logo assembly — diamond is anchor at screen center ──
            Logo container is offset so its internal diamond sits exactly
            where the ring's diamond was.                                 */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            // Shift container so diamond (at DIAMOND_X, DIAMOND_Y inside) = screen center
            transform: `translate(${-DIAMOND_X}px, ${-DIAMOND_Y}px)`,
            width: LOGO_WIDTH,
            height: LOGO_HEIGHT,
          }}
        >
          {/* V — slides in from the left */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ x: -SLIDE_DISTANCE, opacity: 0 }}
            animate={{
              x: showLogo ? 0 : -SLIDE_DISTANCE,
              opacity: showLogo ? 1 : 0,
            }}
            transition={{ duration: 0.32, ease: EASE_STRONG }}
          >
            <svg {...LOGO_SVG_PROPS}>
              <path d={svgPaths.p3f4e63b0} fill="#f3f2ee" />
            </svg>
          </motion.div>

          {/* O arc + diamond — fades in at the anchor point */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: showLogo ? 1 : 0 }}
            transition={{ duration: 0.22, ease: EASE_STRONG }}
          >
            <svg {...LOGO_SVG_PROPS}>
              <path d={svgPaths.p23798c80} fill="#f3f2ee" />
              <path d={svgPaths.p1eeb6100} fill="#f3f2ee" />
            </svg>
          </motion.div>

          {/* L T E O — slides in from the right (slight stagger) */}
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={{ x: SLIDE_DISTANCE, opacity: 0 }}
            animate={{
              x: showLogo ? 0 : SLIDE_DISTANCE,
              opacity: showLogo ? 1 : 0,
            }}
            transition={{
              duration: 0.32,
              ease: EASE_STRONG,
              delay: showLogo ? 0.03 : 0,
            }}
          >
            <svg {...LOGO_SVG_PROPS}>
              <path d={svgPaths.p14ebd700} fill="#f3f2ee" />
              <path d={svgPaths.p2a8c800} fill="#f3f2ee" />
              <path d={svgPaths.p13984c80} fill="#f3f2ee" />
              <path d={svgPaths.p1838f370} fill="#f3f2ee" />
            </svg>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
