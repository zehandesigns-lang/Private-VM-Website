import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ArrowUp } from "lucide-react";
import { WayMascot } from "./WayMascot";
import captainImg from "@/assets/waytide-captain.png";

const CAPTAIN_TEXT = "What's our Current ETA?";
const WAY_TEXT =
  "Based on the latest noon report, you're looking at 0420 UTC on 18 July for Singapore — so roughly 38 hours out from now.";

// Uneven cluster sizes so the answer streams in like an AI response rather than a metronome.
const WAY_CHUNK_SIZES = [2, 3, 1, 3, 1, 4, 2, 1, 3, 2, 2];

const CAPTAIN_WORD_DELAY = 0.32;
const CAPTAIN_WORD_DURATION = 0.12;
const SEND_PAUSE = 500;
const TRANSFORM_DURATION = 450;
const WAY_CHUNK_DELAY = 0.16;
const WAY_CHUNK_DURATION = 0.14;
const THINKING_DURATION = 2000;

function revealMs(text: string, wordDelay: number, wordDuration: number) {
  const words = text.split(" ").length;
  return Math.round(((words - 1) * wordDelay + wordDuration) * 1000);
}

function chunkRevealMs(chunkSizes: number[], chunkDelay: number, chunkDuration: number) {
  return Math.round(((chunkSizes.length - 1) * chunkDelay + chunkDuration) * 1000);
}

const messageStyle = {
  fontFamily: "'Geist', sans-serif",
  fontWeight: 400,
  fontSize: 15,
  lineHeight: 1.5,
} as const;

const nameStyle = {
  fontFamily: "'Geist', sans-serif",
  fontWeight: 600,
  fontSize: 14,
} as const;

type Stage = "typing" | "transformed" | "thinking" | "way" | "done";

const keyframes = (
  <style>{`
    @keyframes word-in {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cursor-blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `}</style>
);

function TypingWords({ text, wordDelay, wordDuration }: { text: string; wordDelay: number; wordDuration: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: 4,
            opacity: 0,
            animationName: "word-in",
            animationDuration: `${wordDuration}s`,
            animationDelay: `${i * wordDelay}s`,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
          }}
        >
          {word}
        </span>
      ))}
    </>
  );
}

function ChunkReveal({
  text,
  chunkSizes,
  chunkDelay,
  chunkDuration,
}: {
  text: string;
  chunkSizes: number[];
  chunkDelay: number;
  chunkDuration: number;
}) {
  const words = text.split(" ");
  let cursor = 0;

  return (
    <p className="text-[#171717]" style={messageStyle}>
      {chunkSizes.map((size, chunkIndex) => {
        const chunkWords = words.slice(cursor, cursor + size);
        cursor += size;
        return chunkWords.map((word, j) => (
          <span
            key={`${chunkIndex}-${j}`}
            style={{
              display: "inline-block",
              marginRight: 4,
              opacity: 0,
              animationName: "word-in",
              animationDuration: `${chunkDuration}s`,
              animationDelay: `${chunkIndex * chunkDelay}s`,
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards",
            }}
          >
            {word}
          </span>
        ));
      })}
    </p>
  );
}

function ThinkingShimmer() {
  return (
    <div
      className="relative overflow-hidden"
      style={{ width: 110, height: 12, borderRadius: 6, background: "#EEEBE1" }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const shellTransition = { type: "spring" as const, stiffness: 340, damping: 34 };

export function WaytideThreadsChatCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });
  const [stage, setStage] = useState<Stage>("typing");

  useEffect(() => {
    if (!inView) return;

    const captainMs = revealMs(CAPTAIN_TEXT, CAPTAIN_WORD_DELAY, CAPTAIN_WORD_DURATION);
    const wayMs = chunkRevealMs(WAY_CHUNK_SIZES, WAY_CHUNK_DELAY, WAY_CHUNK_DURATION);
    const transformedAt = captainMs + SEND_PAUSE;
    const thinkingAt = transformedAt + TRANSFORM_DURATION;

    const t1 = setTimeout(() => setStage("transformed"), transformedAt);
    const t2 = setTimeout(() => setStage("thinking"), thinkingAt);
    const t3 = setTimeout(() => setStage("way"), thinkingAt + THINKING_DURATION);
    const t4 = setTimeout(() => setStage("done"), thinkingAt + THINKING_DURATION + wayMs);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [inView]);

  const isTyping = stage === "typing";
  const showWay = stage === "thinking" || stage === "way" || stage === "done";

  return (
    <div ref={cardRef} className="w-full max-w-[420px]">
      {keyframes}
      {isTyping ? (
        <motion.div
          layoutId="chat-shell"
          layout
          transition={shellTransition}
          className="flex items-center gap-3 bg-white shadow-lg"
          style={{ borderRadius: 9999, padding: 8 }}
        >
          <motion.img
            layoutId="captain-avatar"
            transition={shellTransition}
            src={captainImg}
            alt="Captain"
            className="rounded-full object-cover shrink-0"
            style={{ width: 44, height: 44 }}
          />
          <div
            className="flex-1 text-[#171717]"
            style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 17 }}
          >
            <TypingWords text={CAPTAIN_TEXT} wordDelay={CAPTAIN_WORD_DELAY} wordDuration={CAPTAIN_WORD_DURATION} />
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 18,
                marginLeft: 1,
                verticalAlign: "middle",
                background: "#33C659",
                animationName: "cursor-blink",
                animationDuration: "1s",
                animationTimingFunction: "step-end",
                animationIterationCount: "infinite",
              }}
            />
          </div>
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{ width: 44, height: 44, background: "#33C659" }}
          >
            <ArrowUp size={20} className="text-white" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          layoutId="chat-shell"
          layout
          transition={shellTransition}
          className="bg-white shadow-lg p-5 flex flex-col items-start"
          style={{ borderRadius: 20, gap: 20 }}
        >
          <div className="flex items-start gap-3 self-stretch">
            <motion.img
              layoutId="captain-avatar"
              transition={shellTransition}
              src={captainImg}
              alt="Captain"
              className="rounded-full object-cover shrink-0"
              style={{ width: 36, height: 36 }}
            />
            <div className="flex flex-col items-start flex-1" style={{ gap: 3.2 }}>
              <p className="text-[#171717]" style={nameStyle}>
                Captain
              </p>
              <p className="text-[#171717]" style={messageStyle}>
                {CAPTAIN_TEXT}
              </p>
            </div>
          </div>

          <motion.div
            className="flex items-start gap-3 self-stretch"
            initial={{ opacity: 0 }}
            animate={{ opacity: showWay ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
              style={{ background: "#FFE222" }}
            >
              <WayMascot size={32} />
            </div>
            <div className="flex flex-col items-start flex-1" style={{ gap: 6 }}>
              <p className="text-[#171717]" style={nameStyle}>
                Way
              </p>
              {stage === "thinking" && <ThinkingShimmer />}
              {(stage === "way" || stage === "done") && (
                <ChunkReveal
                  text={WAY_TEXT}
                  chunkSizes={WAY_CHUNK_SIZES}
                  chunkDelay={WAY_CHUNK_DELAY}
                  chunkDuration={WAY_CHUNK_DURATION}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
