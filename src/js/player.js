function playerFactory(playerType) {
  const type = playerType || 'user';
  let turn = false;
  let board;

  const toggleTurn = () => {
    turn = !turn;
  };

  const compAttack = (x, y) => {
    // TODO: useless fn?
    let cell;

    if (x === undefined || y === undefined) {
      // do random attack
      const cells = board.board.filter((c) => !['M', 'H'].includes(c.value));
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      board.receiveAttack(randomCell.x, randomCell.y);
      cell = randomCell;
    } else {
      board.receiveAttack(x, y);
      cell = board.getCellByXY(x, y);
    }

    return cell;
  };

  // TODO: attack fn should know about enemy's(!) board, fix tests
  const attack = (x, y) => {
    if (!turn) throw new Error('ERROR: wait for your turn!');

    let cell;

    if (type === 'user') {
      if (x === undefined || y === undefined) throw new Error('ERROR: incorrect coords!');

      board.receiveAttack(x, y);
      cell = board.getCellByXY(x, y);
    } else {
      cell = compAttack(x, y);
    }

    return cell;
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
