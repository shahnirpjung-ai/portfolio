const PASSWORD = process.env.ADMIN_PASSWORD || 'nirp2024';
const TOKEN    = process.env.ADMIN_TOKEN    || 'nirp-admin-secret-99';

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).end();
  const body     = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
  const password = body.password;
  if (password !== PASSWORD) return res.status(401).json({ error: 'Wrong password' });
  res.json({ token: TOKEN });
};
