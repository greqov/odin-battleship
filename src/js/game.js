import playerFactory from './player';
import gameboardFactory from './gameboard';

const game = (() => {
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

    // set turn
    players[1].toggleTurn();

    // create/place ships

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
