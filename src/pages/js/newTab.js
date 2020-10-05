import UrlHandeler from "../../lib/UrlHandeler.js";
document.getElementById("searchbox").addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    window.location.href = UrlHandeler(this.value);
  }
});
