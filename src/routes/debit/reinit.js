import { cookieConfigRemove, cookieName } from "@server/utils/env";
import { basePath } from "@constants/url";
import httpServer from "@utils/http/server";

export async function get(req, res) {
  const sessionID = req.query.s;

  try {
    await httpServer(req.session).post("/1.0/bind/reagreement", { sessionID });
  } catch (error) {
    console.process("httpError", error, req);
  }

  await req.session.destroy();
  await res.cookie(cookieName.main, "", cookieConfigRemove);
  await res.cookie(cookieName.rid, "", cookieConfigRemove);
  await res.cookie(cookieName.trans, "", cookieConfigRemove);

  res.writeHead(302, {
    location: `${basePath}/debit/init?s=${sessionID}`,
  });
  res.end();
  return true;
}
