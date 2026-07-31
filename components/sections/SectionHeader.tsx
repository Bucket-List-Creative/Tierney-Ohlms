import { cn } from "@/lib/cn";
import type { SectionHeader as SectionHeaderData } from "@/lib/types";

/**
 * Eyebrow → H2 → lead header block. Eyebrow is brass (never gold as text).
 * Measure caps at ~640px so headings don't run wide.
 */
export function SectionHeader({
  data,
  className,
  align = "start",
}: {
  data: SectionHeaderData;
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "flex max-w-[640px] flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {data.eyebrow ? <span className="eyebrow">{data.eyebrow}</span> : null}
      <h2 className="m-0 font-display text-h2 max-[767px]:text-[30px]">{data.heading}</h2>
      {data.lead ? (
        <p className="m-0 text-[17px] leading-relaxed text-slate">{data.lead}</p>
      ) : null}
    </div>
  );
}
