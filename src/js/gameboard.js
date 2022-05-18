function gameboardFactory() {
  const letters = 'abcdefghij'.split('');
  const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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

  const getShipArea = (ship, start, mode) => {
    const { length } = ship;
    const shipArea = [];

    const shipSize =
      mode === 'vertical'
        ? {
            x: 0,
            y: length - 1,
          }
        : {
            x: length - 1,
            y: 0,
          };

    for (let i = start.x; i <= start.x + shipSize.x; i++) {
      for (let j = start.y; j <= start.y + shipSize.y; j++) {
        shipArea.push(getCellByXY(i, j));
      }
    }

    return shipArea;
  };

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

    const shipArea = getShipArea(ship, start, mode);

    water = water.filter((cell) => !shipArea.includes(cell));

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
    const axis = mode === 'vertical' ? 'y' : 'x';

    if (length > boardSize - start[axis]) {
      throw new Error('ERROR: there is no enough space to place a ship!');
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

    const shipArea = getShipArea(ship, start, mode);
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

  const isFleetDestroyed = () => {
    const sunkShips = fleet.filter((i) => i.ship.isSunk()).length;
    return fleet.length === sunkShips;
  };

  return {
    board,
    placeShip,
    getCell,
    getCellByXY,
    receiveAttack,
    isFleetDestroyed,
    get letters() {
      return letters;
    },
    get digits() {
      return digits;
    },
  };
}

export default gameboardFactory;
