function searchEngine(q) {
  let query = q.split(" ").join("+");
  return `https://www.google.com/search?q=${query}`;
}
function UrlHandeler(str) {
  let url;
  try {
    new URL(str);
    url = str;
  } catch (error) {
    let pattern = /^(?<protocol>(?:.{2,}:)\/\/)?(?<domain>(?:[-a-z0-9]+\..+)+)(?<port>:\d+)?(?<path>\/(?:.+)?)?/i;
    if (!pattern.test(str)) {
      url = searchEngine(str);
    } else {
      url = `http://${str}`;
    }
  }
  return url;
}
export default UrlHandeler;
