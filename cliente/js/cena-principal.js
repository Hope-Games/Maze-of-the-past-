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
    this.load.spritesheet("presente", "./assets/icones/presente_chave.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("chave", "./assets/icones/chave.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    /*Vazio */
    this.load.spritesheet("vazio", "./assets/icones/vazio.png", {
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

    /* Presentes */
    this.anims.create({
      key: "coletar-presente",
      frames: this.anims.generateFrameNumbers("presente", {
        start: 0,
        end: 4,
      }),
      frameRate: 5,
    });

    this.anims.create({
      key: "chave-pulando",
      frames: this.anims.generateFrameNumbers("presente", {
        start: 5,
        end: 6,
      }),
      frameRate: 2,
      repeat: -1,
    });

    this.presentes = [
      {
        x: 706,
        y: 192,
      },
      {
        x: 1010,
        y: 640,
      },
      {
        x: 3296,
        y: 671,
      },
      {
        x: 1856,
        y: 192,
      },
      {
        x: 3104,
        y: 416,
      },
      {
        x: 705,
        y: 1632,
      },
      {
        x: 1014,
        y: 2080,
      },
      {
        x: 3296,
        y: 2112,
      },
      {
        x: 3104,
        y: 1856,
      },
      {
        x: 1856,
        y: 1632,
      },
    ];

    this.presentes.forEach((item) => {
      item.objeto = this.physics.add.sprite(item.x, item.y, "presente");
    });

    if (this.game.jogadores.primeiro === this.game.socket.id) {
      this.local = "Tyler";
      this.jogador_1 = this.physics.add.sprite(96, 160, this.local);
      this.remoto = "Derek";
      this.jogador_2 = this.add.sprite(95, 2300, this.remoto);
    } else {
      this.remoto = "Tyler";
      this.jogador_2 = this.add.sprite(96, 160, this.remoto);
      this.local = "Derek";
      this.jogador_1 = this.physics.add.sprite(95, 2300, this.local);

      /* Captura de áudio */
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          console.log(stream);

          /* Consulta ao(s) servidor(es) ICE */
          this.game.localConnection = new RTCPeerConnection(
            this.game.ice_servers
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

          /* Associação de mídia com conexão remota */
          stream
            .getTracks()
            .forEach((track) =>
              this.game.localConnection.addTrack(track, stream)
            );

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
      this.game.remoteConnection = new RTCPeerConnection(this.game.ice_servers);

      /* Contraoferta de candidatos ICE */
      this.game.remoteConnection.onicecandidate = ({ candidate }) => {
        candidate &&
          this.game.socket.emit("candidate", this.game.sala, candidate);
      };

      /* Associação com o objeto HTML de áudio */
      this.game.remoteConnection.ontrack = ({ streams: [midia] }) => {
        this.game.audio.srcObject = midia;
      };

      /* Associação de mídia com conexão remota */
      this.game.midias
        .getTracks()
        .forEach((track) =>
          this.game.remoteConnection.addTrack(track, this.game.midias)
        );

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

    this.presentes.forEach((item) => {
      item.objeto.overlap = this.physics.add.overlap(
        this.jogador_1,
        item.objeto,
        this.coletar_presente,
        null,
        this
      );
    });

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

    /* Botões */
    this.cima = this.add
      .sprite(125, 330, "cima", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.jogador_1.setVelocityY(-200);
        this.jogador_1.anims.play("jogador_1-A-cima");
      })
      .on("pointerup", () => {
        this.cima.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.baixo = this.add
      .sprite(120, 400, "baixo", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.baixo.setFrame(1);
        this.jogador_1.setVelocityY(200);
        this.jogador_1.anims.play("jogador_1-A-baixo");
      })
      .on("pointerup", () => {
        this.baixo.setFrame(0);
        this.jogador_1.setVelocityY(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.esquerda = this.add
      .sprite(60, 370, "esquerda", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.esquerda.setFrame(1);
        this.jogador_1.setVelocityX(-200);
        this.jogador_1.anims.play("jogador_1-A-esquerda");
      })
      .on("pointerup", () => {
        this.esquerda.setFrame(0);
        this.jogador_1.setVelocityX(0);
        this.jogador_1.anims.play("jogador_1-A-parado");
      })
      .setScrollFactor(0);

    this.direita = this.add
      .sprite(190, 370, "direita", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.direita.setFrame(1);
        this.jogador_1.setVelocityX(200);
        this.jogador_1.anims.play("jogador_1-A-direita");
      })
      .on("pointerup", () => {
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

    /* Colisão com os limites da cena */
    this.jogador_1.setCollideWorldBounds(true);

    /* Cena (1920x1920) maior que a tela (800x450) */
    this.cameras.main.setBounds(0, 0, 5728, 2560);
    this.physics.world.setBounds(0, 0, 5728, 2560);
    this.cameras.main.startFollow(this.jogador_1);

    this.game.socket.on("estado-notificar", ({ frame, x, y }) => {
      this.jogador_2.setFrame(frame);
      this.jogador_2.x = x;
      this.jogador_2.y = y;
    });

    this.game.socket.on("artefatos-notificar", (artefatos) => {
      if (artefatos.chaves) {
        for (let i = 0; i < artefatos.chaves.length; i++) {
          if (!artefatos.chaves[i]) {
            this.presentes[i].objeto.disableBody(true, true);
          }
        }
      }
      if (artefatos.presentes) {
        for (let i = 0; i < artefatos.presentes.length; i++) {
          if (artefatos.presentes[i]) {
            this.presentes[i].objeto.anims.play("coletar-presente");
            this.presentes[i].objeto.overlap.destroy();
            this.time.delayedCall(
              1000,
              () => {
                this.presentes[i].objeto.overlap = this.physics.add.collider(
                  this.jogador_1,
                  this.presentes[i].objeto,
                  this.coletar_chave,
                  null,
                  this
                );
              },
              null,
              this
            );
          }
        }
      }
    });

    this.vazio = [
      {
        x: 2649,
        y: 211,
      },
      {
        x: 2649,
        y: 1632,
      },
    ];
    this.vazio.forEach((vazio) => {
      vazio.objeto = this.physics.add
        .sprite(vazio.x, vazio.y, "vazio")
        .setImmovable(true);

      this.physics.add.collider(
        this.jogador_1,
        vazio.objeto,
        this.saltar_no_mapa,
        null,
        this
      );
    });
  }

  update() {
    try {
      this.game.socket.emit("estado-publicar", this.game.sala, {
        frame: this.jogador_1.anims.getFrameName(),
        x: this.jogador_1.body.x + 32,
        y: this.jogador_1.body.y + 32,
      });
    } catch (e) {
      console.log(e);
    }

    if (
      Phaser.Geom.Intersects.RectangleToRectangle(
        this.jogador_1.getBounds(),
        this.jogador_2.getBounds()
      )
    ) {
      this.game.scene.stop("principal");
      this.game.scene.start("fim-do-jogo");
    }
  }

  coletar_presente(jogador, presente) {
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      presentes: this.presentes.map(
        (presente) => presente.objeto.anims.isPlaying
      ),
    });
    presente.anims.play("coletar-presente");
    presente.overlap.destroy();
    this.time.delayedCall(
      1000,
      () => {
        presente.anims.play("chave-pulando", true);
        presente.overlap = this.physics.add.overlap(
          this.jogador_1,
          presente,
          this.coletar_chave,
          null,
          this
        );
      },
      null,
      this
    );
  }

  coletar_chave(jogador, chave) {
    this.som_chave.play();
    chave.disableBody(true, true);
    this.game.socket.emit("artefatos-publicar", this.game.sala, {
      chaves: this.presentes.map((chave) => chave.objeto.visible),
    });
  }

  saltar_no_mapa(jogador, vazio) {
    let coletadas = 0;
    this.presentes
      .map((chave) => chave.objeto.visible)
      .forEach((chave) => {
        if (!chave) coletadas += 1;
      });

    if (coletadas === this.presentes.length) {
      this.cameras.main.fadeOut(250);
      this.cameras.main.once("camerafadeoutcomplete", (camera) => {
        camera.fadeIn(250);
        if (this.game.jogadores.primeiro === this.game.socket.id) {
          this.jogador_1.x = 5664;
          this.jogador_1.y = 1716;
        } else {
          this.jogador_1.x = 4224;
          this.jogador_1.y = 1296;
        }
      });
    }
  }
}
