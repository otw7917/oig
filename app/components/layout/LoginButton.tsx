import Link from "next/link";

interface LoginButtonProps {
  className?: string;
}

export function LoginButton({ className = "" }: LoginButtonProps) {
  return (
    <Link
      href='/login'
      className={`px-3 py-1 rounded-md border border-neutral-300 bg-white/80 text-neutral-900 text-sm font-medium hover:bg-white ${className}`}
    >
      로그인
    </Link>
  );
}
