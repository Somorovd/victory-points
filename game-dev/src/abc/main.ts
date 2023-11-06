import Phaser from "phaser";

import HelloWorldScene from "./scenes/HelloWorldScene";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	scale: {
		parent: "game-container",
		width: 800,
		height: 600,
	},
	scene: [HelloWorldScene],
	backgroundColor: "#ff6688",
};

export default new Phaser.Game(config);
