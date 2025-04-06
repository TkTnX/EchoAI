import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const newMessage = await prisma.message.create({
      data: {
        text: body.message,
        chatId: body.chatId,
        userId: body.userId,
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
