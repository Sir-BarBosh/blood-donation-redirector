import type { Metadata } from "next";
import { Geist, Geist_Mono, Gluten } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const gluten = Gluten({
  variable: "--font-gluten",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blood.barbosh.net"), 
  robots: {
    index: false,
    follow: false,
  },
  title: "Blood Donation Redirector",
  description: "Redirecting you to your local blood donation website.",
  openGraph: {
    title: "Blood Donation Redirector",
    description: "Find your local blood donation site quickly and easily.",
    url: "/", 
    siteName: "Blood Donation Redirector",
    images: [
      {
        url: "/icon.svg", 
        width: 64,
        height: 64,
        alt: "Blood Drop Icon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blood Donation Redirector",
    description: "Find your local blood donation site quickly and easily.",
    images: ["/icon.svg"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${gluten.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
