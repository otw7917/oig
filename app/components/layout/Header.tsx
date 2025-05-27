import Image from "next/image";
import { Sun } from "lucide-react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

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

function Header({ className, variants = {}, ...props }: HeaderProps) {
  const classes = twMerge(headerStyles(variants), className);
  return (
    <header className={classes} {...props}>
      <div>
        <Image src='/oig.svg' alt='OIG Logo' width={120} height={40} />
      </div>
      <div>
        <Sun />
      </div>
    </header>
  );
}

export default Header;
