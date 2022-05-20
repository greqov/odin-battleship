import layout from './components/layout';
import boardHTML, { marks } from './components/board';
import game from './game';

const UI = (() => {
  // NOTE: init game before UI

  const renderPlayerArea = (player) => {
    const { turn, type } = player;
    const template = `
      <div class="text-center">
        <span class="${turn ? 'visible' : 'invisible'}">👉</span>
        <span class="text-2xl font-bold">${type.toUpperCase()}</span>
      </div>
    `;

    document.querySelector(`[data-area="${type}"]`).insertAdjacentHTML('beforeend', template);
  };

  // TODO: place code inside .renderPlayerArea() ?
  const renderBoard = (player) => {
    const { type } = player;
    const template = boardHTML(player);

    document.querySelector(`[data-area="${type}"]`).insertAdjacentHTML('beforeend', template);
  };

  // TODO: render fleet at the bottom

  const addHandlers = () => {
    const user = game.players[0];
    const compBoard = game.players[1].board;
    console.log(`compBoard`, compBoard);

    const compArea = document.querySelector('[data-area="comp"]');

    const renderCell = (label) => {
      const cell = compBoard.getCell(label);
      const key = cell.content.label;
      compArea.querySelector(`[data-label="${cell.label}"]`).textContent = marks[key];
    };

    compArea.addEventListener('click', (e) => {
      if (e.target.closest('.js-cell')) {
        // check turn;
        if (user.turn) {
          const { x, y, label } = e.target.dataset;
          try {
            const { cell, water } = compBoard.receiveAttack(Number(x), Number(y));
            renderCell(label);

            water.forEach((c) => {
              renderCell(c.label);
            });

            // toggle turn on miss
            if (cell.content.label === 'M') {
              // toggle turn here
            }

            // mark cells if ship is sunk
          } catch (error) {
            console.log(error);
          }
        } else {
          console.log('Wait for your turn');
        }
      }
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

    addHandlers();
  };

  return {
    init,
    renderPlayerArea,
    renderBoard,
  };
})();

export default UI;
