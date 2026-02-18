"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function WorkPage() {
  const sorted = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
      <div style={{ paddingTop: '140px', textAlign: 'center', paddingBottom: '64px' }}>
        <SectionHeading
          label="Portfolio"
          title="My Work"
          description="Products I've designed, built, and shipped — each one a proof of concept in production."
        />
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2"
        style={{ marginTop: '48px' }}
      >
        {sorted.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <Card className="h-full flex flex-col">
              {/* Image area */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/[0.02]">
              </div>

              {/* Status + Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant={project.status === "shipped" ? "status" : "gold"}>
                  {project.status === "shipped" ? "Shipped" : "In Progress"}
                </Badge>
                {project.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>

              {/* Title + Tagline */}
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                {project.title}
              </h3>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 flex-1">
                {project.tagline}
              </p>

              {/* Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-0.5 rounded bg-white/5 text-[var(--color-text-muted)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* CTAs */}
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
                {project.links.repo && (
                  <Button href={project.links.repo} variant="ghost" size="sm" external>
                    Source
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
