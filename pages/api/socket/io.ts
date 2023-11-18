import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { SocketEvents } from "@/lib/socket-events";
import { User } from "@prisma/client";
import { db } from "@/lib/db";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
  if (!res.socket.server.io) {
    const path = "/api/socket/io";
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path,
      addTrailingSlash: false,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log(`user connected: ${socket.id}`);

      socket.on(
        SocketEvents.JOIN_ROOM,
        async ({ lobbyId, user }: { lobbyId: string; user: User }) => {
          const room = `lobby:${lobbyId}`;
          if (socket.rooms.has(room)) return;

          await db.lobby.update({
            where: { id: lobbyId },
            data: {
              users: {
                connect: [{ id: user.id }],
              },
            },
          });

          console.log(`${user.username} joining room /${room}/`);
          socket.join(room);
          socket.to(room).emit(SocketEvents.USER_JOINED, { user });
        }
      );

      socket.on(
        SocketEvents.LEAVE_ROOM,
        async ({ lobbyId, user }: { lobbyId: string; user: User }) => {
          const room = `lobby:${lobbyId}`;
          if (!socket.rooms.has(room)) return;

          try {
            await db.lobby.update({
              where: { id: lobbyId },
              data: {
                users: {
                  disconnect: [{ id: user.id }],
                },
              },
              include: { users: true },
            });
          } catch (e) {}

          console.log(`${user.username} leaving room /${room}/`);
          socket.to(room).emit(SocketEvents.USER_LEFT, { user });
          socket.leave(room);
        }
      );

      socket.on(
        SocketEvents.GAME_EVENT,
        ({
          room,
          event,
          data,
        }: {
          room: string;
          event: string;
          data: Record<string, any>;
        }) => {
          console.log(`Room /${room}/ recieved event <${event}>`);
          io.to(room).emit(event, data);
        }
      );
    });
  }

  res.end();
};

export default ioHandler;
