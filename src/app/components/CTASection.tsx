import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatedDitherBackground } from "./AnimatedDitherBackground";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

export type CTASectionVariant = "default" | "team";

type CTASectionProps = {
  /** `team`: recruiting-focused copy for About and similar pages. */
  variant?: CTASectionVariant;
};

/**
 * Shared CTA: dark green canvas, radial depth, animated dither — used on Home, Wayship, and About.
 */
export function CTASection({ variant = "default" }: CTASectionProps) {
  const isTeam = variant === "team";

  return (
    <section id="cta" className="relative z-[70] w-full overflow-hidden">
      <div className="absolute inset-0 bg-[#0e3233]" aria-hidden />
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 130% 70% at 50% -35%, rgba(252, 247, 227, 0.16), transparent 52%),
            radial-gradient(ellipse 55% 45% at 100% 105%, rgba(0, 0, 0, 0.45), transparent 50%),
            radial-gradient(ellipse 50% 40% at 0% 80%, rgba(65, 102, 104, 0.35), transparent 55%),
            linear-gradient(168deg, #0e3233 0%, #0b282a 42%, #0d2f30 100%)
          `,
        }}
      />
      <AnimatedDitherBackground className="pointer-events-none z-[1] opacity-[0.72]" ditherMix={0.34} />

      <div className="relative z-10 mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-24 md:py-32">
        <motion.div
          className="max-w-[580px] mx-auto text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2
            className="text-[#fcf7e3] leading-[1.1] tracking-[-1.5px] mb-5"
            style={{
              fontFamily: "'TT Hoves Pro', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.5vw, 52px)",
              textShadow: "0 1px 24px rgba(0,0,0,0.25)",
            }}
          >
            {isTeam ? (
              <>
                Join{" "}
                <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>our team</span>
              </>
            ) : (
              <>
                Start capturing what your fleet{" "}
                <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>already knows</span>
              </>
            )}
          </h2>
          <p
            className="text-[#f3f2ee]/80 leading-[1.65] mb-10"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            {isTeam ? (
              <>
                We&apos;re growing the crew behind maritime intelligence — product, design, and people who ship with
                operators at sea. If that sounds like your next chapter, we&apos;d love to hear from you.
              </>
            ) : (
              <>
                Most fleets are 30 days from their first structured crew handover and a crew that actually has time to
                do their job. Let&apos;s show you how it works on your vessel type.
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            {isTeam ? (
              <a
                href="mailto:careers@volteo.com?subject=Careers%20inquiry"
                className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
              >
                Join our team
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <>
                <Link
                  to="/book-demo"
                  className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
                >
                  Request a demo
                  <ArrowUpRight size={15} />
                </Link>
                <a
                  href="#"
                  className="text-[#fcf7e3]/90 border border-[#fcf7e3]/25 px-7 py-3 hover:border-[#fcf7e3]/45 hover:bg-[#fcf7e3]/5 transition-colors duration-150"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 15 }}
                >
                  Talk to a specialist
                </a>
              </>
            )}
          </div>
          <p className="text-[#fcf7e3]/45 font-mono text-[11px]">
            {isTeam ? (
              <>Product · Design · Maritime operations · Remote-friendly</>
            ) : (
              <>No commitment · Live on 200+ vessels · ABS, Liberia, Bahamas, Malta, Singapore</>
            )}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
