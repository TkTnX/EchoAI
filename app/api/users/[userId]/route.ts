/* eslint-disable @typescript-eslint/ban-ts-comment */
import prisma from "@/prisma/prisma";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!
    );

    const userId = (await params).userId;
    const formData = await req.formData();

    const img = formData.get("img") as File;
    const username = formData.get("username");

    const updateData = {};
    if (img !== null && img.size > 0) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(randomUUID(), img);

      if (error) return NextResponse.json({ error });

      const { data: publicUrlData } = await supabase.storage
        .from("avatars")
        .getPublicUrl(data.path);
      if (!publicUrlData)
        return NextResponse.json({ error: "Не удалось сохранить фото" });

      // @ts-ignore
      updateData.img = publicUrlData.publicUrl;
    }

    if (username && username !== undefined && username !== "") {
      //    @ts-ignore
      updateData.username = username;
    }

    const res = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
};
