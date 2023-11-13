import { db } from "@/lib/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(
  req: NextApiRequest,
  { params }: { params: { gameName: string } }
) {
  try {
    const lobbies = await db.lobby.findMany({
      where: { gameName: params.gameName as string },
      include: { host: true },
    });
    return NextResponse.json(lobbies);
  } catch (error) {
    console.log("[GAMES_LOBBIES_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
