import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Products I've designed, built, and shipped — interactive exhibits with live demos.",
  openGraph: {
    title: "Work — Viraj Shah",
    description:
      "Products I've designed, built, and shipped — interactive exhibits with live demos.",
  },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
