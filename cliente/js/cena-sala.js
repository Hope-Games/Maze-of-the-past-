export default class sala extends Phaser.Scene {
  constructor() {
    super("sala");
  }

  preload() {
    this.load.image("cena-sala", "./assets/abertura/cena_sala.png");
    this.load.image("grade", "./assets/abertura/grade.png");
    this.load.image("botao1", "./assets/abertura/sala_01.png");
    this.load.image("botao2", "./assets/abertura/sala_02.png");
    this.load.image("botao3", "./assets/abertura/sala_03.png");
    this.load.image("botao4", "./assets/abertura/sala_04.png");
    this.load.image("botao5", "./assets/abertura/sala_05.png");
    this.load.image("botao6", "./assets/abertura/sala_06.png");
    this.load.image("botao7", "./assets/abertura/sala_07.png");
    this.load.image("botao8", "./assets/abertura/sala_08.png");
  }

  create() {
    this.imagem = this.add.image(400, 225, "cena-sala").setTint(0xcccccc);
    this.grade = this.add.tileSprite(400, 225, 600, 300, "grade");
    this.mensagem = this.add.text(100, 75, "Escolha uma sala para entrar:", {
      fontFamily: "monospace",
      font: "32px Courier",
      fill: "#cccccc",
    });
    this.salas = [
      {
        numero: "1",
        x: 250,
        y: 150,
        imagem: "botao1",
      },
      {
        numero: "2",
        x: 250,
        y: 215,
        imagem: "botao2",
      },
      {
        numero: "3",
        x: 250,
        y: 285,
        imagem: "botao3",
      },
      {
        numero: "4",
        x: 250,
        y: 350,
        imagem: "botao4",
      },
      {
        numero: "5",
        x: 500,
        y: 150,
        imagem: "botao5",
      },
      {
        numero: "6",
        x: 500,
        y: 215,
        imagem: "botao6",
      },
      {
        numero: "7",
        x: 500,
        y: 285,
        imagem: "botao7",
      },
      {
        numero: "8",
        x: 500,
        y: 350,
        imagem: "botao8",
      },
    ];

    this.salas.forEach((item) => {
      item.botao = this.add
        .image(item.x, item.y, item.imagem)
        .setInteractive()
        .on("pointerdown", () => {
          this.salas.forEach((item) => {
            item.botao.destroy();
          });
          this.game.sala = item.numero;
          this.game.socket.emit("entrar-na-sala", this.game.sala);
        });
    });

    this.game.socket.on("jogadores", (jogadores) => {
      console.log(jogadores);
      if (jogadores.segundo) {
        this.mensagem.destroy();
        this.game.jogadores = jogadores;
        this.grade.destroy();
        this.imagem.destroy();
        this.game.scene.start("principal");
      } else if (jogadores.primeiro) {
        this.mensagem.setText("Aguardando segundo jogador...");
        
        /* Captura de áudio */
        navigator.mediaDevices
          .getUserMedia({ video: false, audio: true })
          .then((stream) => {
            console.log(stream);
            this.game.midias = stream;
          })
          .catch((error) => console.log(error));
      }
    });
  }

  upload() {}
}
