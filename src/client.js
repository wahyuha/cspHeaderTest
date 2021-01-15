import * as sapper from "@sapper/app";
import { injectVendor } from "@helpers/vendor";

if (process.env.CRYPTO_MODE === "on") {
  injectVendor();
}

sapper.start({
  target: document.querySelector("#sapper"),
});
