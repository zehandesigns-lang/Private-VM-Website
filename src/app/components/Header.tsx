import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { VolteoLogo } from "./VolteoLogo";
import { RailDivider } from "./RailDivider";
import imgWayshipProduct from "figma:asset/24459bb564e7c9daaa4155984b2e0f003ef27003.png";

const navLinks = [
  {
    label: "Products",
    href: "#advantage",
    items: [
      { label: "Wayship", href: "#advantage" },
      { label: "Smartport", href: "#advantage" },
    ],
  },
  {
    label: "Resources",
    href: "#quick-rewind",
    items: [
      { label: "Customer stories", href: "#quick-rewind" },
      { label: "Demo videos", href: "#quick-rewind" },
    ],
  },
  {
    label: "About",
    href: "#footer",
    items: [
      { label: "Careers", href: "#footer" },
      { label: "Our story", href: "#footer" },
    ],
  },
];

const HEADER_HEIGHT = 72;

function smoothScrollTo(id: string) {
  const el = document.querySelector(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
  window.scrollTo({ top, behavior: "smooth" });
}

function DropdownMenu({
  items,
  visible,
}: {
  items: { label: string; href: string }[];
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#f3f2ee] border border-[#D9D9D9] shadow-md min-w-[180px] z-50"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          {items.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo(item.href);
              }}
              className={`flex items-center px-5 py-3 text-[#262627] hover:bg-[#e8e6e0] hover:text-[#0e3233] transition-colors duration-150 ${
                i < items.length - 1 ? "border-b border-[#E4E2DC]" : ""
              }`}
              style={{
                fontFamily: "'TT Hoves Pro', sans-serif",
                fontSize: 15,
                fontWeight: 400,
              }}
            >
              {item.label}
            </a>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type ProductKey = "wayship" | "smartport";

const products: Record<
  ProductKey,
  {
    label: string;
    description: string;
    imageAlt: string;
    imageSrc: string;
    walkthroughTitle: string;
    walkthroughDescription: string;
    hash: string;
    href?: string;
  }
> = {
  wayship: {
    label: "Wayship",
    description:
      "Voice AI, LLM chat, and digital logbooks for the modern fleet — ABS approved, trusted by 200+ vessels.",
    imageAlt: "Wayship product preview",
    imageSrc: imgWayshipProduct,
    walkthroughTitle: "Product walkthrough video",
    walkthroughDescription: "A guided tour of Wayship’s core workflows and on-board experience.",
    hash: "#wayship",
    href: "/wayship",
  },
  smartport: {
    label: "Smartport",
    description:
      "Port intelligence built to keep operations moving — from berth planning to arrivals, revenue, and compliance.",
    imageAlt: "Smartport product preview",
    imageSrc: imgWayshipProduct,
    walkthroughTitle: "Product walkthrough video",
    walkthroughDescription: "A quick walkthrough of Smartport’s planning and live-ops surfaces.",
    hash: "#smartport",
  },
};

function ProductsMegaMenu({
  visible,
  onNavigate,
}: {
  visible: boolean;
  onNavigate: (hash: string) => void;
}) {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("wayship");
  const [hoveredProduct, setHoveredProduct] = useState<ProductKey | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (visible) {
      setActiveProduct("wayship");
      setHoveredProduct(null);
    }
  }, [visible]);

  const active = products[activeProduct];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-[#f3f2ee] border border-[#D9D9D9] shadow-md z-50 w-[780px] max-w-[calc(100vw-48px)]"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 p-8">
            <div>
              <p
                className="text-[#262627] mb-3"
                style={{
                  fontFamily: "'TT Hoves Pro', sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.12em",
                }}
              >
                PRODUCTS
              </p>

              <div className="flex flex-col gap-5">
                {(Object.keys(products) as ProductKey[]).map((key) => {
                  const p = products[key];
                  const isHovered = hoveredProduct === key;
                  const shouldDim = hoveredProduct !== null && !isHovered;
                  return (
                    <div
                      key={key}
                      onMouseEnter={() => {
                        setHoveredProduct(key);
                        setActiveProduct(key);
                      }}
                      onMouseLeave={() => setHoveredProduct(null)}
                      className={`group -mx-2 px-2 py-2 transition-opacity duration-150 ease-out ${
                        shouldDim ? "opacity-50" : "opacity-100"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <p
                          className="text-[#0e3233] leading-tight"
                          style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 18 }}
                        >
                          {p.label}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            if (p.href) {
                              navigate(p.href);
                            } else {
                              onNavigate(p.hash);
                            }
                          }}
                          className={`inline-flex items-center justify-center transition-[opacity,transform,color] duration-150 ease-out ${
                            isHovered
                              ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                              : "opacity-0 -translate-x-[6px] translate-y-[6px] scale-[0.98]"
                          } text-[#0e3233]/70 hover:text-[#0e3233]`}
                          aria-label={`Go to ${p.label}`}
                        >
                          <ArrowUpRight size={16} />
                        </button>
                      </div>
                      <p
                        className="text-[#464646] mt-2 leading-[1.55] max-w-[380px]"
                        style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}
                      >
                        {p.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col">
              <div className="border border-[#D9D9D9] bg-[#eeece5] overflow-hidden">
                <img
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  className="w-full h-[180px] object-cover"
                />
              </div>
              <div className="mt-4">
                <p
                  className="text-[#0e3233]"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 600, fontSize: 14 }}
                >
                  {active.walkthroughTitle}
                </p>
                <p
                  className="text-[#464646] mt-1 leading-[1.45]"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}
                >
                  {active.walkthroughDescription}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      // Don't hide while mobile menu is open.
      if (mobileOpen) {
        setHidden(false);
        lastY.current = y;
        return;
      }

      const delta = y - lastY.current;
      const THRESHOLD = 8;

      if (y < 24) {
        setHidden(false);
      } else if (delta > THRESHOLD && y > HEADER_HEIGHT + 12) {
        setHidden(true);
        setOpenDropdown(null);
      } else if (delta < -THRESHOLD) {
        setHidden(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    setHoveredNav(label);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    closeTimer.current = window.setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
      initial={false}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: scrolled ? "rgba(243,242,238,0.95)" : "rgba(243,242,238,0.98)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#hero"); }}
            className="flex items-center"
          >
            <VolteoLogo color="#113637" />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative h-[72px] flex items-center"
                onMouseEnter={() => handleMouseEnter(link.label)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className="group flex items-center gap-1 text-[#262627] hover:text-[#0e3233] transition-colors duration-150 ease-out bg-transparent border-none cursor-pointer"
                  style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 16, fontWeight: 500 }}
                >
                  {link.label}
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: openDropdown === link.label ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex"
                  >
                    <ChevronDown size={16} className="opacity-60" />
                  </motion.span>
                </button>
                {(openDropdown === link.label || hoveredNav === link.label) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#615D5D]"
                    transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  />
                )}
                <DropdownMenu
                  items={link.items}
                  visible={openDropdown === link.label && link.label !== "Products"}
                />
                <ProductsMegaMenu
                  visible={openDropdown === link.label && link.label === "Products"}
                  onNavigate={(hash) => {
                    setOpenDropdown(null);
                    setHoveredNav(null);
                    if (hash) window.location.hash = hash;
                    smoothScrollTo("#advantage");
                  }}
                />
              </div>
            ))}
          </nav>

          {/* Book Demo Button */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href="#cta"
              onClick={(e) => { e.preventDefault(); smoothScrollTo("#cta"); }}
              className="bg-[#0e3233] hover:bg-[#416668] text-white px-5 py-2.5 text-[15px] will-change-transform transition-none"
              style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, letterSpacing: "0.02em" }}
              whileTap={{ scale: 0.985, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}
            >
              Book a demo
            </motion.a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#262627] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Constrained bottom divider */}
      <RailDivider />

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-[#f3f2ee] px-8 py-4 border-t border-[#D9D9D9]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-[#E4E2DC] last:border-none">
                  <button
                    className="flex items-center justify-between w-full py-3 text-[#262627] bg-transparent border-none cursor-pointer"
                    style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 16, fontWeight: 500 }}
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === link.label ? null : link.label)
                    }
                  >
                    {link.label}
                    <motion.span
                      initial={{ rotate: 0 }}
                      animate={{ rotate: mobileExpanded === link.label ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex"
                    >
                      <ChevronDown size={16} className="opacity-60" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === link.label && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-3 pb-3 flex flex-col gap-2"
                      >
                        {link.items.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => {
                              e.preventDefault();
                              smoothScrollTo(item.href);
                              setMobileOpen(false);
                            }}
                            className="text-[#464646] hover:text-[#0e3233] py-1"
                            style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 15, fontWeight: 400 }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <a
                href="#cta"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo("#cta");
                  setMobileOpen(false);
                }}
                className="bg-[#0e3233] hover:bg-[#416668] text-white px-5 py-3 text-center mt-4 transition-none"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500 }}
              >
                Book a demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}