"use client";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import { StopGeneratingButton } from "../StopGeneratingButton";
import { Blur } from "./Blur";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/AuthStore";
import { useSession } from "next-auth/react";

type Props = {
  className?: string;
  chatId?: string;
};

export const PromptForm = ({ className, chatId }: Props) => {
  const { user, fetchUser } = useAuthStore();
  const { data: session } = useSession();
  const isGenerating = false;
  const pathname = usePathname();
  const router = useRouter();
  // TODO: Вынести в отдельный хук/стор и loading, error
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      if (pathname === "/") {
        const res = await axiosInstance.post("/chats", {
          message: formData.get("message"),
          userId: user?.id,
        });
        router.refresh();
        await fetchUser(session?.user);
        router.push(`/c/${res.data.id}`);
      } else {
        await axiosInstance.post("/messages", {
          message: formData.get("message"),
          chatId,
          userId: user?.id,
        });

        router.refresh();

        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "flex items-center justify-center  w-full gap-2 pr-4 max-w-[530px] bg-bgLight rounded-lg group overflow-hidden relative",
        className
      )}
    >
      {isGenerating && <StopGeneratingButton />}

      <input
        autoComplete="off"
        name="message"
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
