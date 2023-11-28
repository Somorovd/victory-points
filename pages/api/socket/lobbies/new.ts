import { currentUserPages } from "@/lib/current-user-pages";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { SocketEvents } from "@/lib/socket-events";
import { string } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, password, capacity, gameName, socketId } = req.body;
    const user = await currentUserPages(req);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lobby = await db.lobby.create({
      data: {
        name,
        capacity,
        password,
        gameName,
        inviteCode: uuidv4(),
        hostId: user.id,
        users: {
          connect: [{ id: user.id }],
        },
      },
    });

    const room = `lobby:${lobby.id}`;
    res.socket?.server.io.in(socketId).socketsJoin(room);

    return res.status(200).json(lobby);
  } catch (error) {
    console.log("[LOBBY_NEW", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
