import type { ReactNode } from "react";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: ReactNode;
  /** Hairline rule above the section content. */
  divider?: boolean;
  className?: string;
};

/** A long-scroll section: standard vertical rhythm and an optional top rule. */
export function Section({
  id,
  children,
  divider = true,
  className,
}: SectionProps) {
  return (
    <section id={id} className={`py-14 md:py-24 ${className ?? ""}`}>
      <Container>
        {divider && <div className="mb-8 border-t border-sand md:mb-12" />}
        {children}
      </Container>
    </section>
  );
}
