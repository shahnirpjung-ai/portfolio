const supabase = require('../lib/supabase');
module.exports = async (req, res) => {
  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', 'projects').single();
  if (error) return res.status(500).json({ error: error.message });
  const projects = data.data;
  const { category } = req.query;
  if (category && category !== 'All') return res.json(projects.filter(p => p.category === category));
  res.json(projects);
};
