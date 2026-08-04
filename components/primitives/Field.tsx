import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Form primitives. Controls share `.field-control` from globals: 6px radius per
 * the brand guide, border darkening to ink on focus plus a soft gold focus
 * halo. The global focus-visible ring still applies for keyboard users.
 */
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
      className={cn(
        "group/field flex flex-col gap-2 text-sm font-semibold text-ink transition-colors duration-200 focus-within:text-brass",
        className,
      )}
    >
      {children}
    </label>
  );
}

export function Input({ className, ...rest }: ComponentProps<"input">) {
  return <input className={cn("field-control", className)} {...rest} />;
}

export function Textarea({ className, ...rest }: ComponentProps<"textarea">) {
  return <textarea className={cn("field-control resize-y", className)} {...rest} />;
}

export function Select({ className, children, ...rest }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn("field-control appearance-none pr-10", className)} {...rest}>
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </span>
    </div>
  );
}
