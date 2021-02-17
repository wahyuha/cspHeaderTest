import { sessionEnv, cookieName } from "@server/utils/env";
import httpServer from "@utils/http/server";

export async function get(req, res) {
  const sessionID = req.query.s;

  try {
    await httpServer(req.session).post("/1.0/bind/reagreement", { sessionID });
  } catch (error) {
    console.process(error);
  }

  await req.session.destroy();
  await res.cookie(sessionEnv.cookie.name, "", { expires: new Date(0) });
  await res.cookie(cookieName.rid, "", { expires: new Date(0) });
  await res.cookie(cookieName.trans, "", { expires: new Date(0) });

  res.redirect(`/dd/debit/init?s=${sessionID}`);
  return false;
}
