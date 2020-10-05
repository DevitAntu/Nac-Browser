import { activeView } from "./Tab.js";
import Dom from "./Dom.js";
const forward = Dom.forward;
const back = Dom.back;
const searchBox = Dom.searchBox;
const reload = Dom.reload;
export default function updateToolsBar() {
  searchBox.value = activeView.webContents.getURL();
  if (activeView.webContents.isLoading()) {
    reload.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 icon" role="img"
          viewBox="0 0 352 512">
          <path fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
        </svg>
    `;
  } else {
    reload.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo"
    class="svg-inline--fa fa-redo fa-w-16 icon icon-small" role="img" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path fill="currentColor"
      d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z">
    </path>
  </svg>
    `;
  }
  if (activeView.webContents.canGoBack()) {
    back.classList.remove("icon-disabled");
  } else {
    back.classList.add("icon-disabled");
  }
  if (activeView.webContents.canGoForward()) {
    forward.classList.remove("icon-disabled");
  } else {
    forward.classList.add("icon-disabled");
  }
}
