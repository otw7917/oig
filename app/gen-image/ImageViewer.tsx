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
      className='w-full  flex flex-col items-center mb-10 rounded-3xl glass-card-2xl shadow-2xl min-h-[360px] transition-all p-10 max-w-xl mx-auto relative overflow-hidden'
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
          <span className='ml-4 text-blue-700 text-lg font-medium'>
            이미지 생성 중...
          </span>
        </div>
      ) : src ? (
        <img
          src={src}
          alt={alt}
          className='max-w-full rounded-2xl shadow-xl border border-white/40 object-contain'
          style={{
            maxHeight: "330px",
            background: "rgba(255,255,255,0.15)",
            transition: "box-shadow .3s, filter .2s",
            filter: "drop-shadow(0 2px 8px #afdfff66)",
          }}
        />
      ) : (
        <div className='flex-1 flex items-center justify-center w-full h-full min-h-[300px] text-gray-400 text-xl select-none tracking-wider'>
          이미지가 생성되면 이곳에 표시됩니다
        </div>
      )}
    </div>
  );
}
