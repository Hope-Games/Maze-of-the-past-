export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON("mapa", "./assets/mapa.json");

    /* Tilesets */
    this.load.image("bloco", "./assets/bloco.png");
    this.load.image("chao", "./assets/chao.png");

    /* Personagem 1: Tyler */
    this.load.spritesheet("Tyler", "./assets/personagens/Tyler.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Personagem 2: Derek */
    this.load.spritesheet("Derek", "./assets/personagens/Derek.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Artefato */
    this.load.spritesheet("chave", "./assets/icones/chave.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /*Botões */
    this.load.spritesheet("cima", "./assets/botões/cima.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("baixo", "./assets/botões/baixo.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("esquerda", "./assets/botões/esquerda.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("direita", "./assets/botões/direita.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("tela-cheia", "./assets/abertura/tela-cheia.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /* Sons */
    this.load.audio("trilha", "./assets/áudios/audio_principal.mp3");
    this.load.audio("som-chave", "./assets/áudios/som_chave.mp3");
  }

  create() {
    /* Trilha sonora */
    this.trilha = this.sound.add("trilha");
    this.trilha.loop = true;
    this.trilha.play();

    /* Tilemap */
    this.mapa = this.make.tilemap({
      key: "mapa",
    });

    /* Tilesets */
    this.tileset_mapa_bloco = this.mapa.addTilesetImage("bloco", "bloco");
    this.tileset_mapa_chao = this.mapa.addTilesetImage("chao", "chao");

    /* chão */
    this.chao = this.mapa.createLayer("chao", this.tileset_mapa_chao, 0, 0);

    /* bloco */
    this.bloco = this.mapa.createLayer("bloco", this.tileset_mapa_bloco, 0, 0);

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "Tyler";
      this.jogador_1 = this.physics.add.sprite(100, 50, this.local);
      this.remoto = "Derek";
      this.jogador_2 = this.add.sprite(1820, 2000, this.remoto);
    } else {
      this.remoto = "Tyler";
      this.jogador_2 = this.add.sprite(100, 50, this.remoto);
      this.local = "Derek";
      this.jogador_1 = this.physics.add.sprite(1820, 2000, this.local);
    }

    this.anims.create({
      key: "jogador_1-A-parado",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 0,
      }),
      frameRate: 1,
    });

    this.anims.create({
      key: "jogador_1-A-baixo",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador_1-A-esquerda",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 4,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador_1-A-direita",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 8,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "jogador_1-A-cima",
      frames: this.anims.generateFrameNumbers(this.local, {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });

    /* Chaves */
    this.som_chave = this.sound.add("som-chave");
    this.anims.create({
      key: "chave-pulando",
      frames: this.anims.generateFrameNumbers("chave", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      repeat: -1,
    });

    this.chaves = [
      {
        x: 560,
        y: 350,
        objeto: undefined,
      },
      {
        x: 2000,
        y: 1000,
        objeto: undefined,
      },
      {
        x: 1500,
        y: 1000,
        objeto: undefined,
      },
      {
        x: 4000,
        y: 6000,
        objeto: undefined,
      },
      {
        x: 3000,
        y: 3500,
        objeto: undefined,
      },
    ];
    this.chaves.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "chave");
      item.objeto.anims.play("chave-pulando");
      this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_chave,
        null,
        this
      );
    });

    this.chaves_coletadas = 0;

    /* Botões */
    this.cima = this.add
      .sprite(125, 330, "cima", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200);
        this.jogador_1.anims.play("jogador_1-A-cima");
      })
      .on("pointerout", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200);
        this.jogador_1.anims.play("jogador_1-A-baixo");
      })
      .on("pointerout", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(60, 370, "esquerda", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("jogador_1-A-esquerda");
      })
      .on("pointerout", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 370, "direita", 0)
      .setInteractive()
      .on("pointerover", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("jogador_1-A-direita");
      })
      .on("pointerout", () => {
        this.direita.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.tela_cheia = this.add
      .sprite(750, 50, "tela-cheia", 0)
      .setInteractive()
      .on("pointerdown", () => {
        if (this.scale.isFullscreen) {
          this.tela_cheia.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          this.tela_cheia.setFrame(1);
          this.scale.startFullscreen();
        }
      })
      .setScrollFactor(0);

    /* Colisões por tile */
    this.bloco.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(
      this.jogador_1,
      this.bloco,
      this.collision,
      null,
      this
    );

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena (1920x1920) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.physics.world.setBounds(0, 0, 1920, 1920);
    this.cameras.main.startFollow(this.jogador_1);

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      if (artefatos.chaves) {
        this.chaves += artefatos.chaves;
        console.log(this.chaves)
      }
    });
  }

  update() {
    let frame;
    try {
      frame = this.jogador_1.anims.getFrameName();
    } catch (e) {
      frame = 0;
    }
    this.game.socket.emit("estado-publicar", this.game.sala, {
      frame: frame,
      x: this.jogador_1.body.x + 32,
      y: this.jogador_1.body.y + 32,
    });
  }

  collision() {
    /* Tremer a tela por 100 ms com baixa intensidade (0.01) */
    //this.cameras.main.shake(100, 0.01);
    /* Vibrar o celular pelos mesmos 100 ms */
    //window.navigator.vibrate([100]);
  }

  coletar_chave(jogador, chave) {
    this.som_chave.play();
    chave.disableBody(true, true);
    this.chaves_coletadas += 1;
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      chaves: this.chaves_coletadas,
    });
  }
}
