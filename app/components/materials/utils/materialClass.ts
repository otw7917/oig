import { twMerge } from "tailwind-merge";

type BgColor = "white" | "black" | "slate" | "blue";
type BgOpacity = "0" | "20" | "40" | "60" | "80";
type BorderColor = "white" | "gray" | "blue";
type BlurLevel = "none" | "sm" | "md" | "lg" | "2xl";

interface MaterialStyle {
  bg?: {
    color: BgColor;
    opacity: BgOpacity;
  };
  border?: {
    color: BorderColor;
  };
  blur?: BlurLevel;
  className?: string;
}

const bgMap = {
  white: {
    0: "bg-white/0",
    20: "bg-white/20",
    40: "bg-white/40",
    60: "bg-white/60",
    80: "bg-white/80",
  },
  black: {
    0: "bg-black/0",
    20: "bg-black/20",
    40: "bg-black/40",
    60: "bg-black/60",
    80: "bg-black/80",
  },
  slate: {
    0: "bg-slate-500/0",
    20: "bg-slate-500/20",
    40: "bg-slate-500/40",
    60: "bg-slate-500/60",
    80: "bg-slate-500/80",
  },
  blue: {
    0: "bg-blue-500/0",
    20: "bg-blue-500/20",
    40: "bg-blue-500/40",
    60: "bg-blue-500/60",
    80: "bg-blue-500/80",
  },
} as const;

const borderMap = {
  white: "border-white/40",
  gray: "border-gray-300/40",
  blue: "border-blue-400/40",
} as const;

const blurMap = {
  none: "backdrop-blur-none",
  sm: "backdrop-blur-sm",
  md: "backdrop-blur-md",
  lg: "backdrop-blur-lg",
  "2xl": "backdrop-blur-2xl",
} as const;

export function generateMaterialClass(style: MaterialStyle) {
  const baseClasses = "rounded-xl border transition-all";
  const classes = [baseClasses];

  if (style.bg) {
    classes.push(bgMap[style.bg.color][style.bg.opacity]);
  }

  if (style.border) {
    classes.push(borderMap[style.border.color]);
  }

  if (style.blur) {
    classes.push(blurMap[style.blur]);
  }

  if (style.className) {
    classes.push(style.className);
  }

  return twMerge(...classes);
}

// 사용 예시를 위한 타입 export
export type { MaterialStyle, BgColor, BgOpacity, BorderColor, BlurLevel };
