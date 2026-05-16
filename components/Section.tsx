import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Hairline rule above the section content. */
  divider?: boolean;
  className?: string;
  /** Top padding utility classes — override to tighten an inter-section gap. */
  pt?: string;
  /** Bottom padding utility classes — override to tighten an inter-section gap. */
  pb?: string;
};

/** A long-scroll section: standard vertical rhythm and an optional top rule. */
export function Section({
  id,
  children,
  divider = true,
  className,
  pt = "pt-14 md:pt-24",
  pb = "pb-14 md:pb-24",
}: SectionProps) {
  return (
    <section id={id} className={`${pt} ${pb} ${className ?? ""}`}>
      <Container>
        {divider && <div className="mb-8 border-t border-sand md:mb-12" />}
        {children}
      </Container>
    </section>
  );
}
