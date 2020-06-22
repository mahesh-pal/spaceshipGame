import "Phaser";

export class SpaceMine extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "spaceMine");
    this.scene.physics.world.enableBody(this, 0);
    this.scene.add.existing(this);
    this.scale = 0.1;
    this.setCollideWorldBounds(true);
  }
  move() {
    this.setVelocity(Phaser.Math.Between(-200, 200), 100);
    this.setBounce(1);
  }
}

export class SpaceMineGroup extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene, {
      classType: SpaceMine,
      key: "spaceMine",
      setScale: { x: 1, y: 1, stepX: 0, stepY: 0 },
      quantity: 0,
      frameQuantity: 0,
    });
  }

  createMine(x, y) {
    const mine = this.create(x, y);
    mine.move();
  }
}
