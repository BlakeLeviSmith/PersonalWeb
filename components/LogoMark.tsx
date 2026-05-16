import Image from "next/image";
import type { LogoSlot } from "@/lib/content";
import { LogoPill } from "./LogoPill";

type LogoMarkProps = {
  slot: LogoSlot;
};

/**
 * A program/partner logo. Renders a real monochrome lockup when `slot.src` is
 * set, and the placeholder name pill otherwise. The logo is desaturated to the
 * warm grey tone so it sits inside the palette instead of fighting it.
 */
export function LogoMark({ slot }: LogoMarkProps) {
  if (!slot.src) {
    return <LogoPill name={slot.name} />;
  }

  return (
    <span className="inline-flex items-center border border-sand bg-surface px-4 py-2.5">
      <Image
        src={slot.src}
        alt={slot.name}
        width={140}
        height={22}
        className="h-[22px] w-auto opacity-80 [filter:grayscale(1)_saturate(0.9)_brightness(0.85)]"
      />
    </span>
  );
}
