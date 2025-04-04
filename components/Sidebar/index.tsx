"use client";
import Image from "next/image";
import { Search } from "../Search";
import { Chats } from "../Chats";
import Link from "next/link";
import { useSidearStore } from "@/stores/SidebarStore";
import { Button } from "../ui/Button";
import { UserButton } from "../UserButton";

export const Sidebar = () => {
  const { open } = useSidearStore();
  return (
    <div
      className={`h-[calc(100vh-64px)] w-full vsm:w-auto  rounded-lg bg-foreground flex md:bg-transparent pt-20 pl-3 md:py-0 md:px-0 md:h-full flex-col absolute z-10 md:static  md:flex lg:w-[250px] transition ${
        open ? "translate-x-0" : "translate-x-[-150%] md:translate-x-0"
      } `}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" width={23} height={23} alt="Logo" />
        <h6 className="font-secondary font-bold text-sm hover:text-[#fff]">
          EchoAI.
        </h6>
      </Link>
      <div className=" bg-foreground  flex-1 rounded-[10px] mt-4 md:py-4 md:px-3 text-xs max-h-full overflow-y-auto">
        {/* SEARCH */}
        <Search />
        {/* CLEAR ALL CHATS */}
        <Button blurPosition="-right-20" className="mt-5">
          <Image
            src="/icons/restart.svg"
            width={18}
            height={18}
            alt="Clear all chats"
          />
          <span className="opacity-50">Удалить все чаты</span>
        </Button>
        {/* MY CHATS */}
        <Chats />

        {/* USER BUTTON */}
        <UserButton />
      </div>
    </div>
  );
};
