import { useMemo, useState, type CSSProperties } from "react";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RailDivider, SideRailOverlay } from "./RailDivider";
import { Input } from "./ui/input";
import { cn } from "./ui/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const tt: CSSProperties = {
  fontFamily: "'TT Hoves Pro', sans-serif",
  fontWeight: 500,
  fontStyle: "normal",
};

const lc: CSSProperties = {
  fontFamily: "'Source Serif 4', serif",
  fontWeight: 300,
  fontStyle: "normal",
};

type PledgeSigner = {
  id: string;
  name: string;
  company?: string;
  title?: string;
  signedAt: string; // ISO
};

const SEED_SIGNERS: PledgeSigner[] = [
  { id: "1", name: "Zehan Modan", company: "Bowsight", title: "Founder", signedAt: "2026-04-12T10:15:00.000Z" },
  { id: "2", name: "Karin Holm", company: "Nordic Lines", title: "Fleet Ops", signedAt: "2026-04-11T18:42:00.000Z" },
  { id: "3", name: "Anand Iyer", company: "HarborWorks", title: "Port Systems", signedAt: "2026-04-11T14:03:00.000Z" },
  { id: "4", name: "Mila Petrovic", company: "BlueCurrent", title: "Technical Supt.", signedAt: "2026-04-10T21:36:00.000Z" },
  { id: "5", name: "Jason Park", company: "Seawatch", title: "Operations", signedAt: "2026-04-10T09:08:00.000Z" },
  { id: "6", name: "Sofia Alvarez", company: "Atlantic Marine", title: "Fleet Manager", signedAt: "2026-04-09T16:50:00.000Z" },
  { id: "7", name: "Emre Kaya", company: "EastGate Port", title: "Port Director", signedAt: "2026-04-09T08:22:00.000Z" },
  { id: "8", name: "Claire Nguyen", company: "Maritime Labs", title: "Product", signedAt: "2026-04-08T19:12:00.000Z" },
  { id: "9", name: "Nate Thompson", company: "Coastal Freight", title: "Safety", signedAt: "2026-04-08T11:44:00.000Z" },
  { id: "10", name: "Priya Shah", company: "Portview", title: "Revenue", signedAt: "2026-04-07T17:05:00.000Z" },
  { id: "11", name: "Omar Haddad", company: "Strait Logistics", title: "Ops Lead", signedAt: "2026-04-07T13:19:00.000Z" },
  { id: "12", name: "Hanna Berg", company: "Skagerak Shipping", title: "Crew Mgmt", signedAt: "2026-04-07T09:40:00.000Z" },
];

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 2).toUpperCase();
  return `${parts[0]![0]}${parts[parts.length - 1]![0]}`.toUpperCase();
}

function stableHue(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) >>> 0;
  return h % 360;
}

function formatCount(n: number) {
  return new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);
}

function Wrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1512px] px-8 md:px-16 lg:px-[115px]", className)}>{children}</div>;
}

export function PledgeWallPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"recent" | "name">("recent");

  const signers = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = !q
      ? SEED_SIGNERS
      : SEED_SIGNERS.filter((s) => {
          const hay = `${s.name} ${s.company ?? ""} ${s.title ?? ""}`.toLowerCase();
          return hay.includes(q);
        });

    const sorted = [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      return new Date(b.signedAt).getTime() - new Date(a.signedAt).getTime();
    });

    return sorted;
  }, [query, sort]);

  return (
    <div className="relative min-h-screen bg-[#f3f2ee]">
      <Header />

      <section className="relative pt-[72px] border-b border-[#D9D9D9] bg-[#f3f2ee]">
        <Wrap className="py-14 md:py-18">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
            <div>
              <motion.p
                className="text-[#464646] uppercase tracking-[0.12em] mb-4"
                style={{ ...tt, fontWeight: 600, fontSize: 11 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                The pledge wall
              </motion.p>
              <motion.h1
                className="text-[#103435] leading-[1.05] tracking-[-2px] mb-4"
                style={{ fontSize: "clamp(34px, 4.2vw, 52px)", ...tt }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.02 }}
              >
                People who signed{" "}
                <span style={lc} className="text-[#103435]">
                  the pledge.
                </span>
              </motion.h1>
              <motion.p
                className="text-[#464646] leading-[1.75] max-w-[620px]"
                style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 18 }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.06 }}
              >
                A living snapshot of operators and builders committing to fewer paper workflows and more dependable systems. This page can
                connect to your pledge form later — for now it’s seeded with sample signers to validate layout and responsiveness.
              </motion.p>
            </div>

            <div className="rounded-xl border border-[#D9D9D9] bg-white overflow-hidden shadow-[0_18px_70px_rgba(0,0,0,0.08)]">
              <div className="p-5 md:p-6 border-b border-[#E4E2DC]">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#615D5D]">Total signers</p>
                    <p className="text-[#103435] text-[28px] leading-none mt-2" style={{ ...tt, fontWeight: 600 }}>
                      {formatCount(SEED_SIGNERS.length)}
                    </p>
                    <p className="text-[#717182] text-[12.5px] mt-2" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 }}>
                      Showing {formatCount(signers.length)} matching your filter.
                    </p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#615D5D]">Updated</p>
                    <p className="text-[#464646] text-[12.5px] mt-2" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 }}>
                      {new Date(SEED_SIGNERS[0]!.signedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="relative flex-1">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#717182]" aria-hidden />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by name, company, or title…"
                      className="h-10 pl-9 rounded-md border-[rgba(0,0,0,0.1)] bg-[#f3f3f5] text-[#262627] placeholder:text-[#717182] focus-visible:border-[#0e3233]/35 focus-visible:ring-[#0e3233]/12"
                      style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    {(
                      [
                        ["recent", "Recent"],
                        ["name", "A–Z"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setSort(key)}
                        className={cn(
                          "h-10 px-3.5 rounded-md border font-mono text-[11px] uppercase tracking-[0.06em] transition-colors",
                          sort === key
                            ? "border-[#2f615a] bg-[#2f615a]/10 text-[#0e3233]"
                            : "border-[#D9D9D9] bg-white text-[#615D5D] hover:border-[#0e3233]/25 hover:text-[#262627]",
                        )}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      <div className="relative bg-[#f3f2ee]">
        <SideRailOverlay />
        <Wrap className="py-12 md:py-16">
          <div className="flex items-end justify-between gap-8 mb-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#615D5D]">Wall</p>
              <p className="text-[#103435] text-[18px] mt-2" style={{ ...tt, fontWeight: 600 }}>
                {signers.length ? "Signed members" : "No matches"}
              </p>
            </div>
            <p className="hidden md:block text-[#717182] text-[12.5px]" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400 }}>
              Tip: try searching by company.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {signers.map((s, i) => {
              const hue = stableHue(`${s.name}|${s.company ?? ""}`);
              return (
                <motion.div
                  key={s.id}
                  className="group rounded-xl border border-[#D9D9D9] bg-white px-3.5 py-3.5 md:px-4 md:py-4 hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)] transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.35, ease: EASE, delay: Math.min(i * 0.01, 0.16) }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 ring-1 ring-black/5">
                      <AvatarFallback
                        className="text-[#0e3233] font-mono text-[12px]"
                        style={{
                          background: `linear-gradient(180deg, hsla(${hue}, 38%, 87%, 1), hsla(${hue}, 30%, 79%, 1))`,
                        }}
                      >
                        {initials(s.name)}
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="text-[#262627] leading-tight truncate" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 500, fontSize: 14 }}>
                        {s.name}
                      </p>
                      <p className="text-[#717182] leading-tight truncate mt-1" style={{ fontFamily: "'TT Hoves Pro', sans-serif", fontWeight: 400, fontSize: 12.5 }}>
                        {[s.title, s.company].filter(Boolean).join(" · ") || "Signed supporter"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Wrap>

        <RailDivider />
        <Footer />
      </div>
    </div>
  );
}

