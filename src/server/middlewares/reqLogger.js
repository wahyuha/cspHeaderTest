import { isFileRoute, getPathName, isSkipPath } from "@server/utils/common";
import { logStart } from "@constants/logger";

const reqLogger = () => {
  return function(req, res, next) {
    if (!isFileRoute(req.url) && !isSkipPath(getPathName(req.url))) {
      const pathName = getPathName(req.url);
      const mts = {
        session: req.session,
        headers: req.headers,
        query: req.query,
        params: req.params,
        body: req.body,
      };
      const pth = {
        domain: req.headers["host"],
        pathname: pathName,
      };
      console.start(req.session.requestId, req.session.tid, logStart, pth, mts);
    }
    next();
  };
};

export default reqLogger;
