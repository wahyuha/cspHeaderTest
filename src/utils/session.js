import { getPathName } from "@server/utils/common";

export const isValidSession = (req) => {
  const s = req.session;
  const extsId = s.extSessionId !== undefined && s.extSessionId !== "";
  const tId = s.tid === req.cookies.tid;

  console.process(s.requestId, s.tid, "isValidSession ", {
    url: `${req.headers["host"]}${getPathName(req.url)}`,
    tid: tId,
    extsId: extsId,
    requestId: s.requestId,
    transId: s.tid,
    cookieTal: req.cookies.tal,
    extSessionId: s.extSessionId,
  });

  return true;
  // return extsId && tId;
};
