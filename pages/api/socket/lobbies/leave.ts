import { currentUserPages } from "@/lib/current-user-pages";
import { db } from "@/lib/db";
import { SocketEvents } from "@/lib/socket-events";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { lobbyId, sockedId } = req.body;
    const user = await currentUserPages(req);

    if (!lobbyId) {
      return res.status(400).json({ message: "Bad Request - missing lobbyId" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lobby = await db.lobby.findUnique({
      where: { id: lobbyId },
      include: { users: true },
    });

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }

    if (lobby.users.length === 1) {
      await db.lobby.delete({ where: { id: lobbyId } });
    } else {
      await db.lobby.update({
        where: { id: lobbyId },
        data: { users: { disconnect: { id: user.id } } },
      });
    }

    const room = `lobby:${lobby.id}`;
    res.socket?.server.io.in(sockedId).socketsLeave(room);
    res.socket?.server.io.to(room).emit(SocketEvents.USER_LEFT, { user });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log("[LOBBY_LEAVE_POST", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
