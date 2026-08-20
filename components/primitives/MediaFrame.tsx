import Image, { type StaticImageData } from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/cn";
import type { SanityImage } from "@/lib/types";

/**
 * Renders a Sanity image (LQIP blur) when present; otherwise a local static
 * `fallback` (stock photo, auto blur); otherwise a labelled placeholder frame.
 *
 * `zoom` scales the photo slowly on hover of an ancestor `.group`; `overlay`
 * lays a warm ink scrim over the lower half so captions and floating chips
 * keep their contrast against any photograph.
 */
export function MediaFrame({
  image,
  fallback,
  alt,
  placeholder,
  className,
  sizes = "(max-width: 767px) 100vw, 45vw",
  priority = false,
  zoom = false,
  overlay = false,
  fit = "cover",
  objectPosition,
  rounded = "rounded-panel",
}: {
  image?: SanityImage | null;
  fallback?: StaticImageData;
  alt?: string;
  placeholder?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  overlay?: boolean;
  fit?: "cover" | "contain";
  objectPosition?: string;
  rounded?: string;
}) {
  const builder = image?.src ? urlForImage(image) : null;
  const src = builder ? builder.width(1400).url() : image?.src ?? null;

  const frame = cn("relative overflow-hidden", rounded, className);
  const img = cn(
    fit === "cover" && "object-cover",
    zoom &&
      "transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] motion-reduce:transition-none motion-reduce:group-hover:scale-100",
  );

  const scrim = overlay ? (
    <>
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-ink/35 via-ink/[0.03] to-transparent"
      />
      {/* Warm light catching the top-left corner, matching the brand aura. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_8%_0%,rgba(201,162,39,0.22),rgba(201,162,39,0)_62%)] mix-blend-screen"
      />
    </>
  ) : null;

  if (src) {
    return (
      <div className={frame}>
        <Image
          src={src}
          alt={image?.alt ?? alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={image?.lqip ? "blur" : "empty"}
          blurDataURL={image?.lqip ?? undefined}
          className={img}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {scrim}
      </div>
    );
  }

  if (fallback) {
    return (
      <div className={frame}>
        <Image
          src={fallback}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          className={img}
          style={objectPosition ? { objectPosition } : undefined}
        />
        {scrim}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("aura-light flex items-center justify-center border border-rule", frame)}
    >
      <span className="spec-label max-w-[24ch] text-center leading-relaxed">
        {placeholder}
      </span>
    </div>
  );
}
