import isEmpty from "lodash/isEmpty";

import { DecryptPrivate } from "@server/utils/crypto";
import { isAPIRoute } from "@server/utils/common";

const dec = () => {
  return function (req, res, next) {
    if (isAPIRoute(req.url) && !isEmpty(req.body)) {
      if (process.env.CRYPTO_MODE === "on") {
        req.body.data = JSON.parse(
          DecryptPrivate(req.body.data, req.session.aesDel, req.session.rsaDel)
        );
      }
    }
    next();
  };
};

export default dec;
