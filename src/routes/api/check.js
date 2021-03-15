import { isValidSession } from "@utils/session";

export async function post(req, res) {
  if (!isValidSession(req)) {
    res.json({
      data: {},
      status: "999",
    });

    return false;
  }
  const session = req.session || {};
  const {
    partnerName,
    customerNumber,
    state,
    editable,
    backToStoreUri,
    backToStoreFailedUri,
    tnc,
  } = session;

  if (state === "BindingStateAgreement" && partnerName) {
    res.json({
      data: {
        partnerName,
        customerNumber,
        editable,
        backToStoreUri,
        backToStoreFailedUri,
        tnc,
      },
      status: "00",
    });
  } else {
    res.json({
      data: {},
      status: "990",
    });
  }
}
