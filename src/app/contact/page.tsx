"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { personal } from "@/content/personal";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, open mailto. Can be replaced with a form service later.
    const subject = encodeURIComponent(
      `New Project Inquiry: ${formState.projectType || "General"}`
    );
    const body = encodeURIComponent(
      `Name: ${formState.name}\nEmail: ${formState.email}\nProject Type: ${formState.projectType}\n\n${formState.message}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 pb-12" style={{ maxWidth: '48rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center' }}
      >
        <span className="inline-block text-sm font-medium tracking-wider uppercase text-[var(--color-gold)]" style={{ display: 'block', marginBottom: '24px' }}>
          Contact
        </span>
        <h1
          className="text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-playfair), serif', marginBottom: '32px' }}
        >
          Let&apos;s Build Something
        </h1>
        <p className="text-lg text-[var(--color-text-secondary)]" style={{ marginBottom: '16px' }}>
          Tell me about your project and I&apos;ll get back to you within 24 hours.
        </p>
        <p className="text-sm text-[var(--color-text-muted)]" style={{ marginBottom: '64px' }}>
          Or email me directly at{" "}
          <a
            href={`mailto:${personal.email}`}
            className="text-[var(--color-gold)] hover:underline"
          >
            {personal.email}
          </a>
        </p>
      </motion.div>

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[var(--color-gold)]/10 flex items-center justify-center">
            <span className="text-2xl text-[var(--color-gold)]">&#10003;</span>
          </div>
          <h2
            className="text-2xl font-bold text-[var(--color-text-primary)] mb-2"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Message Sent
          </h2>
          <p className="text-[var(--color-text-secondary)]">
            Your email client should have opened. I&apos;ll respond within 24 hours.
          </p>
        </motion.div>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-6"
          style={{ maxWidth: '40rem', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-none transition-colors"
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="projectType"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Project Type
            </label>
            <select
              id="projectType"
              value={formState.projectType}
              onChange={(e) =>
                setFormState({ ...formState, projectType: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] focus:border-[var(--color-gold)] focus:outline-none transition-colors appearance-none"
            >
              <option value="" className="bg-[var(--color-bg)]">Select a package...</option>
              <option value="Launch Landing" className="bg-[var(--color-bg)]">Launch Landing (7 days)</option>
              <option value="MVP Sprint" className="bg-[var(--color-bg)]">MVP Sprint (21 days)</option>
              <option value="UI/UX Upgrade" className="bg-[var(--color-bg)]">UI/UX Upgrade (10 days)</option>
              <option value="Custom" className="bg-[var(--color-bg)]">Custom Project</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2"
            >
              Tell me about your project
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formState.message}
              onChange={(e) =>
                setFormState({ ...formState, message: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-gold)] focus:outline-none transition-colors resize-none"
              placeholder="What are you building? What's the timeline? Any specific requirements?"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
              Send Message
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
