import { WayMascot } from "./WayMascot";
import heroBg from "@/assets/waytide-hero-bg.png";

const COMPANY_LINKS = [
  { label: "Call Us", href: "#" },
  { label: "Linked In", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const columnHeaderStyle = {
  fontFamily: "'Geist', sans-serif",
  fontWeight: 500,
  fontSize: 13,
  color: "#9a9890",
} as const;

const linkStyle = {
  fontFamily: "'Geist', sans-serif",
  fontWeight: 500,
  fontSize: 15,
  color: "#171717",
} as const;

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <span style={columnHeaderStyle}>{title}</span>
      <div className="flex flex-col gap-3 mt-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={linkStyle}
            className="hover:opacity-60 transition-opacity duration-150"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function WaytideFooter() {
  return (
    <footer
      className="sticky top-0 z-20 px-6 md:px-16 pt-10 md:pt-16 pb-8 rounded-b-[40px]"
      style={{
        backgroundColor: "#FFFFFF",
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 md:gap-16">
          <div>
            <h2
              className="text-[#171717]"
              style={{
                fontFamily: "'LT Cushion', serif",
                fontWeight: 500,
                fontSize: "clamp(28px, 3.4vw, 38px)",
                lineHeight: 1.2,
              }}
            >
              Way, The First Maritime
              <br />
              AI companion
            </h2>

            <button
              type="button"
              className="mt-8 text-white cursor-pointer hover:opacity-90 transition-opacity duration-150"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                padding: "12px 28px",
                borderRadius: 8,
                background: "#33C659",
                boxShadow: "0 -2px 4px 0 rgba(0,0,0,0.15)",
              }}
            >
              Get Started
            </button>
          </div>

          <div className="flex gap-16 md:gap-24">
            <FooterColumn title="Company" links={COMPANY_LINKS} />
            <FooterColumn title="Legal" links={LEGAL_LINKS} />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mt-10 md:mt-16">
          <WayMascot size={20} />
          <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 14, color: "#171717" }}>
            © 2026 WayTide, Inc. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
