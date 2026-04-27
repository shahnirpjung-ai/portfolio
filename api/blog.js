const supabase = require('../lib/supabase');
module.exports = async (req, res) => {
  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', 'blog').single();
  if (error) return res.status(500).json({ error: error.message });
  const posts = data.data.map(({ content, ...rest }) => rest);
  const { category } = req.query;
  if (category && category !== 'All') return res.json(posts.filter(p => p.category === category));
  res.json(posts);
};
