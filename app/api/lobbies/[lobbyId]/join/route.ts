import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password, lobbyId } = await req.json();
    const user = await currentUser();

    if (!lobbyId) {
      return new NextResponse("Bad Request - missing lobbyId", { status: 400 });
    }

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const lobby = await db.lobby.findUnique({ where: { id: lobbyId } });

    if (!lobby) {
      return new NextResponse("Missing", { status: 404 });
    }

    if (lobby.password !== password) {
      const error = { password: "Invalid password" };
      return new NextResponse(JSON.stringify(error), { status: 400 });
    }

    await db.lobby.update({
      where: { id: lobby.id },
      data: {
        users: {
          connect: [{ id: user.id }],
        },
      },
    });

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("[LOBBY_JOIN_POST", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
