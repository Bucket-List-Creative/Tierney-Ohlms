import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font (no render-blocking Google Fonts link). Each
 * exposes a CSS variable consumed by the Tailwind theme in globals.css.
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
