import UI from './UI';
import gameFn from './game';
import '../css/styles.css';

const game = gameFn();
game.init();

const ui = UI();
ui.init();
