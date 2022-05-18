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

  let ct = '';
  cells.forEach((cell) => {
    ct += `<div class="border border-solid text-sm" data-label="${cell.label}">${cell.value}</div>`;
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
        ${ct}
      </div>
    </div>
  `;
}

export default boardHTML;
