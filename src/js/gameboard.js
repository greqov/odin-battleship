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

  const placeShip = function (ship, place) {
    const { length } = ship;
    const start = board.find((item) => item.label === place);
    console.log(`start`, start);

    for (let i = 0; i < length; i++) {
      // TODO: add 'vertical' mode (tip: check for cell.y)
      const targetCell = board.find((cell) => cell.x === start.x + i);
      targetCell.value = 1;
    }
  };

  return {
    board,
    placeShip,
  };
}

export default gameboardFactory;
