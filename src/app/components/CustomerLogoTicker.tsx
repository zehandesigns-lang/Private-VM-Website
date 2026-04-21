import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion } from "motion/react";
import imgEasternPacific from "@/assets/logos/eastern-pacific.png";
import imgTorm from "@/assets/logos/torm.png";
import imgTk from "@/assets/logos/tk.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import imgUnionMarine from "@/assets/logos/union-marine.png";
import imgZamil from "@/assets/logos/zamil.png";
import imgCmaCgm from "@/assets/logos/cma-cgm.png";
import imgMtm from "@/assets/logos/mtm.png";

const CUSTOMER_LOGOS = [
  { src: imgEasternPacific, alt: "Eastern Pacific Shipping", h: "h-[69px]" },
  { src: imgTorm, alt: "TORM", h: "h-[62px]" },
  { src: imgTk, alt: "Teekay", h: "h-[69px]" },
  { src: imgWilhelmsen, alt: "Wilhelmsen", h: "h-[69px]" },
  { src: imgUnionMarine, alt: "Union Marine Management", h: "h-[69px]" },
  { src: imgZamil, alt: "Zamil Marine", h: "h-[69px]" },
  { src: imgCmaCgm, alt: "CMA CGM", h: "h-[62px]" },
  { src: imgMtm, alt: "MTM", h: "h-[69px]" },
] as const;

function logoSizeClass(logo: (typeof CUSTOMER_LOGOS)[number], isDark: boolean) {
  if (!isDark) return logo.h;
  return logo.h.includes("[62px]") ? "h-[47px] md:h-[62px]" : "h-[51px] md:h-[69px]";
}

export type CustomerLogoTickerProps = {
  variant: "light" | "dark";
  /** Extra classes on the outer wrapper */
  className?: string;
};

/**
 * Infinite marquee: Motion `x` + rAF with modulo (no CSS keyframe loop seam).
 * Segment count grows so wide viewports stay covered — avoids a short “cluster” with empty sides.
 */
export function CustomerLogoTicker({ variant, className = "" }: CustomerLogoTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = variant === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const loopPxRef = useRef(0);
  const [segmentCount, setSegmentCount] = useState(3);

  useLayoutEffect(() => {
    const el = rowRef.current;
    const container = containerRef.current;
    if (!el || !container) return;

    const measure = () => {
      const c = el.children;
      if (c.length < 2) return;
      const a = (c[0] as HTMLElement).getBoundingClientRect();
      const b = (c[1] as HTMLElement).getBoundingClientRect();
      const p = b.left - a.left;
      if (p <= 0) return;

      const cw = container.clientWidth;
      const needed = Math.min(16, Math.max(3, Math.ceil((cw + p * 2) / p)));
      setSegmentCount((n) => (n !== needed ? needed : n));
      loopPxRef.current = p;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(container);
    el.querySelectorAll("img").forEach((img) => img.addEventListener("load", measure));
    return () => {
      ro.disconnect();
      el.querySelectorAll("img").forEach((img) => img.removeEventListener("load", measure));
    };
  }, [segmentCount]);

  useEffect(() => {
    if (prefersReducedMotion) {
      x.set(0);
      return;
    }
    let raf = 0;
    let last = performance.now();
    const speedPxPerSec = 65;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      const lp = loopPxRef.current;
      if (lp > 0) {
        let nx = x.get() - speedPxPerSec * dt;
        while (nx <= -lp) nx += lp;
        x.set(nx);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x, prefersReducedMotion]);

  const edgeMask = {
    WebkitMaskImage:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 5%, rgba(255,255,255,0.9) 12%, #fff 16%, #fff 84%, rgba(255,255,255,0.9) 88%, rgba(255,255,255,0.35) 95%, transparent 100%)",
    maskImage:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 5%, rgba(255,255,255,0.9) 12%, #fff 16%, #fff 84%, rgba(255,255,255,0.9) 88%, rgba(255,255,255,0.35) 95%, transparent 100%)",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  } as const;

  const imgClassFor = (logo: (typeof CUSTOMER_LOGOS)[number]) =>
    isDark
      ? `${logoSizeClass(logo, true)} w-auto object-contain shrink-0 select-none brightness-0 invert opacity-[0.42]`
      : `${logoSizeClass(logo, false)} w-auto object-contain grayscale opacity-40 shrink-0 select-none`;

  const track = (
    <div
      ref={containerRef}
      className="relative min-h-[87px] w-full min-w-0 overflow-hidden md:min-h-[101px]"
      style={edgeMask}
      role="region"
      aria-label="Partner logos"
    >
      <motion.div
        ref={rowRef}
        className="flex w-max will-change-transform gap-12 md:gap-16"
        style={{ x }}
      >
        {Array.from({ length: segmentCount }, (_, seg) => (
          <div
            key={seg}
            className="flex shrink-0 items-center gap-12 md:gap-16"
            aria-hidden={seg > 0}
          >
            {CUSTOMER_LOGOS.map((logo) => (
              <img
                key={`${seg}-${logo.alt}`}
                src={logo.src}
                alt={seg === 0 ? logo.alt : ""}
                className={imgClassFor(logo)}
                draggable={false}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );

  if (isDark) {
    return <div className={`w-full min-w-0 ${className}`}>{track}</div>;
  }

  return (
    <div className={`w-full min-w-0 bg-[#f3f2ee] py-7 ${className}`}>
      {track}
    </div>
  );
}
