import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://card.lu-dun.com"),
  title: "Three Digital Card Concepts | LUDUN Group",
  description: "Compare three digital business card experiences for Mike Lu.",
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
    title: "Three Digital Card Concepts | LUDUN Group",
    description: "Compare three ways to view, use, and save Mike Lu's contact details.",
    type: "profile",
    images: [
      {
        url: "/og.png",
        width: 1680,
        height: 945,
        alt: "LUDUN Digital Business Card",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Three Digital Card Concepts | LUDUN Group",
    description: "Compare three ways to view, use, and save Mike Lu's contact details.",
    images: ["/og.png"],
  },
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
