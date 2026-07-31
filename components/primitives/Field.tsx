import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Form primitives. Inputs use the 6px radius from the brand guide (the
 * homepage prototype showed 10px — the guide wins). Focus shows an ink ring
 * via the global focus-visible rule; the border also darkens to ink.
 */
const controlBase =
  "w-full border border-stroke rounded-input px-[14px] py-[13px] text-[15px] font-normal bg-white text-ink outline-none transition-colors duration-200 focus:border-ink";

export function Label({
  children,
  htmlFor,
  className,
}: {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("flex flex-col gap-2 text-sm font-semibold text-ink", className)}
    >
      {children}
    </label>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn(controlBase, className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlBase, "resize-y", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <select className={cn(controlBase, className)} {...rest}>
      {children}
    </select>
  );
}
