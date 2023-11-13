import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { gameName: string } }
) {
  try {
    const game = db.game.findUnique({ where: { filename: params.gameName } });
    return NextResponse.json(game);
  } catch (error) {
    console.log("[GAMES_LOBBIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
