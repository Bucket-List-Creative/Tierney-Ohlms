import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/primitives/Button";
import { IconTile } from "@/components/primitives/IconTile";
import { LineIcon } from "@/components/icons/LineIcon";
import type { SectionHeader as HeaderData, Service } from "@/lib/types";

/**
 * Services — editorial two-column layout: a sticky intro beside a panel of
 * numbered service rows with hover-reveal. A departure from plain cards that
 * leans into the brand's rules-and-hairlines structure.
 */
export function Services({
  header,
  services,
}: {
  header: HeaderData;
  services: Service[];
}) {
  return (
    <Section id="services" ground="white">
      <div className="grid grid-cols-[.8fr_1.2fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-8">
        <div className="sticky top-[120px] flex flex-col gap-5 max-[900px]:static">
          {header.eyebrow ? <span className="eyebrow">{header.eyebrow}</span> : null}
          <h2 className="m-0 font-display text-h2 max-[767px]:text-[30px]">{header.heading}</h2>
          {header.lead ? (
            <p className="m-0 text-[17px] leading-relaxed text-slate">{header.lead}</p>
          ) : null}
          <Button href="/services" variant="secondary" className="mt-2 self-start">
            View all services
          </Button>
        </div>

        <div className="overflow-hidden rounded-card border border-rule bg-white">
          {services.map((service, i) => (
            <Link
              key={service._id}
              href="/services"
              className="group flex items-center gap-5 border-t border-rule px-6 py-6 transition-colors duration-200 first:border-t-0 hover:bg-bone max-[520px]:flex-col max-[520px]:items-start max-[520px]:gap-3"
            >
              <span className="w-7 shrink-0 font-mono text-[13px] font-medium tracking-[0.1em] text-brass">
                {String(i + 1).padStart(2, "0")}
              </span>
              <IconTile icon={service.icon} tile={46} size={20} />
              <span className="flex min-w-0 flex-1 flex-col gap-1">
                <span className="font-display text-[20px] font-semibold text-ink">
                  {service.title}
                </span>
                <span className="text-[15px] leading-relaxed text-slate">
                  {service.description}
                </span>
              </span>
              <LineIcon
                name="arrow-right"
                size={18}
                className="shrink-0 text-stroke transition-all duration-200 group-hover:translate-x-1 group-hover:text-brass max-[520px]:hidden"
              />
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}
