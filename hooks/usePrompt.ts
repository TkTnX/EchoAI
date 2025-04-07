"use client";
import { AddPrompt, PrevStateInterface } from "@/app/actions";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/AuthStore";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useActionState } from "react";

export const usePrompt = () => {
  const { user, fetchUser } = useAuthStore();
  const { data: session } = useSession();
  const [state, formAction, isPending] = useActionState(AddPrompt, {
    error: null,
    loading: false,
  } as PrevStateInterface);
  const pathname = usePathname();
    const router = useRouter();
    
    // ФУНКЦИЯ ДЛЯ ОТПРАВКИ ПРОМПТА
  const createPrompt = async (formData: FormData) => {
    if (pathname === "/") {
      const res = await axiosInstance.post("/chats", {
        message: formData.get("message"),
        userId: user?.id,
      });
      router.refresh();
      await fetchUser(session?.user);
      router.push(`/c/${res.data.id}`);
    } else {
      startTransition(() => formAction(formData));

      router.refresh();

    }
  };

  return {
    isPending,
    state,
    createPrompt,
  };
};
