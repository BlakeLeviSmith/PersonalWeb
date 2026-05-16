import Image from "next/image";
import { LogoPill } from "./LogoPill";

type LogoMarkProps = {
  name: string;
  /** Real logo path under /public. Without it, the placeholder pill renders. */
  src?: string;
  /** Intrinsic pixel dimensions of the source file (for correct scaling). */
  width?: number;
  height?: number;
  /** Bounding-box height in px; the logo scales to fit, keeping its ratio. */
  displayHeight?: number;
  /** Optional width cap so very wide lockups don't blow out their column. */
  maxWidth?: number;
  className?: string;
};

/**
 * A program/partner logo. Renders a real monochrome lockup when a source is
 * given, the placeholder name pill otherwise. The logo scales to fit inside a
 * bounding box (height, and optional max width) with its aspect preserved, so
 * a wide lockup and a square mark carry comparable visual weight.
 */
export function LogoMark({
  name,
  src,
  width,
  height,
  displayHeight = 64,
  maxWidth,
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
      style={{
        height: "auto",
        width: "auto",
        maxHeight: displayHeight,
        maxWidth,
      }}
      className={`select-none object-contain opacity-[0.64] [filter:grayscale(1)] ${
        className ?? ""
      }`}
    />
  );
}
