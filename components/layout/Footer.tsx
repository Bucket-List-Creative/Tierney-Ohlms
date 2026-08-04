import Link from "next/link";
import { Orb } from "@/components/layout/Section";
import { Reveal } from "@/components/primitives/Reveal";
import type { SiteSettings } from "@/lib/types";

/**
 * Black footer, lit from above by the same gold aurora that closes the page.
 * 4-column top grid (brand blurb + link columns), a gradient rule, then the
 * copyright / legal row.
 */
export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="atmos bg-obsidian text-white">
      <Orb
        tone="gold"
        drift="a"
        className="left-[6%] top-[-58%] h-[560px] w-[560px] opacity-40 max-[767px]:hidden"
      />

      <div className="container-x relative z-[1] flex flex-col gap-14 pb-10 pt-[76px] max-[767px]:gap-10 max-[767px]:pt-14">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          <Reveal duration={800} className="flex flex-col gap-4">
            <div className="font-display text-2xl text-white">{site.wordmark}</div>
            <p className="m-0 max-w-[34ch] text-sm leading-relaxed text-dark-body">
              {site.footerBlurb}
            </p>
          </Reveal>

          {site.footerColumns.map((col, i) => (
            <Reveal
              key={col.title}
              delay={80 + i * 70}
              duration={800}
              className="flex flex-col gap-3"
            >
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-dark-label">
                {col.title}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="link-line w-fit text-sm text-dark-link transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </Reveal>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <span aria-hidden className="rule-fade-dark block w-full" />
          <div className="flex items-center justify-between gap-6 text-[13px] text-dark-label max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-4">
            <span>
              © {new Date().getFullYear()} {site.copyrightName}. All rights reserved.
            </span>
            <div className="flex gap-6">
              {site.legalLinks.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="link-line text-dark-label transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
