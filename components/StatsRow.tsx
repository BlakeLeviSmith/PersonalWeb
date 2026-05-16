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

      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-12 md:mt-16 md:gap-x-12 md:gap-y-14 lg:grid-cols-4 lg:gap-x-14">
        {glanceStats.map((stat, i) => (
          <FadeContent key={stat.caption} delay={i * 0.08}>
            <span className="nums block font-serif text-[54px] leading-[0.95] tracking-[-0.04em] text-ink md:text-[88px] lg:text-[104px]">
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
