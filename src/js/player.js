function playerFactory(playerType) {
  const type = playerType || 'user';
  let turn = false;
  let board;

  const toggleTurn = () => {
    turn = !turn;
  };

  const attack = (x, y) => {
    if (!turn) throw new Error('ERROR: wait for your turn!');
    board.receiveAttack(x, y);
  };

  const setBoard = (gameboard) => {
    board = gameboard;
  };

  return {
    get type() {
      return type;
    },

    get turn() {
      return turn;
    },

    get board() {
      return board;
    },

    toggleTurn,
    attack,
    setBoard,
  };
}

export default playerFactory;
