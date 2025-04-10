"use client";
import Image from "next/image";
import { Button } from "../ui/Button";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/AuthStore";
import { confirmModal } from "@/helpers/confirmModal";

type Props = {
  userId: string;
};

export const DeleteAllChats = ({ userId }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { fetchUser } = useAuthStore();
  const onClick = async () => {
    try {
      const confirm = await confirmModal(
        "Вы действительно хотите удалить все чаты?"
      );
      if (!confirm) return;
      await axiosInstance.delete(`/chats`, {
        data: {
          userId,
        },
      });

      await fetchUser(session?.user);
      return router.push("/");
    } catch (error) {
      console.log(error);
      return toast.error("Что-то пошло не так");
    }
  };

  return (
    <Button onClick={onClick} blurPosition="-right-20" className="mt-5">
      <Image
        src="/icons/restart.svg"
        width={18}
        height={18}
        alt="Clear all chats"
      />
      <span className="opacity-50">Удалить все чаты</span>
    </Button>
  );
};
