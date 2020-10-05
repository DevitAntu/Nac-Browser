import { activeView } from "./Tab.js";
import Dom from "./Dom.js";
const title = Dom.title;
export default function updateWinTitle() {
  title.textContent = `${activeView.webContents.getTitle()} - Nac`;
}
