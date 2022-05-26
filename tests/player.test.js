import shipFactory from '../src/js/ship';
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
  player.toggleTurn();
  expect(player.turn).toBe(false);
});

test('player tracks enemy gameboard', () => {
  const board = gameboardFactory();
  const player = playerFactory();
  player.setBoard(board);
  // NOTE: not sure how to test if board is saved
  expect(typeof player.board.receiveAttack).toBe('function');
});

test('check turn before making an attack', () => {
  const board = gameboardFactory();
  const player = playerFactory();
  player.setBoard(board);
  expect(() => player.attack(0, 0)).toThrow(/wait for your turn/);
});

describe('player can attack enemy gameboard', () => {
  let board;
  let player;

  beforeEach(() => {
    board = gameboardFactory();
    player = playerFactory();
    player.setBoard(board);
    player.toggleTurn();
    board.placeShip(shipFactory(1), 'a1');
  });

  test('player attacks', () => {
    const cell1 = player.attack(1, 0);
    expect(board.getCellByXY(cell1.x, cell1.y).content.label).toBe('M');

    const cell2 = player.attack(0, 0);
    expect(board.getCellByXY(cell2.x, cell2.y).content.label).toBe('H');

    expect(() => player.attack(0, 1)).toThrow(/useless shot/);
  });

  test('can handle incorrect coords', () => {
    expect(() => player.attack()).toThrow(/incorrect coords/);
  });
});

describe('comp can attack enemy gameboard', () => {
  let board;
  let player;

  beforeEach(() => {
    board = gameboardFactory();
    player = playerFactory('comp');
    player.setBoard(board);
    player.toggleTurn();
  });

  test('make random attack (no coords)', () => {
    const cell1 = player.attack();
    expect(board.getCellByXY(cell1.x, cell1.y).content.label).toBe('M');
  });

  test('can handle incorrect coords', () => {
    const cell2 = player.attack(3);
    expect(board.getCellByXY(cell2.x, cell2.y).content.label).toBe('M');
  });

  test('can hit precisely (has coords)', () => {
    board.placeShip(shipFactory(1), 'a1');
    player.attack(0, 0);
    expect(board.getCellByXY(0, 0).content.label).toBe('H');
  });
});
