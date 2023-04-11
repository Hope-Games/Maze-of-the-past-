export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON("mapa", "./assets/mapa.json");

    /* Tilesets */
    this.load.image("grama", "./assets/grama.png");
    this.load.image("chao", "./assets/chao.png");

    /* Personagem 1: Tyler */
    this.load.spritesheet("Tyler", "./assets/Tyler.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Personagem 2: Stella */
    this.load.spritesheet("Stella", "./assets/Stella.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    /*Botões */
    this.load.spritesheet("cima", "./assets/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("baixo", "./assets/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("esquerda", "./assets/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("direita", "./assets/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    /* Tilemap */
    this.mapa = this.make.tilemap({
      key: "mapa",
    });

    /* Tilesets */
    this.tileset_mapa_grama = this.mapa.addTilesetImage("grama", "grama");
    this.tileset_mapa_chao = this.mapa.addTilesetImage("chao", "chao");

    /* Layer 0: grama */
    this.grama = this.mapa.createLayer("grama", this.tileset_mapa_grama, 0, 0);

    /* Layer 1: chão */
    this.chao = this.mapa.createLayer(
      "chao",
      this,
      this.tileset_mapa_grama,
      0,
      0
    );

    /* Personagem 1: Tyler */
    this.Tyler = this.physics.add.sprite(200, 225, "Tyler");

    this.anims.create({
      key: "Tyler-parado",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "Tyler-baixo",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-esquerda",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-direita",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "Tyler-cima",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    /* Personagem 2: Stella */
    this.Stella = this.physics.add.sprite(600, 225, "Stella");

    /*Botões */
    /* Botões */
    this.cima = this.add
      .sprite(120, 330, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.Tyler.setVelocityY(-100);
        this.Tyler.anims.play("Tyler-cima");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.Tyler.setVelocityY(0);
        this.Tyler.anims.play("Tyler-parado");
      });

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.Tyler.setVelocityY(100);
        this.Tyler.anims.play("Tyler-baixo");
      })
      .on("pointerup", () => {
        this.baixo.setFrame(0);
        this.Tyler.setVelocityY(0);
        this.Tyler.anims.play("Tyler-parado");
      });

    this.esquerda = this.add
      .sprite(50, 400, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.Tyler.setVelocityX(-100);
        this.Tyler.anims.play("Tyler-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.Tyler.setVelocityX(0);
        this.Tyler.anims.play("Tyler-parado");
      });

    this.direita = this.add
      .sprite(190, 400, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.Tyler.setVelocityX(100);
        this.Tyler.anims.play("Tyler-direita");
      })
      .on("pointerup", () => {
        this.direita.setFrame(0);
        this.Tyler.setVelocityX(0);
        this.Tyler.anims.play("Tyler-parado");
      });
  }

  upload() {}
}
