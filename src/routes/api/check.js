import httpServer from '@utils/http/server';

export async function get(req, res) {
  const sessionID = req.query.s;
  // validate session
  req.session.sessionID = sessionID;
  try {
    const { data } = await httpServer.post('/1.0/bind/check', { sessionID });

    res.json({ ...data })
  } catch (error) {
    res.json({error})
  }
}
