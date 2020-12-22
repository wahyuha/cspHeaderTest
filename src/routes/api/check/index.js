import http from '../../../utils/http';

export async function get(req, res) {
  const sessionID = req.query.s;
  // validate session
  try {
    const { data } = await http().post('/1.0/bind/check', { sessionID });

    res.json({ ...data })
    // no proxy error handler
  } catch (error) {
    res.json({error})
  }
}
