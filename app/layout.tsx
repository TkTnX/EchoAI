import type { Metadata } from "next";
import "./globals.css";
import { Russo_One, Space_Mono } from "next/font/google";
import { Sidebar } from "@/components/Sidebar";
import { OpenSidebarButton } from "@/components/OpenSidebarButton";
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
        <div className="flex mx-1 sm:mx-5 gap-5 py-5 h-screen relative overflow-x-hidden">
          <Sidebar />

          <main className="flex-1 bg-foreground h-full rounded-[10px] py-4 px-3  flex flex-col items-center justify-center relative">
            <OpenSidebarButton />

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
