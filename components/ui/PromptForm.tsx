import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { StopGeneratingButton } from "../StopGeneratingButton";
import { Blur } from "./Blur";

type Props = {
  className?: string;
};

export const PromptForm = ({ className }: Props) => {
  const isGenerating = false;
  return (
    <form
      className={cn(
        "flex items-center justify-center  w-full gap-2 pr-4 max-w-[530px] bg-bgLight rounded-lg group overflow-hidden relative",
        className
      )}
    >
      {isGenerating && <StopGeneratingButton />}

      <input
        className="peer text-sm placeholder:text-xs placeholder:opacity-40 flex-1 p-4 focus:placeholder:opacity-100 placeholder:transition group"
        placeholder="Позвольте магии произойти, Задайте вопрос"
      />
      <button type="submit">
        <SendHorizonal
          color="#777779"
          className="hover:stroke-white transition"
        />
      </button>
      <Blur className="peer-focus:opacity-100 -bottom-20 left-1/2 -translate-x-1/2" />
    </form>
  );
};
