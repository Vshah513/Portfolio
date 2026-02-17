import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Viraj Shah — Product Engineer",
    template: "%s | Viraj Shah",
  },
  description:
    "I design, build, and ship products that people actually use. Full-stack product engineer specializing in marketplaces, fintech, and data-rich applications.",
  metadataBase: new URL("https://virajshah.dev"),
  openGraph: {
    title: "Viraj Shah — Product Engineer",
    description:
      "I design, build, and ship products that people actually use.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-[var(--color-bg)] text-[var(--color-text-primary)]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[var(--color-gold)] focus:text-[var(--color-bg)] focus:rounded-lg"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="min-h-screen pt-24">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
