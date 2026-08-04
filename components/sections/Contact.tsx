import { Section, Orb } from "@/components/layout/Section";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapCard } from "@/components/primitives/MapCard";
import { LineIcon } from "@/components/icons/LineIcon";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Spotlight } from "@/components/motion/Spotlight";
import type { IconKey } from "@/components/icons/registry";
import type { HomePage, SiteSettings } from "@/lib/types";

/**
 * Contact — one split panel: a dark info side (grain surface, contact rows
 * that warm on hover) beside the light form. Stacks on mobile.
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
        <a href={site.phoneHref} className="link-line hover:text-gold">
          {site.phone}
        </a>
      ),
    },
    {
      icon: "mail",
      label: "Email us",
      value: (
        <a href={`mailto:${site.email}`} className="link-line hover:text-gold">
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
    <Section
      id="contact"
      ground="bone"
      ruleTop
      atmosphere={
        <>
          <Orb
            tone="gold"
            drift="b"
            className="-left-[14%] top-[6%] h-[540px] w-[540px] opacity-60 max-[900px]:hidden"
          />
          <Orb tone="bone" className="-right-[12%] bottom-[2%] h-[520px] w-[520px] max-[900px]:hidden" />
        </>
      }
    >
      <Reveal variant="blur" duration={900}>
        <div className="grid grid-cols-[.92fr_1.08fr] overflow-hidden rounded-panel border border-rule bg-white shadow-[var(--shadow-float)] max-[860px]:grid-cols-1">
          {/* Dark info panel */}
          <Spotlight dark className="surface-dark flex flex-col gap-8 p-10 max-[767px]:p-7">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-gold">
                {contact.eyebrow}
              </span>
              <TextReveal
                text={contact.heading}
                className="m-0 font-display text-[34px] font-medium leading-[1.15] text-white max-[767px]:text-[28px]"
              />
              {contact.lead ? (
                <Reveal delay={140} duration={800}>
                  <p className="m-0 max-w-[42ch] text-[15px] leading-relaxed text-dark-body">
                    {contact.lead}
                  </p>
                </Reveal>
              ) : null}
            </div>

            <ul className="m-0 mt-auto flex flex-col gap-4 p-0">
              {rows.map((row, i) => (
                <Reveal as="li" key={row.label} delay={200 + i * 90} duration={700}>
                  <span className="group flex list-none items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-btn border border-dark-border bg-white/5 text-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:border-gold/60 group-hover:bg-gold/10 group-hover:text-gold">
                      <LineIcon name={row.icon} size={18} />
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-dark-label">
                        {row.label}
                      </span>
                      <span className="text-[15px] leading-snug text-white">{row.value}</span>
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </Spotlight>

          {/* Light form panel */}
          <div className="bg-white">
            <ContactForm
              serviceOptions={contact.serviceOptions}
              contactEmail={site.email}
              embedded
            />
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} duration={900}>
        <MapCard
          addressLine1={site.addressLine1}
          addressLine2={site.addressLine2}
          className="mt-6 h-[360px] w-full max-[767px]:h-[300px]"
        />
      </Reveal>
    </Section>
  );
}
