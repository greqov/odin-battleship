export const marks = {
  0: '',
  S: '🛳️',
  H: '🔥',
  M: '〰️',
  w: '',
};

function boardHTML(player) {
  const { board } = player;
  const { letters, digits, board: cells } = board;

  let horLegend = '';
  letters.forEach((letter) => {
    horLegend += `<div class="h-6 text-center">${letter}</div>`;
  });

  let vertLegend = '';
  digits.forEach((digit) => {
    vertLegend += `<div>${digit}</div>`;
  });

  let cellsHTML = '';

  cells.forEach((cell) => {
    const { label } = cell.content;
    cellsHTML += `
      <div
        class="js-cell flex items-center justify-center min-h-[36px] border border-solid text-sm cursor-pointer hover:border-orange-500"
        data-label="${cell.label}"
        data-x="${cell.x}"
        data-y="${cell.y}"
      >
        ${marks[label]}
      </div>`;
  });

  return `
    <div class="grid grid-cols-[24px_360px] justify-center mt-6">
      <div class="">&nbsp;</div>
      <div class="grid grid-cols-10 grid-rows-1 text italic">
        ${horLegend}
      </div>
      <div class="grid grid-rows-10 grid-cols-1 text italic text-right pr-1">
        ${vertLegend}
      </div>
      <div
        class="grid grid-cols-10 grid-rows-10 w-[360px] h-[360px] border border-solid border-gray-400"
      >
        ${cellsHTML}
      </div>
    </div>
  `;
}

export default boardHTML;
