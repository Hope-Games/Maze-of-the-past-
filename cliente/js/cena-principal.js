export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    this.load.spritesheet("Tyler", "./assets/Tyler.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //
    this.load.spritesheet("Stella", "./assets/Stella.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.Tyler = this.physics.add.sprite(200, 225, "Tyler");
    //
    this.anims.create({
      key: "Tyler-baixo",
      
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });



    //
    this.Stella = this.physics.add.sprite(600, 225, "Stella");
    //
    this.anims.create({
      key: "Stella-baixo",
      frames: this.anims.generateFrameNumbers("Stella", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //
    this.Tyler.anims.play("Tyler-baixo", true);
    this.Stella.anims.play("Stella-baixo", true);
  }

  upload() {}
}
