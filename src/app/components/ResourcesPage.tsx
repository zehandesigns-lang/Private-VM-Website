import { useEffect } from "react";
import { motion } from "motion/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RailDivider } from "./RailDivider";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const PAGE_BG = "#f3f2ee";

const lc = { fontFamily: "'Source Serif 4', serif", fontWeight: 300 as const };
const tt = { fontFamily: "'Inter', sans-serif", fontWeight: 400 as const };
const ttMed = { fontFamily: "'Inter', sans-serif", fontWeight: 500 as const };

export function ResourcesPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: PAGE_BG }}>
      <div className="absolute inset-0 pointer-events-none z-[60]">
        <div className="relative h-full max-w-[1512px] mx-auto">
          <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]/80" />
          <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]/80" />
        </div>
      </div>

      <Header />

      <main className="pt-[72px] flex-1 flex flex-col">
        <RailDivider />

        <div className="flex-1 flex items-center justify-center">
          <div className="mx-auto max-w-[1512px] w-full px-8 md:px-16 lg:px-[115px] py-24 md:py-32 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="flex flex-col items-center gap-6"
            >
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                className="inline-block border border-[#D9D9D9] px-3 py-1.5 text-[#888] uppercase tracking-[0.14em]"
                style={{ ...ttMed, fontSize: 11 }}
              >
                Coming soon
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
                className="text-[#0e3233] text-[44px] md:text-[64px] lg:text-[72px] leading-none tracking-tight max-w-[640px]"
                style={lc}
              >
                Resources
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.22, ease: EASE }}
                className="text-[#888] leading-[1.65] max-w-[420px]"
                style={{ ...tt, fontSize: 18 }}
              >
                Case studies, product demos, and ideas from the Volteo team. We&apos;re putting it together — check back soon.
              </motion.p>
            </motion.div>
          </div>
        </div>

        <RailDivider />
      </main>

      <Footer />
    </div>
  );
}
