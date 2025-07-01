import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { createClient } from "@/utils/supabase/server";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { UserProfile } from "./UserProfile";
import { LoginButton } from "./LoginButton";

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
      <Logo />
      <div className='flex items-center gap-3'>
        <ThemeToggle />
        {user ? <UserProfile user={user} /> : <LoginButton />}
      </div>
    </header>
  );
}

export default Header;
