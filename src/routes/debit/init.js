import httpServer from "@utils/http/server";
import { basePath } from "@constants/url";

export async function get(req, res) {
  const sessionID = req.query.s;
  req.session.extSessionId = sessionID;

  let location = "";

  try {
    const { data } = await httpServer(req.session).post("/1.0/bind/check", {
      sessionID,
    });
    const {
      data: {
        state,
        backToStoreUri,
        backToStoreFailedUri,
        partnerName,
        customerNumber,
        editable,
        tnc,
      },
      status,
    } = data;

    if (status === "00") {
      req.session.partnerName = partnerName;
      req.session.customerNumber = customerNumber;
      req.session.editable = editable;
      req.session.state = state;
      req.session.backToStoreUri = backToStoreUri;
      req.session.backToStoreFailedUri = backToStoreFailedUri;
      req.session.tnc = tnc;

      if (state === "BindingStateAgreement") {
        location = `${basePath}/debit/consent`;
      } else if (state === "BindingStateLogin") {
        location = `${basePath}/debit/otp`;
      } else if (state === "BindingStateVerified") {
        location = `${basePath}/debit/success`;
      } else {
        location = `${basePath}/debit/error?code=991`;
      }
    } else {
      location = `${basePath}/debit/error?code=${status}`;
    }
  } catch (error) {
    console.process(error);
    location = `${basePath}/debit/error?code=992`;
  }

  res.writeHead(302, {
    location,
  });
  res.end();
  return true;
}
