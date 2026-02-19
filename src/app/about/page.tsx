"use client";

import { motion } from "framer-motion";
import { personal } from "@/content/personal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-12" style={{ maxWidth: '48rem' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
        style={{ textAlign: 'center' }}
      >
        <span className="inline-block text-sm font-medium tracking-wider uppercase text-[var(--color-gold)]" style={{ display: 'block', marginBottom: '24px' }}>
          About
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-playfair), serif', marginBottom: '32px' }}
        >
          {personal.name}
        </h1>
        <div className="space-y-4" style={{ maxWidth: '42rem', marginLeft: 'auto', marginRight: 'auto' }}>
          {personal.bio.map((paragraph, i) => (
            <p key={i} className="text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3" style={{ marginTop: '40px', marginBottom: '80px', justifyContent: 'center' }}>
          <Button href={personal.resumeUrl} variant="primary" size="md">
            Download Resume
          </Button>
          <Button href={personal.linkedin} variant="secondary" size="md" external>
            LinkedIn
          </Button>
          <Button href={personal.github} variant="ghost" size="md" external>
            GitHub
          </Button>
        </div>
      </motion.div>

      {/* Capabilities */}
      <section className="mb-16">
        <SectionHeading title="Capabilities" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2"
          style={{ marginBottom: '80px' }}
        >
          {personal.capabilities.map((cap) => (
            <motion.div key={cap.category} variants={fadeUp}>
              <Card hover={false}>
                <h3 className="text-sm font-semibold tracking-wider uppercase text-[var(--color-gold)] mb-4">
                  {cap.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-white/5 text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Tools */}
      <section className="mb-16">
        <SectionHeading title="Tools & Technologies" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3"
          style={{ justifyContent: 'center', marginBottom: '80px' }}
        >
          {personal.tools.map((tool) => (
            <span
              key={tool}
              className="px-4 py-2 rounded-xl bg-white/5 border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)] hover:border-[var(--color-gold)]/30 hover:text-[var(--color-gold)] transition-colors cursor-default"
            >
              {tool}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Process */}
      <section className="mb-16">
        <SectionHeading title="My Process" />
        <div className="grid gap-6 md:grid-cols-3">
          {personal.process.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card hover={false}>
                <div className="w-10 h-10 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center mb-4">
                  <span className="text-sm font-bold text-[var(--color-gold)]">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
