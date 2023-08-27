import { kv } from "@vercel/kv";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { findAll, findById, update } from "@/libs/query";

export async function POST(req: Request) {
  const id = uuidv4();
  const { date, content, felling, author } = await req.json();
  await kv.lpush("diaries", { id, date, content, felling, author });
  console.log({ id, date, content, author, felling });

  return NextResponse.json({ id, date, content, author, felling });
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (id) {
    return NextResponse.json(await findById(id));
  } else {
    return NextResponse.json(await findAll());
  }
}

export async function DELETE(req: Request) {
  const { diary } = await req.json();
  await kv.lrem("diaries", 0, diary);
  return NextResponse.json({ diary });
}

export async function PUT(req: Request) {
  const diary = await req.json();
  await update(diary);
  return NextResponse.json({ diary });
}
