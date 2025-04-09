import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ chatId: string }> }
) => {
  try {
    const chatId = (await params).chatId;

    const res = await prisma.message.deleteMany({
      where: { chatId },
    });

    if (!res) return NextResponse.json({ error: "Что-то пошло не так!" });
    revalidatePath(`/c/${chatId}`);
    return NextResponse.json({ message: "Успешно!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
