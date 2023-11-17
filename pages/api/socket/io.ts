import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";
import { SocketEvents } from "@/lib/socket-events";
import { User } from "@prisma/client";

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
        ({ room, user }: { room: string; user: User }) => {
          if (socket.rooms.has(room)) return;
          console.log(`${user.username} joining room /${room}/`);
          socket.join(room);
          socket.to(room).emit(SocketEvents.USER_JOINED, { user });
        }
      );

      socket.on(
        SocketEvents.LEAVE_ROOM,
        ({ room, user }: { room: string; user: User }) => {
          if (!socket.rooms.has(room)) return;
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
