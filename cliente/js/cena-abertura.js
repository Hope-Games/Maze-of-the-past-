export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    // Carregamento de arquivos/objetos em memória
    this.load.image("cena_abertura", "./assets/abertura/cena_abertura.png");
  }

  create() {
    /* Imagem de fundo */
    this.imagem = this.add
      .image(400, 225, "cena_abertura")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("principal");
      });
  }

  upload() {
    // Código executado a cada frame
  }
}
