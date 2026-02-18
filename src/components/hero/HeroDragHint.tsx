"use client";

import { motion } from "framer-motion";
import { useHeroDragHint } from "@/contexts/HeroDragHintContext";

/** Hand/grab cursor icon — matches gold accent */
function GrabIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
      <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </svg>
  );
}

export function HeroDragHint() {
  const ctx = useHeroDragHint();
  if (!ctx) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: ctx.showHint ? 1 : 0, scale: ctx.showHint ? 1 : 0.8 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute z-[50] pointer-events-none"
      style={{ top: "18%", right: "8%", left: "auto" }}
      aria-hidden
    >
      <div className="relative flex items-center justify-center w-14 h-14">
        {/* Outer pulse ring 1 */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.6)" }}
          animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Outer pulse ring 2 — offset delay */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: "1px solid rgba(201,168,76,0.4)" }}
          animate={{ scale: [1, 2.2], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
        />
        {/* Core circle */}
        <div
          className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full"
          style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.15) 0%, rgba(0,0,0,0.8) 100%)",
            border: "1px solid rgba(201,168,76,0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: "0 0 16px rgba(201,168,76,0.2), inset 0 1px 0 rgba(201,168,76,0.3)",
          }}
        >
          <GrabIcon className="w-4 h-4 text-[#C9A84C]" />
        </div>
        {/* Label below */}
        <motion.span
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap tracking-widest uppercase"
          style={{
            fontSize: "8px",
            color: "rgba(201,168,76,0.7)",
            letterSpacing: "0.18em",
          }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          drag cards
        </motion.span>
      </div>
    </motion.div>
  );
}
