const projects = require('../server/data/projects.json');
module.exports = (req, res) => {
  const { category } = req.query;
  if (category && category !== 'All') {
    return res.json(projects.filter(p => p.category === category));
  }
  res.json(projects);
};
