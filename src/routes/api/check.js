import httpServer from '@utils/http/server';

export async function get(req, res) {
  const sessionID = req.session.extSessionId;
  // validate sessionID
  try {
    const { data } = await httpServer(req.session).post('/1.0/bind/check', { sessionID });

    res.json({ ...data })
  } catch (error) {
    res.json({error})
  }
}
