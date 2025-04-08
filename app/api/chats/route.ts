import { connectGiga } from "@/lib/connectGiga";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const giga = await connectGiga();
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    if (!giga)
      return NextResponse.json({
        error: "Не удалось подключиться к нейросети",
      });

    const newChat = await prisma.chat.create({
      data: {
        name: body.message,
        userId: body.userId,
      },
    });

    if (!newChat) {
      console.log("Chat not created");
      return NextResponse.json({ error: "Chat not created" });
    }

    const newMessage = await prisma.message.create({
      data: {
        text: body.message,
        chatId: newChat.id,
        userId: body.userId,
      },
    });

    const resp = await giga.chat({
      messages: [
        {
          role: "user",
          content: newMessage.text,
        },
      ],
    });

    await prisma.message.create({
      data: {
        text: resp.choices[0].message.content as string,
        chatId: newChat.id,
      },
    });

    revalidatePath("/");
    return NextResponse.json(newChat);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();

    await prisma.chat.deleteMany({
      where: {
        userId: body.userId,
      },
    });

    return NextResponse.json({ message: "Успешно!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
