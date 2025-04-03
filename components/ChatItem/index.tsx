import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blur } from "../ui/Blur";
import { MoreHorizontal } from "lucide-react";
import { useSession } from "next-auth/react";

export const ChatItem = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session)
  // TEMP
  const id = 1;
  return (
    <div className="flex items-center gap-3 p-3 hover:bg-bgLight rounded-lg transition relative group overflow-hidden">
      <Link href={"/c/1"} className="absolute inset-0 z-10" />
      <button className="bg-background p-1 rounded-full opacity-0  group-hover:opacity-100  relative z-20  -translate-x-full  group-hover:-translate-x-0 transition">
        <MoreHorizontal size={16} />
      </button>
      <div className="flex items-center gap-3 transition-all -translate-x-10 group-hover:-translate-x-0">
        <Image
          className="hidden md:block"
          src="/icons/chat.svg"
          alt="chat"
          width={16}
          height={16}
        />
        <p>Chat #1</p>
      </div>
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
    </div>
  );
};
