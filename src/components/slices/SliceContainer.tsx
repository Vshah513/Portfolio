"use client";

import { Suspense, Component, type ReactNode } from "react";
import { getSliceComponent } from "./registry";

interface SliceContainerProps {
  sliceId: string;
  title: string;
  description: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SliceErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function SliceLoadingSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.02] p-8">
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-[var(--color-gold)]/30 border-t-[var(--color-gold)] animate-spin" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading demo...</p>
      </div>
    </div>
  );
}

function SliceErrorFallback() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.02] p-8">
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          Demo couldn&apos;t load. Try refreshing the page.
        </p>
      </div>
    </div>
  );
}

export function SliceContainer({ sliceId, title, description }: SliceContainerProps) {
  const SliceComponent = getSliceComponent(sliceId);

  if (!SliceComponent) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white/[0.02] overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {description}
          </p>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-[var(--color-gold)]/10 text-[var(--color-gold)] border border-[var(--color-gold)]/20">
          Interactive
        </span>
      </div>

      {/* Slice */}
      <div className="p-6">
        <SliceErrorBoundary fallback={<SliceErrorFallback />}>
          <Suspense fallback={<SliceLoadingSkeleton />}>
            <SliceComponent />
          </Suspense>
        </SliceErrorBoundary>
      </div>
    </div>
  );
}
