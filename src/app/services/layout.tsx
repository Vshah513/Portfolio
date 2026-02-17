import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Productized packages for landing pages, MVP sprints, and UI/UX upgrades. Fast, clear, and scope-driven.",
  openGraph: {
    title: "Services — Viraj Shah",
    description:
      "Productized packages for landing pages, MVP sprints, and UI/UX upgrades.",
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
