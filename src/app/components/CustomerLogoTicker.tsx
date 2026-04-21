import { useReducedMotion } from "motion/react";
import imgEasternPacific from "@/assets/logos/eastern-pacific.png";
import imgTorm from "@/assets/logos/torm.png";
import imgTk from "@/assets/logos/tk.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import imgUnionMarine from "@/assets/logos/union-marine.png";
import imgZamil from "@/assets/logos/zamil.png";
import imgCmaCgm from "@/assets/logos/cma-cgm.png";
import imgMtm from "@/assets/logos/mtm.png";

const CUSTOMER_LOGOS = [
  { src: imgEasternPacific, alt: "Eastern Pacific Shipping", h: "h-[38px]" },
  { src: imgTorm, alt: "TORM", h: "h-[34px]" },
  { src: imgTk, alt: "Teekay", h: "h-[38px]" },
  { src: imgWilhelmsen, alt: "Wilhelmsen", h: "h-[38px]" },
  { src: imgUnionMarine, alt: "Union Marine Management", h: "h-[38px]" },
  { src: imgZamil, alt: "Zamil Marine", h: "h-[38px]" },
  { src: imgCmaCgm, alt: "CMA CGM", h: "h-[34px]" },
  { src: imgMtm, alt: "MTM", h: "h-[38px]" },
] as const;

function logoSizeClass(logo: (typeof CUSTOMER_LOGOS)[number], isDark: boolean) {
  if (!isDark) return logo.h;
  return logo.h.includes("34px") ? "h-[26px] md:h-[34px]" : "h-[28px] md:h-[38px]";
}

export type CustomerLogoTickerProps = {
  variant: "light" | "dark";
  /** Extra classes on the outer wrapper */
  className?: string;
};

/**
 * Horizontal marquee of customer logos. “Light” matches About; “dark” is for teal / event backgrounds.
 */
export function CustomerLogoTicker({ variant, className = "" }: CustomerLogoTickerProps) {
  const prefersReducedMotion = useReducedMotion();
  const isDark = variant === "dark";

  /** Soft horizontal fade — mask (not color overlays) so textured backgrounds behind the ticker stay seamless. */
  const edgeMask = {
    WebkitMaskImage:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 4%, rgba(255,255,255,0.72) 11%, #fff 18%, #fff 82%, rgba(255,255,255,0.72) 89%, rgba(255,255,255,0.22) 96%, transparent 100%)",
    maskImage:
      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.22) 4%, rgba(255,255,255,0.72) 11%, #fff 18%, #fff 82%, rgba(255,255,255,0.72) 89%, rgba(255,255,255,0.22) 96%, transparent 100%)",
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
      className="relative overflow-hidden w-full min-w-0"
      style={edgeMask}
      role="region"
      aria-label="Partner logos"
    >
      <div
        className="flex items-center gap-12 md:gap-16 w-max"
        style={{
          animation: prefersReducedMotion ? "none" : "volteo-customer-ticker 40s linear infinite",
        }}
      >
        {[...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className={imgClassFor(logo)}
            draggable={false}
          />
        ))}
      </div>

      <style>{`
        @keyframes volteo-customer-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
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
