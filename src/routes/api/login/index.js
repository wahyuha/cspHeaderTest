import http from '@utils/http';
import { encrypt } from '@utils/crypto';

export async function get(req, res) {
  const sessionID = req.session.sessionID;

  // TODO: create finger print
  const fingerprint = "01ERY9050186RN1VRTQZTA76BX"
  const pin = req.params.pin;
  const encryptedPin = encrypt(pin, fingerprint);
  try {
    const { data } = await http().post('/1.0/bind/login', {
      sessionID,
      pin: encryptedPin,
    });
    // if (data.status === "00")
    req.session.state = data.data.state;
    req.session.customerName = data.data.customerName;

    res.json({ ...data })
  } catch (error) {
    res.json({error})
  }
}
