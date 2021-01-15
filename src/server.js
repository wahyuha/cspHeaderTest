import sirv from "sirv";
import express from "express";
import { json, urlencoded } from "body-parser";
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

app
  .use(
    json({ limit: "2mb" }),
    urlencoded({ limit: "2mb", extended: true }),
    session(sessionStore),
    initSession(),
    reqDecrypt(),
    resEncrypt(),
    compression({ threshold: 0 }),
    sirv(static_path, { dev }),
    sapper.middleware({
      session: (req) => {
        return {
          sessionId: req.session.sessionId,
          extSessionId: req.session.extSessionId,
          requestId: req.session.requestId,
          aesKey: req.session.aesKey,
          aesDel: req.session.aesDel,
          rsaDel: req.session.rsaDel,
          // customerState: req.session.customerState,
          // customerNumber: req.session.customerNumber,
        };
      },
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
