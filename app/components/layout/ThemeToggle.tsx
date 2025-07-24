"use client";

import { useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext, Theme } from "@/lib/contexts/ThemeContext";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useThemeContext();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const themeOptions: Array<{ value: Theme; icon: React.ReactNode; label: string }> = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  const getCurrentIcon = () => {
    const currentOption = themeOptions.find(option => option.value === theme);
    return currentOption?.icon || <Sun className="w-5 h-5" />;
  };

  const handleThemeSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsTooltipOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsTooltipOpen(!isTooltipOpen)}
        onBlur={() => setTimeout(() => setIsTooltipOpen(false), 150)}
        className={`
          p-2 rounded-md transition-all duration-200
          hover:bg-neutral-100 dark:hover:bg-neutral-800
          hover:scale-110 active:scale-95
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2
          ${className}
        `}
        aria-label="Theme selector"
        title="Change theme"
      >
        <div className="transition-transform duration-200 hover:rotate-12">
          {getCurrentIcon()}
        </div>
      </button>

      {isTooltipOpen && (
        <div className="absolute right-0 top-full mt-2 z-50">
          <div className="bg-white/90 dark:bg-neutral-800/90 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg backdrop-blur-sm overflow-hidden">
            <div className="p-1">
              {themeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleThemeSelect(option.value)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md
                    transition-all duration-150 text-left
                    hover:bg-neutral-100 dark:hover:bg-neutral-700
                    ${theme === option.value 
                      ? 'bg-accent/10 text-accent border-l-2 border-accent' 
                      : 'text-neutral-700 dark:text-neutral-300'
                    }
                  `}
                >
                  <span className="flex-shrink-0">{option.icon}</span>
                  <span className="min-w-[60px]">{option.label}</span>
                  {theme === option.value && (
                    <div className="w-2 h-2 bg-accent rounded-full ml-auto"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
