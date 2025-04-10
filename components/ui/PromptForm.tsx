"use client";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { StopGeneratingButton } from "../StopGeneratingButton";
import { Blur } from "./Blur";
import { useAuthStore } from "@/stores/AuthStore";
import { toast } from "react-toastify";
import { usePrompt } from "@/hooks/usePrompt";
import { startTransition, useRef } from "react";
import { useChatStore } from "@/stores/ChatStore";

type Props = {
  className?: string;
  chatId?: string;
};

export const PromptForm = ({ className, chatId }: Props) => {
  const { isPending, state, createPrompt } = usePrompt();
  const addOptimisticMessage = useChatStore(
    (state) => state.addOptimisticMessage
  );
  const { user } = useAuthStore();
  const formRef = useRef<null | HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      if (addOptimisticMessage) {
        addOptimisticMessage({
          text: formData.get("message") as string,
          userId: "1",
        });
        addOptimisticMessage({ text: "Думаю...", userId: null });
      }
    });
    try {
      formData.append("chatId", String(chatId));
      formData.append("userId", String(user?.id));

      createPrompt(formData);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
    } finally {
      if (state.error) {
        return toast.error("Что-то пошло не так");
      }
    }
  };

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="relative w-full mx-auto">
      {isPending && <StopGeneratingButton />}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className={cn(
          "flex items-center justify-center  w-full gap-2 pr-4 max-w-[530px] bg-bgLight rounded-lg group overflow-hidden  relative mx-auto",
          className,
          { "pointer-events-none opacity-50": isPending || state.loading }
        )}
      >
        <textarea
          disabled={isPending || state.loading}
          autoComplete="off"
          name="message"
          className="peer text-sm placeholder:text-xs placeholder:opacity-40 flex-1 p-4 focus:placeholder:opacity-100 placeholder:transition group resize-none outline-none"
          placeholder={
            isPending ? "Думаю..." : "Позвольте магии произойти, Задайте вопрос"
          }
          onKeyDown={(e: React.KeyboardEvent) => onEnter(e)}
        />
        <button disabled={isPending || state.loading} type="submit">
          <SendHorizonal
            color="#777779"
            className="hover:stroke-white transition"
          />
        </button>
        <Blur className="peer-focus:opacity-100 -bottom-20 left-1/2 -translate-x-1/2" />
      </form>
    </div>
  );
};
