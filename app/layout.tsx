import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ludun-mike-digital-card.mike020124.chatgpt.site"),
  title: "Mike Lu | LUDUN Group Digital Business Card",
  description: "Call, email, find an office, or save Mike Lu's contact details.",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  icons: {
    icon: "/ludun-logo.png",
    shortcut: "/ludun-logo.png",
  },
  openGraph: {
    title: "Mike Lu | LUDUN Group Digital Business Card",
    description: "Call, email, find an office, or save Mike Lu's contact details.",
    type: "profile",
    url: "/",
    images: [
      {
        url: "/og.png",
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
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#10251b",
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
