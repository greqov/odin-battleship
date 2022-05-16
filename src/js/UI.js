import layout from './components/layout';

function UI() {
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

  return {
    init,
  };
}

export default UI;
