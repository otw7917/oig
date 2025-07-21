"use client";

import { useState, useEffect } from "react";
import ChatComposer from "../components/chat/ChatComposer";
import ImageViewer from "./ImageViewer";
import { ImageGallery } from "./components/image-gallery";
import { ImageItem } from "./components/image-gallery/types";

function GenImageHome() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: message }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "이미지 생성 실패");
      }

      // 먼저 ImageViewer에 표시
      setImageSrc(data.imageUrl);
      
      // 그 다음에 목록 새로고침
      await loadExistingImages();
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
      setImageSrc(null);
    } finally {
      setIsLoading(false);
    }
  };


  const loadExistingImages = async () => {
    try {
      const res = await fetch("/api/images");
      const data = await res.json();
      
      if (data.success && data.images) {
        const formattedImages: ImageItem[] = data.images.map((img: { name: string; url: string; prompt: string; createdAt: string }) => ({
          id: img.name.replace('.png', ''),
          src: img.url,
          alt: img.prompt || 'Generated image',
          createdAt: img.createdAt,
          metadata: {
            prompt: img.prompt,
          },
        }));
        setImages(formattedImages);
      }
    } catch (error) {
      console.error('Failed to load existing images:', error);
    } finally {
      setIsLoadingImages(false);
    }
  };

  useEffect(() => {
    loadExistingImages();
  }, []);

  return (
    <div className='flex h-screen bg-gray-100'>
      <div className='flex-1 flex flex-col p-4'>
        <div className='flex-1 flex items-center justify-center mb-8'>
          <div className='w-full max-w-2xl'>
            <ImageViewer src={imageSrc} isLoading={isLoading} />
          </div>
        </div>
        <div className='w-full flex justify-center'>
          <div className='w-full max-w-2xl'>
            <ChatComposer onSend={handleSendMessage} isLoading={isLoading} />
          </div>
        </div>
      </div>
      <div className='w-96 p-4 border-l border-gray-200 overflow-y-auto'>
        <h2 className='text-lg font-semibold mb-4'>생성된 이미지</h2>
        <ImageGallery
          images={images}
          isLoading={isLoadingImages}
          aspectRatio={1}
          gap={4}
        />
      </div>
    </div>
  );
}

export default GenImageHome;
