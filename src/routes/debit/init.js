import httpServer from "@utils/http/server";

export async function get(req, res) {
  const sessionID = req.query.s;
  req.session.extSessionId = sessionID;

  try {
    const { data } = await httpServer(req.session).post("/1.0/bind/check", { sessionID });
    const { data: {
      state,
      backToStoreUri,
      backToStoreFailedUri,
      partnerName,
      customerNumber,
    }, status } = data;

    if(status === "00") {
      req.session.partnerName = partnerName;
      req.session.customerNumber = customerNumber;
      req.session.state = state;
      req.session.backToStoreUri = backToStoreUri;
      req.session.backToStoreFailedUri = backToStoreFailedUri;

      if (state === "BindingStateAgreement") {
        res.redirect(`/dd/debit/consent`);
        return false;
      } else if(state === "BindingStateLogin") {
        res.redirect(`/dd/debit/otp`);
        return false;
      } else if(state === "BindingStateVerified") {
        res.redirect(`/dd/debit/success`);
        return false;
      }
      res.redirect(`/dd/debit/error?code=991`);
      return false;
    }
    res.redirect(`/dd/debit/error?code=${status}`);
    return false;
  } catch (error) {
    console.process(error);
    res.redirect(`/dd/debit/error?code=992`);
    return false;
  }
}
