function boardHTML(player) {
  const { board } = player;
  const { letters, digits, board: cells } = board;
  console.log(`board`, board);

  let horLegend = '';
  letters.forEach((letter) => {
    horLegend += `<div class="h-6 text-center">${letter}</div>`;
  });

  let vertLegend = '';
  digits.forEach((digit) => {
    vertLegend += `<div>${digit}</div>`;
  });

  let cellsHTML = '';
  const marks = {
    0: '〰️',
    S: '🛳️',
    H: '🔥',
    M: '❌',
    w: '〰️',
  };
  cells.forEach((cell) => {
    const { label } = cell.content;
    cellsHTML += `<div class="flex items-center justify-center border border-solid text-sm" data-label="${cell.label}">${marks[label]}</div>`;
  });

  return `
    <div class="grid grid-cols-[24px_300px] justify-center mt-6">
      <div class=""></div>
      <div class="grid grid-cols-10 grid-rows-1 text italic">
        ${horLegend}
      </div>
      <div class="grid grid-rows-10 grid-cols-1 text italic text-right pr-1">
        ${vertLegend}
      </div>
      <div
        class="grid grid-cols-10 grid-rows-10 w-[300px] h-[300px] border border-solid border-gray-400"
      >
        ${cellsHTML}
      </div>
    </div>
  `;
}

export default boardHTML;
