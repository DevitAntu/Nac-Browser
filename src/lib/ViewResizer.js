import { activeView } from "./Tab.js";
import { topBarHeight } from "./Contants.js";
/**
 * Check the size and if not updated update the current view size to fit the window. if force is true it doesn't check the size.
 * @param {boolean} force
 */
async function updateViewSize(force) {
  const win = require("electron").remote.getCurrentWindow();
  let v = activeView;
  if (force) {
    await v.setBounds({
      width: win.getContentBounds().width,
      height: win.getContentBounds().height - topBarHeight,
      x: 0,
      y: topBarHeight,
    });
    return;
  }
  let isResized =
    (await v.getBounds().x) == 0 &&
    (await v.getBounds().width) == win.getContentBounds().width &&
    (await v.getBounds().height) ==
      win.getContentBounds().height - topBarHeight &&
    (await v.getBounds().y) == topBarHeight;
  if (!isResized && !activeView.webContents.isLoading()) {
    await v.setBounds({
      width: win.getContentBounds().width,
      height: win.getContentBounds().height - topBarHeight,
      x: 0,
      y: topBarHeight,
    });
  }
}
export default updateViewSize;
