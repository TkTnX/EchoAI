import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const UserButton = () => {
  // TEMP
  const user = "123";
  return (
    <Link
      href={user ? "/account" : "/signin"}
      className="flex items-center gap-2 hover:bg-bgLight rounded-lg transition absolute bottom-5 left-3 right-3"
    >
      <div className="p-2 bg-bgLight  rounded-full">
        {user ? (
          <Image
            alt="User"
            src="/icons/avatar.svg"
            className="object-cover"
            width={24}
            height={24}
          />
        ) : (
          <User size={24} />
        )}
      </div>
      <h6>{user ? "ACCOUNT NAME" : "Enter to account"}</h6>
    </Link>
  );
};
