import { create } from "zustand";

export type OptimisticMessageProps = {
  text: string;
  userId: string | null;
};

interface ChatStore {
  addOptimisticMessage: ((action: OptimisticMessageProps) => void) | null;
  setAddOptimisticMessage: (
    addOptimisticMessage: (action: OptimisticMessageProps) => void
  ) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  addOptimisticMessage: null,
  setAddOptimisticMessage: (addOptimisticMessage) =>
    set({ addOptimisticMessage }),
}));
