import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("game");
  }

  preload() {}

  create() {
    this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Welcome to Hearts", {
        fontSize: "32px",
      })
      .setOrigin(0.5);
  }

  update() {}
}
