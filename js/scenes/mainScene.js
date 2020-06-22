import "phaser";

import { BulletGroup } from "../sprites/bullet";
import { Ship } from "../sprites/ship";
import { SpaceMineGroup } from "../sprites/space_mine";

export class MainScene extends Phaser.Scene {
  constructor() {
    super("mainscene");
  }
  preload() {
    this.load.image("bg", "../assets/background.jpg");
    //my ship
    this.load.image("ship", "../assets/my_ship.png");
    //bullet
    this.load.image("bullet", "../assets/bullet.png");
    this.load.image("spaceMine", "../assets/space_mine.png");
    this.load.audio("explode", ["../assets/sndExplode1.wav"]);
    this.load.audio("laser", "../assets/sndLaser.wav");
  }

  create() {
    this.add.image(256, 256, "bg");
    this.player = new Ship(this, 100, 480, "ship");
    this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.keyLEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.keyRIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    this.keySPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );
    this.bulletGroup = new BulletGroup(this.physics.world, this);
    this.spaceMines = new SpaceMineGroup(this.physics.world, this);
    this.keySPACE.on("down", () => {
      this.bulletGroup.fire(this.player.x, this.player.y);
    });
    const timer = this.time.addEvent({
      delay: 100,
      callback: () => {
        var x = Phaser.Math.Between(0, 500);
        this.spaceMines.createMine(x, 16);
      },
      callbackScope: this,
      loop: true,
    });
    this.physics.add.collider(
      this.player,
      this.spaceMines,
      () => {
        this.physics.pause();

        this.player.setTint(0xff0000);
        timer.remove();
      },
      null,
      this
    );
    this.physics.add.collider(
      this.bulletGroup,
      this.spaceMines,
      (bullet, mine) => {
        this.bulletGroup.hit(bullet);
        mine.destroy();
      },
      null,
      this
    );
  }
  update() {
    if (this.keyDOWN.isDown) {
      this.player.moveDown();
    } else if (this.keyLEFT.isDown) {
      this.player.moveLeft();
    } else if (this.keyUP.isDown) {
      this.player.moveUp();
    } else if (this.keyRIGHT.isDown) {
      this.player.moveRight();
    } else {
      this.player.stop();
    }

    this.bulletGroup.resetBullet();
  }
}
