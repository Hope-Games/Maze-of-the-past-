export default class principal extends Phaser.Scene {
  constructor() {
    super("principal");
  }

  preload() {
    /* Tilemap */
    this.load.tilemapTiledJSON("interior", "./assets/mapa-novo/interior.json");

    /* Tilesets */
    this.load.image("interior", "./assets/mapa-novo/interior.png");
    this.load.image("misc", "./assets/mapa-novo/misc.png");
    this.load.image("comodo", "./assets/mapa-novo/comodo.png");
    this.load.image("objetos", "./assets/mapa-novo/objetos.png");
    this.load.image("flores", "./assets/mapa-novo/flores.png");
    this.load.image("espelho", "./assets/mapa-novo/espelho.png");
    this.load.image("armarios", "./assets/mapa-novo/armarios.png");

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

    /*Pergaminho */
    this.load.spritesheet("pergaminho", "./assets/icones/pergaminho.png", {
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
    this.mensagem = 0;

    /* Tilemap */
    this.mapa = this.make.tilemap({
      key: "interior",
    });

    /* Tilesets */
    this.tileset_interior = this.mapa.addTilesetImage("interior", "interior");
    this.tileset_misc = this.mapa.addTilesetImage("misc", "misc");
    this.tileset_comodo = this.mapa.addTilesetImage("comodo", "comodo");
    this.tileset_objetos = this.mapa.addTilesetImage("objetos", "objetos");
    this.tileset_flores = this.mapa.addTilesetImage("flores", "flores");
    this.tileset_espelho = this.mapa.addTilesetImage("espelho", "espelho");
    this.tileset_armarios = this.mapa.addTilesetImage("armarios", "armarios");

    /* Camadas (layers) */
    this.fundo = this.mapa.createLayer(
      "fundo",
      [
        this.tileset_interior,
        this.tileset_misc,
        this.tileset_comodo,
        this.tileset_objetos,
        this.tileset_flores,
        this.tileset_espelho,
        this.tileset_armarios,
      ],
      0,
      0
    );

    this.comodos = this.mapa.createLayer(
      "comodos",
      [
        this.tileset_interior,
        this.tileset_misc,
        this.tileset_comodo,
        this.tileset_objetos,
        this.tileset_flores,
        this.tileset_espelho,
        this.tileset_armarios,
      ],
      0,
      0
    );

    this.objetos = this.mapa.createLayer(
      "objetos",
      [
        this.tileset_interior,
        this.tileset_misc,
        this.tileset_comodo,
        this.tileset_objetos,
        this.tileset_flores,
        this.tileset_espelho,
        this.tileset_armarios,
      ],
      0,
      0
    );

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "Tyler";
      this.jogador_1 = this.physics.add.sprite(150, 150, this.local);
      this.remoto = "Derek";
      this.jogador_2 = this.add.sprite(1820, 2000, this.remoto);
    } else {
      this.remoto = "Tyler";
      this.jogador_2 = this.add.sprite(150, 150, this.remoto);
      this.local = "Derek";
      this.jogador_1 = this.physics.add.sprite(650, 350, this.local);

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
          );

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

          /* Oferta de candidatos ICE */
          this.game.localConnection.onicecandidate = ({ candidate }) => {
            candidate &&
              this.game.socket.emit("candidate", this.game.sala, candidate);
          };

          /* Associação com o objeto HTML de áudio */
          this.game.localConnection.ontrack = ({ streams: [stream] }) => {
            this.game.audio.srcObject = stream;
          };

          /* Oferta de mídia */
          this.game.localConnection
            .createOffer()
            .then((offer) =>
              this.game.localConnection.setLocalDescription(offer)
            )
            .then(() => {
              this.game.socket.emit(
                "offer",
                this.game.sala,
                this.game.localConnection.localDescription
              );
            });

          this.game.midias = stream;
        })
        .catch((error) => console.log(error));
    }

    /* Recebimento de oferta de mídia */
    this.game.socket.on("offer", (description) => {
      this.game.remoteConnection = new RTCPeerConnection(this.ice_servers);

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      let midias = this.game.midias;
      this.game.remoteConnection.ontrack = ({ streams: [midias] }) => {
        this.game.audio.srcObject = this.game.midias;
      };

      /* Contraoferta de mídia */
      this.game.remoteConnection
        .setRemoteDescription(description)
        .then(() => this.game.remoteConnection.createAnswer())
        .then((answer) =>
          this.game.remoteConnection.setLocalDescription(answer)
        )
        .then(() => {
          this.game.socket.emit(
            "answer",
            this.game.sala,
            this.game.remoteConnection.localDescription
          );
        });
    });

    /* Recebimento de contraoferta de mídia */
    this.game.socket.on("answer", (description) => {
      this.game.localConnection.setRemoteDescription(description);
    });

    /* Recebimento de candidato ICE */
    this.game.socket.on("candidate", (candidate) => {
      let conn = this.game.localConnection || this.game.remoteConnection;
      conn.addIceCandidate(new RTCIceCandidate(candidate));
    });

    //Charada
    this.mensagem = this.physics.add.sprite(100, 200, "pergaminho");
    this.mensagem.body.setAllowGravity(false);
    this.anims.create({
      key: "pergaminho-abrindo",
      frames: this.anims.generateFrameNumbers("pergaminho", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });
    this.mensagem.play("pergaminho-abrindo");

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
        x: 100,
        y: 400,
        objeto: undefined,
      },
      {
        x: 1500,
        y: 1000,
        objeto: undefined,
      },
      {
        x: 650,
        y: 800,
        objeto: undefined,
      },
      {
        x: 1820,
        y: 500,
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

    /* Colisões por camada */
    this.fundo.setCollisionByProperty({ collides: true });
    this.comodos.setCollisionByProperty({ collides: true });
    this.objetos.setCollisionByProperty({ collides: true });

    /* Colisão entre personagem 1 e mapa (por layer) */
    this.physics.add.collider(this.jogador_1, this.fundo, null, null, this);
    this.physics.add.collider(this.jogador_1, this.comodos, null, null, this);
    this.physics.add.collider(this.jogador_1, this.objetos, null, null, this);

    // Colisão para ativar as falas
    this.physics.add.overlap(
      this.jogador_1,
      this.invisivel,
      this.mensagem1,
      null,
      this
    );

    // Colisão para desativar as falas
    this.physics.add.overlap(
      this.jogador_1,
      this.invisivel2,
      this.mensagem1_0,
      null,
      this
    );

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena (1920x1920) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 1920, 1920);
    this.physics.world.setBounds(0, 0, 1920, 1920);
    this.cameras.main.startFollow(this.jogador_1);

    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.jogador_2.setFrame(frame);
      this.jogador_2.x = x;
      this.jogador_2.y = y;
    });

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      for (let i = 0; i < artefatos.length; i++) {
        if (artefatos[i]) {
          this.chaves[i].objeto.enableBody(
            false,
            this.chaves[i].x,
            this.chaves[i].y,
            true,
            true
          );
        } else {
          this.chaves[i].objeto.disableBody(true, true);
        }
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

  mensagem1() {
    this.mensagem.enableBody(true, 700, 450, true, true);
  }
  mensagem1_0() {
    this.mensagem.disableBody(true, true);
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
    this.game.socket.emit(
      "artefatos-publicar",
      this.game.sala,
      this.chaves.map((chave) => chave.objeto.visible)
    );
  }
}
