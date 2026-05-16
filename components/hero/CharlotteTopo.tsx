import { charlotteGeo } from "@/lib/charlotte-geo";

type CharlotteTopoProps = {
  className?: string;
};

/**
 * The Charlotte hero visual — real OpenStreetMap streets and rivers over real
 * SRTM-derived elevation contours. A server component: the (large) geometry
 * renders into static HTML, not the client bundle. The contour and street
 * groups carry classes the selector toggles via a `data-topo-mode` ancestor.
 */
export function CharlotteTopo({ className }: CharlotteTopoProps) {
  const { viewBox, streets, rivers, contours, marker } = charlotteGeo;

  return (
    <svg
      viewBox={viewBox}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="presentation"
      aria-hidden="true"
    >
      {/* Elevation contours. */}
      <g
        className="topo-contours"
        fill="none"
        stroke="#1F1B16"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {contours.map((c, i) => (
          <path
            key={`c${i}`}
            d={c.d}
            strokeWidth={0.6}
            opacity={0.13 + c.t * 0.34}
          />
        ))}
      </g>

      {/* Catawba River system — the one accent color on the page. */}
      <g
        className="topo-rivers"
        fill="none"
        stroke="#B89B7A"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.55}
      >
        {rivers.map((d, i) => (
          <path key={`r${i}`} d={d} strokeWidth={1.5} />
        ))}
      </g>

      {/* Street network — interstates heavier than primary roads. */}
      <g
        className="topo-streets"
        fill="none"
        stroke="#1F1B16"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {streets.map((s, i) => (
          <path
            key={`s${i}`}
            d={s.d}
            strokeWidth={s.w}
            opacity={s.w > 1.5 ? 0.66 : 0.4}
          />
        ))}
      </g>

      {/* Uptown marker — dot, connector, label, coordinates. */}
      <g className="topo-markers" fontFamily="var(--font-inter), sans-serif">
        <circle
          cx={marker.x}
          cy={marker.y}
          r={8.5}
          fill="none"
          stroke="#1F1B16"
          strokeWidth={0.6}
          opacity={0.45}
        />
        <circle cx={marker.x} cy={marker.y} r={3.4} fill="#1F1B16" />
        <line
          x1={marker.x + 6}
          y1={marker.y - 4}
          x2={marker.x + 52}
          y2={marker.y - 42}
          stroke="#1F1B16"
          strokeWidth={0.6}
        />
        <text
          x={marker.x + 56}
          y={marker.y - 44}
          fontSize={9}
          letterSpacing={2}
          fill="#1F1B16"
        >
          {marker.label.toUpperCase()}
        </text>
        <text
          x={marker.x + 56}
          y={marker.y - 32}
          fontSize={7.5}
          letterSpacing={1}
          fill="#A39A8C"
        >
          {marker.coords}
        </text>
      </g>
    </svg>
  );
}
