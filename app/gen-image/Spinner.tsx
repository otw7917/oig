type SpinnerProps = {
  size?: number;
  className?: string;
};

function Spinner({ size = 32, className = "" }: SpinnerProps) {
  return (
    <svg
      className={`animate-spin ${className}`}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      aria-label='로딩 중'
    >
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
      />
    </svg>
  );
}

export default Spinner;
