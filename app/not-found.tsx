import type { Metadata } from "next";
import { Button } from "@/components/primitives/Button";
import { Orb } from "@/components/layout/Section";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/primitives/Reveal";
import { LineIcon } from "@/components/icons/LineIcon";

export const metadata: Metadata = {
  title: "Page not found",
};

/** 404 — the dark signature surface, lit by the same aurora as the closing CTA. */
export default function NotFound() {
  return (
    <main className="atmos mesh-dark flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Orb
        tone="gold"
        drift="a"
        className="left-[12%] top-[-10%] h-[620px] w-[620px] opacity-70"
      />
      <Orb
        tone="gold"
        drift="b"
        className="bottom-[-16%] right-[6%] h-[520px] w-[520px] opacity-45 max-[767px]:hidden"
      />

      <div className="relative z-[1] flex flex-col items-center gap-6">
        <Reveal variant="scale" duration={900}>
          <div className="font-display text-[96px] leading-none text-white max-[767px]:text-[64px]">
            404
          </div>
        </Reveal>
        <Reveal delay={120} duration={800}>
          <h1 className="m-0 font-display text-[26px] font-medium text-white">
            This page has been reconciled elsewhere.
          </h1>
        </Reveal>
        <Reveal delay={220} duration={800}>
          <p className="m-0 max-w-[40ch] text-[15px] leading-relaxed text-dark-body">
            The page you&rsquo;re looking for may have moved or no longer exists. Let&rsquo;s
            get you back on solid ground.
          </p>
        </Reveal>
        <Reveal delay={320} duration={800} className="mt-2">
          <div className="flex flex-wrap justify-center gap-4">
            <Magnetic strength={0.24}>
              <Button href="/" variant="inverse">
                Back to Home
                <LineIcon
                  name="arrow-right"
                  size={17}
                  className="transition-transform duration-300 group-hover/btn:translate-x-1"
                />
              </Button>
            </Magnetic>
            <Button href="/#contact" variant="inverse-outline">
              Contact Us
            </Button>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
