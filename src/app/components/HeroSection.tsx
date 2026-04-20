import { motion } from "motion/react";
import epsLogo from "@/assets/logos/eastern-pacific.png";
import { VolteoTextLink } from "./VolteoTextLink";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-[#f3f2ee] pt-[72px] flex flex-col"
      id="hero"
    >
      <div className="mx-auto max-w-[1512px] w-full px-8 md:px-16 lg:px-[115px] flex-1 flex flex-col">

        {/* ── Upper block ──────────────────────────────────────────── */}
        <div className="flex flex-col shrink-0">

          {/* Announcement Badge */}
          <motion.div
            className="flex items-center gap-3 pt-10 md:pt-16"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            <span
              className="bg-[#ff9905] text-black px-4 py-1.5 rounded-full text-[12px] tracking-[1.2px] uppercase"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600 }}
            >
              NEW
            </span>
            <VolteoTextLink href="https://www.smw.sg/expo-smw-2026/exhibitors-2026">
              Meet us at Booth S05, Singapore Maritime Week 2026
            </VolteoTextLink>
          </motion.div>

          {/* Row 1: Heading — occupies left ~60% */}
          <motion.div
            className="mt-8 md:mt-10 lg:w-3/5"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <h1
              className="text-[#103435] leading-[1.0] tracking-[-2px]"
              style={{ fontSize: "clamp(42px, 5.5vw, 78px)" }}
            >
              <span style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}>
                Celebrating 6 years of
              </span>
              <br />
              <span
                style={{
                  fontFamily: "'LT Cushion', serif",
                  fontWeight: 300,
                  fontStyle: "normal",
                }}
              >
                reimagining maritime
              </span>
            </h1>
          </motion.div>

          {/* Row 2: Description — its own row, pushed to the right (right 40%) */}
          <motion.div
            className="mt-6 md:mt-8 flex"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            {/* Spacer that mirrors the heading width */}
            <div className="hidden lg:block lg:w-3/5 flex-shrink-0" />
            {/* Description container: left-aligned text, sticks to the right */}
            <div className="lg:w-2/5">
              <p
                className="text-[#262627] leading-[1.55]"
                style={{
                  fontFamily: "'TT Hoves Pro', sans-serif",
                  fontWeight: 450,
                  fontSize: "clamp(15px, 1.1vw, 18px)",
                }}
              >
                Volteo is purpose-built maritime intelligence — six years of
                learning from captains, operators, and port managers to
                reimagine how the industry moves, thinks, and grows.
              </p>
            </div>
          </motion.div>

        </div>

        {/* ── Testimonial block — centred in remaining space ───────── */}
        <div className="flex-1 flex flex-col justify-center py-12 md:py-16">

          {/* Full-width divider aligned to content edges */}
          <div className="h-px w-full bg-[#D9D9D9]" />

          <motion.div
            className="pt-10 md:pt-14"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.5}
          >
            {/* Person: EPS logo + name + designation */}
            <div className="flex items-center gap-5 mb-8 md:mb-10">
              <div className="h-[64px] w-auto flex-shrink-0">
                <img
                  src={epsLogo}
                  alt="Eastern Pacific Shipping"
                  className="h-full w-auto object-contain"
                />
              </div>
              <div>
                <p
                  className="text-black"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600, fontSize: "clamp(17px, 1.3vw, 20px)" }}
                >
                  Nabo Ghosh
                </p>
                <p
                  className="text-[#464646] mt-1"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: "clamp(14px, 1vw, 17px)" }}
                >
                  Captain, Eastern Pacific Company
                </p>
              </div>
            </div>

            {/* Quote */}
            <p
              className="text-black leading-[1.4]"
              style={{
                fontFamily: "'TT Hoves Pro', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(18px, 1.8vw, 26px)",
              }}
            >
              "We stopped guessing. That alone was worth it. But what surprised
              us was how quickly the shore team started asking questions they
              never thought to ask before."
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}