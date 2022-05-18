import UI from './UI';
import game from './game';
import '../css/styles.css';

game.init();

UI.init();
game.players.forEach((player) => {
  UI.renderPlayerArea(player);
  UI.renderBoard(player);
});
