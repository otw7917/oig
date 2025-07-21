import { cn } from "@/lib/utils";

export interface ImageGridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: number;
  className?: string;
}

export function ImageGrid({ 
  children, 
  columns = 3, 
  gap = 8,
  className 
}: ImageGridProps) {
  return (
    <div 
      className={cn("w-full", className)}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap}px`,
      }}
    >
      {children}
    </div>
  );
}
