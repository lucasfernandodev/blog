import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const redis = Redis.fromEnv();
  const params = req.nextUrl.searchParams
  const slug = params.get('slug');
  
  if (!slug) return new NextResponse("Post slug not found", { status: 400 });

  const views = (await redis.get<number>(["pageviews", "posts", slug].join(":"))) ?? 0
  return NextResponse.json({
    views
  })
}