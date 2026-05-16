import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { site } from "@/lib/content";
import { fraunces, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  // Custom domain still to be decided — placeholder for absolute OG URLs.
  metadataBase: new URL("https://blakesmith.com"),
  title: {
    default: "Blake Smith — Builder, Charlotte NC",
    template: "%s — Blake Smith",
  },
  description: site.description,
  openGraph: {
    title: "Blake Smith",
    description: site.description,
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blake Smith",
    description: site.description,
    images: ["/og.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-canvas text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
