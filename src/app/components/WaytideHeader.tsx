import { motion, AnimatePresence } from "motion/react";
import { WayMascot } from "./WayMascot";

const navItems = ["Meet Way", "Threads", "Daily Checkins", "How Way works", "FAQ's"];

const navTextStyle = {
  fontFamily: "'Geist', sans-serif",
  fontWeight: 500,
  fontSize: 14,
  color: "#000",
  letterSpacing: "-0.16px",
  lineHeight: "149.877%",
};

const pillTransition = { type: "spring" as const, stiffness: 380, damping: 32 };

export function WaytideHeader({ activeIndex = null }: { activeIndex?: number | null }) {
  const condensed = activeIndex !== null;
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        layout
        transition={pillTransition}
        className="inline-flex items-center justify-center"
        style={{ padding: 4, gap: 12, borderRadius: 12, background: "#E9E8DB" }}
      >
        <motion.div
          layout="position"
          transition={pillTransition}
          className="relative flex items-center shrink-0"
          style={{ padding: "9px 12px", gap: 10 }}
        >
          {!condensed && (
            <motion.div
              layoutId="nav-active-pill"
              className="absolute inset-0"
              style={{ borderRadius: 16, background: "#FFF" }}
              transition={pillTransition}
            />
          )}
          <div className="relative z-10 flex items-center" style={{ gap: 10 }}>
            <motion.div layout="position" style={{ display: "flex" }}>
              <WayMascot size={26} />
            </motion.div>
            <motion.div layout transition={pillTransition} style={{ overflow: "hidden" }}>
              <AnimatePresence mode="popLayout">
                {!condensed && (
                  <motion.span
                    key="waytide-text"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{
                      fontFamily: "'LT Cushion', serif",
                      fontWeight: 500,
                      fontSize: 16,
                      display: "block",
                    }}
                    className="text-[#171717] whitespace-nowrap"
                  >
                    Waytide
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>

        <motion.nav layout="position" transition={pillTransition} className="hidden md:flex items-center gap-7 px-6">
          {navItems.map((item, i) => (
            <motion.div layout="position" transition={pillTransition} key={item} className="relative flex items-center">
              {i === activeIndex && (
                <motion.div
                  layoutId="nav-active-pill"
                  className="absolute -inset-x-4 -inset-y-2.5"
                  style={{ borderRadius: 16, background: "#FFF" }}
                  transition={pillTransition}
                />
              )}
              <button
                type="button"
                className="relative z-10 hover:opacity-60 transition-opacity duration-150 bg-transparent border-none cursor-pointer whitespace-nowrap"
                style={navTextStyle}
              >
                {item}
              </button>
            </motion.div>
          ))}
        </motion.nav>

        <motion.button
          layout="position"
          transition={pillTransition}
          type="button"
          className="flex items-center justify-center self-stretch shrink-0 text-white transition-colors duration-150"
          style={{
            fontFamily: "'Geist', sans-serif",
            fontWeight: 600,
            fontSize: 14,
            padding: "9px 16px",
            gap: 10,
            borderRadius: 8,
            background: "#33C659",
            boxShadow: "0 -2px 4px 0 rgba(0,0,0,0.15)",
          }}
        >
          Login
        </motion.button>
      </motion.div>
    </header>
  );
}
