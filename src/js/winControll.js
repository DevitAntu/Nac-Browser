const win = require("electron").remote.getCurrentWindow();
import updateViewSize from "../lib/ViewResizer.js";
import Dom from "../lib/Dom.js";
const min = Dom.min;
const max = Dom.max;
const options = Dom.options;
const close = Dom.close;
function closeWindow(e) {
  if (e.target == close || e.target.parentElement == close) {
    win.close();
  }
}
function maxWindow(e) {
  if (e.target == max || e.target.parentElement == max) {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  }
}
function minWindow(e) {
  if (e.target == min || e.target.parentElement == min) {
    win.minimize();
  }
}

export default function () {
  options.addEventListener("click", () => {
    win.toggleDevTools();
  });
  close.addEventListener("click", closeWindow);
  min.addEventListener("click", minWindow);
  max.addEventListener("click", maxWindow);
  win.on("resize", async () => {
    updateViewSize();
  });
}
