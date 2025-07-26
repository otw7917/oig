import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/layout/Header";
import Footer from "./components/layout/Footer";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";

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
  metadataBase: new URL("https://oig.vercel.app"),
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
        url: "/oig.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        <ThemeProvider>
          <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
