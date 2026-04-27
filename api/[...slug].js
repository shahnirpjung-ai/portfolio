const supabase = require('../lib/supabase');

const KEYS = ['home','about','seo','contact-info','services-page','skills','experience','projects','services','blog'];

module.exports = async (req, res) => {
  const raw  = req.query.slug;
  const slug = Array.isArray(raw) ? raw : (raw ? [raw] : []);
  const key  = slug[0];

  if (!KEYS.includes(key)) return res.status(404).json({ error: 'Not found' });

  const { data, error } = await supabase.from('portfolio_data').select('data').eq('key', key).single();
  if (error) return res.status(500).json({ error: error.message });

  const payload = data.data;
  const { category } = req.query;

  // blog — strip content field, optional category filter
  if (key === 'blog') {
    const posts = payload.map(({ content, ...rest }) => rest);
    return res.json(category && category !== 'All' ? posts.filter(p => p.category === category) : posts);
  }

  // projects — optional category filter
  if (key === 'projects') {
    return res.json(category && category !== 'All' ? payload.filter(p => p.category === category) : payload);
  }

  res.json(payload);
};
