import serveStatic from "serve-static";
import path from "path";
import nocache from "nocache";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import compression from "compression";
import * as sapper from "@sapper/server";
import { sessionConfig } from "@middlewares/store";
import initSession from "@middlewares/sessionConfig";
import reqDecrypt from "@middlewares/reqDecrypt";
import resEncrypt from "@middlewares/resEncrypt";
// import reqLogger from "@middlewares/reqLogger";
// import resLogger from "@middlewares/resLogger";
import { cspConfig, corsConfig } from "@configs/header";
import {
  initDebugLog,
  enableDebugLog,
  disableDebugLog,
} from "@server/utils/console";

initDebugLog();
process.env.DEBUG_MODE_FILE === "true" ? enableDebugLog() : disableDebugLog();

const enableCsp = process.env.CSP_ENABLE === "true";

const app = express();

const basePath = process.env.BASE_PATH || "";
const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const static_path = dev
  ? "../../../static"
  : "../../../__sapper__/build/static";

// security header
app.use(cors(corsConfig));
enableCsp && app.use(helmet.contentSecurityPolicy(cspConfig));
app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);
app.use(
  helmet.hsts({
    maxAge: 15552000,
  })
);
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

//healthcheck
app.use(`${basePath}/ping`, require("express-healthcheck")());

app.use(
  basePath + "",
  serveStatic(path.join(__dirname, static_path), {
    maxAge: "7d",
  })
);
app.use(nocache());

app.use(
  basePath,
  cookieParser(),
  json({ limit: "2mb" }),
  urlencoded({ limit: "2mb", extended: true }),
  session(sessionConfig),
  compression({ threshold: 0 }),
  initSession(),
  reqDecrypt(),
  // reqLogger(),
  resEncrypt(),
  // resLogger(),
  sapper.middleware({
    session: (req) => {
      return {
        sessionId: req.session.sessionId,
        extSessionId: req.session.extSessionId,
        requestId: req.session.requestId,
        aesKey: req.session.aesKey,
        aesDel: req.session.aesDel,
        rsaDel: req.session.rsaDel,
      };
    },
  })
);

app.listen(PORT, (err) => {
  if (err) console.log("error", err);
});
