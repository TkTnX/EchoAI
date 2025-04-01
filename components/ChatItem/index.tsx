import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blur } from "../ui/Blur";

export const ChatItem = () => {
  const pathname = usePathname();
  // TEMP
  const id = 1;
  return (
    <Link
      href="/c/1"
      className="flex items-center gap-3 p-3 hover:bg-bgLight rounded-lg transition relative group overflow-hidden"
    >
      <Image
        className="hidden md:block"
        src="/icons/chat.svg"
        alt="chat"
        width={16}
        height={16}
      />
      <p>Chat #1</p>
      {pathname.includes(`/c/${id}`) && (
        <Image
          className="absolute right-2"
          src="/icons/activeChat.svg"
          width={16}
          height={16}
          alt="Active chat"
        />
      )}
      <Blur className="w-[94px] h-[74px] -right-20" />
    </Link>
  );
};
