import serveStatic from "serve-static";
import path from "path";
// import nocache from "nocache";
import express from "express";
import helmet from "helmet";
// import cors from "cors";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
// import session from "express-session";
import compression from "compression";
import * as sapper from "@sapper/server";
import { cspConfig } from "@configs/header";

const enableCsp = process.env.CSP_ENABLE === "true";

const app = (module.exports = express());

const basePath = process.env.BASE_PATH || "";
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const static_path = dev
  ? "../../../static"
  : "../../../__sapper__/build/static";

// security header
// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app;
//   style-src 'self' 'unsafe-inline' *.googleapis.com;
//   img-src * blob: data:;
//   media-src 'none';
//   connect-src *;
//   font-src 'self' data: https:;
// `;

// app.use(cors(corsConfig));
enableCsp && app.use(helmet.contentSecurityPolicy(cspConfig));
// app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
// app.use(helmet.noSniff());
// app.use(helmet.hidePoweredBy());
// app.use(
//   helmet.frameguard({
//     action: "sameorigin",
//   })
// );
// app.use(
//   helmet.hsts({
//     maxAge: 15552000,
//   })
// );
// app.use((req, res, next) => {
//   res.setHeader(
//     "Content-Security-Policy",
//     ContentSecurityPolicy.replace(/\n/g, "")
//   );
//   // res.setHeader("X-XSS-Protection", "1; mode=block");
//   next();
// });

//healthcheck
app.use(`${basePath}/ping`, require("express-healthcheck")());

app.use(
  basePath + "",
  serveStatic(path.join(__dirname, static_path), {
    maxAge: "7d",
  })
);

app.use(function (req, res, next) {
  const userAgent = req.get("User-Agent");
  const chrome = userAgent.match(/Chrome\/([0-9.]+)/);
  // const chromeVersion = chrome && chrome[1];
  const versionMajor = Number(chrome[1].substr(0, 2));
  if (versionMajor <= 53) {
    res.send("Silahakan ganti browser");
    res.end();
    return;
  }
  next();
});

app.use(
  basePath,
  cookieParser(),
  json({ limit: "2mb" }),
  urlencoded({ limit: "2mb", extended: true }),
  // session(sessionConfig),
  compression({ threshold: 0 }),
  sapper.middleware()
  // initSession(),
  // reqDecrypt(),
  // reqLogger(),
  // resEncrypt(),
  // resLogger(),
  // sapper.middleware({
  //   session: (req) => {
  //     return {
  //       sessionId: req.session.sessionId,
  //       extSessionId: req.session.extSessionId,
  //       requestId: req.session.requestId,
  //       aesKey: req.session.aesKey,
  //       aesDel: req.session.aesDel,
  //       rsaDel: req.session.rsaDel,
  //     };
  //   },
  // })
);

app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});

// export default app;
