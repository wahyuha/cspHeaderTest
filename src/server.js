import sirv from "sirv";
import express from "express";
import helmet from "helmet";
import { json, urlencoded } from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import compression from "compression";
import * as sapper from "@sapper/server";
import { sessionStore } from "@middlewares/store";
import initSession from "@middlewares/sessionConfig";
import reqDecrypt from "@middlewares/reqDecrypt";
import resEncrypt from "@middlewares/resEncrypt";

const app = express();

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";
const static_path =
  NODE_ENV === "development" ? "static" : "__sapper__/build/static";

// security header
// app.use(helmet.contentSecurityPolicy());
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
app.use("/dd/ping", require("express-healthcheck")());

app.use(
  '/dd',
  cookieParser(),
  json({ limit: "2mb" }),
  urlencoded({ limit: "2mb", extended: true }),
  session(sessionStore),
  compression({ threshold: 0 }),
  sirv(static_path, { dev }),
  initSession(),
  reqDecrypt(),
  resEncrypt(),
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
