import prisma from "@/prisma/prisma";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
    // TODO: Доделать обновление профиля
    // TODO: Закрыть все todos
    // TODO: Выложить сайт в интернет
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    const userId = (await params).userId;
    const formData = await req.formData();

    const img = formData.get("img");
    const username = formData.get("username");

    const updateData = {};
    if (img !== null && img) {
      console.log(img);
      //   const { data, error } = await supabase.storage
      //     .from("avatars")
      //     .upload(body.img);
      //    @ts-ignore
      updateData.img = body.img;
    }

    if (username && username !== undefined && username !== "") {
      //    @ts-ignore
      updateData.username = body.username;
    }

    const res = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
