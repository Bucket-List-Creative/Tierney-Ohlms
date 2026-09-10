import { cn } from "@/lib/cn";

/** Interactive Google Maps embed, centered on the office's full address. */
export function MapCard({
  addressLine1,
  addressLine2,
  className,
}: {
  addressLine1: string;
  addressLine2: string;
  className?: string;
}) {
  const address = `${addressLine1}, ${addressLine2}`;
  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-panel border border-rule bg-alabaster shadow-[var(--shadow-rest)]",
        className,
      )}
    >
      <iframe
        src={embedUrl}
        title={`Google Maps: ${address}`}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
