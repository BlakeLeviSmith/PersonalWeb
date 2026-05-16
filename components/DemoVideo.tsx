import type { ImageSlot } from "@/lib/content";
import { Placeholder } from "./Placeholder";

type DemoVideoProps = {
  slot: ImageSlot;
  className?: string;
};

/**
 * The FTC demo video. Renders a real `<video>` when `slot.src` is set, and the
 * video placeholder box otherwise. Autoplay disabled, muted by default, with a
 * poster frame — per spec.
 */
export function DemoVideo({ slot, className }: DemoVideoProps) {
  if (!slot.src) {
    return (
      <Placeholder
        variant="video"
        filename={slot.filename}
        aspectRatio={slot.aspectRatio}
        label={slot.label}
        className={className}
      />
    );
  }

  const [w, h] = slot.aspectRatio
    .split("/")
    .map((n) => parseInt(n.trim(), 10) || 1);

  return (
    <div
      className={`relative overflow-hidden border border-sand bg-contrast ${
        className ?? ""
      }`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <video
        controls
        muted
        playsInline
        preload="metadata"
        poster={slot.poster}
        aria-label={slot.label}
        className="h-full w-full object-cover"
      >
        <source src={slot.src} type="video/mp4" />
      </video>
    </div>
  );
}
