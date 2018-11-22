var config = require('../config.json')

module.exports = config.acrcloud

module.exports.fingerprintOs = () => {
  if (process.platform === 'darwin') {
    return config.acrcloud.fingerprint.mac
  } else if (process.platform === 'linux') {
    return config.acrcloud.fingerprint.linux
  } else {
    return config.acrcloud.fingerprint.win
  }
}
