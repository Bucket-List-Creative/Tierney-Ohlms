"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/primitives/Button";
import type { Navigation } from "@/lib/types";

/**
 * Sticky header. Condenses vertical padding 22px → 12px once scrollY > 24.
 * Full nav shows at ≥880px; below that it collapses into a full-screen sheet
 * while the CTA stays visible. Hit targets ≥ 44px.
 */
export function Header({ wordmark, nav }: { wordmark: string; nav: Navigation }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const pad = scrolled ? 12 : 22;

  return (
    <header
      className="sticky top-0 z-[100] border-b border-rule backdrop-blur-md transition-all duration-[250ms] ease-out"
      style={{ backgroundColor: "rgba(255,255,255,.96)" }}
    >
      <div
        className="container-x flex items-center justify-between gap-6 transition-[padding] duration-[250ms] ease-out"
        style={{ paddingTop: pad, paddingBottom: pad }}
      >
        <Link
          href="/"
          className="whitespace-nowrap font-display text-[22px] tracking-[0.01em] text-ink"
        >
          {wordmark}
        </Link>

        {/* Desktop nav (≥880px) */}
        <nav className="hidden items-center gap-6 text-[15px] font-medium min-[880px]:flex">
          {nav.items.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="border-b border-transparent py-1 text-ink transition-colors duration-200 hover:border-ink"
            >
              {item.label}
            </Link>
          ))}
          <Button href={nav.ctaHref} size="sm" className="btn-grain-sm">
            {nav.ctaLabel}
          </Button>
        </nav>

        {/* Mobile bar (<880px): CTA stays visible + hamburger */}
        <div className="flex items-center gap-3 min-[880px]:hidden">
          <Button href={nav.ctaHref} size="sm" className="btn-grain-sm max-[400px]:hidden">
            {nav.ctaLabel}
          </Button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-input border border-rule text-ink"
          >
            <MenuGlyph open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Full-screen mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[64px] z-[99] flex flex-col gap-2 bg-white px-5 py-8 min-[880px]:hidden"
      >
        <nav className="flex flex-col">
          {nav.items.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-rule py-4 text-lg font-medium text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button
          href={nav.ctaHref}
          className="mt-4 w-full"
          onClick={() => setMenuOpen(false)}
        >
          {nav.ctaLabel}
        </Button>
      </div>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <line x1="6" y1="6" x2="18" y2="18" />
          <line x1="18" y1="6" x2="6" y2="18" />
        </>
      ) : (
        <>
          <line x1="4" y1="8" x2="20" y2="8" />
          <line x1="4" y1="16" x2="20" y2="16" />
        </>
      )}
    </svg>
  );
}
