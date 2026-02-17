"use client";

import { motion } from "framer-motion";
import { Project } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SliceContainer } from "@/components/slices/SliceContainer";

interface ExhibitContentProps {
  project: Project;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function ExhibitContent({ project }: ExhibitContentProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-white/5 to-white/[0.02] border border-[var(--color-border)]"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-6xl md:text-8xl font-bold gradient-gold opacity-20"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {project.title}
          </span>
        </div>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-12"
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={project.status === "shipped" ? "status" : "gold"}>
            {project.status === "shipped" ? "Shipped" : "In Progress"}
          </Badge>
          {project.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>

        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-4"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {project.title}
        </h1>

        <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-3 mt-6">
          {project.links.live && (
            <Button href={project.links.live} variant="primary" size="md" external>
              Visit Live Site
            </Button>
          )}
          {project.links.repo && (
            <Button href={project.links.repo} variant="secondary" size="md" external>
              View Source
            </Button>
          )}
        </div>
      </motion.div>

      {/* What I Built */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <SectionHeading title="What I Built" align="left" className="mb-8" />
        <div className="grid gap-3 sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <motion.div
              key={highlight}
              variants={fadeUp}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-[var(--color-border)]"
            >
              <span className="mt-0.5 text-[var(--color-gold)]">&#10003;</span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {highlight}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <SectionHeading title="Tech Stack" align="left" className="mb-8" />
        <div className="flex flex-wrap gap-3">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-gold)]/30 hover:text-[var(--color-gold)] transition-colors cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Constraints + Decisions */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-16"
      >
        <SectionHeading
          title="Constraints & Decisions"
          align="left"
          className="mb-8"
        />
        <div className="space-y-3">
          {project.constraints.map((constraint) => (
            <div
              key={constraint}
              className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-[var(--color-border)]"
            >
              <span className="mt-0.5 text-[var(--color-gold)] text-sm">&#9670;</span>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {constraint}
              </span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Roadmap */}
      {project.roadmap.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionHeading title="Roadmap" align="left" className="mb-8" />
          <div className="space-y-3">
            {project.roadmap.map((item, i) => (
              <div
                key={item}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-[var(--color-border)]"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center text-xs font-bold text-[var(--color-gold)]">
                  {i + 1}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Interactive Slices */}
      {project.slices.length > 0 && (
        <section id="demo" className="mb-16 scroll-mt-32">
          <SectionHeading
            label="Interactive Demo"
            title="Try It Yourself"
            description="Experience a slice of the product, right here."
            align="left"
            className="mb-8"
          />
          <div className="space-y-8">
            {project.slices.map((slice) => (
              <SliceContainer key={slice.id} sliceId={slice.id} title={slice.title} description={slice.description} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
