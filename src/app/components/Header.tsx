import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { VolteoLogo } from "./VolteoLogo";
import { RailDivider } from "./RailDivider";
import { ProductWalkthroughPreview } from "./ProductWalkthroughPreview";

function buildNavLinks(pathname: string) {
  const isHomeLike = pathname === "/" || pathname === "/home-v2";
  const productsHref = isHomeLike ? "#advantage" : "/#advantage";
  return [
    {
      label: "Products",
      href: productsHref,
      items: [
        { label: "Wayship", href: "/wayship" },
        { label: "Smartport", href: "/smartport" },
      ],
    },
    {
      label: "Resources",
      href: "/resources",
      items: [],
    },
    {
      label: "About",
      href: "/about",
      items: [],
    },
  ];
}

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
  onItemClick,
}: {
  items: { label: string; href: string }[];
  visible: boolean;
  onItemClick: (href: string) => void;
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
                onItemClick(item.href);
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
    hash: string;
    href?: string;
  }
> = {
  wayship: {
    label: "Wayship",
    description:
      "Voice AI, LLM chat, and digital logbooks for the modern fleet — ABS approved, trusted by 200+ vessels.",
    hash: "#advantage",
    href: "/wayship",
  },
  smartport: {
    label: "Smartport",
    description:
      "Port intelligence built to keep operations moving — from berth planning to arrivals, revenue, and compliance.",
    hash: "#advantage",
    href: "/smartport",
  },
};

function ProductsMegaMenu({
  visible,
  onNavigate,
  onCloseMenu,
}: {
  visible: boolean;
  onNavigate: (hash: string) => void;
  onCloseMenu: () => void;
}) {
  const [activeProduct, setActiveProduct] = useState<ProductKey>("wayship");
  const [hoveredProduct, setHoveredProduct] = useState<ProductKey | null>(null);

  useEffect(() => {
    if (visible) {
      setActiveProduct("wayship");
      setHoveredProduct(null);
    }
  }, [visible]);

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
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-stretch gap-10 p-8">
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
                  const rowHandlers = {
                    onMouseEnter: () => {
                      setHoveredProduct(key);
                      setActiveProduct(key);
                    },
                    onMouseLeave: () => setHoveredProduct(null),
                  };
                  const baseRowClass = `group -mx-2 px-2 py-2 rounded-sm transition-[opacity,background-color] duration-150 ease-out w-full text-left text-inherit ${
                    shouldDim ? "opacity-50" : "opacity-100"
                  } hover:bg-[#e8e6e0]/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0e3233]/35`;

                  const titleAndArrow = (
                    <div className="flex items-center gap-2">
                      <p
                        className="text-[#0e3233] leading-tight"
                        style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 18 }}
                      >
                        {p.label}
                      </p>
                      <span
                        className={`inline-flex items-center justify-center shrink-0 transition-[opacity,transform,color] duration-150 ease-out pointer-events-none ${
                          isHovered
                            ? "opacity-100 translate-x-0 translate-y-0 scale-100"
                            : "opacity-0 -translate-x-[6px] translate-y-[6px] scale-[0.98]"
                        } text-[#0e3233]/70 group-hover:text-[#0e3233]`}
                        aria-hidden
                      >
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  );

                  const description = (
                    <p
                      className="text-[#464646] mt-2 leading-[1.55] max-w-[380px]"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 14 }}
                    >
                      {p.description}
                    </p>
                  );

                  if (p.href) {
                    return (
                      <Link
                        key={key}
                        to={p.href}
                        className={`${baseRowClass} block no-underline text-inherit cursor-pointer`}
                        onClick={() => onCloseMenu()}
                        {...rowHandlers}
                      >
                        {titleAndArrow}
                        {description}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={key}
                      type="button"
                      className={`${baseRowClass} bg-transparent border-0 cursor-pointer font-inherit`}
                      onClick={() => {
                        onCloseMenu();
                        onNavigate(p.hash);
                      }}
                      {...rowHandlers}
                    >
                      {titleAndArrow}
                      {description}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col self-stretch">
              <div className="flex-1 min-h-0">
                <ProductWalkthroughPreview product={activeProduct} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const navLinks = buildNavLinks(location.pathname);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);
  const lastY = useRef(0);

  // Close mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  // Body scroll lock while mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on Escape key.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  const handleHrefNavigation = (href: string) => {
    if (!href) return;
    if (href.startsWith("#")) {
      smoothScrollTo(href);
      return;
    }
    if (href.startsWith("/#")) {
      navigate(href);
      return;
    }
    navigate(href);
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
      {/* Side rails (header segment) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="relative h-full max-w-[1512px] mx-auto">
          <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]" />
          <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]" />
        </div>
      </div>

      <div className="mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <VolteoLogo color="#113637" />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-8"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {navLinks.map((link) => {
              const hasDropdown = link.items.length > 0;
              const isAboutLink = link.href === "/about";
              const isResourcesLink = link.href === "/resources";
              const showUnderline =
                (openDropdown === link.label || hoveredNav === link.label) ||
                (isAboutLink && location.pathname === "/about") ||
                (isResourcesLink && location.pathname === "/resources");

              return (
                <div
                  key={link.label}
                  className="relative h-[72px] flex items-center"
                  onMouseEnter={() => {
                    setHoveredNav(link.label);
                    if (hasDropdown) handleMouseEnter(link.label);
                  }}
                  onMouseLeave={() => {
                    if (hasDropdown) handleMouseLeave();
                  }}
                >
                  {hasDropdown ? (
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
                  ) : (
                    <Link
                      to={link.href}
                      className="text-[#262627] hover:text-[#0e3233] transition-colors duration-150 ease-out"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontSize: 16, fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  )}
                  {showUnderline && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-px h-[2px] bg-[#615D5D]"
                      transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                    />
                  )}
                  <DropdownMenu
                    items={link.items}
                    visible={openDropdown === link.label && link.label !== "Products"}
                    onItemClick={handleHrefNavigation}
                  />
                  <ProductsMegaMenu
                    visible={openDropdown === link.label && link.label === "Products"}
                    onCloseMenu={() => {
                      setOpenDropdown(null);
                      setHoveredNav(null);
                    }}
                    onNavigate={handleHrefNavigation}
                  />
                </div>
              );
            })}
          </nav>

          {/* Book Demo Button */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div whileTap={{ scale: 0.985, transition: { duration: 0.12, ease: [0.23, 1, 0.32, 1] } }}>
              <Link
                to="/book-demo"
                onClick={(e) => {
                  if (location.pathname === "/book-demo") {
                    e.preventDefault();
                    smoothScrollTo("#form");
                  }
                }}
                className="bg-[#0e3233] hover:bg-[#416668] text-white px-5 py-2.5 text-[15px] will-change-transform transition-none inline-block"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, letterSpacing: "0.02em" }}
              >
                Get a Demo
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-[#262627] p-2 -mr-2 rounded-sm active:scale-95 transition-transform duration-100 ease-out"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className="flex"
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                  className="flex"
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Constrained bottom divider */}
      <RailDivider />

      {/* Mobile Menu — clip-path reveal (GPU-accelerated, no height animation) */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — tapping it closes the menu */}
            <motion.div
              className="md:hidden fixed left-0 right-0 bottom-0 bg-black/25"
              style={{ top: HEADER_HEIGHT }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            {/* Menu panel */}
            <motion.div
              className="md:hidden border-t border-[#D9D9D9]"
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="bg-[#f3f2ee] px-8 md:px-16 lg:px-[115px] pt-1 pb-6 mx-auto max-w-[1512px]">
                <nav className="flex flex-col">
                  {navLinks.map((link, i) => {
                    const hasDropdown = link.items.length > 0;
                    return (
                      <motion.div
                        key={link.label}
                        className="border-b border-[#E4E2DC] last:border-none"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.06 + i * 0.045,
                          duration: 0.22,
                          ease: [0.23, 1, 0.32, 1],
                        }}
                      >
                        {hasDropdown ? (
                          <>
                            <button
                              className="flex items-center justify-between w-full py-4 text-[#262627] bg-transparent border-none cursor-pointer active:opacity-60 transition-opacity duration-100"
                              style={{
                                fontFamily: "'TT Hoves Pro', sans-serif",
                                fontSize: 16,
                                fontWeight: 500,
                                minHeight: 48,
                              }}
                              onClick={() =>
                                setMobileExpanded(
                                  mobileExpanded === link.label ? null : link.label,
                                )
                              }
                            >
                              {link.label}
                              <motion.span
                                animate={{ rotate: mobileExpanded === link.label ? 180 : 0 }}
                                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                                className="flex shrink-0 opacity-60"
                              >
                                <ChevronDown size={16} />
                              </motion.span>
                            </button>
                            <AnimatePresence>
                              {mobileExpanded === link.label && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                                  style={{ overflow: "hidden" }}
                                >
                                  {link.label === "Products" ? (
                                    <div className="pb-4 pt-1 flex flex-col gap-3">
                                      {(Object.entries(products) as [ProductKey, (typeof products)[ProductKey]][]).map(
                                        ([key, p], idx) => (
                                          <motion.div
                                            key={key}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{
                                              delay: 0.05 + idx * 0.06,
                                              duration: 0.22,
                                              ease: [0.23, 1, 0.32, 1],
                                            }}
                                          >
                                            <Link
                                              to={p.href!}
                                              onClick={() => setMobileOpen(false)}
                                              className="block border border-[#D9D9D9] overflow-hidden active:opacity-70 transition-opacity duration-100"
                                            >
                                              {/* Animated preview */}
                                              <div className="h-[156px] overflow-hidden">
                                                <ProductWalkthroughPreview product={key} />
                                              </div>
                                              {/* Card footer */}
                                              <div className="flex items-start justify-between gap-2 px-3 py-2.5 border-t border-[#D9D9D9] bg-[#f3f2ee]">
                                                <div className="min-w-0">
                                                  <p
                                                    className="text-[#0e3233] leading-snug"
                                                    style={{
                                                      fontFamily: "'TT Hoves Pro', sans-serif",
                                                      fontWeight: 500,
                                                      fontSize: 14,
                                                    }}
                                                  >
                                                    {p.label}
                                                  </p>
                                                  <p
                                                    className="text-[#464646] mt-0.5 leading-snug line-clamp-2"
                                                    style={{
                                                      fontFamily: "'TT Hoves Pro', sans-serif",
                                                      fontWeight: 400,
                                                      fontSize: 12,
                                                    }}
                                                  >
                                                    {p.description}
                                                  </p>
                                                </div>
                                                <ArrowUpRight
                                                  size={15}
                                                  className="text-[#0e3233] shrink-0 mt-0.5"
                                                />
                                              </div>
                                            </Link>
                                          </motion.div>
                                        ),
                                      )}
                                    </div>
                                  ) : (
                                    <div className="pb-3 flex flex-col gap-0">
                                      {link.items.map((item) => (
                                        <a
                                          key={item.label}
                                          href={item.href}
                                          onClick={(e) => {
                                            e.preventDefault();
                                            handleHrefNavigation(item.href);
                                            setMobileOpen(false);
                                          }}
                                          className="text-[#464646] hover:text-[#0e3233] active:opacity-60 transition-colors duration-150 py-3 block pl-3"
                                          style={{
                                            fontFamily: "'TT Hoves Pro', sans-serif",
                                            fontSize: 15,
                                            fontWeight: 400,
                                            minHeight: 44,
                                          }}
                                        >
                                          {item.label}
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </>
                        ) : (
                          <Link
                            to={link.href}
                            className="flex items-center w-full py-4 text-[#262627] hover:text-[#0e3233] active:opacity-60 transition-colors duration-150"
                            style={{
                              fontFamily: "'TT Hoves Pro', sans-serif",
                              fontSize: 16,
                              fontWeight: 500,
                              minHeight: 48,
                            }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {link.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}

                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.06 + navLinks.length * 0.045,
                      duration: 0.22,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className="pt-5"
                  >
                    <Link
                      to="/book-demo"
                      onClick={(e) => {
                        if (location.pathname === "/book-demo") {
                          e.preventDefault();
                          smoothScrollTo("#form");
                        }
                        setMobileOpen(false);
                      }}
                      className="bg-[#0e3233] text-white px-5 py-3.5 text-center block w-full active:bg-[#0c2829] transition-colors duration-150"
                      style={{
                        fontFamily: "'TT Hoves Pro', sans-serif",
                        fontWeight: 500,
                        fontSize: 16,
                        minHeight: 52,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      Get a Demo
                    </Link>
                  </motion.div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}