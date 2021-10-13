import httpServer from "@utils/http/server";
import { isValidSession } from "@utils/session";

export async function post(req, res) {
  if (!isValidSession(req)) {
    res.json({
      data: {},
      status: "999",
    });

    return false;
  }

  const sessionID = req.session.extSessionId;

  try {
    const response = await httpServer(req.session).post("/1.0/bind/cc", { sessionID });
    const {
      data: { data, status, message },
    } = response;

    if (status === "00") {
      req.session.state = data.state;
      req.session.customerNumber = data.customerNumber;
      // req.session.state = "RegisterStateOtpRequest";
    }
    res.json({ data, status, message });
  } catch (error) {
    res.json({ error });
  }
}
