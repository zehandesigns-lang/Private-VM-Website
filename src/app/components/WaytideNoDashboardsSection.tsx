import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/waytide-hero-bg.png";
import jamesAvatar from "@/assets/waytide-hero-captain-james.png";
import michaelAvatar from "@/assets/waytide-hero-michael.png";
import wilsonAvatar from "@/assets/waytide-mention-wilson.png";
import oilerAvatar from "@/assets/waytide-mention-oiler.png";

type Card = {
  name: string;
  role: string;
  avatar: string;
  avatarPosition?: string;
  text: string;
  className: string;
  from: { x: number; y: number };
};

const CARDS: Card[] = [
  {
    name: "Wilson",
    role: "Captain",
    avatar: wilsonAvatar,
    avatarPosition: "top",
    text: "Hey Way, how's our fuel burn looking today?",
    className: "top-10 left-4 md:top-24 md:left-4",
    from: { x: -300, y: -200 },
  },
  {
    name: "Michael",
    role: "Chief Engineer",
    avatar: michaelAvatar,
    text: "Hey Way, is cylinder 4 temp normal?",
    className: "top-40 right-4 md:top-40 md:right-4",
    from: { x: 300, y: -200 },
  },
  {
    name: "James",
    role: "2nd Engineer",
    avatar: jamesAvatar,
    text: "Hey Way, anything I should know from the last watch?",
    className: "bottom-40 left-4 md:bottom-40 md:left-4",
    from: { x: -300, y: 200 },
  },
  {
    name: "Oiler",
    role: "Fleet Manager",
    avatar: oilerAvatar,
    avatarPosition: "top",
    text: "Hey Way, which ship has the best fuel efficiency this month?",
    className: "bottom-10 right-4 md:bottom-24 md:right-4",
    from: { x: 300, y: 200 },
  },
];

export function WaytideNoDashboardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.4,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 md:px-12 py-32 md:py-0 md:h-screen flex items-center"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="relative max-w-[1600px] mx-auto w-full" style={{ minHeight: 620 }}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h2
            className="text-[#171717]"
            style={{
              fontFamily: "'LT Cushion', serif",
              fontWeight: 500,
              fontSize: "clamp(36px, 4.2vw, 64px)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            No more Dashboards
          </h2>
          <p
            className="mt-6 mx-auto max-w-[720px]"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(18px, 2vw, 28px)",
              lineHeight: 1.4,
              color: "#171717",
            }}
          >
            Waytide is designed in a way to help you make decisions much faster
          </p>
        </div>

        {CARDS.map((card) => (
          <div
            key={card.name}
            className={`absolute inline-flex items-start bg-white rounded-2xl ${card.className}`}
            style={{
              gap: 8,
              paddingInline: 10,
              paddingBlock: 12,
              border: "1px solid #C7C7C7",
              transform: inView ? "translate(0, 0)" : `translate(${card.from.x}px, ${card.from.y}px)`,
              opacity: inView ? 1 : 0,
              transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1), opacity 0.8s cubic-bezier(0.23,1,0.32,1)",
            }}
          >
            <img
              src={card.avatar}
              alt=""
              className="rounded-full object-cover shrink-0"
              style={{ width: 37, height: 37, objectPosition: card.avatarPosition ?? "center" }}
            />
            <div style={{ width: 217 }}>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 14, color: "#171717" }}>
                  {card.name}
                </span>
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 12, color: "#9a9890" }}>
                  {card.role}
                </span>
              </div>
              <p
                className="mt-1"
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  lineHeight: "149.9%",
                  letterSpacing: 0,
                  color: "#383835",
                }}
              >
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
