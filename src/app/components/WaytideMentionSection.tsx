import type { ReactNode } from "react";
import { Avatar } from "./WaytideHeroSection";
import { WayMascot } from "./WayMascot";
import heroBg from "@/assets/waytide-hero-bg.png";
import chatCardBgImg from "@/assets/waytide-hero-chat-bg.png";
import oneOnOneCardBgImg from "@/assets/waytide-mention-1on1-bg.png";
import jamesAvatar from "@/assets/waytide-hero-captain-james.png";
import michaelAvatar from "@/assets/waytide-hero-michael.png";
import wilsonAvatar from "@/assets/waytide-mention-wilson.png";

type Message = {
  name: string;
  role?: string;
  color?: string;
  avatar?: string;
  avatarPosition?: string;
  isWay?: boolean;
  text: ReactNode;
};

const GROUP_MESSAGES: Message[] = [
  {
    name: "James",
    role: "2nd Engineer",
    color: "#3E7FC1",
    avatar: jamesAvatar,
    text: "Getting unusual vibration on the main engine, cylinder 4. Logged it 20 mins ago.",
  },
  {
    name: "Michael",
    role: "Chief Engineer",
    color: "#C1723E",
    avatar: michaelAvatar,
    text: "Noted. Checking exhaust temps now.",
  },
  {
    name: "Michael",
    role: "Chief Engineer",
    color: "#C1723E",
    avatar: michaelAvatar,
    text: (
      <>
        Temps look normal actually. <span style={{ color: "#1F8A3D", fontWeight: 600 }}>@Way</span> what's the ME
        vibration trend for cyl 4 over the last week?
      </>
    ),
  },
  {
    name: "Way",
    isWay: true,
    text: "Cyl 4 exhaust temp has been stable, but vibration readings have crept up 12% over 4 days — started right after the last bunkering. Similar pattern showed up on MV Kestrel last year, traced to fuel quality.",
  },
  {
    name: "Wilson",
    role: "Captain",
    color: "#4A5A6B",
    avatar: wilsonAvatar,
    avatarPosition: "top",
    text: "Good catch. Let's pull the BDN from that bunkering and get a sample tested.",
  },
];

const ONE_ON_ONE_MESSAGES: Message[] = [
  {
    name: "Captain",
    color: "#3E7FC1",
    avatar: jamesAvatar,
    text: "What's our Current ETA?",
  },
  {
    name: "Way",
    isWay: true,
    text: "Based on the latest noon report, you're looking at 0420 UTC on 18 July for Singapore — so roughly 38 hours out from now.",
  },
];

const SUBTITLE = (
  <>
    Waytide is designed to help
    <br />
    you make decisions faster
  </>
);

const CARD_INNER_MAX_WIDTH = 490;
const CARD_WIDTH = CARD_INNER_MAX_WIDTH + 24 * 2;

const CREW_STARS = [
  { name: "Wilson", role: "Captain", avatar: wilsonAvatar, position: "top" },
  { name: "Michael", role: "Chief Engineer", avatar: michaelAvatar, position: "center" },
  { name: "James", role: "2nd Engineer", avatar: jamesAvatar, position: "center" },
  { name: "Way", role: "AI Assistant", avatar: undefined, position: "center" },
];

function CrewStarsHeader() {
  return (
    <div className="flex items-center justify-between pb-5 mb-0" style={{ borderBottom: "1px solid #E4E2DC" }}>
      <style>{`
        .waytide-crew-avatar { position: relative; transition: transform 0.15s ease; cursor: default; }
        .waytide-crew-avatar:hover { transform: translateY(-5px); z-index: 20 !important; }
        .waytide-crew-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: #171717;
          color: #fff;
          padding: 5px 10px;
          border-radius: 8px;
          font-family: 'Geist', sans-serif;
          font-size: 12px;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s ease;
        }
        .waytide-crew-avatar:hover .waytide-crew-tooltip { opacity: 1; }
      `}</style>
      <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 16, color: "#171717" }}>
        #crew-stars
      </span>
      <div className="flex">
        {CREW_STARS.map((c, i) => (
          <div
            key={c.name}
            className="waytide-crew-avatar"
            style={{ marginLeft: i === 0 ? 0 : -10, zIndex: i + 1 }}
          >
            <div className="waytide-crew-tooltip">
              <span style={{ fontWeight: 600 }}>{c.name}</span>
              <span style={{ opacity: 0.7 }}> · {c.role}</span>
            </div>
            {c.avatar ? (
              <img
                src={c.avatar}
                alt=""
                className="rounded-full object-cover border-2 border-white"
                style={{ width: 32, height: 32, objectPosition: c.position }}
              />
            ) : (
              <div
                className="rounded-full flex items-center justify-center border-2 border-white"
                style={{ width: 32, height: 32, background: "#FFE222" }}
              >
                <WayMascot size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MessageCard({
  messages,
  height,
  bg = chatCardBgImg,
  header,
}: {
  messages: Message[];
  height?: number;
  bg?: string;
  header?: ReactNode;
}) {
  return (
    <div
      className="rounded-[31px] overflow-hidden p-6 w-full md:w-auto md:shrink-0 flex flex-col justify-center"
      style={{
        maxWidth: CARD_WIDTH,
        height,
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white rounded-[24px] p-6 flex flex-col gap-5" style={{ maxWidth: CARD_INNER_MAX_WIDTH }}>
        {header}
        {messages.map((m, i) => (
          <div key={i} className="flex gap-3">
            {m.isWay ? (
              <div
                className="rounded-full flex items-center justify-center shrink-0"
                style={{ width: 32, height: 32, background: "#FFE222" }}
              >
                <WayMascot size={24} />
              </div>
            ) : (
              <Avatar initial={m.name[0]} color={m.color!} image={m.avatar} imagePosition={m.avatarPosition} />
            )}
            <div>
              <div className="flex items-baseline gap-2">
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 14, color: "#171717" }}>
                  {m.name}
                </span>
                {m.role && (
                  <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 12, color: "#9a9890" }}>
                    {m.role}
                  </span>
                )}
              </div>
              <p
                className="mt-1"
                style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: "#3a3a3a" }}
              >
                {m.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MentionBlock({
  heading,
  subtitle = SUBTITLE,
  messages,
  cardHeight,
  cardBg,
  cardHeader,
}: {
  heading: ReactNode;
  subtitle?: ReactNode;
  messages: Message[];
  cardHeight?: number;
  cardBg?: string;
  cardHeader?: ReactNode;
}) {
  return (
    <section
      className="px-6 md:px-12 py-20 md:py-28"
      style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-center gap-x-8 gap-y-12">
        <div className="md:shrink-0 max-w-[480px]">
          <h2
            className="text-[#171717]"
            style={{
              fontFamily: "'LT Cushion', serif",
              fontWeight: 500,
              fontSize: "clamp(32px, 3.6vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h2>
          <p
            className="mt-6"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 400,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#6b6b6b",
            }}
          >
            {subtitle}
          </p>
        </div>

        <MessageCard messages={messages} height={cardHeight} bg={cardBg} header={cardHeader} />
      </div>
    </section>
  );
}

export function WaytideRopesSection() {
  return (
    <MentionBlock
      heading={
        <>
          just tag <span style={{ color: "#1F8A3D" }}>@Way</span> in a group conversation for his assitance.
        </>
      }
      subtitle={
        <>
          Way is a smart data analyst for your fleet,
          <br />
          answering straight from your own logs and history
        </>
      }
      messages={GROUP_MESSAGES}
      cardHeader={<CrewStarsHeader />}
    />
  );
}

export function WaytideThreadsSection() {
  return (
    <MentionBlock
      heading="or have 1:1 conversations with Way"
      subtitle={
        <>
          Way is available one-on-one, anytime,
          <br />
          answering personally from your vessel's own data
        </>
      }
      messages={ONE_ON_ONE_MESSAGES}
      cardHeight={500}
      cardBg={oneOnOneCardBgImg}
    />
  );
}
