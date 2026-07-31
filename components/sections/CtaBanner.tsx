import { Button } from "@/components/primitives/Button";
import { LineIcon } from "@/components/icons/LineIcon";
import type { HomePage } from "@/lib/types";

/**
 * Closing CTA — full-width black signature surface (grain + centered gold
 * aura). One of the moments the dark surface is used.
 *
 * `secondaryCta` adds an outlined companion action (e.g. "Call us"), and
 * `notes` renders a small reassurance row of check-marked points beneath the
 * buttons.
 */
export function CtaBanner({
  banner,
  eyebrow = "Get started",
  secondaryCta,
  notes,
}: {
  banner: HomePage["ctaBanner"];
  eyebrow?: string;
  secondaryCta?: { label: string; href: string };
  notes?: string[];
}) {
  return (
    <section className="surface-dark">
      <div className="container-x flex flex-col items-center gap-6 py-[104px] text-center max-[767px]:py-16">
        <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">
          {eyebrow}
        </span>
        <h2 className="m-0 max-w-[20ch] font-display text-[44px] font-medium leading-[1.15] text-white max-[767px]:text-[32px]">
          {banner.heading}
        </h2>
        <p className="m-0 max-w-[52ch] text-[17px] leading-relaxed text-dark-body">
          {banner.lead}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3.5">
          <Button href={banner.cta.href} variant="inverse">
            {banner.cta.label}
          </Button>
          {secondaryCta ? (
            <Button href={secondaryCta.href} variant="inverse-outline">
              {secondaryCta.label}
            </Button>
          ) : null}
        </div>
        {notes?.length ? (
          <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 p-0">
            {notes.map((note) => (
              <li
                key={note}
                className="flex items-center gap-2 text-[13px] text-dark-label"
              >
                <LineIcon name="check" size={14} className="text-gold" />
                {note}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
