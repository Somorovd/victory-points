import Phaser from "phaser";

import GameScene from "./scenes/game";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scale: {
    parent: "game-container",
    width: 800,
    height: 600,
  },
  scene: [GameScene],
  backgroundColor: "#4466ff",
};

export default new Phaser.Game(config);
