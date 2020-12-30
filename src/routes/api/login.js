import httpServer from '@utils/http/server';
import { encrypt } from '@utils/crypto';

export async function post(req, res) {
  const sessionID = req.session.sessionID;

  // TODO: create finger print
  const fingerprint = "01ERY9050186RN1VRTQZTA76BX"
  const pin = req.body.pin || '';
  const encryptedPin = encrypt(`${pin}`, fingerprint)

  try {
    const response = await httpServer.post('/1.0/bind/login', {
      sessionID,
      pin: encryptedPin,
    });
    const { data: { data, status, message } } = response;

    if (status === "00") {
      req.session.customerState = data.state;
      req.session.customerNumber = data.customerNumber;
    }
    res.json({ data, status, message })
  } catch (error) {
    res.json({error})
  }
}
