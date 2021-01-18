import httpServer from '@utils/http/server';

export async function get(req, res) {
  const sessionID = req.query.s;
  // validate session
  req.session.extSessionId = sessionID;
  try {
    const { data } = await httpServer(req.session).post('/1.0/bind/check', { sessionID });
    const { data: {
      state,
      backToStoreUri,
      backToStoreFailedUri,
      partnerName
    }, status } = data;

    if(status === "00") {
      if (state === 'BindingStateAgreement') {
        req.session.partnerName = partnerName;
        req.session.state = state;
        req.session.backToStoreUri = backToStoreUri;
        req.session.backToStoreFailedUri = backToStoreFailedUri;
        res.redirect("/debit/consent");
        return;
      }
      if(state === "BindingStateLogin") {
        res.redirect("/debit/otp");
        return;
      } else if(state === "BindingStateVerified") {
        res.redirect("/debit/success");
        return;
      }
      res.redirect("/debit/error?code=991");
      return;
    }
    res.redirect(`/debit/error?code=${status}`);
    return;
  } catch (error) {
    res.redirect("/debit/error?code=992");
    return;
  }
}
