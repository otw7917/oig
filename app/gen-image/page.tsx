"use client";
import { useState } from "react";
import ChatComposer from "../components/chat/ChatComposer";
import ImageViewer from "./ImageViewer";

function GenImageHome() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
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
      // (3) base64 이미지 문자열
      setImageSrc(`data:image/png;base64,${data.imageBase64}`);
    } catch (e: any) {
      alert(e.message);
      setImageSrc(null);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <ChatComposer onSend={handleSendMessage} />
      <ImageViewer src={imageSrc} />
    </div>
  );
}

export default GenImageHome;
