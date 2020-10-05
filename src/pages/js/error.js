let Code;
let siteUrl;
const errdom = document.querySelector(".error-content");
const urlParams = getParams(window.location.href);
errdom.innerHTML = loadErr(urlParams);
/**
 * Get the URL parameters
 * @param  {String} url The URL
 * @return {Object}     The URL parameters
 */
function getParams(url) {
  let params = {};
  let parser = document.createElement("a");
  parser.href = url;
  let query = parser.search.substring(1);
  let vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i];
    let x = pair.indexOf("=");
    params[pair.slice(0, x)] = pair.slice(x + 1);
  }
  return params;
}
/**
 * Generate an error HTML
 * @param {Object} e
 * @param {string} e.resource
 * @param {number} e.errorCode
 * @param {string} e.errorDescription
 * @param {string} e.errorInfo
 * @param {string} e.title
 * @param {string} e.validatedURL
 * @returns {string}
 */
function loadErr(e) {
  siteUrl = e.validatedURL;
  let title = "This site can’t be reached";
  let info = `The server at <strong>${siteUrl}</strong> will be temporarliy down`;
  let icon = "fa-exclamation-circle";
  let button = `<button class="err-btn" id="button">Try again</button>`;
  let errorDescription;
  errorDescription = e.errorDescription || "";
  info = e.errorInfo || "";
  // remove trailing slash
  let origin = e.validatedURL || "";
  Code = e.errorCode;
  console.log(e.validatedURL);
  switch (Number(e.errorCode)) {
    case -106:
      title = "No internet";
      info = `<p class="space">Your computer is not connected to the internet.</p>
        <ul>Try:
            <li class="left">Resetting your Wi-Fi connection</li>
            <li class="left">Checking your router and modem.</li>
        </ul>`;
      break;
    case -6:
      title = "File Not Found";
      info = `The file at ${origin} has been deleted or the file path was incorrect`;
      break;
    case -105:
      icon = "fa-frown-o";
      info = `<p>Couldn’t resolve the DNS address for <strong>${origin}</strong></p>`;
      break;
    case -501:
      title = "Your connection is not secure";
      info = `<p>NAC cannot establish a secure connection to the server for <strong>${origin}</strong>.</p>`;
      button = `<button class="err-btn" id="button">Go Home</button>`;
      break;
    case -118:
      info = `<b>${origin}</b> took long to respond`;
    default:
      title = "This site can’t be reached";
      description = `The webpage at <b>${origin}</b> might be temporarily down or it may have moved permanently to a new web address.`;
      info = `<b>${origin}</b> refuesd to connect`;
      button = `<button class="err-btn" id="button">Try again</button>`;
  }
  document.head.querySelector("title").textContent = siteUrl;
  history.replaceState(null, "", siteUrl);
  return `
  <div class="icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"
  data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img"
  viewBox="0 0 352 512">
  <path fill="currentColor"
      d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
</svg></div>

<div class="error-wrapper">
<h1 class="err-title">${title}</h1>
${info}
<div class="footer">
  <p class="err-code">${errorDescription} (${Code})</p>
  ${button}
  
</div>
</div>
`.replace(/\r+\n/g, "");
}
document.getElementById("button").addEventListener("click", (e) => {
  if (Code == -501) {
    history.replaceState(null, null, "../pages/newTab.html");
    location.reload();
  } else {
    location.reload();
  }
});
