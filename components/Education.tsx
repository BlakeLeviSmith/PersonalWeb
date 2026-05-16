import { education } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Section } from "./Section";
import { FadeContent } from "./motion/FadeContent";

/**
 * Education — a simple two-column list, school left, role and timeframe right,
 * hairline divider between rows.
 */
export function Education() {
  return (
    <Section id="education">
      <FadeContent>
        <Eyebrow>{education.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-serif text-h2 leading-[1.1] tracking-[-0.01em] text-ink md:text-h2-lg">
          {education.title}
        </h2>
      </FadeContent>

      <div className="mt-10 md:mt-12">
        {education.rows.map((row, i) => (
          <FadeContent key={row.school} delay={i * 0.06}>
            <div className="grid items-baseline gap-1 border-t border-sand py-6 md:grid-cols-12 md:gap-x-8 md:py-7">
              <h3 className="font-serif text-h3 text-ink md:col-span-8">
                {row.school}
              </h3>
              <p className="text-caption uppercase tracking-caption text-stone md:col-span-4 md:text-right">
                {row.role}
              </p>
            </div>
          </FadeContent>
        ))}
      </div>
    </Section>
  );
}
