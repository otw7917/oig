import { Sun } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  // TODO: 기능은 아직 구현되지 않았습니다.
  return (
    <button
      className={`p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${className}`}
      aria-label='Toggle theme'
    >
      <Sun className='w-5 h-5' />
    </button>
  );
}
