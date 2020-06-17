const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};
var game = new Phaser.Game(config);

function preload() {
  //loading background
  this.load.image("bg", "../assets/background.jpg");
  //my ship
  this.load.image("meship", "../assets/my_ship.png");
  //bullet
  this.load.image("bullet", "../assets/bullet.png");
  this.load.image("spaceMine", "../assets/space_mine.png");
}

var cursors;
var myShip;
var bulletGroup;
var spaceMines;
var timer;
function create() {
  this.add.image(256, 256, "bg");

  myShip = this.physics.add.image(256, 500, "meship");
  bulletGroup = this.physics.add.group({
    key: "bullet",
    repeat: 11,
    active: false,
    visible: false,
    quantity: 10,
  });
  spaceMines = this.physics.add.group();
  bulletGroup.children.iterate((child) => (child.scale = 0.11));
  myShip.scale = 0.15;
  myShip.setCollideWorldBounds(true);
  cursors = this.input.keyboard.createCursorKeys();
  timer = this.time.addEvent({
    delay: 100,
    callback: () => {
      var x =
        myShip.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      var mine = spaceMines.create(x, 16, "spaceMine");
      mine.setCollideWorldBounds(true);
      mine.setVelocity(Phaser.Math.Between(-200, 200), 20);
      mine.setScale(0.1);
      mine.setBounce(1);
    },
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(myShip, spaceMines, gameOver, null, this);
  this.physics.add.collider(bulletGroup, spaceMines, hitMine, null, this);
}

function gameOver() {
  this.physics.pause();
  this.physics.pause();

  myShip.setTint(0xff0000);
  timer.remove();

  //  gameOver = true;
}

function hitMine(bullet, mine) {
  mine.destroy();
  bullet.setActive(false);
  bullet.setVisible(false);
}

function update() {
  bulletGroup.children.iterate((bullet) => {
    if (bullet.y <= -20) {
      bullet.y = 500;
      bullet.setVisible(false);
      bullet.setActive(false);
      bullet.setVelocityY(0);
    }
  });
  updateShipPositions();
  if (cursors.space.isDown) {
    const bullet = bulletGroup.getFirstDead(false);
    if (bullet) {
      bullet.body.reset(myShip.x, myShip.y);
      bullet.setActive(true);
      bullet.setVisible(true);
      bullet.setVelocityY(-300);
    }
  }
}

function updateShipPositions() {
  if (cursors.left.isDown) {
    myShip.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    myShip.setVelocityX(160);
  } else if (cursors.up.isDown) {
    myShip.setVelocityY(-160);
    myShip.setVelocityX(0);
  } else if (cursors.down.isDown && !myShip.body.touching.down) {
    myShip.setVelocityY(160);
    myShip.setVelocityX(0);
  } else {
    myShip.setVelocityY(0);
    myShip.setVelocityX(0);
  }
}
