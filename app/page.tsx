import { OpenSidebarButton } from "@/components/OpenSidebarButton";
import { PromptForm } from "@/components/ui/PromptForm";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <OpenSidebarButton />
      <div className="flex  items-center gap-2">
        <Image src="/icons/logo.svg" width={60} height={60} alt="Logo" />
        <h6 className="font-secondary font-bold text-3xl xl:text-5xl">
          EchoAI
        </h6>
      </div>
      <h1 className="mt-3 text-4xl xl:text-7xl tracking-wider font-bold text-center  textGradient bg-gradient-to-r from-[#4bece2] via-[#bddcda] to-[#d2d9d9] bg-[200%_auto] bg-clip-text text-transparent">
        Чем я могу помочь?
      </h1>
      <div className="absolute bottom-20 mx-auto px-3 w-full flex justify-center">
        <PromptForm />
      </div>
    </>
  );
}
