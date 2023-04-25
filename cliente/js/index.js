// Configuração do jogo
import config from "./config.js";
//
//Importar códigos das cenas
//Cena de abertura
import abertura from "./cena-abertura.js";
// Cena principal
import principal from "./cena-principal.js"
// Cena de encerramento
//import fim_do_jogo from "./cena-fim-do-jogo.js"
//import final_feliz from "./cena-final-feliz.js"


class Game extends Phaser.Game {
  constructor() {
    super(config);
    //
    // Carreagar as cenas
    this.scene.add("abertura", abertura);
    this.scene.add("principal", principal);
    //this.scene.add("fim-do-jogo", fim_do_jogo);
    //this.scene.add("final-feliz", final_feliz);
    //
    // Inciar pela cena de abertura
    this.scene.start("abertura");
  }
}

window.onload = () => {
  window.game = new Game();
};