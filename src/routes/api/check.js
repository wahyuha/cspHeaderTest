import { isValidSession } from "@utils/session";

export async function post(req, res) {
  if (!isValidSession(req)) {
    res.json({
      data: {},
      status: "999",
    });
  }
  const session = req.session;
  const partnerName = session.partnerName;
  const customerNumber = session.customerNumber;
  const state = session.state;

  if (state === "BindingStateAgreement" && partnerName) {
    res.json({
      data: { partnerName, customerNumber },
      status: "00",
    });
  } else {
    res.json({
      data: {},
      status: "990",
    });
  }
}
