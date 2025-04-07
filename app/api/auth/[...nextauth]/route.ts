import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";


export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.email,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Ваш email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) return null;

        const values = {
          email: credentials.email,
          password: credentials.password,
        };

        const user = await prisma.user.findFirst({
          where: {
            email: values.email,
          },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          values.password,
          user.password || ""
        );

        if (!isPasswordValid) return null;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = user;
        return rest;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: user.email }, { provider: account?.provider }],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: { id: findUser.id },
            data: {
              provider: account?.provider,
            },
          });

          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            username: user.name || user.email,
            img: user.image,
            provider: account?.provider,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async jwt({ token }) {
      const user = await prisma.user.findFirst({
        where: { email: token.email as string },
      });

      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.img = user.img;
        token.createdAt = user.createdAt;
        token.updatedAt = user.updatedAt;
        token.provider = "Credentials";
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.email = token.email as string;
        session.user.image = token.img as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
  pages: {
    error: "/",
    signIn: "/",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
