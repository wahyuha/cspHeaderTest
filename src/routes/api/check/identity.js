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
    name,
    email,
  } = session;

  if (state === "RegisterStateOtpVerified") {
    res.json({
      data: {
        partnerName,
        customerNumber,
        editable,
        backToStoreUri,
        backToStoreFailedUri,
        tnc,
        isRegister,
        name,
        email,
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
