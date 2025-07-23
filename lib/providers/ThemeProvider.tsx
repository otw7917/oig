"use client";

import { ReactNode } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { useTheme } from '../hooks/useTheme';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme, resolvedTheme, setTheme, isInitialized } = useTheme();

  // Prevent hydration mismatch by not rendering until initialized
  if (!isInitialized) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}