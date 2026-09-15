import { useState } from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { WayMascot } from "./WayMascot";

const BAR_HEIGHTS = [18, 32, 24, 38, 16, 26, 12];
// Irregular, uneven-timed bursts per bar so it reads as speech, not a metronome.
const BAR_PATTERN = [0, 1, 2, 0, 2, 1, 0];

const keyframes = (
  <style>{`
    @keyframes talk-0 {
      0% { transform: scaleY(0.28); }
      12% { transform: scaleY(0.9); }
      24% { transform: scaleY(0.35); }
      38% { transform: scaleY(1); }
      52% { transform: scaleY(0.2); }
      68% { transform: scaleY(0.65); }
      82% { transform: scaleY(0.3); }
      100% { transform: scaleY(0.28); }
    }
    @keyframes talk-1 {
      0% { transform: scaleY(0.4); }
      18% { transform: scaleY(0.2); }
      33% { transform: scaleY(0.85); }
      47% { transform: scaleY(0.3); }
      63% { transform: scaleY(1); }
      79% { transform: scaleY(0.45); }
      100% { transform: scaleY(0.4); }
    }
    @keyframes talk-2 {
      0% { transform: scaleY(0.22); }
      15% { transform: scaleY(0.7); }
      29% { transform: scaleY(0.9); }
      44% { transform: scaleY(0.25); }
      58% { transform: scaleY(0.5); }
      73% { transform: scaleY(1); }
      88% { transform: scaleY(0.35); }
      100% { transform: scaleY(0.22); }
    }
  `}</style>
);

function Waveform() {
  return (
    <div className="flex items-end justify-center" style={{ gap: 5, height: 38 }}>
      {keyframes}
      {BAR_HEIGHTS.map((h, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: 6,
            height: h,
            borderRadius: 3,
            background: "#171717",
            transformOrigin: "bottom",
            animationName: `talk-${BAR_PATTERN[i]}`,
            animationDuration: `${0.85 + (i % 4) * 0.12}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}

export function SpeakReminderModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"speak" | "why">("speak");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-[396px] bg-white"
        style={{ borderRadius: 29, border: "1px solid #B3B3B3" }}
        initial={{ opacity: 0, scale: 0.94, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex items-center justify-center cursor-pointer hover:opacity-70 transition-opacity duration-150 bg-white border border-[#E4E2DC] shadow-sm rounded-full"
          style={{ width: 38, height: 38, padding: 7 }}
        >
          <X size={24} className="text-[#171717]" />
        </button>

        <div className="p-4">
          {step === "speak" ? (
            <div
              className="flex items-center justify-center px-8"
              style={{ background: "#F7F6E8", borderRadius: 24, height: 224, gap: 20 }}
            >
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ width: 56, height: 56, background: "#E6E2D5" }}
              >
                <span
                  style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 22, color: "#171717" }}
                >
                  R
                </span>
              </div>

              <div
                className="flex-1 bg-white flex items-center justify-center"
                style={{ borderRadius: 9999, border: "2px solid #456DFF", height: 92, maxWidth: 260 }}
              >
                <Waveform />
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center"
              style={{ background: "#F7F6E8", borderRadius: 24, height: 224 }}
            >
              <WayMascot size={90} />
            </div>
          )}

          <div className="pt-6 pb-2 text-center">
            {step === "speak" ? (
              <>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 22, color: "#000" }}
                >
                  Speak what's worth remembering
                  <br />
                  after lunch and before bed.
                </h3>
                <button
                  type="button"
                  onClick={() => setStep("why")}
                  className="bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity duration-150"
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 700,
                    fontSize: 16,
                    color: "#1F8A3D",
                    textDecoration: "underline",
                  }}
                >
                  Why should i do this?
                </button>
              </>
            ) : (
              <>
                <h3
                  className="mb-3"
                  style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 18, color: "#000" }}
                >
                  Way only gets better when he would have
                  <br />
                  richer knowledge from your contribution.
                </h3>
                <p style={{ fontFamily: "'Kalam', cursive", fontWeight: 400, fontSize: 16, color: "#171717" }}>
                  Way would be waiting for your checkins.
                </p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
