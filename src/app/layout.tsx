import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Archivo } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#070605",
};

export const metadata: Metadata = {
  title: {
    default: "Bureau of Cosmic Insignificance",
    template: "%s — Bureau of Cosmic Insignificance",
  },
  description:
    "Enter your age and receive an official existential dread report, including your probability of being a main character and how much the universe cares about your coffee order.",
  keywords: [
    "existential crisis generator",
    "cosmic insignificance",
    "existential dread report",
    "main character probability",
    "absurdist web app",
  ],
  applicationName: "Bureau of Cosmic Insignificance",
  authors: [
    {
      name: "Bureau of Cosmic Insignificance",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${mono.variable} ${archivo.variable}`}>
        {children}
      </body>
    </html>
  );
}
