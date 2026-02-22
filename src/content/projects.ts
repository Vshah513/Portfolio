export interface ProjectSlice {
  id: string;
  title: string;
  description: string;
}

export interface ProjectLinks {
  live?: string;
  repo?: string;
  caseStudy?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  status: "shipped" | "in-progress";
  featured: boolean;
  tags: string[];
  links: ProjectLinks;
  highlights: string[];
  stack: string[];
  constraints: string[];
  roadmap: string[];
  slices: ProjectSlice[];
  heroImage: string;
  screenshots: string[];
}

export const projects: Project[] = [
  {
    id: "outfittr",
    slug: "outfittr",
    title: "Outfittr",
    tagline: "Kenya's marketplace for secondhand fashion",
    description:
      "A full-featured fashion marketplace connecting buyers and sellers across Nairobi. Built for a mobile-dominant audience with M-Pesa as the primary payment method, Outfittr features swipe-based product discovery, real-time seller analytics, subscription tiers, and a trust system with reviews and vouches.",
    status: "shipped",
    featured: true,
    tags: ["marketplace", "mobile-first", "payments", "design"],
    links: {
      live: "https://outfittr-platform.vercel.app",
    },
    highlights: [
      "Full marketplace with buyer/seller flows",
      "M-Pesa payment integration via Paystack",
      "Swipe-based product discovery",
      "Seller analytics dashboard + subscription tiers",
      "Review & trust system with vouches",
      "Category browsing with advanced filters",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    constraints: [
      "Nairobi-first launch with Kenya-wide expansion planned",
      "Mobile-dominant audience requiring touch-first UX",
      "M-Pesa as primary payment — no card infrastructure assumed",
    ],
    roadmap: [
      "Kenya-wide expansion",
      "In-app messaging v2",
      "AI style recommendations",
      "Bundle deals & promotions",
    ],
    slices: [
      {
        id: "outfittr-swipe",
        title: "Swipe Discovery",
        description: "Experience the product discovery — swipe right to like, left to pass",
      },
    ],
    heroImage: "/Outfittr Logo.png",
    screenshots: [
      "/projects/outfittr/browse.jpg",
      "/projects/outfittr/product.jpg",
      "/projects/outfittr/seller.jpg",
    ],
  },
  {
    id: "cash-clarity",
    slug: "cash-clarity",
    title: "Cash Clarity",
    tagline: "Personal finance command center",
    description:
      "A comprehensive financial planning tool that gives you complete visibility into your money. Features a real-time dashboard, budget tracking with Sankey cash-flow diagrams, goal setting, and a suite of six financial calculators — from runway/burn analysis to life-event simulation.",
    status: "shipped",
    featured: true,
    tags: ["finance", "data-viz", "tools", "design"],
    links: {
      live: "https://cash-clarity-eta.vercel.app/",
      repo: "https://github.com/Vshah513/Financial-Planner",
    },
    highlights: [
      "Dashboard with real-time financial overview",
      "Budget tracking with Sankey cash-flow diagrams",
      "6 financial tools: runway calc, life-event simulator, savings optimizer, pricing/margin, tax reserve, monthly report",
      "CSV/Excel import & export",
      "Goal tracking with progress visualization",
      "Multi-account management",
    ],
    stack: ["Next.js", "TypeScript", "Supabase", "Recharts", "Nivo", "shadcn/ui"],
    constraints: [
      "Auth-gated — public demo mode planned",
      "Complex relational data across accounts, transactions, and goals",
      "Real-time calculations on large transaction datasets",
    ],
    roadmap: [
      "Public demo mode with sample data",
      "AI-powered financial insights",
      "Mobile companion app",
      "Bank account syncing",
    ],
    slices: [],
    heroImage: "/New New logo.png",
    screenshots: [
      "/New New logo.png",
      "/New New logo.png",
      "/New New logo.png",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
