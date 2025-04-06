"use client";
import Image from "next/image";
import Link from "next/link";
import { UserType } from "@/types";
import { User } from "lucide-react";

type Props = {
  user: UserType | null;
};

export const UserButton = ({ user }: Props) => {
  return (
    <Link
      href={user ? "/account" : "/login"}
      className="flex items-center gap-2 hover:bg-bgLight rounded-lg transition absolute bottom-5 left-3 right-3"
    >
      <div className="p-2 bg-bgLight  rounded-full">
        {user ? (
          <Image
            alt="User"
            src={user.img || "/icons/avatar.svg"}
            className="object-cover"
            width={24}
            height={24}
          />
        ) : (
          <User size={24} />
        )}
      </div>
      <h6>{user ? user.username : "Войти"}</h6>
    </Link>
  );
};
