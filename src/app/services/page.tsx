"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

      {/* Desktop grid */}
      <div
        className="hidden md:grid"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', maxWidth: '72rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {services.map((pkg, i) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card hover={false} className="h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-6 right-6">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
                  {pkg.timeline}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {pkg.title}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">{pkg.description}</p>
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">Scope</h4>
                <ul className="space-y-2">
                  {pkg.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-gold)] mt-0.5">&#10003;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-6">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">Deliverables</h4>
                <ul className="space-y-2">
                  {pkg.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                      <span className="text-[var(--color-gold)] mt-0.5">&#8226;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8 flex-1">
                <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">What I Need From You</h4>
                <ul className="space-y-2">
                  {pkg.clientNeeds.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                      <span className="mt-0.5">&#8594;</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <Button href="/contact" variant="primary" className="w-full">Get a Quote</Button>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mobile carousel */}
      <MobileServicesCarousel services={services} />

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

function MobileServicesCarousel({ services }: { services: typeof import('@/content/services').services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pkg = services[activeIndex];

  return (
    <div className="md:hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Card hover={false} className="flex flex-col relative overflow-hidden">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-playfair), serif' }}>
                {pkg.title}
              </h3>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20 ml-3 shrink-0">
                {pkg.timeline}
              </span>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">{pkg.description}</p>
            <div className="mb-5">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">Scope</h4>
              <ul className="space-y-2">
                {pkg.scope.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-gold)] mt-0.5">&#10003;</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">Deliverables</h4>
              <ul className="space-y-2">
                {pkg.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="text-[var(--color-gold)] mt-0.5">&#8226;</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-8">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text-muted)] mb-3">What I Need From You</h4>
              <ul className="space-y-2">
                {pkg.clientNeeds.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)]">
                    <span className="mt-0.5">&#8594;</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <Button href="/contact" variant="primary" className="w-full">Get a Quote</Button>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginTop: '24px' }}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveIndex((i) => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.06)',
            color: activeIndex === 0 ? 'rgba(201,168,76,0.2)' : '#C9A84C',
            fontSize: '16px', cursor: activeIndex === 0 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >←</motion.button>

        <div style={{ display: 'flex', gap: '8px' }}>
          {services.map((_, i) => (
            <div key={i} onClick={() => setActiveIndex(i)} style={{
              width: i === activeIndex ? '20px' : '6px', height: '6px',
              borderRadius: '999px',
              background: i === activeIndex ? '#C9A84C' : 'rgba(201,168,76,0.25)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }} />
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setActiveIndex((i) => Math.min(services.length - 1, i + 1))}
          disabled={activeIndex === services.length - 1}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            border: '1px solid rgba(201,168,76,0.4)',
            background: 'rgba(201,168,76,0.06)',
            color: activeIndex === services.length - 1 ? 'rgba(201,168,76,0.2)' : '#C9A84C',
            fontSize: '16px', cursor: activeIndex === services.length - 1 ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >→</motion.button>
      </div>
    </div>
  );
}
