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

test('can place ship horizontally on gameboard', () => {
  const gameboard = gameboardFactory();
  const { board } = gameboard;
  const ship = shipFactory(2);
  const place = 'b1';
  gameboard.placeShip(ship, place);

  expect(board[0].value).toEqual(0);
  expect(board[1].value).toEqual(1);
  expect(board[2].value).toEqual(1);
});

test('can place ship vertically on gameboard', () => {
  const gameboard = gameboardFactory();
  const { board } = gameboard;
  const ship = shipFactory(2);
  const place = 'b2';
  gameboard.placeShip(ship, place, 'vertical');

  expect(board[1].value).toBe(0);
  expect(board[4].value).toBe(1);
  expect(board[7].value).toBe(1);
});
