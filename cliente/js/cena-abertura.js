export default class abertura extends Phaser.Scene {
  constructor() {
    super("abertura");
  }

  preload() {
    // Carregamento de arquivos/objetos em memória
    this.load.image("abertura", "./assets/abertura.png");
  }

  create() {
    // Carregar em tela e/ou
    // Registrar eventos
    this.imagem = this.add
      .image(800, 793, "abertura")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("principal");
      });
  }

  update() {
    // Código executado a cada frame
  }
}
