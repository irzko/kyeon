import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const postId = uuidv4();
  const { date, content, author } = await req.json();
  await kv.lpush("posts", { postId, date, content, author });
  return NextResponse.json({ postId, date, content, author });
}

export async function GET() {
  // await kv.lpop("posts");
  return NextResponse.json(await kv.lrange("posts", 0, -1));
}

export async function DELETE(req: Request) {
  const { post } = await req.json();
  await kv.lrem("posts", 0, post);
  return NextResponse.json({ post });
}

export async function UPDATE(req: Request) {
  const { post, content } = await req.json();
  await kv.lset("posts", post, content);
  return NextResponse.json({ post, content });
}
