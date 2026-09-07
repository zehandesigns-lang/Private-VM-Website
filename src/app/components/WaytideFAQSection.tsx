import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import heroBg from "@/assets/waytide-hero-bg.png";

const FAQS = [
  {
    q: "What can Way help me with?",
    a: "Anything you'd normally dig through logs, manuals, or a colleague's memory for — fuel consumption trends, past defects, warranty status, class survey history, or what happened on a specific voyage. Ask in plain language and Way answers from your own fleet's data.",
  },
  {
    q: "What if Way doesn't have enough data to answer confidently?",
    a: "Way says so. If the data behind an answer is thin, conflicting, or missing, Way tells you what it does and doesn't know rather than guessing — and points you to what would close the gap.",
  },
  {
    q: "Do I need to train my crew to use it?",
    a: "No. If they can type a question the way they'd ask a colleague, they can use Way. There's no query language, no dashboards to learn, no onboarding required.",
  },
  {
    q: "How does Way get access to our vessel data?",
    a: "Way connects to your existing systems — Wayship, vessel logs, voyage history, and warranty records — during onboarding. Nothing is duplicated or re-entered; Way reads from the sources you already maintain.",
  },
  {
    q: "Is our fleet's data ever shared or used to train models for other operators?",
    a: "No. Your fleet's data stays yours. It's never shared with other operators and never used to train models outside your own account.",
  },
  {
    q: "Does Way know about my specific vessels, or just maritime in general?",
    a: "Both. Way is briefed on general maritime knowledge, but every answer it gives you is reasoned from your specific vessels — their own logs, history, and checkins — not a generic industry guess.",
  },
];

function FAQRow({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-[#E4E2DC] last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left bg-transparent border-none cursor-pointer"
      >
        <span
          className="text-[#171717]"
          style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 17 }}
        >
          {q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="flex items-center justify-center shrink-0 rounded-full"
          style={{ width: 32, height: 32, background: "#F2F1E9" }}
        >
          <ChevronDown size={16} className="text-[#171717]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="pb-6 pr-12 text-[#8a8a8a]"
              style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 15, lineHeight: 1.6 }}
            >
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WaytideFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="px-6 md:px-16 py-24 md:py-32"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[800px] mx-auto">
        <h2
          className="text-center text-[#171717] mb-12"
          style={{
            fontFamily: "'LT Cushion', serif",
            fontWeight: 500,
            fontSize: "clamp(32px, 4vw, 44px)",
          }}
        >
          FAQ's
        </h2>

        <div className="bg-white rounded-[24px] px-6 md:px-10" style={{ border: "1px solid #E4E2DC" }}>
          {FAQS.map((item, i) => (
            <FAQRow
              key={item.q}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
