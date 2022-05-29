function header() {
  return `
    <header class="mb-6 border-b">
      <div class="container max-w-5xl mx-auto py-6 px-4">
        <div class="flex items-center justify-between">
          <span class="block text-3xl font-bold">Battleship Game</span>
          <div>
            <button
              class="js-new-game-btn inline-flex px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 rounded-md transition select-none"
              type="button"
            >
              New game
            </button>
          </div>
        </div>
      </div>
    </header>
  `;
}

export default header();
