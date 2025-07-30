interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center justify-center text-black dark:text-white ${className}`}>
      <svg width="120" height="40" viewBox="0 0 120 40" role="img" aria-label="OIG Logo">
        <text 
          x="60" 
          y="25" 
          fontFamily="Arial, sans-serif" 
          fontSize="32" 
          fill="currentColor" 
          fontWeight="bold" 
          textAnchor="middle" 
          dominantBaseline="middle"
        >
          OIG
        </text>
      </svg>
    </div>
  );
}
