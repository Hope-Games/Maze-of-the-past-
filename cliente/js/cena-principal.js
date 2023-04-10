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
    //Personagens1 - Tyler
    this.jogador_1 = this.physics.add.sprite(64, 64, "Tyler");
    this.anims.create({
      key: "Tyler-baixo",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 0,
        end: 3,
      })
      frameRate: 30,
      reapeat: -1,
    });

    this.anims.create({
      key: "Tyler-esquerda",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 4,
        end: 7,
      })
      frameRate: 30,
      reapeat: -1,
    })
  
    this.anims.create({
      key: "Tyler-direita",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 8,
        end: 11,
      })
      frameRate: 30,
      reapeat: -1,
    })
      
    this.anims.create({
      key: "Tyler-cima",
      frames: this.anims.generateFrameNumbers("Tyler", {
        start: 12,
        end: 15,
      })
      frameRate: 30,
      reapeat: -1,
  
    })
  
      {
      
    });
    //
    //Personagens2 - Stella
    this.load.spritesheet("Stella", "./assets/Stella.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    /*Botões */
    this.load.spritesheet("cima", "./assests/cima.png" , {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet("baixo", "./assests/cima.png" , {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet("esquerda", "./assests/cima.png" , {
      frameWidth: 64,
      frameHeight: 64,
    })
    this.load.spritesheet("direita", "./assests/cima.png" , {
      frameWidth: 64,
      frameHeight: 64,
    })
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
    //Personagem1 - Tyler
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
  
    //Personagem2 -Stella
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
  

  /*Botões */
  this.cima = this.add
    .sprite(100,350, "cima", 0) 
    .setInteractive()
    .on("pointdown", () => {
      this.cima.setFrame(1);
    })
    .on("pointerup", () => {
      this.cima.setFrame(0);
      this.Tyler.setVelocityY (-50);
      this.Tyler.anims.play("Tyler-cima")
    });


  this.add.sprite(450,450, "esquerda")

  this.direita = this.add
    .sprite(150,400, "direita", 0) 
    .setInteractive()
    .on("pointerdown", () => {
      this.direita.setFrame(1);
      this.Tyler.setVelocityX (50);
      this.Tyler.anims.play("Tyler-direita")
    })
  }
  
  upload() {}
}
