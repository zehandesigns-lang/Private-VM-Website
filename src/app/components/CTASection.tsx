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
              <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>Careers</span>
            ) : (
              <>
                Capture the knowledge before it walks off the{" "}
                <span style={{ fontFamily: "'LT Cushion', serif", fontWeight: 300, fontStyle: "normal" }}>gangway</span>
              </>
            )}
          </h2>
          <p
            className="text-[#f3f2ee]/80 leading-[1.65] mb-10"
            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            {isTeam ? (
              <>
                We&apos;re rebuilding maritime from the ground up. Let&apos;s do it together.
              </>
            ) : (
              <>Whether you operate 5 vessels or 500, most fleets are less than 4 weeks from their first deployment — and a fundamentally better way of vessel operations</>
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            {isTeam ? (
              <a
                href="https://sg.linkedin.com/company/volteomaritime"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
              >
                Careers
                <ArrowUpRight size={15} />
              </a>
            ) : (
              <>
                <Link
                  to="/book-demo"
                  className="bg-[#fcf7e3] text-[#0e3233] px-7 py-3 hover:bg-white transition-colors duration-150 inline-flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 15 }}
                >
                  Get a Demo
                  <ArrowUpRight size={15} />
                </Link>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
