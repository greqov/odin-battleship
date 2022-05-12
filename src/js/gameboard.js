function gameboardFactory() {
  const letters = 'abc'.split('');
  const digits = [1, 2, 3];
  const board = [];

  digits.forEach((digit, digitIndex) => {
    letters.forEach((letter, letterIndex) => {
      board.push({
        label: letter + digit,
        x: letterIndex,
        y: digitIndex,
        value: 0,
      });
    });
  });

  const placeShip = function (ship, place, mode) {
    const { length } = ship;
    const start = board.find((item) => item.label === place);
    const { st, dyn } = mode === 'vertical' ? { st: 'x', dyn: 'y' } : { st: 'y', dyn: 'x' };

    for (let i = 0; i < length; i++) {
      const targetCell = board.find(
        (cell) => cell[dyn] === start[dyn] + i && cell[st] === start[st]
      );
      targetCell.value = 1;
    }
  };

  return {
    board,
    placeShip,
  };
}

export default gameboardFactory;
