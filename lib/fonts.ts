import { Fraunces, Inter } from "next/font/google";

// Display serif — variable, opsz axis exposed for editorial sizing.
export const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  variable: "--font-fraunces",
});

// Body sans.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
