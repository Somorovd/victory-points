import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, gameId } = await req.json();
    const user = await currentUser();

    if (!gameId) {
      return new NextResponse("Bad Request - missing gameId", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lobby = await db.lobby.create({
      data: {
        name,
        gameId,
        password: "password",
        inviteCode: uuidv4(),
        capacity: 1,
        hostId: user.id,
        users: {
          connect: [{ id: user.id }],
        },
      },
    });

    return NextResponse.json(lobby);
  } catch (error) {
    console.log("[LOBBIES_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}