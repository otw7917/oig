"use client";

import { useState } from "react";
import ChatComposer from "../components/chat/ChatComposer";
import ImageViewer from "./ImageViewer";

function GenImageHome() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // 추가

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
      setImageSrc(`data:image/png;base64,${data.imageBase64}`);
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

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <ImageViewer src={imageSrc} isLoading={isLoading} />
      <ChatComposer onSend={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default GenImageHome;
