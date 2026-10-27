export type FooterLink = string | { label: string; href: string };

export const footerLinks: Record<string, FooterLink[]> = {
  Products: [
    { label: "Wayship", href: "/wayship" },
    { label: "Smart Port", href: "/smartport" },
  ],
  Resources: [
    { label: "Case studies", href: "/resources?tab=case-studies" },
    { label: "Insights", href: "/resources?tab=insights" },
  ],
  About: [
    { label: "Our story", href: "/about#founder-note" },
    { label: "Careers", href: "/about#join-our-team" },
  ],
  Socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/volteomaritime" }],
};
