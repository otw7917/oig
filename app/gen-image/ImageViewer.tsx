"use client";

import Spinner from "./Spinner";

type ImageViewerProps = {
  src: string | null;
  alt?: string;
  isLoading?: boolean;
};

export default function ImageViewer({
  src,
  alt = "Generated image",
  isLoading = false,
}: ImageViewerProps) {
  return (
    <div
      className='w-full h-[600px] flex flex-col items-center justify-center rounded-3xl glass-card-2xl shadow-2xl transition-all p-6 relative overflow-hidden'
      style={{
        boxShadow:
          "0 8px 40px 0 rgba(60, 60, 90, 0.10), 0 1.5px 7px 0 rgba(130,150,200,0.07)",
        border: "1.5px solid rgba(255,255,255,0.25)",
      }}
    >
      <div
        className='absolute left-10 top-10 w-1/2 h-1/3 pointer-events-none blur-3xl opacity-30'
        style={{
          background: "linear-gradient(120deg, #9ae6ff, #fff5, #e0d7ff 80%)",
        }}
      />
      {isLoading ? (
        <div className='absolute inset-0 flex items-center justify-center z-10 bg-white/30 backdrop-blur-sm rounded-3xl'>
          <Spinner size={48} className='text-blue-500' />
          <span className='ml-4 text-indigo-700 text-lg font-medium'>
            이미지 생성 중...
          </span>
        </div>
      ) : src ? (
        <div className='w-full h-full flex items-center justify-center p-4'>
          <div className='relative w-full h-full flex items-center justify-center'>
            <img
              src={src}
              alt={alt}
              className='max-w-full max-h-full rounded-xl object-contain'
              style={{
                maxHeight: "calc(100% - 2rem)",
                background: "rgba(255,255,255,0.15)",
                transition: "all 0.2s ease",
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.1))",
              }}
            />
          </div>
        </div>
      ) : (
        <div className='flex-1 flex items-center justify-center w-full h-full min-h-[300px] text-gray-400 text-xl select-none tracking-wider'>
          이미지가 생성되면 이곳에 표시됩니다
        </div>
      )}
    </div>
  );
}
