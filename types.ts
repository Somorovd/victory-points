import { Server as NetServer, Socket } from "net";
import { Server as ServerIO } from "socket.io";
import { NextApiResponse } from "next";
import { Lobby, User } from "@prisma/client";

export type LobbyWithHost = Lobby & { host: User };

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
