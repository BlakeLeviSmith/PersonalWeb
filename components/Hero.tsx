import { hero, site } from "@/lib/content";
import { Container } from "./Container";
import { Eyebrow } from "./Eyebrow";
import { ShinyText } from "./motion/ShinyText";
import { SplitText } from "./motion/SplitText";

/**
 * Two-line, left-aligned hero filling the first viewport. No headshot —
 * imagery is saved for the project sections.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <Container className="flex flex-1 flex-col justify-center pt-28 pb-16">
        <Eyebrow>{hero.eyebrow}</Eyebrow>

        <h1 className="mt-7 font-serif text-display leading-[1.05] tracking-[-0.03em] text-ink md:text-display-lg">
          <SplitText text={hero.name} delay={0.15} />
        </h1>

        <p className="mt-7 max-w-[30ch] font-sans text-h3 leading-[1.35] text-stone md:text-h3-lg">
          {hero.subhead}
        </p>
      </Container>

      <Container className="pb-12">
        <div className="flex items-end gap-4">
          <span aria-hidden className="scroll-cue" />
          <ShinyText
            text={`Updated ${site.updated}`}
            className="text-caption uppercase tracking-caption"
          />
        </div>
      </Container>
    </section>
  );
}
