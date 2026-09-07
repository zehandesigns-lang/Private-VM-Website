import { motion } from "motion/react";
import { X } from "lucide-react";
import { WayshipIcon } from "./WayshipIcon";
import { WayMascot } from "./WayMascot";

export function WayshipToWaytideModal({ onClose }: { onClose: () => void }) {
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
          <div
            className="flex items-center justify-between px-8"
            style={{ background: "#F7F6E8", borderRadius: 24, height: 224 }}
          >
            <WayshipIcon size={40} />

            <div className="relative flex-1 mx-5 overflow-hidden" style={{ height: 14 }}>
              <div
                className="absolute top-1/2 left-0 right-0 h-[2px]"
                style={{ background: "rgba(51,198,89,0.2)", marginTop: -1 }}
              />
              <motion.div
                className="absolute top-0 h-full flex items-center"
                style={{ gap: 4 }}
                animate={{ left: ["-35%", "135%"] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              >
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#33C659", flexShrink: 0 }} />
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#33C659", flexShrink: 0 }} />
                <div style={{ width: 14, height: 14, borderRadius: 4, background: "#33C659", flexShrink: 0 }} />
              </motion.div>
            </div>

            <WayMascot size={49} />
          </div>

          <div className="pt-6 pb-2 text-center">
            <h3
              className="mb-3"
              style={{ fontFamily: "'LT Cushion', serif", fontWeight: 500, fontSize: 24, color: "#000" }}
            >
              From Wayship to Waytide
            </h3>
            <p
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "137%",
                color: "#383835",
              }}
            >
              Waytide reads data from Wayship and helps you answer question in a conversational way
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
