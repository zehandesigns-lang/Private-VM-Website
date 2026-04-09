import { motion } from "motion/react";
import svgPaths from "../../imports/svg-mp9yadf4j7";

export function CTASection() {
  return (
    <section className="relative overflow-hidden bg-[#0d2f30]" id="cta">
      {/* Wavy paper tear at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 160, transform: "translateY(2px)" }}
      >
        <svg
          viewBox="0 0 1355.68 171.659"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-full"
        >
          <g filter="url(#cta-filter)">
            <path d={svgPaths.p300e9500} fill="#f3f2ee" />
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="171.659"
              id="cta-filter"
              width="1355.68"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feTurbulence
                baseFrequency="0.1176 0.1176"
                numOctaves={3}
                seed={8572}
                type="fractalNoise"
              />
              <feDisplacementMap
                height="100%"
                in="shape"
                result="displacedImage"
                scale={11.6}
                width="100%"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feMerge result="effect1">
                <feMergeNode in="displacedImage" />
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>

      {/* Ship illustration */}
      <div className="absolute bottom-[100px] right-[-30px] md:right-[5%] pointer-events-none opacity-30 md:opacity-50">
        <svg
          viewBox="0 0 224 68"
          fill="none"
          className="w-[200px] md:w-[300px] lg:w-[380px]"
        >
          <path d={svgPaths.p38470e80} fill="#D9D9D9" />
        </svg>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] relative z-10">
        <div className="py-24 md:py-36 max-w-[760px]">

          <motion.h2
            className="text-[#fcf7e3] leading-[1.0] tracking-tight mb-10"
            style={{ fontSize: "clamp(38px, 5vw, 70px)" }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, display: "block" }}
            >
              Built for the people
            </span>
            <span
              style={{
                fontFamily: "'LT Cushion', serif",
                fontWeight: 300,
                display: "block",
              }}
            >
              who keep the world moving
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="#"
              className="inline-flex items-center gap-2 border border-black bg-[#cfcbb9] text-[#172727] px-6 py-3 will-change-transform transition-[background-color,box-shadow,color,border-color,opacity] duration-150 ease-out motion-reduce:transition-none"
              style={{
                fontFamily: "'TT Hoves Pro', sans-serif",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "0.03em",
              }}
              whileHover={{
                backgroundColor: "#e0dccb",
                transition: { duration: 0.14, ease: [0.23, 1, 0.32, 1] },
              }}
              whileTap={{ scale: 0.985, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}
            >
              TALK TO SALES
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
