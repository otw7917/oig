"use client";

import { useState, useMemo } from "react";
import MaterialCode from "./MaterialCode";
import MaterialControls from "./MaterialControls";
import MaterialPreview from "./MaterialPreview";
import type { BgOpacity, BgColor, BlurLevel } from "./utils/materialClass";
import BackgroundText from "./BackgroundText";

// CSS 코드 생성을 위한 매핑 객체들
const bgColorMap = {
  white: "255, 255, 255",
  black: "0, 0, 0",
  slate: "100, 116, 139",
  blue: "59, 130, 246",
};

const blurMap = {
  none: "0px",
  sm: "4px",
  md: "12px",
  lg: "16px",
  "2xl": "24px",
};

export default function MaterialSection() {
  const [bgColor, setBgColor] = useState<BgColor>("white");
  const [blur, setBlur] = useState<BlurLevel>("lg");
  const [bgOpacity, setBgOpactiy] = useState<BgOpacity>("20");

  // 현재 설정에 따른 CSS 코드 생성
  const generatedCssCode = useMemo(() => {
    // 불투명도를 0-1 사이 숫자로 변환
    const opacity = parseInt(bgOpacity) / 100;

    const cssCode =
      `background: rgba(${bgColorMap[bgColor]}, ${opacity});
` +
      `backdrop-filter: blur(${blurMap[blur]});
` +
      `-webkit-backdrop-filter: blur(${blurMap[blur]});
` +
      `border-radius: 0.75rem;
` +
      `border: 1px solid rgba(255, 255, 255, 0.18);`;

    return cssCode;
  }, [bgColor, blur, bgOpacity]);

  return (
    <section className='flex flex-col items-center justify-center w-full min-h-[calc(100vh-4rem)] pt-16 px-4 md:px-6 lg:px-8'>
      <div className='w-full max-w-7xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4 pt-2 text-left'>Materials</h1>

        <div className='border-2 rounded-lg shadow-md backdrop-blur-sm bg-white/10 dark:bg-black/10 p-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='relative overflow-hidden min-h-[300px] flex items-center justify-center border rounded-lg p-4 bg-gradient-to-br from-blue-500 to-purple-600'>
              <BackgroundText />
              <MaterialPreview
                bgColor={bgColor}
                blur={blur}
                bgOpacity={bgOpacity}
              />
            </div>
            <div className='min-h-[300px] flex items-center justify-center border rounded-lg p-4 bg-white/5 dark:bg-black/5'>
              <MaterialControls
                bgColor={bgColor}
                onBgColorChange={setBgColor}
                blur={blur}
                onBlurChange={setBlur}
                bgOpacity={bgOpacity}
                onBgOpacityChange={setBgOpactiy}
              />
            </div>
            <div className='md:col-span-2 min-h-[200px] flex items-center justify-center border rounded-lg p-4 bg-white/5 dark:bg-black/5 mt-0'>
              <MaterialCode code={generatedCssCode} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
