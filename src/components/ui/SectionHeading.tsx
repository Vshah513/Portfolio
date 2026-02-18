'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        marginBottom: '80px',
        textAlign: 'center',
        maxWidth: '48rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '100%',
      }}
      className={cn(className)}
    >
      {label && (
        <span
          className='text-sm font-medium tracking-wider uppercase text-[var(--color-gold)]'
          style={{ display: 'block', marginBottom: '20px' }}
        >
          {label}
        </span>
      )}
      <h2
        className='text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl'
        style={{ fontFamily: 'var(--font-playfair), serif', marginBottom: '0px' }}
      >
        {title}
      </h2>
      {description && (
        <p
          className='text-lg text-[var(--color-text-secondary)]'
          style={{
            marginTop: '28px',
            maxWidth: '42rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: align === 'center' ? 'center' : 'left',
          }}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
