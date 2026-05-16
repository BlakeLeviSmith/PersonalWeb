import { research } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { Section } from "./Section";
import { FadeContent } from "./motion/FadeContent";

/**
 * Research — the lightest section. A short editorial note, single column,
 * narrow measure, no image.
 */
export function Research() {
  return (
    <Section id="research">
      <FadeContent>
        <Eyebrow>{research.eyebrow}</Eyebrow>
        <h2 className="mt-6 font-serif text-h2 leading-[1.1] tracking-[-0.01em] text-ink md:text-h2-lg">
          {research.title}
        </h2>
        <p className="mt-7 max-w-measure text-body text-stone">
          {research.body}
        </p>
      </FadeContent>
    </Section>
  );
}
