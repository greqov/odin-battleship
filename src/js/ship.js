function shipFactory(size) {
  const body = new Array(size).fill(1);

  const ship = {
    hit(n) {
      if (n >= 0 && n < body.length) {
        body[n] = 0;
      }
    },

    isSunk() {
      return body.indexOf(1) === -1;
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
