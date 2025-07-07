import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface UserProfileProps {
  user: {
    email?: string | null;
    user_metadata?: {
      avatar_url?: string;
      nickname?: string;
    };
  };
  className?: string;
}

export function UserProfile({ user, className = "" }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`flex items-center gap-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded-md transition-colors ${className}`}
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
          <span className='text-sm font-medium hidden sm:inline'>
            {user.user_metadata?.nickname || user.email?.split("@")[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        className='w-[var(--radix-dropdown-menu-trigger-width)]'
      >
        <DropdownMenuItem asChild>
          <Link href='/account' className='w-full text-left'>
            내 정보
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/settings' className='w-full text-left'>
            설정
          </Link>
        </DropdownMenuItem>
        <form action={signOut}>
          <DropdownMenuItem asChild>
            <button className='w-full text-left' type='submit'>
              로그아웃
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
