import mung from "express-mung";
import isEmpty from "lodash/isEmpty";

import { encryptResp } from "@server/utils/crypto";
import { isAPIRoute } from "@server/utils/common";

const addSec = (body, req, res) => {
  if (isAPIRoute(req.url) && !isEmpty(body)) {
    const oldAesKey = req.session.aesKey;
    const oldAesDel = req.session.aesDel;

    res.locals.isJson = true;
    if (process.env.SAPPER_APP_CRYPTO_MODE === "true") {
      const result = JSON.stringify(body);
      body = encryptResp(result, oldAesKey, oldAesDel);
      res.locals.encrypted = true;
    }

    res.locals.oldAesKey = oldAesKey;
    res.locals.oldAesDel = oldAesDel;
  }
  return body;
};

const expDec = () => {
  return mung.json(addSec);
};

export default expDec;
