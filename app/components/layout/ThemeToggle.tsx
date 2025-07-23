"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext } from "@/lib/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeContext();

  const handleThemeToggle = () => {
    const themeOrder = ['light', 'dark', 'system'] as const;
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-5 h-5" />;
      case 'dark':
        return <Moon className="w-5 h-5" />;
      case 'system':
        return <Monitor className="w-5 h-5" />;
      default:
        return <Sun className="w-5 h-5" />;
    }
  };

  const getAriaLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to system mode';
      case 'system':
        return 'Switch to light mode';
      default:
        return 'Toggle theme';
    }
  };

  return (
    <button
      onClick={handleThemeToggle}
      className={`
        p-2 rounded-md transition-all duration-200
        hover:bg-neutral-100 dark:hover:bg-neutral-800
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
        ${className}
      `}
      aria-label={getAriaLabel()}
      title={getAriaLabel()}
    >
      <div className="transition-transform duration-200 hover:rotate-12">
        {getIcon()}
      </div>
    </button>
  );
}
