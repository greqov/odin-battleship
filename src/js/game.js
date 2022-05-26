import playerFactory from './player';
import shipFactory from './ship';
import gameboardFactory from './gameboard';

const game = (() => {
  const players = [];
  const ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  const addPlayers = () => {
    // NOTE: reset players to make consistent tests
    players.length = 0;
    ['user', 'comp'].forEach((type) => {
      players.push(playerFactory(type));
    });
  };

  const placeFleet = () => {
    players.forEach((player) => {
      const { board } = player;

      for (let i = 0; i < ships.length; i++) {
        const size = ships[i];
        const ship = shipFactory(size);
        const place = board.getRandomEmptyCell().label;
        const mode = Math.random() > 0.5 ? 'vertical' : 'horizontal';

        try {
          board.placeShip(ship, place, mode);
        } catch (error) {
          console.log('Such random! Need more attempt!\n', error);
          // retry attempt
          i -= 1;
        }
      }
    });
  };

  const toggleTurn = () => {
    const [user, comp] = players;
    user.toggleTurn();
    comp.toggleTurn();
  };

  const init = () => {
    // create players
    addPlayers();

    // create boards
    players.forEach((player) => {
      player.setBoard(gameboardFactory());
    });

    // create/place ships
    placeFleet();

    // set turn
    players[0].toggleTurn();

    // play game
    // get winner
    // show notifications
  };

  return {
    init,
    get players() {
      return players;
    },
    toggleTurn,
  };
})();

export default game;
