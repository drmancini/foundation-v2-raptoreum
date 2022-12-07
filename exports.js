const Pool = require('./stratum/main/pool');

////////////////////////////////////////////////////////////////////////////////

exports.algorithms = require('./stratum/main/algorithms');
exports.builder = function(config, configMain, difficulties, client) {
  return new Pool(config, configMain, difficulties, client);
};
