import "phaser";
import { config } from "./config/config";
import { MainScene } from "./scenes/mainScene";

class MyGame extends Phaser.Game {
  constructor(config) {
    super(config);
    this.scene.add("mainscene", MainScene);
    this.scene.start("mainscene");
  }

  getVersion() {
    return this.version;
  }
}

window.onload = function () {
  console.log(config);
  new MyGame(config);
};
