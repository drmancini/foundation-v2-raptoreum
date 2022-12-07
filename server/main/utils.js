const os = require('os');

////////////////////////////////////////////////////////////////////////////////

// Count Number of Process Forks
exports.countProcessForks = function(configMain) {
  if (!configMain.clustering || !configMain.clustering.enabled) {
    return 1;
  } else if (configMain.clustering.forks === 'auto') {
    return os.cpus().length <= 4 ? os.cpus().length : 4;
  } else if (!configMain.clustering.forks || isNaN(configMain.clustering.forks)) {
    return 1;
  }
  return configMain.clustering.forks;
};

// Identify CryptoNight Algorithm Rotation from Block Header
exports.getCryptoNightRotation = function(hash) {
  const rotation = [];

  for (let i = hash.length - 1; i >= 0; i--) {
    if (rotation.length === 3) {
      break;
    } else {
      const nibble = parseInt(hash[i], 16);
      const algorithm = nibble % 6;
      if (!rotation.includes(algorithm)) {
        rotation.push(algorithm);
      }
    }
  }

  return rotation;
}

// Assing Difficulty Index to CryptoNight Rotation
exports.getDifficultyIndex = function (rotation, cnRotations) {
  rotation.sort((a, b) => a - b);
  const cnAlgorithms = [
    'Dark',
    'Darklite',
    'Fast',
    'Lite',
    'Turtle',
    'Turtlelite'
  ];
  const rotationName = cnAlgorithms[rotation[0]] + cnAlgorithms[rotation[1]] + cnAlgorithms[rotation[2]];

  return cnRotations[rotationName];
};

// Indicate Severity By Colors
exports.loggerColors = function(severity, text) {
  switch (severity) {
  case 'debug':
    return text.blue;
  case 'log':
    return text.green;
  case 'warning':
    return text.yellow;
  case 'special':
    return text.cyan;
  case 'error':
    return text.red;
  default:
    return text.italic;
  }
};

// Severity Mapping Values
exports.loggerSeverity = {
  'debug': 1,
  'log': 2,
  'warning': 3,
  'special': 4,
  'error': 5,
};
