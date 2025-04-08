"use client";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { StopGeneratingButton } from "../StopGeneratingButton";
import { Blur } from "./Blur";
import { useAuthStore } from "@/stores/AuthStore";
import { toast } from "react-toastify";
import { usePrompt } from "@/hooks/usePrompt";

type Props = {
  className?: string;
  chatId?: string;
};

export const PromptForm = ({ className, chatId }: Props) => {
  const { isPending, state, createPrompt } = usePrompt();
  const { user } = useAuthStore();

  // TODO: Сделать что-то с адаптивом при наличии больших сообщений
  // TODO: В promptForm заменить input на textare
  // TODO: После удаления/редактирования сразу изменять данные
  // TODO: При создании чата, пока обрабатывается промпт, отображать что-то

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

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

  return (
    <div className="relative w-full mx-auto">
      {isPending && <StopGeneratingButton />}

      <form
        onSubmit={onSubmit}
        className={cn(
          "flex items-center justify-center  w-full gap-2 pr-4 max-w-[530px] bg-bgLight rounded-lg group overflow-hidden  relative mx-auto",
          className,
          { "pointer-events-none opacity-50": isPending }
        )}
      >
        <input
          autoComplete="off"
          name="message"
          className="peer text-sm placeholder:text-xs placeholder:opacity-40 flex-1 p-4 focus:placeholder:opacity-100 placeholder:transition group"
          placeholder="Позвольте магии произойти, Задайте вопрос"
        />
        <button disabled={isPending} type="submit">
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
