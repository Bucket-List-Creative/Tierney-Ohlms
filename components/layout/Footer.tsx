import Link from "next/link";
import type { SiteSettings } from "@/lib/types";

/**
 * Black footer. 4-column top grid (brand blurb + link columns), thin rule,
 * then the copyright / legal row.
 */
export function Footer({ site }: { site: SiteSettings }) {
  return (
    <footer className="bg-obsidian text-white">
      <div className="container-x flex flex-col gap-14 pb-10 pt-[72px]">
        <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
          <div className="flex flex-col gap-4">
            <div className="font-display text-2xl text-white">{site.wordmark}</div>
            <p className="m-0 max-w-[34ch] text-sm leading-relaxed text-dark-body">
              {site.footerBlurb}
            </p>
          </div>

          {site.footerColumns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-dark-label">
                {col.title}
              </div>
              {col.links.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="text-sm text-dark-link transition-colors duration-200 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-6 border-t border-dark-rule pt-6 text-[13px] text-dark-label max-[560px]:flex-col max-[560px]:items-start max-[560px]:gap-4">
          <span>
            © {new Date().getFullYear()} {site.copyrightName}. All rights reserved.
          </span>
          <div className="flex gap-6">
            {site.legalLinks.map((link) => (
              <Link
                key={link.href + link.label}
                href={link.href}
                className="text-dark-label transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
