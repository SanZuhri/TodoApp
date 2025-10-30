import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  size?: "tight" | "comfortable" | "wide" | "full";
  className?: string;
}

/**
 * Responsive container component with size variants
 */
export function Container({ 
  children, 
  size = "comfortable",
  className 
}: ContainerProps) {
  const sizeClasses = {
    tight: "container-tight",
    comfortable: "container-comfortable",
    wide: "container-wide",
    full: "w-full px-4",
  };

  return (
    <div className={cn(sizeClasses[size], className)}>
      {children}
    </div>
  );
}
