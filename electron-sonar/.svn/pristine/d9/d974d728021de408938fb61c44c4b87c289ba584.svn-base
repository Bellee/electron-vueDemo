var url = require('url')
var path = require('path')
var fs = require('fs')
var crypto = require('crypto')
var request = require('request')
var exec = require('child_process').exec
var defaultOptions = require('../config/acrcloud')

var buildStringToSignConsole = (method, uri, accessKey, signatureVersion, timestamp) => {
  return [method, uri, accessKey, signatureVersion, timestamp].join('\n')
}

var buildStringToSignIdentification = (method, uri, accessKey, dataType, signatureVersion, timestamp) => {
  return [
    method,
    uri,
    accessKey,
    dataType,
    signatureVersion,
    timestamp
  ].join('\n')
}

var sign = (signString, accessSecret) => {
  return crypto.createHmac('sha1', accessSecret).update(Buffer.from(signString, 'utf-8')).digest().toString('base64')
}

module.exports.uploadAudio = (options, callback) => {
  var signOptions = Object.assign(defaultOptions.console, options)
  var current_data = new Date()
  var timestamp = Math.floor(current_data.getTime() / 1000)
  var stringToSign = buildStringToSignConsole('POST', signOptions.endpoint, signOptions.access_key, signOptions.signature_version, timestamp)
  var signature = sign(stringToSign, signOptions.access_secret)
  var formData = {
    audio_file: fs.createReadStream(signOptions.audio_file),
    audio_id: signOptions.audio_id,
    bucket_name: signOptions.bucket_name,
    data_type: signOptions.data_type,
    title: signOptions.title
  }
  request.post({
    url: 'http://' + signOptions.host + signOptions.endpoint,
    method: 'POST',
    headers: {
      'access-key': signOptions.access_key,
      'signature-version': signOptions.signature_version,
      'signature': signature,
      'timestamp': timestamp
    },
    json: true,
    formData: formData
  }, callback)
}

module.exports.asyncAudio = (options, callback) => {
  var signOptions = Object.assign(defaultOptions.console, options)
  var current_data = new Date()
  var timestamp = Math.floor(current_data.getTime() / 1000)
  var stringToSign = buildStringToSignConsole('GET', signOptions.endpoint, signOptions.access_key, signOptions.signature_version, timestamp)
  var signature = sign(stringToSign, signOptions.access_secret)
  request.get({
    url: 'http://' + signOptions.host + signOptions.endpoint,
    method: 'GET',
    headers: {
      'access-key': signOptions.access_key,
      'signature-version': signOptions.signature_version,
      'signature': signature,
      'timestamp': timestamp
    },
    json: true
  }, callback)
}

module.exports.deleteAudio = (options, callback) => {
  var signOptions = Object.assign(defaultOptions.console, options)
  var current_data = new Date()
  var timestamp = Math.floor(current_data.getTime() / 1000)
  var stringToSign = buildStringToSignConsole('DELETE', signOptions.endpoint, signOptions.access_key, signOptions.signature_version, timestamp)
  var signature = sign(stringToSign, signOptions.access_secret)
  request.delete({
    url: 'http://' + signOptions.host + signOptions.endpoint,
    method: 'DELETE',
    headers: {
      'access-key': signOptions.access_key,
      'signature-version': signOptions.signature_version,
      'signature': signature,
      'timestamp': timestamp
    },
    json: true
  }, callback)
}

module.exports.createFingerprint = (options, callback) => {
  // var dir = path.join(path.resolve(path.join(__dirname, '/..')), defaultOptions.fingerprintOs().cmd)
  var dir = defaultOptions.fingerprintOs().cmd
  var cmd = dir + ' -i ' + options.inputFile + ' -o ' + options.outputFile + ' --debug'
  options = {
    maxBuffer: 50000 * 1024
  }
  exec(cmd, options, callback)
}
