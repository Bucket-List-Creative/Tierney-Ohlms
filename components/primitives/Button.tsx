"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inline" | "inverse" | "inverse-outline";
export type ButtonSize = "md" | "sm";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none btn-press disabled:cursor-not-allowed disabled:bg-alabaster disabled:text-[#9a9a9a] disabled:border disabled:border-rule disabled:bg-none disabled:shadow-none disabled:hover:translate-y-0";

const sizes: Record<ButtonSize, string> = {
  md: "text-[15px] px-[30px] py-4 rounded-btn",
  sm: "text-sm px-[22px] py-3 rounded-btn",
};

const variants: Record<ButtonVariant, string> = {
  // Grain primary — aura enters upper-left, warms and lifts on hover (.btn-grain)
  primary: "btn-grain sheen",
  // Outline secondary — stroke darkens to ink, ground warms, faint gold halo.
  secondary:
    "bg-white/80 text-ink border border-stroke backdrop-blur-sm hover:border-ink hover:bg-white hover:shadow-[0_10px_30px_-14px_rgba(24,20,10,0.45)]",
  // Gold-underline text link
  inline:
    "!px-0 !py-1.5 rounded-none text-ink border-b border-brass hover:border-ink bg-transparent",
  // White button on dark surfaces
  inverse:
    "bg-white text-ink sheen hover:bg-alabaster hover:shadow-[0_14px_38px_-14px_rgba(201,162,39,0.65)]",
  // Outlined button on dark surfaces
  "inverse-outline":
    "bg-white/5 text-white border border-dark-border backdrop-blur-sm hover:border-gold hover:bg-white/10",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Swaps the label for a spinner and blocks interaction. */
  loading?: boolean;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type AsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

/** Expanding ring from the point of contact — the click's physical answer. */
function useRipple(variant: ButtonVariant) {
  const timers = useRef<number[]>([]);
  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (variant === "inline") return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const host = e.currentTarget;
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    const span = document.createElement("span");
    span.className = cn(
      "ripple",
      (variant === "secondary" || variant === "inverse") && "ripple-ink",
    );
    span.style.width = span.style.height = `${size}px`;
    span.style.left = `${e.clientX - r.left}px`;
    span.style.top = `${e.clientY - r.top}px`;
    host.appendChild(span);
    timers.current.push(
      window.setTimeout(() => {
        span.remove();
        timers.current.shift();
      }, 640),
    );
  };
  return onPointerDown;
}

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, loading = false, children } = props;
  const onPointerDown = useRipple(variant);
  const cls = cn(
    base,
    sizes[size],
    variants[variant],
    variant !== "inline" && "overflow-hidden",
    loading && "pointer-events-none",
    className,
  );

  const body = (
    <>
      <span
        className={cn(
          "inline-flex items-center gap-2 transition-opacity duration-200",
          loading && "opacity-0",
        )}
      >
        {children}
      </span>
      {loading ? (
        <span
          aria-hidden
          className="absolute inset-0 grid place-items-center"
        >
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" />
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const {
      variant: _v,
      size: _s,
      className: _c,
      children: _ch,
      loading: _l,
      href,
      ...rest
    } = props;
    return (
      <Link href={href} className={cls} onPointerDown={onPointerDown} {...rest}>
        {body}
      </Link>
    );
  }

  const {
    variant: _v,
    size: _s,
    className: _c,
    children: _ch,
    loading: _l,
    href: _h,
    type,
    disabled,
    ...rest
  } = props as AsButton;
  return (
    <button
      type={type ?? "button"}
      className={cls}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      onPointerDown={onPointerDown}
      {...rest}
    >
      {body}
    </button>
  );
}
