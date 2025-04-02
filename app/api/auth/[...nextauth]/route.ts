import { axiosInstance } from "@/lib/axiosInstance";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const getUser = async (email: string) => {
  try {
    const user = await axiosInstance.get(`/users/${email}`);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("User not found");
  }
};

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Ваш email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Ваш пароль", type: "password" },
      },
      async authorize(credentials) {
        const res = await getUser(String(credentials.email));
        const user = await res.data;
        console.log(res);

        if (res.status === 200 && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/authorize",
  },
};

export const { auth, signIn, signOut } = NextAuth(authOptions);
