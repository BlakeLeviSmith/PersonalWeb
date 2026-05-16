import Image from "next/image";
import { LogoPill } from "./LogoPill";

type LogoMarkProps = {
  name: string;
  /** Real logo path under /public. Without it, the placeholder pill renders. */
  src?: string;
  /** Intrinsic pixel dimensions of the source file (for correct scaling). */
  width?: number;
  height?: number;
  /** Rendered height in px; width scales to keep the logo's aspect ratio. */
  displayHeight?: number;
  className?: string;
};

/**
 * A program/partner logo. Renders a real monochrome lockup when a source is
 * given, the placeholder name pill otherwise. Logos are desaturated to the
 * warm grey tone so they sit inside the palette instead of fighting it.
 */
export function LogoMark({
  name,
  src,
  width,
  height,
  displayHeight = 28,
  className,
}: LogoMarkProps) {
  if (!src || !width || !height) {
    return <LogoPill name={name} />;
  }

  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      style={{ height: displayHeight, width: "auto" }}
      className={`select-none opacity-[0.62] [filter:grayscale(1)] ${
        className ?? ""
      }`}
    />
  );
}
