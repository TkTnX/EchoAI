import { UserType } from "@/types";
import axios from "axios";
import { Session } from "next-auth";
import { create } from "zustand";

interface AuthStore {
  user: null | UserType;
  error: null | string;
  loading: boolean;
  fetchUser: (sessionUser: Session["user"]) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  error: null,
  loading: false,
  fetchUser: async (sessionUser) => {
    set({ loading: true });
    try {
      if (!sessionUser || !sessionUser.email) {
        return set({ error: "Пользователь не найден в базе данных" });
      }
      const userInDB = await axios.get("/api/auth/me");

      set({ user: userInDB.data, loading: false });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));
