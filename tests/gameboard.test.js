import gameboardFactory from '../src/js/gameboard';
import shipFactory from '../src/js/ship';

test('happy test', () => {
  expect(typeof gameboardFactory).toBe('function');
});

test('create square gameboard', () => {
  const { board } = gameboardFactory();
  expect(Array.isArray(board)).toBe(true);
});

test('can get board letters and digits', () => {
  const { letters, digits } = gameboardFactory();
  expect(letters[2]).toBe('c');
  expect(digits[1]).toBe(2);
});

test('board has fleet', () => {
  const { fleet } = gameboardFactory();
  expect(Array.isArray(fleet)).toBe(true);
});

test('can get cell by label', () => {
  const gameboard = gameboardFactory();
  const cell = gameboard.getCell('b3');
  expect(cell.x).toBe(1);
  expect(cell.y).toBe(2);
});

test('can get cell by coords', () => {
  const gameboard = gameboardFactory();
  const cell1 = gameboard.getCellByXY(0, 0);
  const cell2 = gameboard.getCellByXY(2, 1);

  expect(cell1.label).toBe('a1');
  expect(cell2.label).toBe('c2');
});

test('can place ship horizontally on gameboard', () => {
  const gameboard = gameboardFactory();
  const { placeShip, getCell } = gameboard;
  const ship = shipFactory(2);
  placeShip(ship, 'b1');

  expect(getCell('b1').value.label).toEqual('S');
  expect(getCell('c1').value.label).toEqual('S');
});

test('can place ship vertically on gameboard', () => {
  const gameboard = gameboardFactory();
  const { placeShip, getCell } = gameboard;
  const ship = shipFactory(2);
  placeShip(ship, 'b2', 'vertical');

  expect(getCell('b2').value.label).toBe('S');
  expect(getCell('b3').value.label).toBe('S');
});

test('ships are placed within a gameboard', () => {
  const gameboard = gameboardFactory();
  const { placeShip } = gameboard;
  const ship = shipFactory(3);

  // horizontal case
  expect(() => {
    placeShip(ship, 'i1');
  }).toThrow(/no enough space/);

  // vertical case
  expect(() => {
    placeShip(ship, 'a9', 'vertical');
  }).toThrow(/no enough space/);
});

test('ship takes some space near itself (horizontal case)', () => {
  const { placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(2);

  placeShip(ship, 'a1');

  expect(getCell('a1').value.label).toBe('S');
  expect(getCell('a2').value).toBe('w');
  expect(getCell('a3').value).toBe(0);
  expect(getCell('b1').value.label).toBe('S');
  expect(getCell('b2').value).toBe('w');
  expect(getCell('b3').value).toBe(0);
  expect(getCell('c1').value).toBe('w');
  expect(getCell('c2').value).toBe('w');
  expect(getCell('c3').value).toBe(0);
});

test('ship takes some space near itself (vertical case)', () => {
  const { placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(2);

  placeShip(ship, 'c1', 'vertical');

  expect(getCell('a1').value).toBe(0);
  expect(getCell('a2').value).toBe(0);
  expect(getCell('a3').value).toBe(0);
  expect(getCell('b1').value).toBe('w');
  expect(getCell('b2').value).toBe('w');
  expect(getCell('b3').value).toBe('w');
  expect(getCell('c1').value.label).toBe('S');
  expect(getCell('c2').value.label).toBe('S');
  expect(getCell('c3').value).toBe('w');
});

test('ships cannot be placed next to each other', () => {
  const { placeShip } = gameboardFactory();
  const ship1 = shipFactory(2);
  const ship2 = shipFactory(1);

  placeShip(ship1, 'a1');

  expect(() => {
    placeShip(ship2, 'c2');
  }).toThrow(/ships cannot be placed next to each other/);
});

test('missed shots marked as M', () => {
  const { receiveAttack, getCellByXY } = gameboardFactory();
  const [x1, y1] = [0, 0];
  const [x2, y2] = [1, 2];

  receiveAttack(x1, y1);
  receiveAttack(x2, y2);

  expect(getCellByXY(x1, y1).value).toBe('M');
  expect(getCellByXY(x2, y2).value).toBe('M');
});

test('lucky shots marked as H', () => {
  const { receiveAttack, placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(2);
  placeShip(ship, 'a2');
  receiveAttack(0, 1);
  receiveAttack(1, 1);

  expect(getCell('a2').value.label).toBe('H');
  expect(getCell('b2').value.label).toBe('H');
});

test('gameboard prevents useless shots', () => {
  const { receiveAttack } = gameboardFactory();
  receiveAttack(0, 0);

  expect(() => receiveAttack(0, 0)).toThrow(/useless shot/);
});

test('mark water around sunk ship with M', () => {
  const { receiveAttack, placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(1);
  placeShip(ship, 'a2');

  receiveAttack(0, 1);

  expect(getCell('a1').value).toBe('M');
  expect(getCell('a2').value.label).toBe('H');
  expect(getCell('a3').value).toBe('M');
  expect(getCell('b1').value).toBe('M');
  expect(getCell('b2').value).toBe('M');
  expect(getCell('b3').value).toBe('M');
});

test('detect whether all ships are sunk', () => {
  const { receiveAttack, placeShip, isFleetDestroyed } = gameboardFactory();
  const ship1 = shipFactory(1);
  const ship2 = shipFactory(1);
  placeShip(ship1, 'a1');
  placeShip(ship2, 'c3');

  receiveAttack(0, 0);
  expect(isFleetDestroyed()).toBe(false);

  receiveAttack(2, 2);
  expect(isFleetDestroyed()).toBe(true);
});

test('gameboard can output random free cell', () => {
  const { getRandomEmptyCell } = gameboardFactory();
  expect(getRandomEmptyCell().value).toBe(0);
});
