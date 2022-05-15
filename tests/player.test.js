import playerFactory from '../src/js/player';
import gameboardFactory from '../src/js/gameboard';

test('happy test', () => {
  expect(typeof playerFactory).toBe('function');
});

test('create user player', () => {
  const player = playerFactory();
  expect(player.type).toBe('user');
});

test('create computer player', () => {
  const player = playerFactory('comp');
  expect(player.type).toBe('comp');
});

test('player can take/toggle turn', () => {
  const player = playerFactory('comp');
  expect(player.turn).toBe(false);
  player.toggleTurn();
  expect(player.turn).toBe(true);
});

test('player tracks enemy gameboard', () => {
  const board = gameboardFactory();
  const player = playerFactory();
  player.setBoard(board);
  // NOTE: not sure how to test if board is saved
  expect(typeof player.board.receiveAttack).toBe('function');
});

test('check turn before making attack', () => {
  const board = gameboardFactory();
  const player = playerFactory();
  player.setBoard(board);
  expect(() => player.attack(0, 0)).toThrow(/wait for your turn/);
});

test('player can attack enemy gameboard', () => {
  const board = gameboardFactory();
  const player = playerFactory();
  player.setBoard(board);
  player.toggleTurn();
  player.attack(0, 0);

  expect(board.getCellByXY(0, 0).value).toBe('M');
});
