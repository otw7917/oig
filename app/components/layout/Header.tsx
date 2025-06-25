import Image from "next/image";
import Link from "next/link";
import { Sun } from "lucide-react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";

const headerStyles = cva(
  "fixed w-full h-16 flex items-center justify-between border-b z-50",
  {
    variants: {
      blur: {
        none: "",
        sm: "backdrop-blur-sm",
        md: "backdrop-blur-md",
        lg: "backdrop-blur-lg",
      },
      bg: {
        light: "bg-white/30 dark:bg-black/30",
        dark: "bg-black/50",
      },
      px: {
        normal: "px-4",
        wide: "px-8",
      },
    },
    defaultVariants: {
      blur: "lg",
      bg: "light",
      px: "normal",
    },
  }
);

type HeaderVaraints = {
  blur?: "none" | "sm" | "md" | "lg";
  bg?: "light" | "dark";
  px?: "normal" | "wide";
};

type HeaderProps = {
  variants?: HeaderVaraints;
} & React.HTMLAttributes<HTMLDivElement>;

async function Header({ className, variants = {}, ...props }: HeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const classes = twMerge(headerStyles(variants), className);

  return (
    <header className={classes} {...props}>
      <div>
        <Image src='/oig.svg' alt='OIG Logo' width={120} height={40} />
      </div>
      <div className='flex items-center gap-3'>
        <Sun />
        {user ? (
          <div className='flex items-center gap-4'>
            <Link
              href='/account'
              className='flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md transition-colors'
            >
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt='프로필'
                  width={32}
                  height={32}
                  className='rounded-full'
                />
              )}
              <span className='text-sm font-medium'>
                {user.email?.split("@")[0]}
              </span>
            </Link>
            <form action={signOut}>
              <button className='px-3 py-1 rounded-md border border-neutral-300 bg-white/80 text-neutral-900 text-sm font-medium hover:bg-white'>
                로그아웃
              </button>
            </form>
          </div>
        ) : (
          <Link
            href='/login'
            className='px-3 py-1 rounded-md border border-neutral-300 bg-white/80 text-neutral-900 text-sm font-medium hover:bg-white'
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
