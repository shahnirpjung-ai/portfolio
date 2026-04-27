const supabase = require('../lib/supabase');
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'All fields are required.' });
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email address.' });
  const { error } = await supabase.from('contacts').insert({ name, email, message });
  if (error) return res.status(500).json({ error: 'Failed to save message.' });
  res.json({ success: true, message: "Message received! I'll get back to you soon." });
};
