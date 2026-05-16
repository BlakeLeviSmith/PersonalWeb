import {
  canopy,
  canopyInProgress,
  canopyNewestLaunch,
  canopyPartners,
  canopyTotals,
} from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { LeadImage } from "./LeadImage";
import { LogoMark } from "./LogoMark";
import { Section } from "./Section";
import { CountUp } from "./motion/CountUp";
import { FadeContent } from "./motion/FadeContent";
import { TiltedCard } from "./motion/TiltedCard";

/**
 * Charlotte Canopy — the most externally-validated project, given the most
 * real estate: an overview block followed by a partners block.
 */
export function Canopy() {
  return (
    <Section>
      {/* --- Overview block --- */}
      <FadeContent>
        <Eyebrow>{canopy.eyebrow}</Eyebrow>
        <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-1">
          <h2 className="font-serif text-display leading-[1.02] tracking-[-0.03em] text-ink md:text-display-lg">
            {canopy.title}
          </h2>
          <a
            href={canopy.href}
            target="_blank"
            rel="noreferrer"
            className="text-caption uppercase tracking-caption text-tan transition-opacity hover:opacity-70"
          >
            {canopy.url} ↗
          </a>
        </div>
      </FadeContent>

      <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-x-12">
        {/* Lead image — left on desktop. */}
        <FadeContent className="md:col-span-7 md:col-start-1 md:row-start-1">
          <TiltedCard>
            <LeadImage slot={canopy.leadImage} />
          </TiltedCard>
        </FadeContent>

        {/* Body — right on desktop. */}
        <FadeContent
          delay={0.1}
          className="space-y-5 md:col-span-5 md:col-start-8 md:row-start-1 md:self-center"
        >
          {canopy.body.map((para) => (
            <p key={para} className="text-body text-ink">
              {para}
            </p>
          ))}
        </FadeContent>
      </div>

      {/* Three-up feature row. */}
      <div className="mt-14 grid border-t border-sand md:mt-20 md:grid-cols-3">
        {canopy.features.map((feature, i) => (
          <FadeContent
            key={feature.caption}
            delay={i * 0.08}
            className={`border-b border-sand py-7 md:border-b-0 md:py-8 ${
              i > 0 ? "md:border-l md:border-sand md:pl-8" : ""
            } ${i < canopy.features.length - 1 ? "md:pr-8" : ""}`}
          >
            <p className="eyebrow">{feature.caption}</p>
            <p className="mt-3 text-body text-ink">{feature.description}</p>
          </FadeContent>
        ))}
      </div>

      {/* --- Partners block --- */}
      <div className="mt-28 md:mt-40">
        <FadeContent>
          <Eyebrow>Launched Partners</Eyebrow>
        </FadeContent>

        <div className="mt-10 md:mt-12">
          {canopyPartners.map((partner) => (
            <FadeContent key={partner.name}>
              <article className="grid gap-x-8 gap-y-4 border-t border-sand py-8 md:grid-cols-12 md:py-10">
                <div className="md:col-span-3">
                  <span className="nums block font-serif text-[44px] leading-none tracking-[-0.03em] text-ink md:text-[60px]">
                    <CountUp value={partner.figure} />
                  </span>
                  {partner.unit && (
                    <span className="mt-2 block text-caption uppercase tracking-caption text-stone">
                      {partner.unit}
                    </span>
                  )}
                </div>
                <div className="md:col-span-4">
                  {partner.logo && (
                    <LogoMark
                      name={partner.name}
                      src={partner.logo.src}
                      width={partner.logo.width}
                      height={partner.logo.height}
                      displayHeight={26}
                      className="mb-3"
                    />
                  )}
                  <h3 className="font-serif text-h3 leading-[1.2] text-ink">
                    {partner.name}
                  </h3>
                </div>
                <p className="text-body text-stone md:col-span-5">
                  {partner.role}
                </p>
              </article>
            </FadeContent>
          ))}
        </div>
      </div>

      {/* Newest Launch callout. */}
      <FadeContent>
        <div className="mt-16 border border-sand bg-surface p-8 md:mt-20 md:p-12">
          <p className="eyebrow">{canopyNewestLaunch.eyebrow}</p>
          <LogoMark
            name={canopyNewestLaunch.title}
            src={canopyNewestLaunch.logo.src}
            width={canopyNewestLaunch.logo.width}
            height={canopyNewestLaunch.logo.height}
            displayHeight={38}
            className="mt-5"
          />
          <h3 className="mt-4 font-serif text-h3-lg leading-[1.2] text-ink md:text-h2">
            {canopyNewestLaunch.title}
            <span className="text-muted">
              {" "}
              · {canopyNewestLaunch.detail}
            </span>
          </h3>
          <p className="mt-5 max-w-measure text-body text-stone">
            {canopyNewestLaunch.body}
          </p>
        </div>
      </FadeContent>

      {/* In Progress callout — lighter. */}
      <FadeContent>
        <div className="mt-10 md:mt-12 md:pl-12">
          <p className="eyebrow">{canopyInProgress.eyebrow}</p>
          <LogoMark
            name="UNC Charlotte"
            src={canopyInProgress.logo.src}
            width={canopyInProgress.logo.width}
            height={canopyInProgress.logo.height}
            displayHeight={30}
            className="mt-4"
          />
          <p className="mt-4 max-w-measure text-body text-stone">
            {canopyInProgress.body}
          </p>
        </div>
      </FadeContent>

      {/* Bottom-of-section totals row. */}
      <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-sand pt-12 md:mt-24 md:grid-cols-4">
        {canopyTotals.map((total, i) => (
          <FadeContent key={total.caption} delay={i * 0.07}>
            <span className="nums block font-serif text-[44px] leading-none tracking-[-0.03em] text-ink md:text-[72px]">
              <CountUp value={total.value} />
            </span>
            <span className="mt-3 block text-caption uppercase tracking-caption text-stone">
              {total.caption}
            </span>
          </FadeContent>
        ))}
      </div>
    </Section>
  );
}
