import Image from "next/image";
import { ClearChat } from "../ClearChat";
import { ChatType } from "@/types";

type Props = {
  chat: ChatType;
};

export const ChatHeader = ({ chat }: Props) => {
  return (
    <header className="w-full border-b border-[#3a3a40] pb-3.5 flex items-center justify-between pl-10 md:pl-0">
      <div className="flex items-center gap-1">
        {chat.img ? (
          <span>{chat.img}</span>
        ) : (
          <Image src="/icons/chat.svg" alt="Chat Icon" width={12} height={12} />
        )}

        <p className="text-xs opacity-80">{chat.name}</p>
      </div>
      {chat.messages.length > 0 && <ClearChat chatId={chat.id} />}
    </header>
  );
};
