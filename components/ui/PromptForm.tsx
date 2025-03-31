import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";

type Props = {
  className?: string;
};

export const PromptForm = ({ className }: Props) => {
  return (
    <form
      className={cn(
        "flex items-center justify-center  w-full gap-2 pr-4 max-w-[530px] bg-bgLight rounded-lg ",
        className
      )}
    >
      <input
        className="text-sm placeholder:text-xs placeholder:opacity-40 flex-1 p-4"
        placeholder="Позвольте магии произойти, Задайте вопрос"
      />
      <button>
        <SendHorizonal
          color="#777779"
          className="hover:stroke-white transition"
        />
      </button>
    </form>
  );
};
