import httpServer from '@utils/http/server';
import { encrypt } from '@utils/crypto';

export async function post(req, res) {
  const sessionID = req.session.sessionID;

  // TODO: create finger print
  const requestId = req.session.requestId;
  const otp = req.body.otp || '';
  const encryptedOtp = encrypt(`${otp}`, requestId)

  try {
    const response = await httpServer(req.session).post('/1.0/bind/otp', {
      sessionID,
      otp: encryptedOtp,
    });
    const { data: { data, status, message } } = response;

    if (status === "00") {
      req.session.state = data.state;
    }
    res.json({ data, status, message })
  } catch (error) {
    res.json({error})
  }
}
