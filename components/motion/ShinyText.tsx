type ShinyTextProps = {
  text: string;
  className?: string;
};

/**
 * A single tan glint travels across letter-spaced caption text. The animation
 * itself is defined in globals.css and is disabled under reduced motion.
 */
export function ShinyText({ text, className }: ShinyTextProps) {
  return <span className={`shiny-text ${className ?? ""}`}>{text}</span>;
}
