import { research } from "@/lib/content";
import { Eyebrow } from "./Eyebrow";
import { LogoMark } from "./LogoMark";
import { Section } from "./Section";
import { FadeContent } from "./motion/FadeContent";

/**
 * Research — the lightest section. A short editorial note: the prose holds a
 * narrow measure on the left, the Duke mark fills the open space on the right.
 */
export function Research() {
  return (
    <Section id="research" pb="pb-8 md:pb-12">
      <FadeContent>
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-12">
          {/* Prose — narrow measure, left. */}
          <div className="md:col-span-7">
            <Eyebrow>{research.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-serif text-h2 leading-[1.1] tracking-[-0.01em] text-ink md:text-h2-lg">
              {research.title}
            </h2>
            <p className="mt-7 max-w-measure text-body text-stone">
              {research.body}
            </p>
          </div>

          {/* Duke mark — centered in the open space, right. */}
          <div className="flex md:col-span-4 md:col-start-9 md:row-start-1 md:items-center md:justify-center">
            <LogoMark
              name={research.title}
              src={research.logo.src}
              width={research.logo.width}
              height={research.logo.height}
              displayHeight={280}
            />
          </div>
        </div>
      </FadeContent>
    </Section>
  );
}
