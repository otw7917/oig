"use client";

import { useState, FormEvent } from "react";
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`
        w-full max-w-xl flex items-center space-x-2 p-2 bg-white rounded shadow
        transition
        ${isLoading ? "opacity-80 pointer-events-none" : ""}
      `}
    >
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='프롬프트를 작성해주세요...'
        className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={disabled || isLoading}
      />
      <button
        type='submit'
        disabled={disabled || isLoading || input.trim().length === 0}
        className={`
          px-4 py-2 rounded flex items-center justify-center
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
