import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

export async function POST(req: Request) {
  const diary = await req.json();
  await prisma.diary.create({ data: diary });
  return NextResponse.json({ diary }, { status: 201 });
}

export async function GET(req: NextRequest) {
  const diaries = await prisma.diary.findMany({ orderBy: { date: "desc" } });
  return NextResponse.json(diaries, { status: 200 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.diary.delete({ where: { id } });
  return NextResponse.json({ id }, { status: 200 });
}

export async function PUT(req: Request) {
  const diary = await req.json();
  await prisma.diary.update({ where: { id: diary.id }, data: diary });
  return NextResponse.json({ diary }, { status: 200 });
}
