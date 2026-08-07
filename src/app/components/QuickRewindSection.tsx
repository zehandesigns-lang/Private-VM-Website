import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import imgEasternPacific from "@/assets/logos/eastern-pacific.png";
import imgAngloEastern from "@/assets/logos/angloeastern.png";
import imgCmaCgm from "@/assets/logos/cma-cgm.png";
import imgTk from "@/assets/logos/tk.png";
import imgUnionMarine from "@/assets/logos/union-marine.png";
import imgWilhelmsen from "@/assets/logos/wilhelmsen.png";
import imgZamil from "@/assets/logos/zamil.png";
import imgMtm from "@/assets/logos/mtm.png";

/* ── Animated Counter Hook ── */
function useCountUp(target: number, duration = 2200, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(easeOut(progress) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ── Single Stat Card ── */
interface StatCardProps {
  prefix?: string;
  value: number;
  suffix: string;
  description: string;
  badge?: string;
  start: boolean;
  borderRight?: boolean;
}

function StatCard({ prefix = "", value, suffix, description, badge, start, borderRight }: StatCardProps) {
  const count = useCountUp(value, 2200, start);
  return (
    <div
      className="flex-1 min-w-0 pt-8 pb-10 px-6 md:px-8 relative"
      style={{ borderRight: borderRight ? "1px solid #D9D9D9" : undefined }}
    >
      {/* Badge — absolutely pinned to top-right, out of flow so numbers stay aligned */}
      {badge && (
        <div className="absolute top-4 right-4 md:right-6 inline-flex items-center gap-1.5 bg-[#2f615a] px-3 py-1.5">
          <span className="text-[#f3f2ee] text-[11px]" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}>⊕</span>
          <span
            className="text-[#f3f2ee] tracking-[0.6px] text-[11px]"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Number */}
      <div
        className="text-black leading-none tracking-tight mb-3"
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontWeight: 400,
          fontSize: "clamp(52px, 5.5vw, 84px)",
        }}
      >
        {prefix}{count.toLocaleString()}{suffix}
      </div>

      {/* Description */}
      <p
        className="text-[#464646] leading-[1.4] max-w-[260px]"
        style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(13px, 1.1vw, 18px)" }}
      >
        {description}
      </p>
    </div>
  );
}

/* ── Wall of Love Logos ── */
const LOGOS = [
  { src: imgEasternPacific, alt: "Eastern Pacific Shipping", maxH: "max-h-[52px] md:max-h-[64px]" },
  { src: imgTk,             alt: "TK",                       maxH: "max-h-[52px] md:max-h-[64px]" },
  { src: imgAngloEastern,   alt: "Anglo Eastern",             maxH: "max-h-[46px] md:max-h-[58px]" },
  { src: imgCmaCgm,         alt: "CMA CGM",                  maxH: "max-h-[46px] md:max-h-[58px]" },
  { src: imgMtm,            alt: "MTM",                      maxH: "max-h-[52px] md:max-h-[64px]" },
  { src: imgZamil,          alt: "Zamil Marine",             maxH: "max-h-[52px] md:max-h-[64px]" },
  { src: imgUnionMarine,    alt: "Union Marine",             maxH: "max-h-[52px] md:max-h-[64px]" },
  { src: imgWilhelmsen,     alt: "Wilhelmsen",               maxH: "max-h-[52px] md:max-h-[64px]" },
] as const;

function LogoRow({ logos }: { logos: typeof LOGOS[number][] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#D9D9D9]">
      {logos.map((logo) => (
        <div
          key={logo.alt}
          className="flex items-center justify-center px-10 md:px-14 py-14 md:py-20"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            className={`${logo.maxH} w-auto object-contain grayscale opacity-90`}
            loading="lazy"
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

function LogoGrid() {
  return (
    <div className="mt-12">
      {/* Row 1 — no outer top border */}
      <LogoRow logos={LOGOS.slice(0, 4) as unknown as typeof LOGOS[number][]} />

      {/* Middle divider — inset so it doesn't reach the outer left / right edges */}
      <div className="px-6">
        <div className="h-px bg-[#D9D9D9]" />
      </div>

      {/* Row 2 — no outer bottom border */}
      <LogoRow logos={LOGOS.slice(4) as unknown as typeof LOGOS[number][]} />
    </div>
  );
}

/* ── Main Section ── */
export function QuickRewindSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="bg-[#f3f2ee]" id="quick-rewind">
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">

        {/* Title */}
        <motion.div
          className="pt-16 md:pt-24 pb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <h2
            className="text-[#103435] tracking-tight"
            style={{ fontSize: "clamp(32px, 3.5vw, 54px)", letterSpacing: "-1.62px" }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
              Quick{" "}
            </span>
            <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 300 }}>
              Rewind
            </span>
          </h2>
        </motion.div>

        {/* Stats Row — top border only (no bounding box), badge absolutely positioned */}
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row border-t border-[#D9D9D9] mt-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.15}
        >
          <StatCard
            value={350}
            suffix="+"
            description="vessels rely on Wayship everyday"
            badge="500+ by Q4 2026"
            start={isInView}
            borderRight
          />
          <StatCard
            prefix="$"
            value={30}
            suffix="b+"
            description="worth of assets managed"
            start={isInView}
            borderRight
          />
          <StatCard
            prefix="$"
            value={45}
            suffix="m+"
            description="additional revenue generated for specialized secondary ports of Smartport"
            start={isInView}
          />
        </motion.div>

        {/* Wall of Love */}
        <motion.div
          className="mt-20 md:mt-28"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
        >
          <h2
            className="text-[#103435] tracking-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(28px, 3vw, 46px)",
              letterSpacing: "-1.38px",
            }}
          >
            Wall of Love
          </h2>
          <p
            className="text-[#464646] mt-2"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 18px)" }}
          >
            Customers who trusted us to help transform their operations
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          custom={0.2}
          className="pb-20 md:pb-28"
        >
          <LogoGrid />
        </motion.div>
      </div>
    </section>
  );
}