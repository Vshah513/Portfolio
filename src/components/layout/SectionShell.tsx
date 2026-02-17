import React from "react";

type Props = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

export function SectionShell({ id, className = "", children }: Props) {
  return (
    <section id={id} className={`w-full py-16 md:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
