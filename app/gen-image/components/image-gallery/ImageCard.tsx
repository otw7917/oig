import { cn } from "@/lib/utils";
import { ImageItem } from "./types";
import Image from "next/image";

export interface ImageCardProps {
  image: ImageItem;
  aspectRatio?: number;
  className?: string;
  onClick?: () => void;
}

export function ImageCard({ 
  image, 
  aspectRatio = 1, 
  className,
  onClick 
}: ImageCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg bg-muted transition-all hover:opacity-90",
        className
      )}
      onClick={onClick}
    >
      <div 
        className="w-full" 
        style={{ 
          paddingBottom: `${100 / aspectRatio}%`,
          position: 'relative'
        }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* 이미지 하단에 프롬프트와 날짜 표시 */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        {image.metadata?.prompt && (
          <p className="text-xs text-white mb-1 line-clamp-2">
            {image.metadata.prompt}
          </p>
        )}
        <p className="text-xs text-white/70">
          {new Date(image.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
