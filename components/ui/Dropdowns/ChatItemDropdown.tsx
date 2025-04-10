"use client";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { CHATITEM_CONFIG } from "./config";
import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditChat } from "../Modals";
import { useAuthStore } from "@/stores/AuthStore";
import { useSession } from "next-auth/react";
import { confirmModal } from "@/helpers/confirmModal";

type Props = {
  children: React.ReactNode;
  chatId: string;
};

export const ChatItemDropdown = ({ children, chatId }: Props) => {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const { fetchUser } = useAuthStore();
  const { data: session } = useSession();
  const onClick = async (type: string) => {
    try {
      switch (type) {
        case "delete":
          const confirm = await confirmModal(
            "Вы действительно хотите удалить чат?"
          );
          if (!confirm) return;
          const res = await axiosInstance.delete(`/chats/${chatId}`);
          if (res.status === 200) {
            router.refresh();
            router.push("/");
            await fetchUser(session?.user);
            return toast.success("Чат успешно удален!");
          }
          break;

        case "edit":
          setOpenEdit(true);
          break;
      }
    } catch (error) {
      console.log(error);
      return toast.error("Что-то пошло не так!");
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-bgLight border-bgLight text-white ml-10">
          {CHATITEM_CONFIG.map((item, index) => (
            <div className="bg-bgLight hover:bg-bgLight" key={index}>
              <button
                onClick={() => onClick(item.value)}
                className="flex items-center gap-2 hover:bg-foreground transition p-2 rounded-lg"
              >
                <item.icon size={16} /> {item.name}
              </button>
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {openEdit && (
        <EditChat chatId={chatId} open={openEdit} setOpen={setOpenEdit} />
      )}
    </>
  );
};
