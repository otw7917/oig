"use client";

import { useState, FormEvent } from "react";

type ChatComposerProps = {
  onSend: (message: string) => void;
  disabled?: boolean;
};

export default function ChatComposer({
  onSend,
  disabled = false,
}: ChatComposerProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-xl flex items-center space-x-2 p-2 bg-white rounded shadow'
    >
      <input
        type='text'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder='프롬프트를 작성해주세요...'
        className='flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={disabled}
      />
      <button
        type='submit'
        disabled={disabled || input.trim().length === 0}
        className={`
          px-4 py-2 rounded 
          ${
            disabled || input.trim().length === 0
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }
        `}
      >
        전송
      </button>
    </form>
  );
}
