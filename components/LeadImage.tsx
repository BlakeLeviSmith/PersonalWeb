import Image from "next/image";
import type { ImageSlot } from "@/lib/content";
import { Placeholder } from "./Placeholder";

type LeadImageProps = {
  slot: ImageSlot;
  /** LCP priority — reserved for the hero per spec; lead images stay lazy. */
  priority?: boolean;
  className?: string;
};

/**
 * A project lead image. Renders a real `next/image` when `slot.src` is set,
 * and the styled placeholder box otherwise. The layout box is identical in
 * both modes, so swapping in a real asset never shifts the page.
 */
export function LeadImage({ slot, priority = false, className }: LeadImageProps) {
  if (!slot.src) {
    return (
      <Placeholder
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
      className={`relative overflow-hidden border border-sand ${className ?? ""}`}
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <Image
        src={slot.src}
        alt={slot.label}
        fill
        priority={priority}
        sizes="(min-width: 768px) 58vw, 100vw"
        className="object-cover [filter:saturate(0.92)]"
      />
    </div>
  );
}
