import httpServer from "@utils/http/server";
import { basePath } from "@constants/url";

export async function get(req, res) {
  const sessionID = req.query.s;
  // validate session
  req.session.extSessionId = sessionID;
  try {
    const { data } = await httpServer(req.session).post("/1.0/bind/check", { sessionID });
    const { data: {
      state,
      backToStoreUri,
      backToStoreFailedUri,
      partnerName,
    }, status } = data;

    if(status === "00") {
      if (state === "BindingStateAgreement") {
        req.session.partnerName = partnerName;
        req.session.state = state;
        req.session.backToStoreUri = backToStoreUri;
        req.session.backToStoreFailedUri = backToStoreFailedUri;
        res.redirect(`${basePath}/debit/consent`);
        return false;
      }
      if(state === "BindingStateLogin") {
        res.redirect(`${basePath}/debit/otp`);
        return false;
      } else if(state === "BindingStateVerified") {
        res.redirect(`${basePath}/debit/success`);
        return false;
      }
      res.redirect(`${basePath}/debit/error?code=991`);
      return false;
    }
    res.redirect(`${basePath}/debit/error?code=${status}`);
    return false;
  } catch (error) {
    res.redirect(`${basePath}/debit/error?code=992`);
    return false;
  }
}
