import url from "url";

export const rand = () => {
  return Math.random().toString(36).substr(2);
};

export const newToken = () => {
  return rand() + rand() + rand() + rand();
};

export const newtokenDelimeter = () => {
  return rand();
};

export const getPathName = (uri) => {
  const path = url.parse(uri, true);
  return path.pathname;
};

export const getPathQuery = (uri) => {
  const path = url.parse(uri, true);
  return path.query;
};

export const isAPIRoute = (uri) => {
  const path = getPathName(uri);
  return path.indexOf("/api/") > -1;
};

export const isSkipPath = (path) => {
  return ["/"].includes(path);
};

export const isFileRoute = (uri) => {
  var ext = uri.split(".").pop();
  const list = [
    "jpg",
    "png",
    "webp",
    "html",
    "css",
    "js",
    "ico",
    "woff2",
    "map",
  ];
  return list.indexOf(ext) > -1 && uri.indexOf("/client/") > -1;
};
