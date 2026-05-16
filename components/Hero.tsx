import { hero, site } from "@/lib/content";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { CharlotteTopo } from "./hero/CharlotteTopo";
import { HeroTopoStage } from "./hero/HeroTopoStage";
import { ShinyText } from "./motion/ShinyText";
import { SplitText } from "./motion/SplitText";

/**
 * Hero — full first viewport. Left-aligned text over a Charlotte topographic
 * map (real OSM streets + SRTM contours) on the right.
 */
export function Hero() {
  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <HeroTopoStage>
        <CharlotteTopo className="h-full w-full" />
      </HeroTopoStage>

      <Container className="relative z-10 flex flex-1 flex-col justify-center pt-28 pb-28">
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
      </Container>

      <Container className="relative z-10 pb-9">
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
      </Container>
    </section>
  );
}
