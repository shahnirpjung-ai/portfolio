const supabase = require('../lib/supabase');
module.exports = async (req, res) => {
  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', 'home').single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data.data);
};
