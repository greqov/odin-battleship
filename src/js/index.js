import UI from './UI';
import game from './game';
import '../css/styles.css';

game.init();

UI.init();
UI.renderPlayerArea(game.players[1]);
UI.renderBoard(game.players[1]);
console.log(game.players[1]);
