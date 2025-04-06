import { Chat } from "@/generated/prisma";
import Image from "next/image";

type Props = {
  chat: Chat;
};

export const ChatHeader = ({ chat }: Props) => {
  return (
    <header className="w-full border-b border-[#3a3a40] pb-3.5 flex items-center justify-between pl-10 md:pl-0">
      <div className="flex items-center gap-1">
        <Image src="/icons/chat.svg" alt="Chat Icon" width={12} height={12} />
        <p className="text-xs opacity-80">{chat.name}</p>
      </div>
      <button className="flex items-center gap-1 group">
        <Image src="/icons/restart.svg" alt="Restart" width={16} height={16} />
        <p className="text-xs opacity-60 transition group-hover:opacity-100">
          Очистить чат
        </p>
      </button>
    </header>
  );
};
