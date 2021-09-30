export const injectVendor = () => {
  const jsenc = document.createElement("script");
  // jsenc.defer = true;
  jsenc.src = `${process.env.JS_CDN}/jsencrypt.min.js`;
  document.head.appendChild(jsenc);
};
