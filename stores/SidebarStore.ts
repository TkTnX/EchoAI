import { create } from "zustand";

interface SidebarStore {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useSidearStore = create<SidebarStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
