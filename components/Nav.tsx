"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/content";
import { Container } from "./Container";

/**
 * Fixed slim nav. Transparent over the canvas; a backdrop blur and hairline
 * rule fade in after 80px of scroll. Mobile collapses to a "Menu" link that
 * opens a full-screen overlay — no hamburger.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-sand bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between md:h-[72px]">
          <a
            href="#top"
            className="font-serif text-[19px] tracking-[-0.01em] text-ink"
          >
            {site.name}
          </a>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] tracking-[0.02em] text-stone transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-caption uppercase tracking-caption text-stone md:hidden"
          >
            Menu
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-canvas md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Container>
              <div className="flex h-16 items-center justify-between">
                <span className="font-serif text-[19px] text-ink">
                  {site.name}
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-caption uppercase tracking-caption text-stone"
                >
                  Close
                </button>
              </div>
            </Container>
            <Container className="flex flex-1 flex-col justify-center">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-2 font-serif text-display tracking-[-0.03em] text-ink"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
