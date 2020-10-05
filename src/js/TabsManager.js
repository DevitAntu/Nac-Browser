const { extname } = require("path");
import Dom from "../lib/Dom.js";
import updateWinTitle from "../lib/WinTitleUpdater.js";
import updateToolsBar from "../lib/ToolsBarUpdater.js";
import updateViewSize from "../lib/ViewResizer.js";
const tabViews = Dom.tabViews;
const addTab = Dom.addTab;
import {
  allViews,
  getTabById,
  newTab,
  viewStartLoading,
  viewStopLoading,
  onTabClick,
} from "../lib/Tab.js";
import { topBarHeight } from "../lib/Contants.js";
const win = require("electron").remote.getCurrentWindow();
export default function () {
  getTabById(
    newTab({
      isActive: true,
      url: `file://${__dirname}/pages/newTab.html`,
      title: "New Tab",
      isFirst: true,
    })
  ).classList.add("add");
  addTab.addEventListener("click", () => {
    getTabById(
      newTab({
        isActive: true,
        url: `file://${__dirname}/pages/newTab.html`,
        title: "New Tab",
        isFirst: false,
      })
    ).classList.add("add");
  });
  tabViews.addEventListener("new-tab", (e) => {
    const id = e.detail.tabId;
    const newView = allViews[id];
    const newTab = getTabById(id);
    newView.webContents.on("did-start-loading", () => {
      viewStartLoading();
    });
    newView.webContents.on("did-stop-loading", () => {
      viewStopLoading(id);
    });
    newView.webContents.on(
      "did-fail-load",
      (e, errorCode, errorDescription) => {
        newView.webContents.loadURL(
          `file:///${__dirname}/pages/error.html?errorCode=${errorCode}&errorDescription=${errorDescription}&validatedURL=${newView.webContents.getURL()}`
        );
      }
    );
    newView.webContents.on("will-navigate", () => {
      newTab.querySelector(".favicon-img").src = "./img/loading.gif";
    });
    const [width, height] = [
      win.getContentBounds().width,
      win.getContentBounds().height,
    ];
    newView.setBounds({
      width: width,
      height: height - topBarHeight,
      x: 0,
      y: topBarHeight,
    });
    newView.webContents.on("dom-ready", () => {
      updateViewSize(true);
      updateWinTitle();
    });
    eval(`window.icon_${id} = './img/globe.svg'`);
    newView.webContents.on("page-favicon-updated", async (e, icons) => {
      for (const icon of icons) {
        if (extname(icon) == "svg") {
          newTab.querySelector(".favicon-img").src = await icon;
          window[`icon_${id}`] = await icon;
        } else {
          newTab.querySelector(".favicon-img").src = await icons[0];
          window[`icon_${id}`] = await icon;
        }
      }
    });
    newView.webContents.on("page-title-updated", (e, title) => {
      newTab.querySelector(".title").textContent = title;
    });
  });
  tabViews.addEventListener("click", onTabClick);
  tabViews.addEventListener("tab-change", () => {
    updateToolsBar();
    updateWinTitle();
    updateViewSize();
  });
}
