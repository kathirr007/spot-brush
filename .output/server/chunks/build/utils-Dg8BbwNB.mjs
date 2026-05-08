function computeDist(p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}
function getCurrentTimeMs() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function getSubDir() {
  const url = (void 0).URL.substr(0, (void 0).URL.lastIndexOf("/"));
  const urlSplit = url.split("/");
  let subdir = "";
  for (let i = 3; i < urlSplit.length; i++) {
    subdir = subdir + "/" + urlSplit[i];
  }
  return subdir;
}

export { computeDist, getCurrentTimeMs, getSubDir };
//# sourceMappingURL=utils-Dg8BbwNB.mjs.map
