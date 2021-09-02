import { basePath } from "@constants/url";
import httpServer from "@utils/http/server";
import { cookieConfigRemove, cookieName } from "@server/utils/env";

export async function post(req, res) {
  const pgptoken = req.body.Message ? req.body.Message : req.body.message;
  if (!pgptoken) {
    res.redirect(302, `${basePath}/debit/error?code=992`);
    return false;
  }
  let location = "";
  try {
    const { data } = await httpServer(req.session).postLoko(
      "/loko/binding/verify",
      {
        ID: pgptoken,
      }
    );
    
    const {
      data: { refNum },
      status,
    } = data;
    if (status === "00") {
      location = `${basePath}/debit/init?s=${refNum}`;
    }
    else {
      location = `${basePath}/debit/error?code=${status}`;
    }
  } catch (error) {
    console.process(error);
    location = `${basePath}/debit/error?code=992`;
  }

  await req.session.destroy();
  await res.cookie(cookieName.main, "", cookieConfigRemove);
  await res.cookie(cookieName.rid, "", cookieConfigRemove);
  await res.cookie(cookieName.trans, "", cookieConfigRemove);

  res.writeHead(302, {
    location,
  });
  res.end();
  return true;
}
