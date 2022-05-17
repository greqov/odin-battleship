import playerFactory from './player';
import gameboardFactory from './gameboard';

const game = (function () {
  const players = [];

  const addPlayers = () => {
    ['user', 'comp'].forEach((type) => {
      players.push(playerFactory(type));
    });
  };

  const init = () => {
    console.log('game init');
    // create players
    addPlayers();

    // create boards
    players.forEach((player) => {
      player.setBoard(gameboardFactory());
    });

    // create/place ships
    // render all
    // set turn
    // play game
    // get winner
    // show notifications
  };

  return {
    init,
    get players() {
      return players;
    },
  };
})();

export default game;
