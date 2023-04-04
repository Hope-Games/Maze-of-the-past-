export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    //
    // Mapa
    // Tilemap
    this.load.tilemapTiledJSON("mapa", "./assets/mapa.json");
    //Tilests
    this.load.image("grama", "./assets/grama.png");
    this.load.image("chao", "./assets/chao.png");
    //
    //Personagens1
    this.load.spritesheet("Tyler", "./assets/Tyler.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    //
    //Personagens2
    this.load.spritesheet("Stella", "./assets/Stella.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    //Mapa
    //tilemap
    this.mapa = this.make.tilemap({
      key: "mapa",
    });
    //Tilesets
    this.tileset_mapa_grama = this.mapa.addTilesetImage("grama", "grama");
    this.tileset_mapa_chao = this.mapa.addTilesetImage("chao", "chao");

    //Layer 0: grama
    this.grama = this.mapa.createLayer(
      "grama",
      this.tileset_mapa_grama,
      0,
      0
    );

    //Layer 1: chao
    this.chao = this.mapa.createLayer(
      "chao",
      this,
      this.tileset_mapa_grama,
      0,
      0
    );

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
