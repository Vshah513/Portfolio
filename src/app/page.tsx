"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionShell } from "@/components/layout/SectionShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { personal } from "@/content/personal";
import { getFeaturedProjects } from "@/content/projects";
import { HeroDragHintProvider } from "@/contexts/HeroDragHintContext";
import { HeroDragHint } from "@/components/hero/HeroDragHint";
import dynamic from "next/dynamic";

const ShowroomScene = dynamic(
  () => import("@/components/three/ShowroomScene").then((mod) => mod.ShowroomScene),
  { ssr: false }
);

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const capabilityCards = [
  {
    title: "Product Engineering",
    lines: [
      "Design → build → deploy fast",
      "Clear scope, rapid iterations, production polish",
    ],
  },
  {
    title: "Frontend Systems",
    lines: [
      "Component architecture, state patterns",
      "Motion/interaction without jank",
    ],
  },
  {
    title: "Full-Stack Delivery",
    lines: [
      "Auth, database, APIs, dashboards",
      "Deployment + reliability basics",
    ],
  },
  {
    title: "Marketplace / Payments Patterns",
    lines: [
      "Listings, seller flows, pricing logic",
      "Payment-ready checkout patterns",
    ],
  },
];

const stackChips = [
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Supabase",
  "Postgres",
  "Framer Motion",
  "R3F/Drei",
  "Vercel",
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[75vh] lg:min-h-[80vh] flex items-center justify-center overflow-hidden pt-6 pb-32 md:pb-48">
        <HeroDragHintProvider>
          {/* 3D layer — behind everything */}
          <div className="absolute inset-0 z-0 pointer-events-auto" data-tour="hero-scene">
            <ShowroomScene />
          </div>
          {/* Vignette above 3D, below text */}
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/40 to-black/80 pointer-events-none"
            aria-hidden
          />

          {/* Drag hint — near orbiting cards, fades out after first drag/click (localStorage) */}
          <HeroDragHint />

          {/* Hero text — smaller so tiles stay visible */}
          <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-4 sm:px-5 text-center"
        >
          <motion.div variants={fadeUp} className="mb-3">
            <Badge variant="gold">{personal.title}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <span className="text-[var(--color-text-primary)]">I build products</span>
            <br />
            <span className="gradient-gold">people actually use.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-3 mx-auto max-w-lg text-sm text-[var(--color-text-secondary)] leading-relaxed sm:text-sm"
          >
            From concept to shipped &mdash; fast.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/work" variant="primary" size="lg">
              View My Work
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Start a Project
            </Button>
          </motion.div>
        </motion.div>
        </HeroDragHintProvider>
      </section>

      {/* ── Everything below hero: normal flow, solid bg, above 3D ── */}
      <div className="relative z-10 bg-[var(--color-bg)]">
        <div className="flex flex-col gap-24 md:gap-32">
          {/* S3: Featured Work */}
          <SectionShell id="work" className="border-b border-white/5 scroll-mt-24 !pt-20 md:!pt-24">
            <SectionHeading
              label="Featured Work"
              title="What I've Built"
              description="Interactive products with real users, real payments, and real complexity."
            />
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginBottom: '28px',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(201,168,76,0.35)',
                background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, rgba(0,0,0,0.5) 100%)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 0 20px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.15)',
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: '500',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.8)',
                }}>
                  Click any card to explore
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    color: '#C9A84C',
                    fontSize: '13px',
                    lineHeight: 1,
                  }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
            <div data-tour="work-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
              {featured.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  <Link href="/work" style={{ textDecoration: 'none', display: 'block' }}>
                    <Card className="h-full flex flex-col" hover={true}>
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/[0.02]">
                        {project.heroImage ? (
                          <>
                            <img
                              src={project.heroImage}
                              alt=""
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div
                              className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"
                              aria-hidden
                            />
                          </>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className="text-3xl font-bold gradient-gold opacity-30"
                              style={{ fontFamily: 'var(--font-playfair), serif' }}
                            >
                              {project.title}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={project.status === 'shipped' ? 'status' : 'gold'}>
                          {project.status === 'shipped' ? 'Shipped' : 'In Progress'}
                        </Badge>
                        {project.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag}>{tag}</Badge>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                        {project.title}
                      </h3>
                      <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
                        {project.tagline}
                      </p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </SectionShell>

          {/* S4: Process */}
          <SectionShell id="process" className="border-b border-white/5 scroll-mt-24">
            <SectionHeading
              label="Process"
              title="How I Work"
              description="Three phases. No bloat. You see progress every few days."
            />
            <div className="grid gap-8 md:grid-cols-3" style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {personal.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card hover={false} className="text-center relative overflow-hidden h-full">
                  <div
                    className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03]"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {step.step}
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-[var(--color-gold)]">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
            </div>
          </SectionShell>

          {/* S5: Capabilities */}
          <SectionShell id="capabilities" className="border-b border-white/5 scroll-mt-24">
            <SectionHeading
              label="Capabilities"
              title="What I Do"
              description="Product engineering with design polish and fast delivery."
            />
            <div className="grid gap-8 md:grid-cols-2" style={{ marginTop: '60px', maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {capabilityCards.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card hover={false} className="h-full">
                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                    {cap.title}
                  </h3>
                  <ul className="text-sm text-[var(--color-text-secondary)] leading-relaxed space-y-1">
                    {cap.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
            </div>
            <div style={{ marginTop: '60px' }}>
              <div className="flex flex-wrap gap-2" style={{ justifyContent: 'center' }}>
                {stackChips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 hover:border-[var(--color-gold)]/40 transition-colors"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4" style={{ marginTop: '48px', justifyContent: 'center' }}>
            <Button href={personal.github} variant="secondary" size="sm" external>
              GitHub
            </Button>
            <Button href={personal.linkedin} variant="secondary" size="sm" external>
              LinkedIn
            </Button>
            <Button href={`mailto:${personal.email}`} variant="secondary" size="sm">
              Email
            </Button>
            {personal.resumeUrl && (
              <Button href={personal.resumeUrl} variant="ghost" size="sm" external>
                Download Resume
              </Button>
            )}
            </div>
          </SectionShell>

        </div>
      </div>
    </>
  );
}
