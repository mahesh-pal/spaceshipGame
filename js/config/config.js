export const config = {
  type: Phaser.AUTO,
  width: 512,
  height: 512,
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
};
