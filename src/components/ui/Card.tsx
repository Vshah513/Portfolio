"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={onClick}
      className={cn(
        "glass rounded-2xl p-6 transition-colors duration-300",
        hover && "cursor-pointer hover:border-[var(--color-gold)]/30",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
