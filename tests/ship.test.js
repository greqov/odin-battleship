import shipFactory from '../src/js/ship';

test('happy test', () => {
  expect(typeof shipFactory).toBe('function');
});
