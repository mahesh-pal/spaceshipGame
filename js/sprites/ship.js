import "phaser";

export class Ship extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, name) {
    super(scene, x, y, name);
    this.scene.physics.world.enableBody(this, 0);
    this.scene.add.existing(this);
    this.scale = 0.15;
    this.setCollideWorldBounds(true);
  }

  moveUp() {
    this.setVelocityY(-160);
  }

  moveLeft() {
    this.setVelocityX(-160);
  }

  moveRight() {
    this.setVelocityX(160);
  }
  moveDown() {
    this.setVelocityY(160);
  }
  stop() {
    this.setVelocity(0, 0);
  }
}
