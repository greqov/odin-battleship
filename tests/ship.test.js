import shipFactory from '../src/js/ship';

test('happy test', () => {
  expect(typeof shipFactory).toBe('function');
});

test('ship has some size', () => {
  const ship = shipFactory(3);
  expect(ship.length).toBe(3);
});

test('ship can register hits', () => {
  // NOTE: not sure about using 'body'
  const ship = shipFactory(3);
  ship.hit(1);
  ship.hit(2);
  expect(ship.body).toEqual([1, 0, 0]);
});

test('hits outside of ship dont affect it', () => {
  const ship = shipFactory(2);
  ship.hit(4);
  // NOTE: does it make sense to test negative index?
  ship.hit(-1);
  expect(ship.body).toEqual([1, 1]);
});

test('ship can sunk', () => {
  const ship1 = shipFactory(1);
  ship1.hit(0);
  expect(ship1.isSunk()).toBe(true);
  const ship2 = shipFactory(2);
  ship2.hit(1);
  expect(ship2.isSunk()).toBe(false);
});
