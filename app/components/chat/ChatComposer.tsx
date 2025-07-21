"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import Spinner from "@/app/gen-image/Spinner";

type ChatComposerProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
};

export default function ChatComposer({
  onSend,
  disabled = false,
  isLoading = false,
}: ChatComposerProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 자동 높이 조정
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput(""); // 전송 후 입력창 비우기
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        w-full max-w-4xl flex items-center space-x-3 p-3 bg-white rounded-3xl shadow-lg
        transition-all duration-200
        ${isLoading ? "opacity-80 pointer-events-none" : ""}
      `}
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='프롬프트를 작성해주세요... (Enter: 전송, Shift+Enter: 줄바꿈)'
        className='flex-1 border border-gray-300 rounded-3xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none overflow-hidden min-h-[3.5rem] max-h-48'
        disabled={disabled || isLoading}
        rows={1}
      />
      <button
        type='submit'
        disabled={disabled || isLoading || input.trim().length === 0}
        className={`
          px-6 py-3 text-lg rounded-3xl flex items-center justify-center min-w-[100px] font-medium
          ${
            disabled || isLoading || input.trim().length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
      >
        {isLoading ? <Spinner size={20} className='text-blue-500' /> : "전송"}
      </button>
    </form>
  );
}
