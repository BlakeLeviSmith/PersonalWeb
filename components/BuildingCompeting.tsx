import { competitions, competitionsEyebrow, ftc } from "@/lib/content";
import { DemoVideo } from "./DemoVideo";
import { Eyebrow } from "./Eyebrow";
import { Section } from "./Section";
import { FadeContent } from "./motion/FadeContent";

/**
 * Building & Competing — the FTC scoring tool (with a demo video) plus a short
 * competitions list. Lighter weight than the Work section.
 */
export function BuildingCompeting() {
  return (
    <Section id="building">
      {/* FTC scoring tool block. */}
      <FadeContent>
        <Eyebrow>{ftc.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-serif text-h2 leading-[1.1] tracking-[-0.01em] text-ink md:text-h2-lg">
          {ftc.title}
        </h2>
      </FadeContent>

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-x-12">
        <FadeContent className="md:col-span-7">
          <DemoVideo slot={ftc.video} />
        </FadeContent>
        <FadeContent delay={0.1} className="md:col-span-5 md:self-center">
          <p className="text-body text-ink">{ftc.body}</p>
        </FadeContent>
      </div>

      {/* Competitions list. */}
      <div className="mt-16 md:mt-20">
        <FadeContent>
          <Eyebrow>{competitionsEyebrow}</Eyebrow>
          <ul className="mt-6">
            {competitions.map((competition) => (
              <li
                key={competition.name}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-sand py-4 text-caption uppercase tracking-caption"
              >
                <span className="text-ink">{competition.name}</span>
                <span aria-hidden className="text-muted">
                  ·
                </span>
                <span className="text-stone">{competition.detail}</span>
              </li>
            ))}
          </ul>
        </FadeContent>
      </div>
    </Section>
  );
}
