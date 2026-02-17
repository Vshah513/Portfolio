import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product engineer specializing in marketplaces, fintech, and data-rich applications. Full-stack, end-to-end.",
  openGraph: {
    title: "About — Viraj Shah",
    description:
      "Product engineer specializing in marketplaces, fintech, and data-rich applications.",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
