"use client";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const UserButton = () => {
  const data = useSession();
  const user = data.data?.user;
  if (data.status === "loading")
    return (
      <p className="flex items-center gap-2 hover:bg-bgLight rounded-lg transition absolute bottom-5 left-3 right-3">
        Загрузка....
      </p>
    );
  return (
    <Link
      href={user ? "/account" : "/login"}
      className="flex items-center gap-2 hover:bg-bgLight rounded-lg transition absolute bottom-5 left-3 right-3"
    >
      <div className="p-2 bg-bgLight  rounded-full">
        {user ? (
          <Image
            alt="User"
            src={user.image || "/icons/avatar.svg"}
            className="object-cover"
            width={24}
            height={24}
          />
        ) : (
          <User size={24} />
        )}
      </div>
      <h6>{user ? user.name : "Войти"}</h6>
    </Link>
  );
};
