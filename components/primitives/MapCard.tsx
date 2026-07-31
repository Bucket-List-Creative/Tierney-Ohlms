import Image from "next/image";
import { LineIcon } from "@/components/icons/LineIcon";
import { cn } from "@/lib/cn";
import mapImage from "@/assets/map.png";

/**
 * Styled location map — a baked monochrome map (grayscale to match the
 * brand, single gold pin) that always renders. A floating chip shows the
 * address with a "Get directions" link out to the user's map app.
 */
export function MapCard({
  addressLine1,
  addressLine2,
  className,
}: {
  addressLine1: string;
  addressLine2: string;
  className?: string;
}) {
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${addressLine1}, ${addressLine2}`,
  )}`;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-card border border-rule bg-alabaster shadow-[var(--shadow-rest)]",
        className,
      )}
    >
      <Image
        src={mapImage}
        alt={`Map showing ${addressLine1}, ${addressLine2}`}
        fill
        sizes="(max-width: 767px) 100vw, 1240px"
        placeholder="blur"
        className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
      />

      {/* Address / directions chip */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 max-[420px]:flex-col max-[420px]:items-stretch">
        <div className="pointer-events-auto flex items-center gap-3 rounded-card border border-rule bg-white/95 px-4 py-3 shadow-[var(--shadow-hover)] backdrop-blur-sm">
          <span className="aura-light flex h-10 w-10 shrink-0 items-center justify-center rounded-btn border border-rule text-ink">
            <LineIcon name="location" size={18} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[14px] font-semibold text-ink">{addressLine1}</span>
            <span className="text-[13px] text-slate">{addressLine2}</span>
          </span>
        </div>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto inline-flex items-center gap-1.5 rounded-btn border border-ink bg-white/95 px-4 py-2.5 text-[13px] font-semibold text-ink shadow-[var(--shadow-hover)] backdrop-blur-sm transition-colors hover:bg-ink hover:text-white"
        >
          Get directions
          <LineIcon name="arrow-up-right" size={15} />
        </a>
      </div>
    </div>
  );
}
