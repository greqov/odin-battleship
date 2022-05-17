import layout from './components/layout';

const UI = (() => {
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
  };

  const renderPlayerArea = (player) => {
    console.log(`renderPlayerArea`, renderPlayerArea);
    const { turn, type } = player;
    const template = `
      <div class="text-center">
        <span class="${turn ? 'visible' : 'invisible'}">👉</span>
        <span class="text-2xl font-bold">${type.toUpperCase()}</span>
      </div>
    `;

    document.querySelector(`[data-area="${type}"]`).insertAdjacentHTML('beforeend', template);
  };

  return {
    init,
    renderPlayerArea,
  };
})();

export default UI;
