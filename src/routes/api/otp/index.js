import httpServer from "@utils/http/server";
import { encrypt } from "@utils/crypto";
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
  const requestId = req.session.requestId;
  const otp = req.body.otp || "";
  const encryptedOtp = encrypt(`${otp}`, requestId);

  try {
    const response = await httpServer(req.session).post("/1.0/bind/otp", {
      sessionID,
      otp: encryptedOtp,
    });
    const { data: { data, status, message } } = response;

    if (status === "00") {
      req.session.state = data.state;
    }
    res.json({ data, status, message });
  } catch (error) {
    res.json({error});
  }
}
