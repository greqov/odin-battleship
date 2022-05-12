import gameboardFactory from '../src/js/gameboard';
import shipFactory from '../src/js/ship';

test('happy test', () => {
  expect(typeof gameboardFactory).toBe('function');
});

test('create square gameboard', () => {
  const gameboard = gameboardFactory();
  expect(gameboard.board.length).toBe(9);
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

  expect(getCell('b1').value).toEqual(1);
  expect(getCell('c1').value).toEqual(1);
});

test('can place ship vertically on gameboard', () => {
  const gameboard = gameboardFactory();
  const { placeShip, getCell } = gameboard;
  const ship = shipFactory(2);
  placeShip(ship, 'b2', 'vertical');

  expect(getCell('b2').value).toBe(1);
  expect(getCell('b3').value).toBe(1);
});

test('ships are placed within a gameboard', () => {
  const gameboard = gameboardFactory();
  const { placeShip } = gameboard;
  const ship = shipFactory(3);

  // horizontal case
  expect(() => {
    placeShip(ship, 'b1');
  }).toThrow(/no enough space/);

  // vertical case
  expect(() => {
    placeShip(ship, 'a2', 'vertical');
  }).toThrow(/no enough space/);
});

test('ship takes some space near itself (horizontal case)', () => {
  const { placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(2);

  placeShip(ship, 'a1');

  expect(getCell('a1').value).toBe(1);
  expect(getCell('a2').value).toBe(0.5);
  expect(getCell('a3').value).toBe(0);
  expect(getCell('b1').value).toBe(1);
  expect(getCell('b2').value).toBe(0.5);
  expect(getCell('b3').value).toBe(0);
  expect(getCell('c1').value).toBe(0.5);
  expect(getCell('c2').value).toBe(0.5);
  expect(getCell('c3').value).toBe(0);
});

test('ship takes some space near itself (vertical case)', () => {
  const { placeShip, getCell } = gameboardFactory();
  const ship = shipFactory(2);

  placeShip(ship, 'c1', 'vertical');

  expect(getCell('a1').value).toBe(0);
  expect(getCell('a2').value).toBe(0);
  expect(getCell('a3').value).toBe(0);
  expect(getCell('b1').value).toBe(0.5);
  expect(getCell('b2').value).toBe(0.5);
  expect(getCell('b3').value).toBe(0.5);
  expect(getCell('c1').value).toBe(1);
  expect(getCell('c2').value).toBe(1);
  expect(getCell('c3').value).toBe(0.5);
});
