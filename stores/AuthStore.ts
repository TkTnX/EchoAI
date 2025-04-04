import { User } from "@/generated/prisma";
import { create } from "zustand";

interface AuthStore {
  user: null | User;
  error: null | string;
  loading: boolean;
  fetchUser: (sessionUser: {name: string, email: string, image: null | string}) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  error: null,
  loading: false,
  fetchUser: async (sessionUser) => {
      try {
          set({ loading: true });
          
        //   TODO: Доделать получение пользователя
    } catch (error) {
      console.log(error);
    }
  },
}));
