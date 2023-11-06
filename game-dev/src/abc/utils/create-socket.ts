import { io, Socket } from "socket.io-client";

export default function createSocket(
  socketUrl: string | null,
  room: string | null
): Socket {
  if (!socketUrl) {
    throw new Error("Missing Socket URL");
  }
  if (!room) {
    throw new Error("Missing Room ID");
  }

  let socket: Socket;

  if (socketUrl === "http://localhost:5500") {
    socket = io(socketUrl);
  } else {
    socket = io(socketUrl, {
      path: "/api/socket/io",
      addTrailingSlash: false,
    });
  }

  socket.on("connect", () => {
    console.log("socket connected");
    socket.emit("join", { room: room });
  });

  return socket;
}
