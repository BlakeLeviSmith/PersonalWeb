import { footerLinks, site } from "@/lib/content";
import { Container } from "./Container";
import { Magnet } from "./motion/Magnet";

/**
 * Inverse footer. The email link is the only call to action — it stands alone,
 * no newsletter signup, no "let's work together" copy.
 */
export function Footer() {
  return (
    <footer id="contact" className="bg-contrast text-canvas">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-3 md:gap-8 md:py-28">
          {/* Left — name and the Magnet email link. */}
          <div>
            <p className="font-serif text-display leading-[1.05] tracking-[-0.03em]">
              {site.name}
            </p>
            <Magnet className="mt-6">
              <a
                href={`mailto:${site.email}`}
                className="font-serif text-h3 text-canvas underline-offset-[6px] transition-opacity hover:underline md:text-h3-lg"
              >
                {site.email}
              </a>
            </Magnet>
          </div>

          {/* Middle — location and year stamp. */}
          <div className="text-caption uppercase tracking-caption text-muted md:self-end">
            <p>{site.location}</p>
            <p className="mt-2">© {site.year}</p>
          </div>

          {/* Right — external links. */}
          <nav aria-label="Social" className="md:self-end">
            <ul className="flex flex-col gap-2.5 md:items-end">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-caption uppercase tracking-caption text-canvas/65 transition-colors hover:text-canvas"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
