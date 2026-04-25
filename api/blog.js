const blog = require('../server/data/blog.json');
module.exports = (req, res) => {
  const { category } = req.query;
  const posts = blog.map(({ content, ...rest }) => rest);
  if (category && category !== 'All') {
    return res.json(posts.filter(p => p.category === category));
  }
  res.json(posts);
};
