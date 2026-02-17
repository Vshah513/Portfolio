export const personal = {
  name: "Viraj Shah",
  title: "Product Engineer",
  tagline: "I design, build, and ship products that people actually use.",
  email: "viraj@example.com",
  linkedin: "https://linkedin.com/in/virajshah",
  github: "https://github.com/Vshah513",
  resumeUrl: "/resume.pdf",
  location: "Nairobi, Kenya",

  bio: [
    "I'm a product engineer who moves fast from concept to shipped product. I design interfaces, architect systems, and write the code — end to end.",
    "My work spans marketplaces, fintech tools, and data-rich applications. I care about speed, design quality, and building things that solve real problems for real people.",
  ],

  capabilities: [
    {
      category: "Design",
      skills: ["UI/UX Design", "Responsive Layouts", "Design Systems", "Prototyping"],
    },
    {
      category: "Frontend",
      skills: ["React / Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Supabase / PostgreSQL", "REST APIs", "Authentication"],
    },
    {
      category: "DevOps",
      skills: ["Vercel", "CI/CD", "Performance Optimization", "SEO"],
    },
  ],

  tools: [
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Supabase",
    "PostgreSQL",
    "Framer Motion",
    "Three.js",
    "Vercel",
    "Git",
    "Figma",
  ],

  process: [
    {
      step: 1,
      title: "Discovery",
      description: "Understand the problem, define scope, and align on what success looks like.",
    },
    {
      step: 2,
      title: "Build",
      description: "Design and develop in rapid iterations. You see progress every few days, not weeks.",
    },
    {
      step: 3,
      title: "Ship",
      description: "Deploy to production, optimize performance, and hand off a polished product.",
    },
  ],
} as const;
