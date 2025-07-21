export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  createdAt: string;
  metadata?: {
    prompt?: string;
    size?: string;
    [key: string]: string | number | boolean;
  };
}

export interface ImageGalleryProps {
  /** 표시할 이미지 배열 */
  images: ImageItem[];
  
  /** 이미지 클릭 핸들러 */
  onImageClick?: (image: ImageItem, index: number) => void;
  
  /** 그리드 컬럼 수 (기본값: 3) */
  columns?: number;
  
  /** 이미지의 가로세로 비율 (기본값: 1) */
  aspectRatio?: number;
  
  /** 이미지 간 간격 (px 단위, 기본값: 8) */
  gap?: number;
  
  /** 로딩 상태 */
  isLoading?: boolean;
  
  /** 에러 상태 */
  error?: Error | null;
  
  /** 커스텀 이미지 렌더링 함수 */
  renderImage?: (image: ImageItem, index: number) => React.ReactNode;
}
