import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://card.lu-dun.com"),
  title: "Mike Lu | LUDUN Group",
  description: "Digital business card for Mike Lu, General Manager at LUDUN Group.",
  icons: {
    icon: "/ludun-logo.png",
    shortcut: "/ludun-logo.png",
  },
  openGraph: {
    title: "Mike Lu | LUDUN Group",
    description: "Connect with Mike Lu and save his contact details in one tap.",
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
    title: "Mike Lu | LUDUN Group",
    description: "Connect with Mike Lu and save his contact details in one tap.",
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
