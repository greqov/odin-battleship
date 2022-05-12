import gameboardFactory from '../src/js/gameboard';
import shipFactory from '../src/js/ship';

test('happy test', () => {
  expect(typeof gameboardFactory).toBe('function');
});

// Gameboards should be able to place ships at specific coordinates by calling the ship factory function.

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

test('can place ship horizontally on gameboard', () => {
  const gameboard = gameboardFactory();
  const { getCell } = gameboard;
  const ship = shipFactory(2);
  const place = 'b1';
  gameboard.placeShip(ship, place);

  expect(getCell('a1').value).toEqual(0);
  expect(getCell('b1').value).toEqual(1);
  expect(getCell('c1').value).toEqual(1);
});

test('can place ship vertically on gameboard', () => {
  const gameboard = gameboardFactory();
  const { getCell } = gameboard;
  const ship = shipFactory(2);
  const place = 'b2';
  gameboard.placeShip(ship, place, 'vertical');

  expect(getCell('b1').value).toBe(0);
  expect(getCell('b2').value).toBe(1);
  expect(getCell('b3').value).toBe(1);
});
