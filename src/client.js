// import * as Sentry from "@sentry/browser";
// import { Integrations } from "@sentry/tracing";
import * as sapper from "@sapper/app";
import { injectVendor } from "@helpers/vendor";

if (process.env.SAPPER_APP_CRYPTO_MODE === "true") {
  injectVendor();
}

if (process.env.ENABLE_ERUDA === "true") {
  import("eruda").then((resp) => {
    resp.default.init();
  });
}

// Sentry.init({
//   dsn: "https://1a013830891b487abc0e68134ca44237@o1000727.ingest.sentry.io/5960158",
//   release: "kiluan@1.2.2",
//   integrations: [new Integrations.BrowserTracing()],
//   tracesSampleRate: 1.0,
//   environment: process.env.NODE_ENV === "development" ? "development" : "production",
// });

sapper.start({
  target: document.querySelector("#sapper"),
});
