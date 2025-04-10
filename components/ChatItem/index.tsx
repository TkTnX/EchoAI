import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blur } from "../ui/Blur";
import { MoreHorizontal } from "lucide-react";
import { Chat } from "@/generated/prisma";
import { ChatItemDropdown } from "../ui/Dropdowns";

type Props = {
  chat: Chat;
};

export const ChatItem = ({ chat }: Props) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-bgLight rounded-lg transition relative group overflow-hidden min-h-[48px]">
      <Link href={`/c/${chat.id}`} className="absolute inset-0 z-10" />
      <ChatItemDropdown chatId={chat.id}>
        <button className="bg-background p-1 rounded-full opacity-0  group-hover:opacity-100  relative z-20  -translate-x-full  group-hover:-translate-x-0 transition">
          <MoreHorizontal size={16} />
        </button>
      </ChatItemDropdown>
      <div className="flex items-center gap-3 transition-all -translate-x-10 group-hover:-translate-x-0">
        {chat.img ? (
          <span>{chat.img}</span>
        ) : (
          <Image
            className="hidden md:block"
            src={"/icons/chat.svg"}
            alt="chat"
            width={16}
            height={16}
          />
        )}

        <p className="one-line">{chat.name}</p>
      </div>
      {pathname.includes(`/c/${chat.id}`) && (
        <Image
          className="absolute right-2"
          src="/icons/activeChat.svg"
          width={16}
          height={16}
          alt="Active chat"
        />
      )}
      <Blur className="w-[94px] h-[74px] -right-20" />
    </div>
  );
};
