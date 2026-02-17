export interface ServicePackage {
  id: string;
  title: string;
  timeline: string;
  description: string;
  scope: string[];
  deliverables: string[];
  clientNeeds: string[];
}

export const services: ServicePackage[] = [
  {
    id: "launch-landing",
    title: "Launch Landing",
    timeline: "7 days",
    description:
      "A polished, production-ready landing site designed and built from scratch. Perfect for validating ideas, launching products, or establishing a web presence fast.",
    scope: [
      "1–3 custom pages",
      "Responsive design + build",
      "SEO baseline & analytics setup",
      "Contact capture form",
      "Deployed live on Vercel",
    ],
    deliverables: [
      "Design-in-code (no separate Figma handoff needed)",
      "Live deployment with custom domain",
      "Performance-optimized (90+ Lighthouse)",
      "Source code ownership",
    ],
    clientNeeds: [
      "Brand assets (logo, colors, copy) or direction",
      "Content for each page",
      "Domain name (if applicable)",
    ],
  },
  {
    id: "mvp-sprint",
    title: "MVP Sprint",
    timeline: "21 days",
    description:
      "A functional product with one core workflow — from browse to action. Ideal for marketplaces, SaaS tools, or internal apps that need to ship fast and iterate.",
    scope: [
      "1 core user workflow end-to-end",
      "Authentication (optional)",
      "Admin-lite dashboard (optional)",
      "Database design & API",
      "Performance + basic testing",
    ],
    deliverables: [
      "Full-stack application deployed on Vercel",
      "Database provisioned (Supabase / Postgres)",
      "Auth flow if needed",
      "Source code + documentation",
    ],
    clientNeeds: [
      "Clear problem statement & user flow",
      "Access to any existing APIs/data",
      "Availability for 2–3 feedback rounds",
    ],
  },
  {
    id: "ui-ux-upgrade",
    title: "UI/UX Upgrade",
    timeline: "10 days",
    description:
      "Redesign and modernize an existing application. Component cleanup, performance improvements, and a fresh visual identity — without rebuilding from scratch.",
    scope: [
      "Visual redesign of existing app",
      "Component library cleanup",
      "Performance improvements",
      "Responsive refinements",
      "Accessibility pass",
    ],
    deliverables: [
      "Redesigned UI merged into codebase",
      "Reusable component system",
      "Performance audit & improvements",
      "Before/after documentation",
    ],
    clientNeeds: [
      "Access to existing codebase",
      "List of pain points / priority pages",
      "Brand guidelines (if any)",
    ],
  },
];
