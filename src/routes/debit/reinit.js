import { cookieConfigRemove, cookieName } from "@server/utils/env";
import httpServer from "@utils/http/server";

export async function get(req, res) {
  const sessionID = req.query.s;

  try {
    await httpServer(req.session).post("/1.0/bind/reagreement", { sessionID });
  } catch (error) {
    console.process(error);
  }

  await req.session.destroy();
  await res.cookie("dd", "", cookieConfigRemove);
  await res.cookie(cookieName.rid, "", cookieConfigRemove);
  await res.cookie(cookieName.trans, "", cookieConfigRemove);

  res.redirect(`/dd/debit/init?s=${sessionID}`);
  return false;
}
