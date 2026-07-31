import Image, { type StaticImageData } from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/cn";
import type { SanityImage } from "@/lib/types";

/**
 * Renders a Sanity image (LQIP blur) when present; otherwise a local static
 * `fallback` (stock photo, auto blur); otherwise a labelled placeholder frame.
 */
export function MediaFrame({
  image,
  fallback,
  alt,
  placeholder,
  className,
  sizes = "(max-width: 767px) 100vw, 45vw",
  priority = false,
}: {
  image?: SanityImage | null;
  fallback?: StaticImageData;
  alt?: string;
  placeholder?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const builder = image?.src ? urlForImage(image) : null;
  const src = builder ? builder.width(1400).url() : image?.src ?? null;

  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded-card", className)}>
        <Image
          src={src}
          alt={image?.alt ?? alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image?.lqip ? "blur" : "empty"}
          blurDataURL={image?.lqip ?? undefined}
          className="object-cover"
        />
      </div>
    );
  }

  if (fallback) {
    return (
      <div className={cn("relative overflow-hidden rounded-card", className)}>
        <Image
          src={fallback}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn(
        "aura-light flex items-center justify-center rounded-card border border-rule",
        className,
      )}
    >
      <span className="spec-label max-w-[24ch] text-center leading-relaxed">
        {placeholder}
      </span>
    </div>
  );
}
