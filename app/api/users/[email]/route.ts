import prisma from "@/prisma/prisma";
import { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

// TODO: Доделать авторизацию на next auth.
// * 1) Сейчас почему-то не инициализируется prisma client. Пофиксить
// * 2) Попробовать повторить за этим примером  -https://nextjs.org/learn/dashboard-app/adding-authentication
// * 3) Также можно посмотреть ошибки в терминале, может что-то увидишь.

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const email = req.query.email;
    if (!email) {
      throw new Error("Email is required");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: String(email),
      },
    });
    if (!user) throw new Error("User not found");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "Something went wrong" });
  }
}
