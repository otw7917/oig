interface MaterialControlsProps {
  bgColor: "white" | "black" | "slate" | "blue";
  onBgColorChange: (color: "white" | "black" | "slate" | "blue") => void;
  blur: "none" | "sm" | "md" | "lg" | "2xl";
  onBlurChange: (blur: "none" | "sm" | "md" | "lg" | "2xl") => void;
  bgOpacity: "20" | "40" | "60" | "80";
  onBgOpacityChange: (opacity: "20" | "40" | "60" | "80") => void;
}

function MaterialControls({
  bgColor,
  onBgColorChange,
  blur,
  onBlurChange,
  bgOpacity,
  onBgOpacityChange,
}: MaterialControlsProps) {
  // 색상 옵션 배열
  const colorOptions = [
    { value: "white", label: "White", className: "bg-white" },
    { value: "black", label: "Black", className: "bg-black" },
    { value: "slate", label: "Slate", className: "bg-slate-500" },
    { value: "blue", label: "Blue", className: "bg-blue-500" },
  ];

  // Blur 옵션 배열
  const blurOptions = [
    { value: "none", label: "None" },
    { value: "sm", label: "Small" },
    { value: "md", label: "Medium" },
    { value: "lg", label: "Large" },
    { value: "2xl", label: "Extra Large" },
  ];

  // Opacity 옵션 배열
  const opacityOptions = [
    { value: "20", label: "20%" },
    { value: "40", label: "40%" },
    { value: "60", label: "60%" },
    { value: "80", label: "80%" },
  ];

  return (
    <div className='w-full p-4 bg-slate-200/30 dark:bg-black/30 backdrop-blur-sm rounded-lg'>
      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Background Color</h3>
        <div className='flex gap-2'>
          {colorOptions.map((color) => (
            <button
              key={color.value}
              className={`h-10 w-10 rounded-full ${color.className} border-2 ${
                bgColor === color.value && "ring-2 ring-yellow-400"
              }`}
              onClick={() =>
                onBgColorChange(
                  color.value as "white" | "black" | "slate" | "blue"
                )
              }
              title={color.label}
            />
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Blur Effect</h3>
        <div className='flex gap-2'>
          {blurOptions.map((option) => (
            <button
              key={option.value}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all
                ${
                  blur === option.value
                    ? "bg-blue-500 text-white"
                    : "bg-white/50 hover:bg-white/70 text-gray-700"
                }`}
              onClick={() =>
                onBlurChange(
                  option.value as "none" | "sm" | "md" | "lg" | "2xl"
                )
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className='mb-4'>
        <h3 className='text-lg font-medium mb-2'>Background Opacity</h3>
        <div className='flex gap-2'>
          {opacityOptions.map((opacity) => (
            <button
              key={opacity.value}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all
                ${
                  opacity.value === bgOpacity
                    ? "bg-blue-500 text-white"
                    : "bg-white/50 hover:bg-white/70 text-gray-700"
                }`}
              onClick={() =>
                onBgOpacityChange(opacity.value as "20" | "40" | "60" | "80")
              }
            >
              {opacity.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MaterialControls;
