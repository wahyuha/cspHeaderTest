import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
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

if (process.env.SENTRY_ENABLED === "true") {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    release: process.env.npm_package_version,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    environment:
      process.env.NODE_ENV === "development" ? "development" : "production",
  });
}

sapper.start({
  target: document.querySelector("#sapper"),
});
