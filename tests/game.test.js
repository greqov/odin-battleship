import game from '../src/js/game';

test('happy test', () => {
  expect(typeof game).toBe('object');
});

test('game creates 2 players at the start', () => {
  game.init();

  expect(game.players.length).toBe(2);
  expect(game.players[0].type).toBe('user');
  expect(game.players[1].type).toBe('comp');
});

test('game creates boards for each player', () => {
  game.init();

  // NOTE: how to check if boards exist?
  expect(typeof game.players[0].board.placeShip).toBe('function');
});

test('randomly place fleet on boards', () => {
  game.init();
  // NOTE: not sure if this fn has to be inside init()
  const player = game.players[0];
  expect(player.board.fleet.length).toBe(10);
});
