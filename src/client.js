import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import * as sapper from "@sapper/app";
import { injectVendor } from "@helpers/vendor";

if (process.env.SAPPER_APP_CRYPTO_MODE === "true") {
  injectVendor();
}

// if (process.env.ENABLE_ROLLBAR === "true") {
//   injectRollbar();
// }

if (process.env.ENABLE_ERUDA === "true") {
  import("eruda").then((resp) => {
    resp.default.init();
  });
}

Sentry.init({
  dsn: "https://e58c57d825664e94a4672d32c6ec3acf@o525890.ingest.sentry.io/5940308",
  release: "kiluan@1.2.1",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV === "development" ? "development" : "production",
});

sapper.start({
  target: document.querySelector("#sapper"),
});
