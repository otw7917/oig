"use client";

import dynamic from "next/dynamic";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";
import { User } from "@supabase/supabase-js";

// ThemeToggle을 클라이언트에서만 렌더링
const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => ({ default: mod.ThemeToggle })), {
  ssr: false,
  loading: () => <div className="w-10 h-10" /> // 로딩 플레이스홀더
});

interface HeaderActionsProps {
  user: User | null;
}

export function HeaderActions({ user }: HeaderActionsProps) {
  return (
    <div className='flex items-center gap-3'>
      <ThemeToggle />
      {user ? <UserProfile user={user} /> : <LoginButton />}
    </div>
  );
}