import type { Metadata } from "next";
import { playfair, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://tierneyohlms.com",
  ),
  title: {
    default: "Tierney & Ohlms | Accounting & Advisory",
    template: "%s · Tierney & Ohlms",
  },
  description:
    "Precise accounting, proactive tax strategy, and financial insight for businesses and individuals. A partner, not just an accountant.",
  openGraph: {
    type: "website",
    siteName: "Tierney & Ohlms",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Scroll entrances are inline-styled from the client. Without JS they
            would never resolve, so force every one of them to its final state. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
