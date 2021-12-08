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
  const pin = req.body.pin || "";
  const name = req.body.name || "";
  const email = req.body.email || "";
  
  const encryptedPin = encrypt(`${pin}`, requestId);

  try {
    const response = await httpServer(req.session).post("/1.0/bind/register", {
      requestId,
      sessionID,
      pin: encryptedPin,
      name,
      email,
    });
    const {
      data: { data, status, message },
    } = response;
    res.json({ data, status, message });
  } catch (error) {
    console.process(error);
    res.json({ error });
  }
}
