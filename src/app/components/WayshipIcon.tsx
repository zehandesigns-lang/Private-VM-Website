import wayshipIcon from "@/assets/logos/wayship-icon.png";

export function WayshipIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return <img src={wayshipIcon} alt="Wayship" width={size} height={size} className={className} />;
}
