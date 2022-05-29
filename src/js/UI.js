import layout from './components/layout';
import boardHTML, { marks } from './components/board';
import game from './game';
import modalData from './components/modalData';
import Modal from './Modal';

const modalCtrl = new Modal();

const UI = (() => {
  // NOTE: init game before UI

  const renderPlayerArea = (player) => {
    const { turn, type } = player;
    let template = `
      <div class="flex items-center justify-center">
        <span class="js-turn-indicator ${turn ? 'visible' : 'invisible'} pr-1">👉</span>
        <span class="text-2xl font-bold">${type.toUpperCase()}</span>
      </div>
    `;
    template += boardHTML(player);

    document.querySelector(`[data-area="${type}"]`).innerHTML = '';
    document.querySelector(`[data-area="${type}"]`).insertAdjacentHTML('beforeend', template);
  };

  const renderTurnIndicator = () => {
    const [user, comp] = game.players;
    [user, comp].forEach((player) => {
      const indicator = document.querySelector(`[data-area="${player.type}"] .js-turn-indicator`);
      indicator.classList.toggle('visible', player.turn);
      indicator.classList.toggle('invisible', !player.turn);
    });
  };

  const renderGameContent = () => {
    game.players.forEach((player) => {
      renderPlayerArea(player);
    });
  };

  const showWinningMessage = () => {
    const winningTextEl = document.querySelector('.js-winning-text');
    const text = `${game.currentPlayer.type === 'comp' ? 'Computer' : 'User'} wins!`;
    winningTextEl.textContent = text;
    setTimeout(() => {
      modalCtrl.openModal(document.getElementById(`${modalData.id}`));
    }, 750);
  };

  const delay = (ms) =>
    new Promise((res) => {
      setTimeout(res, ms);
    });

  const addHandlers = () => {
    const compArea = document.querySelector('[data-area="comp"]');
    const userArea = document.querySelector('[data-area="user"]');

    const renderCell = (player, board, label) => {
      const cell = board.getCell(label);
      const key = cell.content.label;
      const area = player.type === 'comp' ? compArea : userArea;
      area.querySelector(`[data-label="${cell.label}"]`).textContent = marks[key];
    };

    compArea.addEventListener('click', (e) => {
      if (!game.isActive()) return;

      if (e.target.closest('.js-cell')) {
        // NOTE: place user/comp vars here to get actual data after restart game
        // TODO: get actual players data in more elegant way
        const [user, comp] = game.players;
        const userBoard = user.board;
        const compBoard = comp.board;

        if (user.turn) {
          const { x, y, label } = e.target.dataset;
          try {
            const { cell, water } = compBoard.receiveAttack(Number(x), Number(y));
            renderCell(comp, compBoard, label);

            water.forEach((c) => {
              renderCell(comp, compBoard, c.label);
            });

            // toggle to computer attacks on missed hit
            if (cell.content.label === 'M') {
              game.toggleTurn();
              renderTurnIndicator();

              (async function computerAttacks() {
                let flag = true;
                while (flag) {
                  // TODO: fix ESLint warning
                  // eslint-disable-next-line no-await-in-loop
                  await delay(750);

                  const unAtCell = userBoard.getUnattackedCell();
                  const output = userBoard.receiveAttack(unAtCell.x, unAtCell.y);

                  // update UI
                  renderCell(user, userBoard, output.cell.label);
                  output.water.forEach((c) => {
                    renderCell(user, userBoard, c.label);
                  });

                  // check for next move
                  if (output.cell.content.label === 'M') {
                    // eslint-disable-next-line no-await-in-loop
                    await delay(750);
                    flag = false;
                  } else if (userBoard.isFleetDestroyed()) {
                    game.toggleActiveState();
                    showWinningMessage();
                    return;
                  }
                }

                game.toggleTurn();
                renderTurnIndicator();
              })();
            } else if (compBoard.isFleetDestroyed()) {
              game.toggleActiveState();
              showWinningMessage();
              return;
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Wait for your turn');
        }
      }
    });

    const newGameBtn = document.querySelector('.js-new-game-btn');
    newGameBtn.addEventListener('click', () => {
      game.restart();
      renderGameContent();
    });
  };

  const init = () => {
    document.querySelector('html').classList.add('scroll-smooth');
    document.body.classList.add(
      'relative',
      'min-h-screen',
      'overflow-y-scroll',
      'flex',
      'flex-col',
      'font-sans',
      'bg-zinc-50',
      'selection:bg-pink-300'
    );
    document.body.insertAdjacentHTML('beforeend', layout);

    renderGameContent();

    modalCtrl.init();
    addHandlers();
  };

  return {
    init,
    renderPlayerArea,
  };
})();

export default UI;
