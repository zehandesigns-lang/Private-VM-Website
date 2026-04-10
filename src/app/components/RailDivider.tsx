/**
 * RailDivider — a horizontal rule that spans exactly between the two vertical
 * side rails (never beyond). Uses the same offsets as the rails themselves:
 *   mobile  → 12px inset  (content padding 32px − 20px gap)
 *   tablet  → 44px inset  (content padding 64px − 20px gap)
 *   desktop → 95px inset  (content padding 115px − 20px gap)
 */
export function RailDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[1512px] mx-auto pointer-events-none ${className}`}>
      <div
        className="h-px mx-[12px] md:mx-[44px] lg:mx-[95px] bg-[#D9D9D9]"
      />
    </div>
  );
}

/**
 * Horizontal rule that only spans the centered main column — same max-width and
 * horizontal padding as section content (`max-w-[1512px]` + px-8 / md:px-16 / lg:px-[115px]).
 * Does not extend full viewport; stops at the content container edges.
 */
export function ContentDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1512px] px-8 md:px-16 lg:px-[115px] pointer-events-none ${className}`}
      aria-hidden
    >
      <div className="h-px w-full bg-[#D9D9D9]" />
    </div>
  );
}
