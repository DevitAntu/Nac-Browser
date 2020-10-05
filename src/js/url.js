import Dom from "../lib/Dom.js";
import { activeView, activeTabId, getTabById } from "../lib/Tab.js";
import UrlHandeler from "../lib/UrlHandeler.js";
const searchBox = Dom.searchBox;

export default function () {
  searchBox.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
      activeView.webContents.loadURL(UrlHandeler(searchBox.value));
      getTabById(activeTabId).querySelector(".favicon-img").src =
        "./img/loading.gif";
    }
  });
  searchBox.addEventListener("focus", function () {
    this.select();
  });
}
