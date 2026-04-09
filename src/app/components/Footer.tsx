import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { VolteoLogo } from "./VolteoLogo";
import { RailDivider } from "./RailDivider";

const footerLinks = {
  Products: ["Wayship", "Smart Port"],
  Resources: ["Customer stories", "Benchmarks"],
  About: ["Careers", "Our story"],
  Socials: ["LinkedIn", "Twitter/X"],
};

export function Footer() {
  const sailRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current;
      const text = sailRef.current;
      if (!container || !text) return;
      text.style.fontSize = "100px";
      const ratio = container.offsetWidth / text.scrollWidth;
      if (ratio > 0) text.style.fontSize = `${100 * ratio}px`;
    };

    fit();
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      const ro = new ResizeObserver(fit);
      ro.observe(containerRef.current);
      return () => ro.disconnect();
    }
  }, []);

  return (
    <footer className="bg-[#f3f2ee]" id="footer">
      {/* Top Links Row */}
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] pt-14 pb-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between">
          {/* Logo */}
          <div className="md:w-1/4">
            <VolteoLogo color="#113637" />
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 md:w-3/4">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p
                  className="text-[#103435] mb-4"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600, fontSize: 14 }}
                >
                  {category}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-[#464646] hover:text-[#103435] transition-colors duration-200"
                        style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big "Sail better" Text — full width between rails */}
      <RailDivider />
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] pt-8 pb-0 overflow-hidden">
        <motion.div
          ref={containerRef}
          className="w-full"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={sailRef}
            className="leading-none tracking-tight select-none whitespace-nowrap"
            style={{ display: "inline-block" }}
          >
            <span
              className="text-[#103435]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
            >
              Sail{" "}
            </span>
            <span
              className="text-[#103435]"
              style={{
                fontFamily: "'LT Cushion', serif",
                fontWeight: 300,
              }}
            >
              better
            </span>
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px] py-5">
        <p
          className="text-[#888]"
          style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 13 }}
        >
          © {new Date().getFullYear()} Volteo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}