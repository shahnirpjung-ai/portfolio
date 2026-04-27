const supabase = require('../lib/supabase');
module.exports = async (_req, res) => {
  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', 'seo').single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.data);
};
