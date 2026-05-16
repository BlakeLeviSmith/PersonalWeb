import { truckside } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { LeadImage } from "./LeadImage";
import { Section } from "./Section";
import { FadeContent } from "./motion/FadeContent";
import { TiltedCard } from "./motion/TiltedCard";

/**
 * Truckside — the earliest-stage project, closing the Work section. No stat
 * strip; a single status line stands in for numbers.
 */
export function Truckside() {
  return (
    <Section>
      <FadeContent>
        <Eyebrow>{truckside.eyebrow}</Eyebrow>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <h2 className="font-serif text-display leading-[1.02] tracking-[-0.03em] text-ink md:text-display-lg">
            {truckside.title}
          </h2>
          <a
            href={truckside.href}
            target="_blank"
            rel="noreferrer"
            className="text-caption uppercase tracking-caption text-tan transition-opacity hover:opacity-70"
          >
            {truckside.url} ↗
          </a>
        </div>
      </FadeContent>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-12">
        <FadeContent className="md:col-span-7 md:col-start-6 md:row-start-1">
          <TiltedCard>
            <LeadImage slot={truckside.leadImage} />
          </TiltedCard>
        </FadeContent>

        <FadeContent
          delay={0.1}
          className="md:col-span-5 md:col-start-1 md:row-start-1 md:self-center"
        >
          {truckside.body.map((para) => (
            <p key={para} className="text-body text-ink">
              {para}
            </p>
          ))}
        </FadeContent>
      </div>

      <FadeContent>
        <p className="mt-12 border-t border-sand pt-6 text-caption uppercase tracking-caption text-stone md:mt-16">
          {truckside.status}
        </p>
      </FadeContent>
    </Section>
  );
}
