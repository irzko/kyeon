import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { love } = await req.json();

  if (love) {
    await kv.set("love", love);

    return NextResponse.json(love);
  } else {
    return NextResponse.json(love);
  }
}

export async function GET() {
  return NextResponse.json(await kv.get("love"));
}
