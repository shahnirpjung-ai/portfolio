const skills = require('../server/data/skills.json');
module.exports = (req, res) => res.json(skills);
