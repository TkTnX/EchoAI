"use client";
import { SmilePlus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../alert-dialog";
import { Input } from "../input";
import { Button } from "../Button";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/AuthStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  chatId: string;
};

export const EditChat = ({ open, setOpen, chatId }: Props) => {
  const [openEmoji, setOpenEmoji] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<null | string>(null);
  const { fetchUser } = useAuthStore();
  const { data: session } = useSession();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const name = formData.get("name");

      const res = await axiosInstance.put(`/chats/${chatId}`, {
        name,
        img: selectedEmoji,
      });

      if (res.status === 200) {
        setOpen(false);

        return toast.success("Чат успешно изменен!");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Не удалось изменить чат!");
    } finally {
      router.refresh();
      await fetchUser(session?.user);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Изменение чата</AlertDialogTitle>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </AlertDialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input name="name" placeholder="Название чата" />
          <button
            type="button"
            onClick={() => setOpenEmoji((prev) => !prev)}
            className="flex items-center gap-2 group "
          >
            <span className="opacity-60 group-hover:opacity-100">
              Изменить иконку чата
            </span>
            <SmilePlus className="opacity-60 group-hover:opacity-100" />
            {selectedEmoji && (
              <p className="opacity-100 border border-bgLight p-1 rounded-lg">
                {selectedEmoji}
              </p>
            )}
          </button>
          {openEmoji && (
            <EmojiPicker
              onEmojiClick={(e) => {
                setSelectedEmoji(e.emoji);
                setOpenEmoji(false);
              }}
              className="absolute !bg-foreground !border-foreground"
            />
          )}
          <Button type="submit" className="text-center  justify-center">
            Изменить
          </Button>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
