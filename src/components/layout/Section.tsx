import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Semantic section component for better HTML structure
 */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-20", className)}>
      {children}
    </section>
  );
}
