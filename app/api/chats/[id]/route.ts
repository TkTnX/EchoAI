import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;

    await prisma.chat.delete({
      where: { id },
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Успешно!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const id = (await params).id;
    const body = await req.json();

    const updateData = {};

    // Добавляем img, только если оно не null и не undefined
    if (body.img !== null && body.img !== undefined) {
      //    @ts-ignore
      updateData.img = body.img;
    }

    if (body.name && body.name !== undefined && body.name !== "") {
      //    @ts-ignore
      updateData.name = body.name;
    }

    await prisma.chat.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Успешно!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
