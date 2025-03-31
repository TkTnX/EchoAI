"use client";

import { useSidearStore } from "@/stores/SidebarStore";
import { AlignLeft } from "lucide-react";

export const OpenSidebarButton = () => {
  const { open, setOpen } = useSidearStore();
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="block md:hidden absolute left-3 top-3 z-20"
      >
        <AlignLeft color="#777779" className="hover:stroke-white transition" />
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="bg-[#00000067] absolute inset-0 w-full h-full block md:hidden"
        />
      )}
    </>
  );
};
