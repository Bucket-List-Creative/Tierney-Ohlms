"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { question: string; answer: string };

/**
 * FAQ accordion. One panel open at a time, height animated with a grid-rows
 * transition (no measuring, no layout thrash). The +/− toggle is a two-stroke
 * glyph: the vertical bar rotates away as the panel opens, so the sign morphs
 * rather than swapping characters.
 */
export function Accordion({
  items,
  className,
}: {
  items: AccordionItem[];
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(1);
  const baseId = useId();

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-panel-${i}`;
        const btnId = `${baseId}-btn-${i}`;
        return (
          <div
            key={i}
            className={cn(
              "group border-b border-rule transition-[padding] duration-300 hover:pl-3",
            )}
          >
            <h3 className="m-0">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-[clamp(17px,1.5vw,20px)] font-medium text-ink transition-colors duration-300"
              >
                <span
                  className={cn(
                    "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen && "translate-x-1",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "relative grid h-7 w-7 shrink-0 place-items-center text-brass transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    isOpen && "rotate-180",
                  )}
                >
                  <span className="absolute h-[1.5px] w-3 rounded bg-current" />
                  <span
                    className={cn(
                      "absolute h-3 w-[1.5px] rounded bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                      isOpen ? "scale-y-0" : "scale-y-100",
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="m-0 max-w-[62ch] pb-5 text-[14.5px] leading-relaxed text-slate">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
