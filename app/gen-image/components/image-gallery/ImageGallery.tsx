import { Skeleton } from "@/components/ui/skeleton";
import { ImageCard } from "./ImageCard";
import { ImageGrid } from "./ImageGrid";
import { ImageGalleryProps } from "./types";

export function ImageGallery({
  images = [],
  onImageClick,
  columns = 3,
  aspectRatio = 1,
  gap = 8,
  isLoading = false,
  error = null,
  renderImage,
}: ImageGalleryProps) {
  // 로딩 상태일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <ImageGrid columns={columns} gap={gap}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton 
            key={i} 
            className="w-full" 
            style={{ 
              aspectRatio: aspectRatio,
              borderRadius: '0.5rem'
            }} 
          />
        ))}
      </ImageGrid>
    );
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
        <p>이미지를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  // 이미지가 없을 때
  if (images.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center rounded-lg bg-muted">
        <p className="text-muted-foreground">표시할 이미지가 없습니다.</p>
      </div>
    );
  }

  return (
    <ImageGrid columns={columns} gap={gap}>
      {images.map((image, index) => {
        // 커스텀 렌더링 함수가 있으면 사용
        if (renderImage) {
          return (
            <div key={image.id} onClick={() => onImageClick?.(image, index)}>
              {renderImage(image, index)}
            </div>
          );
        }

        // 기본 렌더링
        return (
          <ImageCard
            key={image.id}
            image={image}
            aspectRatio={aspectRatio}
            onClick={() => onImageClick?.(image, index)}
          />
        );
      })}
    </ImageGrid>
  );
}
