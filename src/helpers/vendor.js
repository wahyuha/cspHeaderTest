export const injectVendor = () => {
  const jsenc = document.createElement("script");
  jsenc.src = "/dd/js/jsencrypt.min.js";
  // jsenc.src = `${process.env.JS_CDN}/jsencrypt.min.js`;
  document.head.appendChild(jsenc);
};

export const injectRollbar = () => {
  const jsenc = document.createElement("script");
  jsenc.src = "/dd/js/rollbar.min.js";
  document.head.appendChild(jsenc);
};