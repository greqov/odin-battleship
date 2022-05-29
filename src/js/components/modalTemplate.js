export default function modal({ id, title, body }) {
  return `
    <div id="${id}" class="js-modal hidden _flex fixed top-0 left-0 h-screen w-screen justify-center items-center p-4 bg-black/75 overflow-auto">
      <div class="w-[480px] max-w-full bg-white rounded-lg shadow-lg">
        <div class="flex justify-between items-center space-x-4 p-4">
          <h3 class="text-lg font-bold">${title}</h3>
          <button
            class="text-slate-400 hover:text-orange-600 transition"
            type="button"
            data-modal-closer
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="overflow-auto p-4 pb-16 _border-t border-slate-200" style="max-height: calc(100vh - 182px);">
          ${body}
        </div>
      </div>
    </div>
  `;
}
