import { basePath } from "@constants/url";
import httpServer from "@utils/http/server";

export async function post(req, res) {
  const pgptoken = req.body.Message ? req.body.Message : req.body.message;
  if (!pgptoken) {
    res.redirect(`${basePath}/debit/error?code=992`);
    return false;
  }
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
      res.redirect(`${basePath}/debit/init?s=${refNum}`);
      return false;
    }
    res.redirect(`${basePath}/debit/error?code=${status}`);
    return false;
  } catch (error) {
    console.process(error);
    res.redirect(`${basePath}/debit/error?code=992`);
    return false;
  }
}
