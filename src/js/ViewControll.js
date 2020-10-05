import Dom from "../lib/Dom.js";
import { activeView } from "../lib/Tab.js";
const back = Dom.back;
const forward = Dom.forward;
const reload = Dom.reload;
function goBack() {
  if (activeView.webContents.canGoBack()) {
    activeView.webContents.goBack();
  }
}
function goForward() {
  if (activeView.webContents.canGoForward()) {
    activeView.webContents.goForward();
  }
}
function handelReload() {
  if (activeView.webContents.isLoading()) {
    activeView.webContents.stop();
    return;
  }
  activeView.webContents.reload();
}

export default function () {
  back.addEventListener("click", goBack);
  forward.addEventListener("click", goForward);
  reload.addEventListener("click", handelReload);
}
