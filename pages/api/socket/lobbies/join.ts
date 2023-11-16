import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { db } from "@/lib/db";
import { currentUserPages } from "@/lib/current-user-pages";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponseServerIo
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { password, lobbyId } = req.body;
    const user = await currentUserPages(req);

    if (!lobbyId) {
      return res.status(400).json({ message: "Bad Request - missing lobbyId" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const lobby = await db.lobby.findUnique({ where: { id: lobbyId } });

    if (!lobby) {
      return res.status(404).json({ message: "Lobby not found" });
    }

    if (lobby.password !== password) {
      const error = { password: "Invalid password" };
      return res.status(400).json(error);
    }

    await db.lobby.update({
      where: { id: lobby.id },
      data: {
        users: {
          connect: [{ id: user.id }],
        },
      },
    });

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log("[LOBBY_JOIN_POST", error);
    return res.status(500).json({ message: "Internal Error" });
  }
}
