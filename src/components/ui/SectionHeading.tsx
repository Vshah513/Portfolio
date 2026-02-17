"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="mb-3 inline-block text-sm font-medium tracking-wider uppercase text-[var(--color-gold)]">
          {label}
        </span>
      )}
      <h2
        className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-[var(--color-text-secondary)] mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
