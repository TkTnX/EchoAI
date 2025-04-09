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

    const newMessage = await prisma.message.create({
      data: {
        text: body.message,
        chatId: body.chatId,
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

    console.log(resp);

    await prisma.message.create({
      data: {
        text: resp.choices[0].message.content as string,
        chatId: body.chatId,
      },
    });

    if (!newMessage) {
      console.log("Message not created");
      return NextResponse.json({ error: "Message not created" });
    }
    revalidatePath(`/c/${body.chatId}`);
    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
