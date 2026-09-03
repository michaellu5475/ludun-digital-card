import type { Metadata, Viewport } from "next";
import "./globals.css";
import { absolutePageUrl, absoluteSiteUrl, publicSiteUrl } from "./lib/site-url";

export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL(`${publicSiteUrl}/`),
  title: "Mike Lu | LUDUN Group Digital Business Card",
  description: "Call, email, find an office, or save Mike Lu's contact details.",
  alternates: {
    canonical: absolutePageUrl("/"),
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: absoluteSiteUrl("/ludun-logo.png"),
    shortcut: absoluteSiteUrl("/ludun-logo.png"),
  },
  openGraph: {
    title: "Mike Lu | LUDUN Group Digital Business Card",
    description: "Call, email, find an office, or save Mike Lu's contact details.",
    type: "profile",
    url: absolutePageUrl("/"),
    images: [
      {
        url: absoluteSiteUrl("/og.png"),
        width: 1672,
        height: 941,
        alt: "LUDUN Digital Business Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike Lu | LUDUN Group Digital Business Card",
    description: "Call, email, find an office, or save Mike Lu's contact details.",
    images: [absoluteSiteUrl("/og.png")],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#102f5a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
