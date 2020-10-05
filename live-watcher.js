const { ipcRenderer } = require("electron");
const { watch } = require("fs");
watch("./", {}, () => {
  ipcRenderer.sendSync("re-render");
});
watch("./src", {}, () => {
  ipcRenderer.sendSync("re-render");
});
