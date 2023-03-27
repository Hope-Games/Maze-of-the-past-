// Configuração do jogo
import config from "./config.js";
//
//Importar códigos das cenas
//Cena de abertura
import CenaDeAbertura from "./cena.js";
// Cena principal
import principal from "./principal.js"
// Cena de encerramento
import encerramento from "./encerramento.js"

class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // Carreagar as cenas
    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    this.scene.add("encerramento", encerramento);
    //
    // Inciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};