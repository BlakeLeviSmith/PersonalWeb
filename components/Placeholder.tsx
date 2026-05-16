type PlaceholderProps = {
  /** Asset filename, shown as the first label line. */
  filename?: string;
  /** Aspect ratio as "w/h", e.g. "16/10", "4/5", "16/9". */
  aspectRatio?: string;
  /** Optional descriptive line: what the real image should depict. */
  label?: string;
  /** Override the computed dimensions string. */
  dimensions?: string;
  variant?: "image" | "video";
  className?: string;
};

/**
 * The single shared placeholder box. Designed to look intentional — a striped
 * surface card — so the site is reviewable end-to-end before real assets land.
 */
export function Placeholder({
  filename,
  aspectRatio = "16/10",
  label,
  dimensions,
  variant = "image",
  className,
}: PlaceholderProps) {
  const [w, h] = aspectRatio
    .split("/")
    .map((n) => parseInt(n.trim(), 10) || 1);
  const baseWidth = 2400;
  const computed =
    dimensions ?? `${baseWidth}×${Math.round((baseWidth * h) / w)} · ${w}:${h}`;

  return (
    <div
      role="img"
      aria-label={label ?? filename ?? "Image placeholder"}
      className={`placeholder-stripes relative flex items-center justify-center overflow-hidden border border-sand bg-surface ${
        className ?? ""
      }`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <div className="flex flex-col items-center gap-1.5 px-6 text-center">
        {variant === "video" && (
          <svg
            aria-hidden
            width="44"
            height="44"
            viewBox="0 0 44 44"
            className="mb-2"
          >
            <circle
              cx="22"
              cy="22"
              r="21"
              fill="none"
              stroke="#E4DCCF"
              strokeWidth="1"
            />
            <path d="M18 14.5 L31 22 L18 29.5 Z" fill="#1F1B16" />
          </svg>
        )}
        {filename && (
          <span className="text-caption lowercase tracking-caption text-muted">
            {filename}
          </span>
        )}
        <span className="text-[10.5px] uppercase leading-[1.4] tracking-caption text-muted">
          {computed}
        </span>
        {label && (
          <span className="mt-1 max-w-[26ch] text-caption uppercase leading-[1.5] tracking-caption text-muted">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
