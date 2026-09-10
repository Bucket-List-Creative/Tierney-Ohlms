"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inline" | "inverse" | "inverse-outline";
export type ButtonSize = "md" | "sm";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none btn-press disabled:cursor-not-allowed disabled:bg-alabaster disabled:text-[#9a9a9a] disabled:border disabled:border-rule disabled:bg-none disabled:shadow-none";

const sizes: Record<ButtonSize, string> = {
  md: "text-[15px] px-[30px] py-4 rounded-btn",
  sm: "text-sm px-[22px] py-3 rounded-btn",
};

const variants: Record<ButtonVariant, string> = {
  primary: "btn-grain",
  secondary: "bg-white/80 text-ink border border-stroke",
  inline: "!px-0 !py-1.5 rounded-none text-ink border-b border-brass bg-transparent",
  inverse: "bg-white text-ink",
  "inverse-outline": "bg-white/5 text-white border border-dark-border",
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

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, loading = false, children } = props;
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
      <Link href={href} className={cls} {...rest}>
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
      {...rest}
    >
      {body}
    </button>
  );
}
