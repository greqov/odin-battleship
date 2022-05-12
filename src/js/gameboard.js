function gameboardFactory() {
  const letters = 'abc'.split('');
  const digits = [1, 2, 3];
  const board = [];
  const boardSize = letters.length;

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

  const getCell = (label) => board.find((cell) => cell.label === label);

  const getCellByXY = (x, y) => board.find((cell) => cell.x === x && cell.y === y);

  const placeShip = function (ship, place, mode) {
    const { length } = ship;
    const start = getCell(place);
    const { st, dyn } = mode === 'vertical' ? { st: 'x', dyn: 'y' } : { st: 'y', dyn: 'x' };
    let water = [];
    const shipArea = [];

    if (length > boardSize - start[dyn]) {
      throw new Error('ERROR: there is no enough space to place a ship!');
    }

    for (let i = 0; i < length; i++) {
      const shipCell = board.find((cell) => cell[dyn] === start[dyn] + i && cell[st] === start[st]);

      shipArea.push(shipCell);

      // collect water cells
      if (mode === 'vertical') {
        const x = shipCell[st];
        const y = shipCell[dyn];

        water.push(getCellByXY(x + 1, y));
        water.push(getCellByXY(x - 1, y));
      } else {
        const x = shipCell[dyn];
        const y = shipCell[st];

        water.push(getCellByXY(x, y + 1));
        water.push(getCellByXY(x, y - 1));
      }
    }

    if (mode === 'vertical') {
      const startWater = {
        x: start.x,
        y: start.y - 1,
      };

      const endWater = {
        x: start.x,
        y: start.y + length,
      };

      [startWater, endWater].forEach((cell) => {
        water.push(getCellByXY(cell.x, cell.y));
        water.push(getCellByXY(cell.x + 1, cell.y));
        water.push(getCellByXY(cell.x - 1, cell.y));
      });
    } else {
      // horizontal
      const startWater = {
        x: start.x - 1,
        y: start.y,
      };

      const endWater = {
        x: start.x + length,
        y: start.y,
      };

      [startWater, endWater].forEach((cell) => {
        water.push(getCellByXY(cell.x, cell.y));
        water.push(getCellByXY(cell.x, cell.y + 1));
        water.push(getCellByXY(cell.x, cell.y - 1));
      });
    }

    water = water.filter((cell) => cell !== undefined);
    const shipParts = water.filter((cell) => cell.value === 1).length;
    if (shipParts) throw new Error('ERROR: ships cannot be placed next to each other');

    // place ship/water in case of no errors
    shipArea.forEach((cell) => {
      const c = cell;
      c.value = 1;
    });

    water.forEach((cell) => {
      const c = cell;
      c.value = 0.5;
    });
  };

  return {
    board,
    placeShip,
    getCell,
    getCellByXY,
  };
}

export default gameboardFactory;
