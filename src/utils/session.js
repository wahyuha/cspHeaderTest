export const isValidSession = req => {
  const s = req.session;
  const extsId = s.extSessionId !== undefined && s.extSessionId !== "";
  const tId = s.tid === req.cookies.tid;
  
  return extsId && tId;
};
