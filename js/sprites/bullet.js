import "Phaser";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "bullet");
  }

  makeInvisible() {
    this.setActive(false);
    this.setVisible(false);
    this.disableBody(false);
  }

  fire(x, y) {
    this.body.reset(x, y);
    this.setActive(true);
    this.setVisible(true);
    this.enableBody();
    this.setVelocityY(-300);
  }
}

export class BulletGroup extends Phaser.Physics.Arcade.Group {
  constructor(world, scene) {
    super(world, scene, {
      classType: Bullet,
      key: "bullet",
      quantity: 20,
      active: false,
      visible: false,
      setScale: { x: 0.11, y: 0.11, stepX: 0, stepY: 0 },
    });
  }

  fire(x, y) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      bullet.fire(x, y);
    }
  }

  hit(bullet) {
    bullet.makeInvisible();
  }

  resetBullet() {
    this.children.iterate((bullet) => {
      if (bullet.y <= -20) {
        bullet.makeInvisible();
      }
    });
  }
}
