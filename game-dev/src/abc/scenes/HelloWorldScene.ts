import Phaser from "phaser";
import { Socket } from "socket.io-client";
import createSocket from "../utils/create-socket";

export default class HelloWorldScene extends Phaser.Scene {
  private room = sessionStorage.getItem("roomId");
  private socketUrl = sessionStorage.getItem("socketUrl");
  private socket!: Socket;
  private spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super("hello-world");
    this.socket = createSocket(this.socketUrl, this.room);
    this.socket.on("keypress", (data) => {
      console.log(data.time, data.msg);
    });
  }

  preload() {
    this.load.image("background", "/abc/background.jpg");
  }

  create() {
    this.add
      .image(0, 0, "background")
      .setOrigin(0, 0)
      .setDisplaySize(this.scale.width, this.scale.height);

    this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        "Press SPACE to send a socket message",
        {
          backgroundColor: "#ffffff",
          color: "#000000",
          fontSize: 32,
          fontStyle: "bold",
          padding: 10,
        }
      )
      .setOrigin(0.5);

    this.spaceKey = this.input.keyboard!.addKey("SPACE");

    this.spaceKey.on("down", () => {
      console.log("sending space socket");
      this.socket.emit("gameEvent", {
        room: this.room,
        event: "keypress",
        data: {
          time: Number(new Date()),
          msg: "testing",
        },
      });
    });
  }
}
