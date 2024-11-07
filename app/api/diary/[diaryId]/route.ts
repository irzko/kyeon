import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ diaryId: string }> }
) {
  const diaryId = (await params).diaryId;
  const cart = await prisma.diary.findUnique({
    where: {
      id: diaryId,
    },
  });
  return NextResponse.json(cart);
}
