function shipFactory(size) {
  const body = new Array(size).fill(0);

  const ship = {
    hit(n) {
      if (n >= 0 && n < body.length) {
        body[n] = 1;
      }
    },

    isSunk() {
      return body.indexOf(0) === -1;
    },

    get body() {
      return body;
    },

    get length() {
      return body.length;
    },
  };

  return ship;
}

export default shipFactory;
