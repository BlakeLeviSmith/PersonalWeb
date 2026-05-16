import { Fragment } from "react";
import { modera } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { LogoMark } from "./LogoMark";
import { Section } from "./Section";
import { StatStrip } from "./StatStrip";
import { YouTubeFacade } from "./YouTubeFacade";
import { FadeContent } from "./motion/FadeContent";

/**
 * Modera — the priority commercial project, leading the Work section.
 */
export function Modera() {
  return (
    <Section id="work" pb="pb-8 md:pb-12">
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
        {/* Demo video — first on mobile, offset right on desktop. */}
        <FadeContent className="md:col-span-7 md:col-start-6 md:row-start-1">
          <YouTubeFacade video={modera.video} />
        </FadeContent>

        {/* Text column — left on desktop, centered against the video. */}
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

          <StatStrip stats={modera.stats} className="mt-10" />

          {/* Programs — a quieter credentials row. */}
          <div className="mt-9">
            <p className="eyebrow">{modera.programsCaption}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-7 gap-y-4">
              {modera.programs.map((program, i) => (
                <Fragment key={program.name}>
                  {i > 0 && (
                    <span aria-hidden className="h-12 w-px bg-muted" />
                  )}
                  <LogoMark
                    name={program.name}
                    src={program.src}
                    width={program.width}
                    height={program.height}
                    displayHeight={80}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </FadeContent>
      </div>
    </Section>
  );
}
