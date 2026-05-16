type LogoPillProps = {
  name: string;
  className?: string;
};

/**
 * A monochrome placeholder lockup for a partner or program logo. The org name
 * is the content; same striped border treatment as the image placeholders,
 * sized to roughly two lines of caption text.
 */
export function LogoPill({ name, className }: LogoPillProps) {
  return (
    <span
      className={`placeholder-stripes inline-flex items-center border border-sand bg-surface px-4 py-2.5 text-caption uppercase tracking-caption text-stone ${
        className ?? ""
      }`}
    >
      {name}
    </span>
  );
}
