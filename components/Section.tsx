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
    <section id={id} className={`py-24 md:py-40 ${className ?? ""}`}>
      <Container>
        {divider && <div className="mb-14 border-t border-sand md:mb-20" />}
        {children}
      </Container>
    </section>
  );
}
