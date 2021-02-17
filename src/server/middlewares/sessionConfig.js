import { v4 as uuidv4 } from "uuid";
import { cookieConfig } from "@server/middlewares/cookieConfig";
import { cookieName } from "@server/utils/env";
import { getPathName, getPathQuery, newToken, newtokenDelimeter } from "@server/utils/common.js";

const sessionConfig = () => {
  return function(req, res, next) {
    if (getPathName(req.url) === "/debit/init") {
      const tid = uuidv4();
      req.session.extSessionId = getPathQuery(req.url).s;
      req.session.requestId = uuidv4();
      req.session.tid = tid;
      // req.session.salt = newToken();
      req.session.sessionId = newToken();
      req.session.aesKey = newToken();
      req.session.aesDel = newtokenDelimeter();
      req.session.rsaDel = newtokenDelimeter();

      res.cookie(cookieName.trans, tid, cookieConfig);
    }
    res.locals.nonce = uuidv4();
    next();
  };
};

export default sessionConfig;
