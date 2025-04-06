import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/prisma/prisma";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Пользователь не авторизован" });
    }

    const userInDb = await prisma.user.findFirst({
      where: {
        email: session.user.email,
      },
      include: {
        chats: true,
      },
    });
    if (!userInDb) {
      return NextResponse.json({
        error: "Пользователь не найден в базе данных",
      });
    }

    return NextResponse.json(userInDb);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
