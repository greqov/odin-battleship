# Battleship

_Battleship game for The Odin Project_

- Assignment: [Odin lesson](https://www.theodinproject.com/lessons/node-path-javascript-battleship)
- Live preview: [https://greqov.github.io/odin-battleship/](https://greqov.github.io/odin-battleship/)

## Features

- your opponent is a (not) very smart AI;
- quick start with randomly placed ships;
- clean UI;
- unit tests!

## Questions

- For unknown reason I don't utilize player's `attack` function, only use `receiveAttack` on gameboard. `attack` function doesn't know about enemy's board. Hmmm...

## TODOs

- [ ] add option to place ships manually;
- [ ] make AI smarter;
- [ ] add visual notification of computer's attack;
- [ ] display fleet under gameboard to track progress.

## Development

- build a project

```bash
npm run build
```

- start local dev server

```bash
npm run start
```

- publish 'dist' folder to github pages

```bash
npm run deploy
```
