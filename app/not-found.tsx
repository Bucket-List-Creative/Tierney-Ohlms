import type { Metadata } from "next";
import { Button } from "@/components/primitives/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

/** 404 — the third moment the dark signature surface appears. */
export default function NotFound() {
  return (
    <main className="surface-dark flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="font-display text-[88px] leading-none text-white max-[767px]:text-[64px]">
        404
      </div>
      <h1 className="m-0 font-display text-[26px] font-medium text-white">
        This page has been reconciled elsewhere.
      </h1>
      <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-dark-body">
        The page you&rsquo;re looking for may have moved or no longer exists. Let&rsquo;s
        get you back on solid ground.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="inverse">
          Back to Home
        </Button>
        <Button
          href="/#contact"
          variant="inverse-outline"
          className="hover:border-gold"
        >
          Contact Us
        </Button>
      </div>
    </main>
  );
}
