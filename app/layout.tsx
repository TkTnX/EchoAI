import type { Metadata } from "next";
import "./globals.css";
import { Russo_One, Space_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
const russoOne = Russo_One({
  subsets: ["latin"],
  variable: "--font-family",
  weight: ["400"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--second-family",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "EchoAI",
  description: "EchoAI | Самый умный AI ассистент",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="ru">
      <body
        className={` ${russoOne.className} ${spaceMono.variable} antialiased `}
      >
        <Providers>
          <div className="flex gap-5  h-screen relative overflow-x-hidden">
            <main className="flex-1 ">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
