import type { ReactNode } from "react";

export default function SectionShell({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`mt-20 scroll-mt-28 border-t border-black/10 pt-14 ${className}`}>
      {children}
    </section>
  );
}
