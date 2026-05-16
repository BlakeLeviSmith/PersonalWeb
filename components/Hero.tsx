import { hero, site } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { CharlotteTopo } from "./hero/CharlotteTopo";
import { ShinyText } from "./motion/ShinyText";
import { SplitText } from "./motion/SplitText";

/**
 * Hero — full first viewport. Left-aligned text over a Charlotte topographic
 * map (real OSM streets + SRTM contours) on the right. The text sits a little
 * tighter to the left edge than the rest of the site, by intent.
 */
export function Hero() {
  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Topo visual — right side, fading into the canvas toward the text. */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-full opacity-50 md:w-[64%] md:opacity-100"
        style={{
          maskImage: "linear-gradient(to right, transparent, #000 26%)",
          WebkitMaskImage: "linear-gradient(to right, transparent, #000 26%)",
        }}
      >
        <CharlotteTopo className="h-full w-full" />
      </div>

      {/* Hero text. */}
      <div className="relative z-10 mx-auto flex w-full max-w-content flex-1 flex-col justify-center px-6 pt-28 pb-28 md:px-8 lg:px-10">
        <div className="max-w-xl">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-7 font-serif text-display leading-[0.98] tracking-[-0.03em] text-ink md:text-display-lg">
            <span className="block">
              <SplitText text={firstName} delay={0.15} />
            </span>
            {lastName && (
              <span className="block">
                <SplitText text={lastName} delay={0.32} />
              </span>
            )}
          </h1>

          <p className="mt-7 max-w-[32ch] font-sans text-h3 leading-[1.35] text-stone md:text-h3-lg">
            {hero.subhead}
          </p>
        </div>
      </div>

      {/* Footer meta. */}
      <div className="relative z-10 mx-auto w-full max-w-content px-6 pb-9 md:px-8 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-center gap-3">
            <span aria-hidden className="scroll-cue" />
            <span className="text-caption uppercase tracking-caption text-muted">
              Scroll · 01 / 08
            </span>
          </div>
          <ShinyText
            text={site.updated}
            className="text-caption uppercase tracking-caption"
          />
        </div>
      </div>
    </section>
  );
}
