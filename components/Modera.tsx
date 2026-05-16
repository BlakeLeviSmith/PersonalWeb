import { Fragment } from "react";
import { modera } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { LeadImage } from "./LeadImage";
import { LogoMark } from "./LogoMark";
import { Section } from "./Section";
import { CountUp } from "./motion/CountUp";
import { FadeContent } from "./motion/FadeContent";
import { TiltedCard } from "./motion/TiltedCard";

/**
 * Modera — the priority commercial project, leading the Work section.
 */
export function Modera() {
  return (
    <Section id="work">
      <FadeContent>
        <Eyebrow>{modera.eyebrow}</Eyebrow>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <h2 className="font-serif text-display leading-[1.02] tracking-[-0.03em] text-ink md:text-display-lg">
            {modera.title}
          </h2>
          <a
            href={modera.href}
            target="_blank"
            rel="noreferrer"
            className="text-caption uppercase tracking-caption text-tan transition-opacity hover:opacity-70"
          >
            {modera.url} ↗
          </a>
        </div>
      </FadeContent>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-12">
        {/* Lead image — first on mobile, offset right on desktop. */}
        <FadeContent className="md:col-span-7 md:col-start-6 md:row-start-1">
          <TiltedCard>
            <LeadImage slot={modera.leadImage} />
          </TiltedCard>
        </FadeContent>

        {/* Text column — left on desktop, centered against the image. */}
        <FadeContent
          delay={0.1}
          className="md:col-span-5 md:col-start-1 md:row-start-1 md:self-center"
        >
          <div className="space-y-5">
            {modera.body.map((para) => (
              <p key={para} className="text-body text-ink">
                {para}
              </p>
            ))}
          </div>

          {/* Stat strip — three numbers with hairline dividers. */}
          <div className="mt-10 flex border-t border-sand pt-8">
            {modera.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex-1 ${
                  i > 0 ? "border-l border-sand pl-5" : ""
                }`}
              >
                <span className="nums block font-serif text-[40px] leading-none tracking-[-0.03em] text-ink">
                  <CountUp value={stat.value} />
                </span>
                <span className="mt-2.5 block text-caption uppercase tracking-caption text-stone">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Programs — a quieter credentials row. */}
          <div className="mt-9">
            <p className="eyebrow">{modera.programsCaption}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {modera.programs.map((program, i) => (
                <Fragment key={program.name}>
                  {i > 0 && (
                    <span aria-hidden className="h-7 w-px bg-muted" />
                  )}
                  <LogoMark slot={program} />
                </Fragment>
              ))}
            </div>
          </div>
        </FadeContent>
      </div>
    </Section>
  );
}
