function gameboardFactory() {
  const letters = 'abc'.split('');
  const digits = [1, 2, 3];
  const board = [];
  const boardSize = letters.length;
  const fleet = [];

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
    const shipParts = water.filter((cell) => cell.value.label === 'S').length;
    if (shipParts) throw new Error('ERROR: ships cannot be placed next to each other');

    // place ship/water in case of no errors
    const shipIndex = fleet.length;
    // TODO: add start cell, mode data too?
    fleet.push({
      id: shipIndex, // not sure
      ship,
      start,
      mode: mode || 'horizontal',
    });

    shipArea.forEach((cell, idx) => {
      const c = cell;
      c.value = {
        id: shipIndex,
        label: 'S',
        part: idx,
      };
    });

    water.forEach((cell) => {
      const c = cell;
      c.value = 0.5;
    });
  };

  const receiveAttack = (x, y) => {
    const target = getCellByXY(x, y);

    if (target.value === 'M' || target.value.label === 'H')
      throw new Error('ERROR: useless shot! try another one.');

    // check for ship hit
    if (target.value.label === 'S') {
      target.value.label = 'H';

      const { ship } = fleet[target.value.id];
      ship.hit(target.value.part);

      if (ship.isSunk()) {
        // do one action
        // mark around water with 'M' maybe
      } else {
        // or another
        // wait for another attack
      }
    } else {
      target.value = 'M';
      // change turn
    }
  };

  return {
    board,
    placeShip,
    getCell,
    getCellByXY,
    receiveAttack,
  };
}

export default gameboardFactory;
