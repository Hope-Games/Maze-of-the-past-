export default class abertura extends Phaser.Scene {
    constructor() {
        super("abertura");
    }

    preload() {
        // Carregamento de arquivos/objetos em memória
        this.load.image("logo-do-jogo", "./assets/logo-do-jogo.png");
    }

    create() {
        // Carregar em tela e/ou
        // Registrar eventos
         this.imagem = this.add
         .image(400, 225, "logo-do-jogo")
      
      };

    }

    update() {
        // Código executado a cada frame
    }
}