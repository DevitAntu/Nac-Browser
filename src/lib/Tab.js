const { BrowserView } = require("electron").remote;
import updateViewSize from "./ViewResizer.js";
import Dom from "./Dom.js";
import updateToolsBar from "./ToolsBarUpdater.js";
const tabViews = Dom.tabViews;
const win = require("electron").remote.getCurrentWindow();
export let activeView = null;
export const closedViews = {};
export const allViews = {};
export let lastView = null;
export let activeTabId = null;
export function newTab({ url, title, isActive, isFirst }) {
  let view = new BrowserView();
  const tabId = view.id;
  const template = `
  <div viewid=${tabId} class="tab ${isActive ? "active" : ""}">
<div class="favicon" viewid=${tabId}>
   <img class="favicon-img" src="./img/globe.svg" viewid=${tabId}>
</div>
<div class="title" viewid=${tabId}>${title}</div>
<div class="closetab" id='close-${tabId}' viewid=${tabId}><img id='close-img-${tabId}' viewid=${tabId} src="./img/close.svg"></div>
</div>`;
  tabViews.insertAdjacentHTML("beforeend", template);
  view.webContents.loadURL(url);
  allViews[tabId] = view;
  if (isActive && !isFirst) {
    changeActiveTabTo(tabId);
  } else if (isFirst) {
    win.setBrowserView(view);
    activeView = view;
    lastView = view;
    activeTabId = tabId;
  }
  // dispath new-tab event
  setTimeout(() => {
    tabViews.dispatchEvent(
      new CustomEvent("new-tab", {
        detail: {
          tabId: tabId,
        },
      })
    );
  }, 500);
  return tabId;
}
export function removeTab(id) {
  if (getAllTabs().length > 1) {
    const isActive = activeTabId == id;
    const nextActiveTabId = getTabById(id).previousElementSibling
      ? getTabById(id).previousElementSibling.attributes.viewid.value
      : getTabById(id).nextElementSibling.attributes.viewid.value;
    getTabById(id).classList.add("remove");
    setTimeout(() => {
      tabViews.removeChild(getTabById(id));
    }, 250);
    closedViews[allViews[id].webContents.getURL()] = allViews[
      id
    ].webContents.getTitle();
    // Delete old view
    allViews[id].destroy();
    delete allViews[id];

    if (isActive) {
      activeTabId = nextActiveTabId;
      changeActiveTabTo(nextActiveTabId);
    }
  } else {
    win.close();
  }
}
export function getActiveTab() {
  return getAllTabs().find((tab) => {
    return tab.attributes.viewid.value == activeTabId;
  });
}
export function getTabById(tabId) {
  return getAllTabs().find((tab) => {
    return tab.attributes.viewid.value == tabId;
  });
}
export function getAllTabs() {
  const tabs = [];
  if (!tabViews.childElementCount) return [];
  let tab = [...tabViews.children];
  tab.forEach((tab) => {
    tabs.push(tab);
  });
  return tabs;
}
export function changeActiveTabTo(id) {
  if (lastView) {
    win.removeBrowserView(lastView);
    getActiveTab().classList.remove("active");
    getTabById(id).classList.add("active");
    win.setBrowserView(allViews[id]);
    activeView = allViews[id];
    lastView = allViews[id];
    activeTabId = id;
    setTimeout(() => {
      tabViews.dispatchEvent(new Event("tab-change"));
    }, 500);
  }
}
export function onTabClick(e) {
  if (
    e.target.id == `close-${e.target.attributes.viewid.value}` ||
    e.target.id == `close-img-${e.target.attributes.viewid.value}`
  ) {
    const id = e.target.attributes.viewid.value;
    removeTab(id);
  } else {
    const id = e.target.attributes.viewid.value;
    changeActiveTabTo(id);
  }
}
export function viewStopLoading(id) {
  reload.innerHTML = `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="redo"
    class="svg-inline--fa fa-redo fa-w-16 icon icon-small" role="img" xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512">
    <path fill="currentColor"
      d="M500.33 0h-47.41a12 12 0 0 0-12 12.57l4 82.76A247.42 247.42 0 0 0 256 8C119.34 8 7.9 119.53 8 256.19 8.1 393.07 119.1 504 256 504a247.1 247.1 0 0 0 166.18-63.91 12 12 0 0 0 .48-17.43l-34-34a12 12 0 0 0-16.38-.55A176 176 0 1 1 402.1 157.8l-101.53-4.87a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12h200.33a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12z">
    </path>
  </svg>
    `;
  getTabById(id).querySelector(".title").textContent = allViews[
    id
  ].webContents.getTitle();
  setTimeout(updateToolsBar, 200);
  getTabById(id).querySelector(".favicon-img").src = eval(`icon_${id}`);
  updateViewSize();
}

export function viewStartLoading() {
  // getTabById(id).querySelector(".favicon-img").src = "./img/loading.gif";
  reload.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
          focusable="false" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11 icon" role="img"
          viewBox="0 0 352 512">
          <path fill="currentColor"
            d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
        </svg>
    `;
}
