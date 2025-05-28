import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OIG - 모던 UI playground",
  description:
    "다양한 인터페이스 가이드라인(Apple HIG, Material, Fluent 등)을 읽고, 직접 코드로 구현해보는 놀이터.",
  openGraph: {
    title: "OIG",
    description:
      "다양한 인터페이스 가이드라인(Apple HIG, Material, Fluent 등)을 읽고, 직접 코드로 구현해보는 놀이터.",
    url: "https://oig.vercel.app",
    siteName: "OIG",
    type: "website",
    locale: "ko_KR",
    images: [
      {
        url: "/oig.svg",
        width: 1200,
        height: 630,
        alt: "OIG Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
