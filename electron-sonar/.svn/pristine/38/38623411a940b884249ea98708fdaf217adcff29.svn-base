var config = require('../config.json')

module.exports = config.ffmpeg

module.exports.ffmpegOs = () => {
  if (process.platform === 'darwin') {
    return config.ffmpegOs.mac
  } else if (process.platform === 'linux') {
    return config.ffmpegOs.linux
  } else {
    return config.ffmpegOs.win
  }
}
