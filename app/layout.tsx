import type { Metadata } from "next";
import { playfair, inter, jetbrainsMono } from "@/lib/fonts";
import { siteIsLive, siteUrl } from "@/lib/seo/urls";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  // Belt and braces alongside robots.txt: a disallowed URL can still be
  // indexed if it is linked from elsewhere, whereas a noindex directive on the
  // page itself keeps it out of results. Applied unless the deployment is
  // explicitly marked live, so previews stay out of search by default.
  ...(siteIsLive ? {} : { robots: { index: false, follow: false } }),
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
