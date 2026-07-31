import { Section } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapCard } from "@/components/primitives/MapCard";
import { LineIcon } from "@/components/icons/LineIcon";
import type { IconKey } from "@/components/icons/registry";
import type { HomePage, SiteSettings } from "@/lib/types";

/**
 * Contact — one split card: a dark info panel (grain surface, inverse text,
 * contact rows) beside the light form. Stacks on mobile.
 */
export function Contact({
  contact,
  site,
}: {
  contact: HomePage["contact"];
  site: SiteSettings;
}) {
  const rows: { icon: IconKey; label: string; value: React.ReactNode }[] = [
    {
      icon: "phone",
      label: "Call us",
      value: (
        <a href={site.phoneHref} className="hover:text-gold">
          {site.phone}
        </a>
      ),
    },
    {
      icon: "mail",
      label: "Email us",
      value: (
        <a href={`mailto:${site.email}`} className="hover:text-gold">
          {site.email}
        </a>
      ),
    },
    {
      icon: "location",
      label: "Visit us",
      value: (
        <span>
          {site.addressLine1}
          <br />
          {site.addressLine2}
        </span>
      ),
    },
  ];
  if (site.hours) {
    rows.push({ icon: "clock", label: "Hours", value: <span>{site.hours}</span> });
  }

  return (
    <Section id="contact" ground="bone" ruleTop>
      <div className="grid grid-cols-[.92fr_1.08fr] overflow-hidden rounded-card border border-rule bg-white shadow-[var(--shadow-rest)] max-[860px]:grid-cols-1">
        {/* Dark info panel */}
        <div className="surface-dark flex flex-col gap-8 p-10 max-[767px]:p-7">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">
              {contact.eyebrow}
            </span>
            <h2 className="m-0 font-display text-[34px] font-medium leading-[1.15] text-white max-[767px]:text-[28px]">
              {contact.heading}
            </h2>
            {contact.lead ? (
              <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-dark-body">
                {contact.lead}
              </p>
            ) : null}
          </div>

          <ul className="m-0 mt-auto flex flex-col gap-4 p-0">
            {rows.map((row) => (
              <li key={row.label} className="flex list-none items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn border border-dark-border bg-white/5 text-white">
                  <LineIcon name={row.icon} size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dark-label">
                    {row.label}
                  </span>
                  <span className="text-[15px] leading-snug text-white">{row.value}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Light form panel */}
        <div className="bg-white">
          <ContactForm serviceOptions={contact.serviceOptions} embedded />
        </div>
      </div>

      <MapCard
        addressLine1={site.addressLine1}
        addressLine2={site.addressLine2}
        className="mt-6 h-[360px] w-full max-[767px]:h-[300px]"
      />
    </Section>
  );
}
