"use client";

import { motion } from "framer-motion";
import { projects } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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
            <div style={{ position: 'relative', paddingBottom: '64px' }}>
              {/* The card itself */}
              <Card className="h-full flex flex-col">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-white/5 to-white/[0.02]">
                </div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant={project.status === 'shipped' ? 'status' : 'gold'}>
                    {project.status === 'shipped' ? 'Shipped' : 'In Progress'}
                  </Badge>
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                  {project.title}
                </h3>
                <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-4 flex-1">
                  {project.tagline}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded bg-white/5 text-[var(--color-text-muted)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>

              {/* Connector beam */}
              <div style={{
                position: 'absolute',
                bottom: '40px',
                left: '80px',
                width: '1px',
                height: '24px',
                background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), rgba(201,168,76,0))',
              }} />

              {/* Floating buttons */}
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  bottom: '0px',
                  left: '24px',
                  display: 'flex',
                  gap: '10px',
                  whiteSpace: 'nowrap',
                }}
              >
                <motion.a
                  href={`/work/${project.slug}`}
                  whileHover={{ scale: 1.08, rotateX: -6, rotateY: 4, y: -3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    border: '1px solid rgba(201,168,76,0.6)',
                    background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(0,0,0,0.8) 100%)',
                    color: '#C9A84C',
                    fontSize: '11px',
                    fontWeight: '600',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 20px rgba(201,168,76,0.15), 0 0 0 1px rgba(201,168,76,0.1), inset 0 1px 0 rgba(201,168,76,0.2)',
                    textDecoration: 'none',
                    transformStyle: 'preserve-3d',
                    perspective: '800px',
                    cursor: 'pointer',
                  }}
                >
                  View Exhibit →
                </motion.a>

                {project.links.live && (
                  <motion.a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, rotateX: -6, rotateY: -4, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      borderRadius: '10px',
                      border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(201,168,76,0.05)',
                      color: 'rgba(201,168,76,0.8)',
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 16px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.15)',
                      textDecoration: 'none',
                      transformStyle: 'preserve-3d',
                      perspective: '800px',
                      cursor: 'pointer',
                    }}
                  >
                    Live Site ↗
                  </motion.a>
                )}

                {project.slices.length > 0 && (
                  <motion.a
                    href={`/work/${project.slug}#demo`}
                    whileHover={{ scale: 1.08, rotateX: -6, rotateY: -4, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      borderRadius: '10px',
                      border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(201,168,76,0.05)',
                      color: 'rgba(201,168,76,0.8)',
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 16px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.15)',
                      textDecoration: 'none',
                      transformStyle: 'preserve-3d',
                      perspective: '800px',
                      cursor: 'pointer',
                    }}
                  >
                    Try Demo ✦
                  </motion.a>
                )}

                {project.links.repo && (
                  <motion.a
                    href={project.links.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.08, rotateX: -6, rotateY: -4, y: -3 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 18px',
                      borderRadius: '10px',
                      border: '1px solid rgba(201,168,76,0.3)',
                      background: 'rgba(201,168,76,0.05)',
                      color: 'rgba(201,168,76,0.8)',
                      fontSize: '11px',
                      fontWeight: '600',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      boxShadow: '0 4px 16px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.15)',
                      textDecoration: 'none',
                      transformStyle: 'preserve-3d',
                      perspective: '800px',
                      cursor: 'pointer',
                    }}
                  >
                    Source ↗
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
