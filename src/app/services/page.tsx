"use client";

import { motion } from "framer-motion";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function ServicesPage() {
  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-12" style={{ maxWidth: '72rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <SectionHeading
          label="Services"
          title="How We Can Work Together"
          description="Productized packages so you know exactly what you're getting and when."
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto' }}>
        {services.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card hover={false} className="h-full flex flex-col relative overflow-hidden">
              {/* Timeline badge */}
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
                  {pkg.timeline}
                </span>
              </div>

              {/* Header */}
              <h3
                className="text-2xl font-bold text-[var(--color-text-primary)] mb-2"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                {pkg.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {pkg.description}
              </p>

              {/* Scope */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
                  Scope
                </h4>
                <ul className="space-y-2">
                  {pkg.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-gold)] mt-0.5">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deliverables */}
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
                  Deliverables
                </h4>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-gold)] mt-0.5">&#8226;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's needed */}
              <div className="mb-8 flex-1">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">
                  What I Need From You
                </h4>
                <ul className="space-y-2">
                  {pkg.clientNeeds.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-0.5">&#8594;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <Button href="/contact" variant="primary" className="w-full">
                Get a Quote
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Custom work note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-[var(--color-text-secondary)]">
          Need something different?{" "}
          <a
            href="/contact"
            className="text-[var(--color-gold)] hover:underline"
          >
            Let&apos;s talk about a custom scope.
          </a>
        </p>
      </motion.div>
    </div>
  );
}
