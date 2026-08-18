import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { VolteoLogo } from "./VolteoLogo";
import { RailDivider } from "./RailDivider";

type FooterLink = string | { label: string; href: string };

const footerLinks: Record<string, FooterLink[]> = {
  Products: [
    { label: "Wayship", href: "/wayship" },
    { label: "Smart Port", href: "/smartport" },
  ],
  Resources: [
    { label: "Case studies", href: "/resources?tab=case-studies" },
    { label: "Insights", href: "/resources?tab=insights" },
  ],
  About: [
    { label: "Our story", href: "/about#founder-note" },
    { label: "Careers", href: "/about#join-our-team" },
  ],
  Socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/volteomaritime" }],
};

export function Footer() {
  const taglineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fit = () => {
      const container = containerRef.current;
      const text = taglineRef.current;
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
            <a
              href="https://volteomaritime.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Volteo Maritime homepage"
              className="inline-block"
            >
              <VolteoLogo color="#113637" />
            </a>
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
                  {links.map((link) => {
                    const label = typeof link === "string" ? link : link.label;
                    const href = typeof link === "string" ? "#" : link.href;
                    const isInternal = href.startsWith("/");
                    const className =
                      "text-[#464646] hover:text-[#103435] transition-colors duration-200";
                    const style = {
                      fontFamily: "'TT Hoves Pro', sans-serif",
                      fontWeight: 400,
                      fontSize: 14,
                    } as const;
                    return (
                      <li key={label}>
                        {isInternal ? (
                          <Link to={href} className={className} style={style}>
                            {label}
                          </Link>
                        ) : (
                          <a
                            href={href}
                            className={className}
                            style={style}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {label}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Big tagline — full width between rails */}
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
            ref={taglineRef}
            className="leading-none tracking-tight select-none whitespace-nowrap"
            style={{ display: "inline-block" }}
          >
            <span
              className="text-[#103435]"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
            >
              #NoPaper
            </span>
            <span
              className="text-[#103435]"
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontWeight: 300,
              }}
            >
              ForWork
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
          © {new Date().getFullYear()} Volteo Maritime Pte Limited. All rights reserved.
        </p>
      </div>
    </footer>
  );
}