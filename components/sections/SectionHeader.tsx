import { cn } from "@/lib/cn";
import { Reveal } from "@/components/primitives/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { SectionHeader as SectionHeaderData } from "@/lib/types";

/**
 * Eyebrow → H2 → lead header block. Eyebrow is brass (never gold as text).
 * Measure caps at ~640px so headings don't run wide. The heading reveals word
 * by word; the eyebrow and lead follow it in.
 */
export function SectionHeader({
  data,
  className,
  align = "start",
  showEyebrowRule = true,
}: {
  data: SectionHeaderData;
  className?: string;
  align?: "start" | "center";
  showEyebrowRule?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex max-w-[640px] flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      {data.eyebrow ? (
        <Reveal variant={align === "center" ? "up" : "left"} duration={700}>
          <span
            className={cn(
              "eyebrow",
              align === "start" && showEyebrowRule && "eyebrow-rule",
            )}
          >
            {data.eyebrow}
          </span>
        </Reveal>
      ) : null}
      <TextReveal text={data.heading} className="m-0 font-display text-h2 text-ink" />
      {data.lead ? (
        <Reveal delay={160} duration={800}>
          <p className="m-0 text-lead leading-relaxed text-slate">{data.lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
