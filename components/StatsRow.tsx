import { glanceStats } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { CountUp } from "./motion/CountUp";
import { FadeContent } from "./motion/FadeContent";
import { Section } from "./Section";

/**
 * At a Glance — a row of four oversized numbers. The highest-density block on
 * the page and its visual anchor.
 */
export function StatsRow() {
  return (
    <Section id="glance">
      <Eyebrow>At a Glance</Eyebrow>

      <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-16 md:grid-cols-4 md:gap-x-8">
        {glanceStats.map((stat, i) => (
          <FadeContent key={stat.caption} delay={i * 0.08}>
            <span className="nums block font-serif text-[58px] leading-[0.95] tracking-[-0.04em] text-ink md:text-[104px] lg:text-[140px]">
              <CountUp value={stat.value} />
            </span>
            <span className="mt-4 block max-w-[22ch] text-caption uppercase tracking-caption text-stone">
              {stat.caption}
            </span>
          </FadeContent>
        ))}
      </div>
    </Section>
  );
}
