import Image from "next/image";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={className}>
      <Image src='/oig.svg' alt='OIG Logo' width={120} height={40} priority />
    </div>
  );
}
