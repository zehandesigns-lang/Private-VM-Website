import { useLayoutEffect, type ReactNode } from "react";
import { useLocation } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/**
 * Instant scroll reset before paint so route changes never show a visible "scroll jump".
 * Uses Lenis when available, falls back to native window.scrollTo.
 */
function useInstantScrollTop(pathname: string) {
  const lenis = useLenis();
  useLayoutEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      document.body.scrollTop = 0;
      html.style.scrollBehavior = prev;
    }
  }, [pathname, lenis]);
}

export function PageRouteTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const reduce = useReducedMotion();

  useInstantScrollTop(location.pathname);

  return (
    <div className="relative min-h-screen bg-[#f3f2ee]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          className="relative min-h-screen"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.42, ease: EASE }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
