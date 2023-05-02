export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    // Carregamento de arquivos/objetos em memória
    this.load.image("cena_abertura", "./assets/abertura/cena_abertura.png");

    /* Botões */
    this.load.spritesheet("botao_start", "./assets/abertura/botao_start.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    /* Imagem de fundo */
    this.imagem = this.add.image(400, 225, "cena_abertura");

    /* Botões */
    this.cima = this.add
      .sprite(400, 400, "botao_start", 0)
      .setInteractive()
      .on("pointerdown", () => {
        this.cima.setFrame(1);
        this.imagem.destroy();
        this.cima.destroy();
        this.game.scene.start("principal");
      });
  }

  upload() {
    // Código executado a cada frame
  }
}
