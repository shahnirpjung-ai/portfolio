const services = require('../server/data/services.json');
module.exports = (req, res) => res.json(services);
