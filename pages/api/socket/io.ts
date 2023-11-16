import { Server as NetServer } from "http";
import { Server as ServerIO } from "socket.io";
import { NextApiRequest } from "next";
import { NextApiResponseServerIo } from "@/types";

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

      socket.on("join", ({ room }: { room: string }) => {
        console.log(`joining room /${room}/`);
        socket.join(room);
      });

      socket.on(
        "gameEvent",
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

    io.on("disconnect", (socket) => {
      console.log(`user disconnected: ${socket.id}`);
    });
  }

  res.end();
};

export default ioHandler;
