import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's build something together. Tell me about your project and I'll get back within 24 hours.",
  openGraph: {
    title: "Contact — Viraj Shah",
    description:
      "Let's build something together. Tell me about your project.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
