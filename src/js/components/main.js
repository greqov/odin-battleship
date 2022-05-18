function main() {
  return `
    <main class="container max-w-4xl mx-auto mb-6 px-4">
      <div class="grid grid-cols-2 gap-4">
        <div data-area="user" class="outline-dotted outline-1">
          <div class="text-center">
            <span>👉</span>
            <span class="text-2xl font-bold">Player</span>
          </div>

          <div class="grid grid-cols-[24px_300px] justify-center mt-6">
            <div class=""></div>
            <div class="grid grid-cols-[repeat(3,_1fr)] h-[24px] text italic">
              <span>a</span>
              <span>b</span>
              <span>c</span>
            </div>
            <div class="grid grid-rows-[repeat(3,_1fr)] text italic text-right pr-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div
              class="grid grid-cols-[repeat(3,_1fr)] grid-rows-[repeat(3,_1fr)] w-[300px] h-[300px] border border-solid border-gray-400"
            >
              <div class="border border-solid border-gray-400 bg-slate-500">1</div>
              <div class="border border-solid border-gray-400 bg-slate-500_ bg-red-500">2</div>
              <div class="border border-solid border-gray-400">3</div>
              <div class="border border-solid border-gray-400">4</div>
              <div class="border border-solid border-gray-400">5</div>
              <div class="border border-solid border-gray-400">6</div>
              <div class="border border-solid border-gray-400">7</div>
              <div class="border border-solid border-gray-400">8</div>
              <div class="border border-solid border-gray-400">9</div>
            </div>
          </div>

          <div class="mt-4 space-x-2 space-y-2">
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-20"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-16"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-16"></span>
            <span class="inline-block bg-red-500 rounded-b-xl h-5 w-10"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-10"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-10"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-5"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-5"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-5"></span>
            <span class="inline-block bg-slate-500 rounded-b-xl h-5 w-5"></span>
          </div>
        </div>
        <div data-area="comp" class="outline-dotted outline-1">

        </div>
      </div>
    </main>
  `;
}

export default main();
