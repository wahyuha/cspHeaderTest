// import { v4 as uuidv4 } from "uuid";

import { isFileRoute, getPathName, isSkipPath } from "@server/utils/common";
import { logEnd } from "@constants/logger";
import { decryptResp } from "@server/utils/crypto";
// import { cookieConfig } from "@server/middlewares/cookieConfig";
import { sessionEnv, cookieName } from "@server/utils/env";

const resLogger = () => {
  return function(req, res, next) {
    if (!isFileRoute(req.url) && !isSkipPath(getPathName(req.url))) {
      const pathName = getPathName(req.url);
      let oldSend = res.end;
      res.end = function(data) {
        let bd = req.body;

        let mte = {};
        let bufString = "";
        if (data !== undefined) {
          bufString = data.toString();
        }
        if (bufString !== "") {
          if (res.locals.encrypted) {
            bufString = decryptResp(bufString, res.locals.oldAesDel);
          } else if (res.locals.isJson) {
            bufString = JSON.parse(bufString);
          } else if (
            bufString.substring(2, 14).toLowerCase() === "doctype html"
          ) {
            bufString = "html file";
          }
        }
        mte = {
          code: res.statusCode,
          message: res.statusMessage,
          data: bufString,
        };

        const mtdr = {
          headers: req.headers,
          request: {
            query: req.query,
            params: req.params,
            body: bd,
          },
          response: mte,
        };
        const pth = {
          domain: req.headers["host"],
          pathname: pathName,
        };
        console.tdr(req.session.requestId, req.session.tid, pth, mtdr);
        console.end(req.session.requestId, req.session.tid, logEnd, pth, mte);

        // create new transId to client for next session verification
        // if (!isFileRoute(req.url)) {
        //   req.session.tid = uuidv4();
        // }

        // if (res.statusCode !== 500) {
        //   res.cookie(cookieName.rid, req.session.requestId, cookieConfig);
        //   res.cookie(cookieName.trans, req.session.tid, cookieConfig);
        // }

        // destroy sesion after finish deliver page general error
        if (req.url === "/debit/error") {
          req.session.destroy();
          res.cookie(sessionEnv.cookie.name, "", { expires: new Date(0) });
          res.cookie(cookieName.rid, "", { expires: new Date(0) });
          res.cookie(cookieName.trans, "", { expires: new Date(0) });
        }

        oldSend.apply(res, arguments);
      };
    }
    next();
  };
};

export default resLogger;
