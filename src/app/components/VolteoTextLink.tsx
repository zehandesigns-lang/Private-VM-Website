import type { CSSProperties } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

const linkClass =
  "inline-flex items-center gap-1.5 border-b border-[#2f615a] pb-0.5 text-[#2f615a] transition-opacity hover:opacity-70";

const linkStyle: CSSProperties = {
  fontFamily: "'Inter', sans-serif",
  fontWeight: 400,
  fontSize: 15,
};

type VolteoTextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Underlined text + arrow link used in Volteo Advantage (“Learn more…”) and elsewhere.
 */
export function VolteoTextLink({ href, children, className = "" }: VolteoTextLinkProps) {
  const cls = `${linkClass} ${className}`.trim();

  if (href.startsWith("/")) {
    return (
      <Link to={href} className={cls} style={linkStyle}>
        {children}
        <ArrowUpRight size={15} />
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={cls}
      style={linkStyle}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      <ArrowUpRight size={15} />
    </a>
  );
}
