import {
  generateMaterialClass,
  type BgColor,
  type BlurLevel,
  type BgOpacity,
} from "./utils/materialClass";

interface MaterialPreviewProps {
  bgColor: BgColor;
  blur: BlurLevel;
  bgOpacity: BgOpacity;
}

function MaterialPreview({ bgColor, blur, bgOpacity }: MaterialPreviewProps) {
  const className = generateMaterialClass({
    bg: { color: bgColor, opacity: bgOpacity },
    blur: blur,
    className: "min-w-[150px] min-h-[150px] w-1/2 h-1/2 aspect-square",
  });

  return <div className={className}></div>;
}

export default MaterialPreview;
