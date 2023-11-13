import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const games = await db.game.findMany();
    return NextResponse.json(games);
  } catch (error) {
    console.log("[GAMES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
