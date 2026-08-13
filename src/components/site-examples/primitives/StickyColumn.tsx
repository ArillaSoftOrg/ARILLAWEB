import type { ReactNode } from "react";

export default function StickyColumn({ children }: { children: ReactNode }) {
  return <div className="lg:sticky lg:top-32">{children}</div>;
}
