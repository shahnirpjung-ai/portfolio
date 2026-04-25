const blog = require('../../server/data/blog.json');
module.exports = (req, res) => {
  const { slug } = req.query;
  const post = blog.find(p => p.slug === slug);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
};
