export const injectVendor = () => {
  const jsenc = document.createElement("script");
  jsenc.defer = true;
  // jsenc.src = "/dd/js/jsencrypt.min.js";
  jsenc.src = `${process.env.JS_CDN}/jsencrypt.min.js`;
  document.head.appendChild(jsenc);
};

export const injectRollbar = () => {
  var _rollbarConfig = {
    accessToken: "d34fe2e90d4e4b419033ed3afd64d249",
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: "development",
    },
  };
  const jsenc = document.createElement("script");
  jsenc.src = "/dd/js/rollbar.min.js";
  document.head.appendChild(jsenc);
};