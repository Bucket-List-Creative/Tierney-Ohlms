import { Poppins, JetBrains_Mono } from "next/font/google";

/**
 * Self-hosted via next/font (no render-blocking Google Fonts link). Each
 * exposes a CSS variable consumed by the Tailwind theme in globals.css.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});
