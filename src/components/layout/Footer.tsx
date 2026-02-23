import { personal } from "@/content/personal";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="border-t border-white/5" style={{ paddingTop: '60px', paddingBottom: '60px', marginTop: '80px' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          <Button href={personal.github} variant="secondary" size="sm" external>
            GitHub
          </Button>
          <Button href={personal.linkedin} variant="secondary" size="sm" external>
            LinkedIn
          </Button>
          <Button href={`mailto:${personal.email}`} variant="secondary" size="sm">
            Email
          </Button>
          {personal.resumeUrl && (
            <Button href={personal.resumeUrl} variant="ghost" size="sm" external>
              Download Resume
            </Button>
          )}
        </div>
        <div className="text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
