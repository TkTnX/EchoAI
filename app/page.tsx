import { OpenSidebarButton } from "@/components/OpenSidebarButton";
import { PromptForm } from "@/components/ui/PromptForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <OpenSidebarButton />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="flex  items-center gap-2">
          <Image
            src="/icons/logo.svg"
            width={60}
            height={60}
            alt="Logo"
            className="w-10 sm:w-[60px] h-10 sm:h-[60px]"
          />
          <h6 className="font-secondary font-bold text-2xl sm:text-3xl xl:text-5xl">
            EchoAI
          </h6>
        </div>
        <h1 className="mt-3 text-3xl sm:text-4xl xl:text-7xl tracking-wider font-bold text-center  textGradient bg-gradient-to-r from-[#4bece2] via-[#bddcda] to-[#d2d9d9] bg-[200%_auto] bg-clip-text text-transparent">
          Чем я могу помочь?
        </h1>
      </div>
      <div className="absolute bottom-20 mx-auto px-3 w-full flex justify-center">
        <PromptForm />
      </div>
    </>
  );
}
