/**
 * RailDivider — a horizontal rule that spans exactly between the two vertical
 * side rails (never beyond). Uses the same offsets as the rails themselves:
 *   mobile  → 12px inset  (content padding 32px − 20px gap)
 *   tablet  → 44px inset  (content padding 64px − 20px gap)
 *   desktop → 95px inset  (content padding 115px − 20px gap)
 */
function BetweenRailsRule({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[1512px] mx-auto pointer-events-none ${className}`} aria-hidden>
      <div className="h-px mx-[12px] md:mx-[44px] lg:mx-[95px] bg-[#D9D9D9]" />
    </div>
  );
}

export function RailDivider({ className = "" }: { className?: string }) {
  return <BetweenRailsRule className={className} />;
}

/**
 * Same as {@link RailDivider}: horizontal rule between the vertical siderails.
 * Kept as a separate export for call-sites that semantically divide “content blocks”.
 */
export function ContentDivider({ className = "" }: { className?: string }) {
  return <BetweenRailsRule className={className} />;
}

/**
 * Full-height vertical lines aligned to the same insets as RailDivider.
 * Place inside a `relative` container that spans the sections where rails should appear.
 */
export function SideRailOverlay({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none z-[40] ${className}`} aria-hidden>
      <div className="relative h-full max-w-[1512px] mx-auto">
        <div className="absolute top-0 bottom-0 left-[12px] md:left-[44px] lg:left-[95px] w-px bg-[#D9D9D9]" />
        <div className="absolute top-0 bottom-0 right-[12px] md:right-[44px] lg:right-[95px] w-px bg-[#D9D9D9]" />
      </div>
    </div>
  );
}
