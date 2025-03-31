import Image from "next/image";
import Link from "next/link";

export const ChatItem = () => {
  return (
    <Link
      href="/c/CHAT-ID"
      className="flex items-center gap-3 p-3 hover:bg-bgLight rounded-lg transition"
    >
      <Image
        className="hidden md:block"
        src="/icons/chat.svg"
        alt="chat"
        width={16}
        height={16}
      />
      <p>Chat #1</p>
    </Link>
  );
};
