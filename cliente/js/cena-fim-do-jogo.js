export default class fim_do_jogo extends Phaser.Scene {
  constructor() {
    super("fim-do-jogo");
  }
  
  preload() {
    this.load.image("frase-final", "./assets/final/final.png");
  }
  
  create() {
    this.imagem = this.add
      .image(400, 225, "frase-final")
      .setInteractive()
      .on("pointerdown", () => {
        this.imagem.destroy();
        this.game.scene.start("abertura");
      });
  }
}
  