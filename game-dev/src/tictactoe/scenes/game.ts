import Phaser from "phaser";
import { Socket } from "socket.io-client";
import createSocket from "../utils/create-socket";

export default class HelloWorldScene extends Phaser.Scene {
  private room = sessionStorage.getItem("roomId");
  private socketUrl = sessionStorage.getItem("socketUrl");
  private socket!: Socket;
  private spaceKey!: Phaser.Input.Keyboard.Key;

  constructor() {
    super("tictactoe");
    this.socket = createSocket(this.socketUrl, this.room);
  }

  preload() {}

  create() {}
}
