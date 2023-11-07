import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const diaries = await prisma.diary.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(diaries, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.diary.delete({ where: { id } });
  revalidateTag("diary");
  return NextResponse.json({ id }, { status: 200 });
}
