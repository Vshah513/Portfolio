"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { personal } from "@/content/personal";
import { getFeaturedProjects } from "@/content/projects";
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

const proofItems = [
  { value: "2+", label: "Products Shipped" },
  { value: "Full-Stack", label: "End to End" },
  { value: "7-Day", label: "Launch Speed" },
];

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 3D layer — pinned behind all content */}
        <div className="absolute inset-0 z-0">
          <ShowroomScene />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)]/40 via-transparent to-[var(--color-bg)]" />
        </div>

        {/* Hero text — smaller so tiles stay visible behind */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl px-4 text-center"
        >
          <motion.div variants={fadeUp} className="mb-4">
            <Badge variant="gold">{personal.title}</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <span className="text-[var(--color-text-primary)]">I build products</span>
            <br />
            <span className="gradient-gold">people actually use.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 mx-auto max-w-lg text-base text-[var(--color-text-secondary)] leading-relaxed sm:text-lg"
          >
            Product engineer specializing in marketplaces, fintech, and
            data-rich applications. From concept to shipped &mdash; fast.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/work" variant="primary" size="lg">
              View My Work
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              Start a Project
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Everything below hero: normal flow, solid bg, above 3D ── */}
      <div className="relative z-10 bg-[var(--color-bg)]">

        {/* Proof Bar */}
        <section className="mx-auto max-w-4xl px-4 -mt-16" style={{ marginBottom: "160px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-strong rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-around gap-8"
          >
            {proofItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-2xl font-bold gradient-gold">{item.value}</div>
                <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Featured Exhibit */}
        <section
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{ paddingBottom: "180px" }}
        >
          <SectionHeading
            label="Featured Work"
            title="What I've Built"
            description="Interactive products with real users, real payments, and real complexity."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {featured.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card className="h-full flex flex-col">
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/[0.02]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-4xl font-bold gradient-gold opacity-30"
                        style={{ fontFamily: "var(--font-playfair), serif" }}
                      >
                        {project.title}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={project.status === "shipped" ? "status" : "gold"}>
                      {project.status === "shipped" ? "Shipped" : "In Progress"}
                    </Badge>
                    {project.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                    {project.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-6 flex-1">
                    {project.tagline}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    <Button href={`/work/${project.slug}`} variant="secondary" size="sm">
                      View Exhibit
                    </Button>
                    {project.links.live && (
                      <Button href={project.links.live} variant="ghost" size="sm" external>
                        Live Site &rarr;
                      </Button>
                    )}
                    {project.slices.length > 0 && (
                      <Button href={`/work/${project.slug}#demo`} variant="ghost" size="sm">
                        Try Demo
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How I Work */}
        <section
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
          style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
        >
          <SectionHeading
            label="Process"
            title="How I Work"
            description="Three phases. No bloat. You see progress every few days."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {personal.process.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Card hover={false} className="text-center relative overflow-hidden">
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
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
          style={{ marginTop: "220px", paddingBottom: "128px" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 md:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/5 to-transparent" />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Ready to build something?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
                I ship landing pages in 7 days and MVPs in 21. Let&apos;s talk about your project.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" variant="primary" size="lg">
                  Start a Project
                </Button>
                <Button href="/services" variant="secondary" size="lg">
                  View Packages
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </>
  );
}
