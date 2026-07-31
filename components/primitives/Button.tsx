import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "inline" | "inverse" | "inverse-outline";
export type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold whitespace-nowrap select-none transition-[background-image,border-color,background-color,color] duration-300 disabled:cursor-not-allowed disabled:bg-alabaster disabled:text-[#9a9a9a] disabled:border disabled:border-rule disabled:bg-none";

const sizes: Record<ButtonSize, string> = {
  md: "text-[15px] px-[30px] py-4 rounded-btn",
  sm: "text-sm px-[22px] py-3 rounded-btn",
};

const variants: Record<ButtonVariant, string> = {
  // Grain primary — aura enters upper-left, warms on hover (handled by .btn-grain)
  primary: "btn-grain",
  // Outline secondary — stroke darkens to ink on hover. Stays flat.
  secondary:
    "bg-white text-ink border border-stroke hover:border-ink transition-colors duration-200",
  // Gold-underline text link
  inline:
    "!px-0 !py-1.5 rounded-none text-ink border-b border-brass hover:border-ink bg-transparent transition-colors duration-200",
  // White button on dark surfaces
  inverse:
    "bg-white text-ink hover:bg-alabaster transition-colors duration-200",
  // Outlined button on dark surfaces
  "inverse-outline":
    "bg-transparent text-white border border-dark-border hover:border-white transition-colors duration-200",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type AsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type AsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const cls = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } = props;
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, type, ...rest } =
    props as AsButton;
  return (
    <button type={type ?? "button"} className={cls} {...rest}>
      {children}
    </button>
  );
}
