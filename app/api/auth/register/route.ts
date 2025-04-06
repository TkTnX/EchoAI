import prisma from "@/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (!body.email || !body.password) {
      return NextResponse.json({ error: "Введите email и пароль" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        username: body.username || null,
        provider: "Credentials",
      },
    });
    if (!user)
      return NextResponse.json({ error: "Не удалось создать пользователя!" });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
