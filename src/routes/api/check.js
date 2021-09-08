import { isValidSession } from "@utils/session";

export async function post(req, res) {
  if (!isValidSession(req)) {
    res.json({
      data: {},
      status: "999",
    });
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
    isRegister,
  } = session;

  if (state === "BindingStateAgreement" || state === "RegisterStateAgreement" && partnerName) {
    res.json({
      data: {
        partnerName,
        customerNumber,
        editable,
        backToStoreUri,
        backToStoreFailedUri,
        tnc,
        isRegister,
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
