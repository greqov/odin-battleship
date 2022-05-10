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
  expect(ship.body).toEqual([0, 1, 1]);
});

test('hits outside of ship dont affect it', () => {
  const ship = shipFactory(2);
  ship.hit(4);
  // NOTE: does it make sense to test negative index?
  ship.hit(-1);
  expect(ship.body).toEqual([0, 0]);
});
