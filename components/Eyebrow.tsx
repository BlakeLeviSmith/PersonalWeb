type EyebrowProps = {
  children: string;
  className?: string;
};

/**
 * The eyebrow caption that sits above every section title — uppercase,
 * letter-spaced, secondary color. It does the editorial framing work.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className ?? ""}`}>
      <span aria-hidden className="h-px w-6 bg-tan/70" />
      {children}
    </p>
  );
}
