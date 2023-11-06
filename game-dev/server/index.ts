import express, { Express, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: Socket) => {
  console.log("user connected: " + socket.id);

  socket.on("join", ({ room }: { room: string }) => {
    console.log(`joining room /${room}/`);
    socket.join(room);
  });

  socket.on(
    "gameEvent",
    ({ room, event, data }: { room: string; event: string; data: any }) => {
      console.log(`Room /${room}/ recieved event <${event}>`);
      io.to(room).emit(event, data);
    }
  );
});

app.use("/api/socket", (req, res) => {
  console.log("hit the socket route");
});

server.listen(5500, () => {
  console.log("Server started...");
});
