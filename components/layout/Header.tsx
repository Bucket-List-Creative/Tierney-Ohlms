"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/primitives/Button";
import { useRafScroll } from "@/lib/motion";
import { cn } from "@/lib/cn";
import type { Navigation } from "@/lib/types";

/**
 * Compact sticky header with a single inline desktop row. It frosts its
 * ground and traces read-progress along its lower edge. Nav links
 * underline on hover and stay marked while their section owns the viewport.
 *
 * Full nav shows at ≥1200px; below that it collapses into a sheet. The sheet
 * renders as a sibling of <header>, not inside it: the header's backdrop blur
 * makes it a containing block for fixed children, which would pin the sheet to
 * the header box instead of the viewport.
 */
export function Header({ wordmark, nav }: { wordmark: string; nav: Navigation }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerH, setHeaderH] = useState(89);
  const [active, setActive] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  // Section ids this nav can highlight, e.g. "/#why" → "why".
  const anchorIds = nav.items
    .map((i) => (i.href.startsWith("/#") || i.href.startsWith("#") ? i.href.split("#")[1] : null))
    .filter(Boolean) as string[];
  const anchorKey = anchorIds.join(",");

  const onFrame = useCallback(() => {
    const y = window.scrollY;
    setScrolled(y > 24);

    // Read progress along the header's lower edge.
    const rail = railRef.current;
    if (rail) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      rail.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    }

    // The section that owns the line just under the header wins.
    if (anchorKey) {
      const line = y + (headerRef.current?.offsetHeight ?? 89) + 24;
      let current: string | null = null;
      for (const id of anchorKey.split(",")) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= line) current = id;
      }
      setActive(current);
    }
  }, [anchorKey]);

  useRafScroll(onFrame);

  // Publish the live header height: the sheet sits below it, and anchor
  // scrolling uses it as scroll-padding so targets clear the bar.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const h = entry.target.getBoundingClientRect().height;
      setHeaderH(h);
      document.documentElement.style.setProperty("--header-h", `${Math.round(h)}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    // Passing the breakpoint reveals the desktop nav; drop the sheet with it.
    const mq = window.matchMedia("(min-width: 1200px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [menuOpen]);

  const pad = scrolled ? 17 : 18;
  const isSectionLink = (href: string) => href.startsWith("/#") || href.startsWith("#");
  const linkGroups = [
    { label: "Pages", items: nav.items.filter((item) => !isSectionLink(item.href)) },
    { label: "Explore the homepage", items: nav.items.filter((item) => isSectionLink(item.href)) },
  ].filter((group) => group.items.length > 0);
  const portal =
    nav.portalHref && nav.portalLabel
      ? { href: nav.portalHref, label: nav.portalLabel }
      : null;

  const isActive = (href: string) => {
    if (href.startsWith("/#") || href.startsWith("#")) {
      return pathname === "/" && active === href.split("#")[1];
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "sticky top-0 z-[100] border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-[400ms] ease-out",
          scrolled
            ? "border-rule bg-white/85 shadow-[0_10px_30px_-24px_rgba(24,20,10,0.6)]"
            : "border-transparent bg-white/70",
        )}
        style={{ backdropFilter: "blur(18px) saturate(1.6)" }}
      >
        <div
          className="container-x flex w-full items-center justify-between gap-2 max-[359px]:gap-1.5 min-[1200px]:gap-8 transition-[padding,gap] duration-[400ms] ease-out"
          style={{ paddingTop: pad, paddingBottom: pad }}
        >
          <Link
            href="/"
            className="group/mark relative inline-flex min-h-11 shrink-0 items-center whitespace-nowrap font-display text-[18px] max-[359px]:text-[15px] leading-tight tracking-[0.01em] text-ink"
          >
            {wordmark}
            <span
              aria-hidden
              className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gradient-to-r from-brass to-gold transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/mark:origin-left group-hover/mark:scale-x-100"
            />
          </Link>

          {/* Keep page links, homepage sections, and actions in distinct groups. */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 whitespace-nowrap text-[12px] font-medium min-[1200px]:flex">
            {linkGroups.map((group) => (
              <ul key={group.label} aria-label={group.label} className="m-0 flex list-none items-center gap-4 p-0">
                {group.items.map((item) => {
                  const on = isActive(item.href);
                  return (
                    <li key={item.href + item.label}>
                      <Link href={item.href} aria-current={on ? (isSectionLink(item.href) ? "location" : "page") : undefined}
                        className={cn("inline-flex border-b py-2", on ? "border-brass text-ink" : "border-transparent text-slate")}>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ))}
            <div className="ml-2 flex items-center gap-3">
              {portal && (
                <Button href={portal.href} size="sm" variant="secondary" className="!px-3 !py-2 !text-[12px]" target="_blank" rel="noopener noreferrer">
                  {portal.label}<ExternalGlyph />
                </Button>
              )}
              <Button href={nav.ctaHref} size="sm" className="!px-3 !py-2 !text-[12px]">{nav.ctaLabel}</Button>
            </div>
          </nav>

          {/* Mobile bar (<1200px): CTA stays visible + hamburger */}
          <div className="flex items-center gap-2 min-[1200px]:hidden">
            <Button href={nav.ctaHref} size="sm" className="max-[479px]:px-4">
              <span className="max-[479px]:hidden">{nav.ctaLabel}</span>
              <span className="hidden max-[479px]:inline">Contact</span>
            </Button>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center rounded-input border border-rule bg-white/70 text-ink transition-colors duration-300"
            >
              <MenuGlyph open={menuOpen} />
            </button>
          </div>
        </div>

        {/* Read-progress rail */}
        <span
          ref={railRef}
          aria-hidden
          className="scroll-rail absolute inset-x-0 bottom-[-1px] h-[2px] scale-x-0"
        />
      </header>

      {/* Mobile sheet: fills everything below the bar, scrolls if it overflows. */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        style={{ top: headerH }}
        className="container-x mesh-quiet fixed inset-x-0 bottom-0 z-[95] flex flex-col overflow-y-auto overscroll-contain pb-[max(2rem,env(safe-area-inset-bottom))] pt-6 min-[1200px]:hidden"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-7">
          {linkGroups.map((group) => (
            <div key={group.label}>
              <p className="m-0 pb-2 text-[11px] max-[1199px]:text-[12px] font-semibold uppercase tracking-[.14em] text-brass">{group.label}</p>
              <ul aria-label={group.label} className="m-0 list-none p-0">
                {group.items.map((item) => (
                  <li key={item.href + item.label}>
                    <Link href={item.href} onClick={() => setMenuOpen(false)}
                      aria-current={isActive(item.href) ? (isSectionLink(item.href) ? "location" : "page") : undefined}
                      className={cn("flex items-center justify-between gap-4 border-b border-rule py-4 text-lg font-medium", isActive(item.href) ? "text-brass" : "text-ink")}>
                      {item.label}<span aria-hidden className="text-brass">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div
          className="mt-6 flex flex-col gap-3"
          style={{
            transition: "opacity 520ms ease, transform 520ms cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: menuOpen ? `${60 + nav.items.length * 45}ms` : "0ms",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <Button href={nav.ctaHref} className="w-full" onClick={() => setMenuOpen(false)}>
            {nav.ctaLabel}
          </Button>
          {portal && (
            <Button
              href={portal.href}
              variant="secondary"
              className="w-full"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              {portal.label}
              <ExternalGlyph />
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

/** Small arrow marking a link that leaves the site (client portal). */
function ExternalGlyph() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="opacity-60 transition-transform duration-300"
      aria-hidden
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
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
      {/* Two bars that rotate into a cross — one continuous motion, no swap. */}
      <line
        x1="4"
        y1="8"
        x2="20"
        y2="8"
        className="origin-center transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: open ? "translateY(4px) rotate(45deg)" : "none" }}
      />
      <line
        x1="4"
        y1="16"
        x2="20"
        y2="16"
        className="origin-center transition-transform duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: open ? "translateY(-4px) rotate(-45deg)" : "none" }}
      />
    </svg>
  );
}
