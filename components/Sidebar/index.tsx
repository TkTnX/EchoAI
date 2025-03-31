"use client";
import Image from "next/image";
import { Search } from "../Search";
import { Chats } from "../Chats";
import Link from "next/link";
import { useSidearStore } from "@/stores/SidebarStore";

export const Sidebar = () => {
  const { open } = useSidearStore();
  return (
    <div
      className={`h-[calc(100vh-64px)] w-full vsm:w-auto  rounded-lg bg-foreground flex md:bg-transparent pt-20 px-3 md:py-0 md:px-0 md:h-full flex-col absolute z-10 md:static  md:flex lg:w-[250px] transition ${
        open ? "translate-x-0" : "translate-x-[-150%] md:translate-x-0"
      } `}
    >
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icons/logo.svg" width={23} height={23} alt="Logo" />
        <h6 className="font-secondary font-bold text-sm">EchoAI.</h6>
      </Link>
      <div className=" bg-foreground  flex-1 rounded-[10px] mt-4 md:py-4 md:px-3 text-xs max-h-full overflow-y-auto">
        {/* SEARCH */}
        <Search />
        {/* CLEAR ALL CHATS */}
        <button className="mt-5 flex items-center gap-3 bg-bgLight p-3 rounded-lg text-xs w-full transition hover:opacity-80">
          <Image
            src="/icons/restart.svg"
            width={18}
            height={18}
            alt="Clear all chats"
          />
          <span className="opacity-50">Удалить все чаты</span>
        </button>
        {/* MY CHATS */}
        <Chats />
      </div>
    </div>
  );
};
