"use client";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../alert-dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "../input";
import { Plus } from "lucide-react";
import { User } from "@/generated/prisma";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  user: User;
};

export const EditProfile = ({ children, user }: Props) => {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState<File | null>(null);
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);
      const res = await axiosInstance.put(`/users/${user.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        setOpen(false);
        router.refresh();
        return toast.success("Профиль обновлен!");
      }
    } catch (error) {
      console.log(error);
      return toast.error("Не удалось обновить профиль");
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle>Изменение профиля</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="relative w-fit cursor-pointer">
              <Image
                alt={user.username}
                src={user.img || "/icons/avatar.svg"}
                width={100}
                height={100}
                className="rounded-full opacity-50 ring-1 ring-white max-w-[100px] max-h-[100px] object-cover"
              />
              <Plus
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                stroke="#fff"
              />
              <input
                onChange={(e) => setImg(e.target.files?.[0] as File)}
                name="img"
                type="file"
                hidden
              />
            </label>
            <span>{user.username}</span>
          </div>
          <Input name="username" placeholder="Имя пользователя" />

          <Button type="submit" className="text-center  justify-center">
            Изменить
          </Button>
          {img && (
            <div>
              <h5>Ваш новый аватар: </h5>
              <Image
                className="rounded-lg"
                alt="Новый аватар"
                src={URL.createObjectURL(img)}
                width={100}
                height={100}
              />
            </div>
          )}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
