const supabase = require('../../lib/supabase');
module.exports = async (req, res) => {
  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', 'blog').single();
  if (error) return res.status(500).json({ error: error.message });
  const post = data.data.find(p => p.slug === req.query.slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};
