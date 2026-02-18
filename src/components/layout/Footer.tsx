import { personal } from "@/content/personal";

export function Footer() {
  return (
    <footer className="border-t border-white/5" style={{ paddingTop: '60px', paddingBottom: '60px', marginTop: '80px' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {new Date().getFullYear()} {personal.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
