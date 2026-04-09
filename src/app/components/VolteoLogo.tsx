import svgPaths from "../../imports/svg-mp9yadf4j7";

interface VolteoLogoProps {
  color?: string;
  className?: string;
}

export function VolteoLogo({ color = "#113637", className = "" }: VolteoLogoProps) {
  return (
    <div className={`relative shrink-0 ${className}`} style={{ width: 115, height: 36.13 }}>
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 115 36.1324"
      >
        <g id="Group 2">
          <path d={svgPaths.p3f4e63b0} fill={color} id="volteo" />
          <path d={svgPaths.p23798c80} fill={color} id="volteo_2" />
          <g id="volteo_3">
            <path d={svgPaths.p14ebd700} fill={color} />
            <path d={svgPaths.p2a8c800} fill={color} />
            <path d={svgPaths.p13984c80} fill={color} />
            <path d={svgPaths.p1838f370} fill={color} />
          </g>
          <path d={svgPaths.p1eeb6100} fill={color} id="Vector 1" />
        </g>
      </svg>
    </div>
  );
}
