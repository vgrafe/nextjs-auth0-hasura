import auth0 from '../../lib/auth0';

export default async function me(req, res) {
  try {
    const s = await auth0.getSession(req);
    if (s) res.send(s);
    res.status(500).end(s);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}
