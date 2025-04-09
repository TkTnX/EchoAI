"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const ClearChat = ({ chatId }: { chatId: string }) => {
  const router = useRouter();
  const onClear = async () => {
    try {
      // TODO: В будущем заменить на другую модалку
      const confirm = window.confirm("Вы действительно хотите очистить чат?");
      if (!confirm) return;
      const res = await axiosInstance.delete(`/messages/${chatId}`);
      router.refresh();
      if (res.status === 200) return toast.success("Чат очищен!");
    } catch (error) {
      console.log(error);
      return toast.error("Не удалось очистить чат!");
    }
  };
  return (
    <button onClick={onClear} className="flex items-center gap-1 group">
      <Image src="/icons/restart.svg" alt="Restart" width={16} height={16} />
      <p className="text-xs opacity-60 transition group-hover:opacity-100">
        Очистить чат
      </p>
    </button>
  );
};
