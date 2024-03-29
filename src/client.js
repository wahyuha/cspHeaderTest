import * as sapper from "@sapper/app";
// import { injectVendor } from "@helpers/vendor";

// if (process.env.SAPPER_APP_CRYPTO_MODE === "true") {
//   injectVendor();
// }

if (process.env.ENABLE_ERUDA === "true") {
  import("eruda").then((resp) => {
    resp.default.init();
  });
}

sapper.start({
  target: document.querySelector("#sapper"),
});
