export default function getScrollWidth() {
  const { body } = document;
  const el = document.createElement('div');

  el.style = `position: absolute; top: -9999px; width: 100px; height: 100px; overflow: scroll;`;
  body.appendChild(el);

  const width = el.offsetWidth - el.clientWidth;

  body.removeChild(el);

  return width;
}
