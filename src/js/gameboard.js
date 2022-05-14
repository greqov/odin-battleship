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

  const getAroundWater = (ship, place, mode) => {
    let water = [];
    const { length } = ship;
    const start = getCell(place);

    const offset =
      mode === 'vertical'
        ? {
            x: 2,
            y: length + 1,
          }
        : {
            x: length + 1,
            y: 2,
          };

    const topLeftWater = {
      x: start.x - 1,
      y: start.y - 1,
    };

    const bottomRightWater = {
      x: topLeftWater.x + offset.x,
      y: topLeftWater.y + offset.y,
    };

    for (let i = topLeftWater.x; i <= bottomRightWater.x; i++) {
      for (let j = topLeftWater.y; j <= bottomRightWater.y; j++) {
        water.push(getCellByXY(i, j));
      }
    }

    water = water.filter((cell) => cell !== undefined);

    const shipCells = [];
    const sc = {};

    if (mode === 'vertical') {
      sc.x = 0;
      sc.y = length - 1;
    } else {
      sc.x = length - 1;
      sc.y = 0;
    }

    for (let i = start.x; i <= start.x + sc.x; i++) {
      for (let j = start.y; j <= start.y + sc.y; j++) {
        shipCells.push(getCellByXY(i, j));
      }
    }

    water = water.filter((cell) => !shipCells.includes(cell));

    return water;
  };

  const markCells = (array, mark) => {
    array.forEach((cell) => {
      const c = cell;
      c.value = mark;
    });
  };

  const placeShip = function (ship, place, mode) {
    const { length } = ship;
    const start = getCell(place);
    const { st, dyn } = mode === 'vertical' ? { st: 'x', dyn: 'y' } : { st: 'y', dyn: 'x' };
    const shipArea = [];

    if (length > boardSize - start[dyn]) {
      throw new Error('ERROR: there is no enough space to place a ship!');
    }

    for (let i = 0; i < length; i++) {
      const shipCell = board.find((cell) => cell[dyn] === start[dyn] + i && cell[st] === start[st]);

      shipArea.push(shipCell);
    }

    const water = getAroundWater(ship, place, mode);
    const shipParts = water.filter((cell) => cell.value.label === 'S').length;
    if (shipParts) throw new Error('ERROR: ships cannot be placed next to each other');

    // place ship/water in case of no errors
    const shipIndex = fleet.length;
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

    markCells(water, 'w');
  };

  const receiveAttack = (x, y) => {
    const target = getCellByXY(x, y);

    if (target.value === 'M' || target.value.label === 'H')
      throw new Error('ERROR: useless shot! try another one.');

    // check for ship hit
    if (target.value.label === 'S') {
      target.value.label = 'H';

      const { ship, start, mode } = fleet[target.value.id];
      ship.hit(target.value.part);

      if (ship.isSunk()) {
        // mark around water with 'M'
        const water = getAroundWater(ship, start.label, mode);
        markCells(water, 'M');
      } else {
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
