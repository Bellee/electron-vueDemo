var execution = require('v1')

function asyncInit(user_id) {
  var p = new Promise(function(resolve, reject) {
    execution.init(user_id, function(err, result) {
      resolve(result)
    })
  })
  return p
}

function asyncAddOrigin(filePath, fileName) {
  var p = new Promise(function(resolve, reject) {
    execution.addOrigin(filePath, fileName, function(err, result) {
      if (result && result.items && result.items.length > 0) {
        resolve(result.items[0])
      }
    })
  })
  return p
}

function asyncNovideo(row) {
  var p = new Promise(function(resolve, reject) {
    execution.novideo(row, function(err, result) {
      if (result && result.items && result.items.length > 0) {
        resolve(result.items[0])
      }
    })
  })
  return p
}

function asyncUploadACRCloud(row) {
  var p = new Promise(function(resolve, reject) {
    execution.uploadACRCloud(row, function(err, result) {
      if (result && result.items && result.items.length > 0) {
        resolve(result.items[0])
      }
    })
  })
  return p
}

function asyncResize(row) {
  var p = new Promise(function(resolve, reject) {
    execution.resize(row, function(err, result) {
      if (result && result.items && result.items.length > 0) {
        resolve(result.items[0])
      }
    })
  })
  return p
}

function asyncCut(row) {
  var p = new Promise(function(resolve, reject) {
    execution.cut(row, function(err, result) {
      if (result && result.items && result.items.length > 0) {
        resolve(result.items[0])
      }
    })
  })
  return p
}

function asyncUploadQiniu(rows) {
  var p = new Promise(function(resolve, reject) {
    for (var i = 0; i < rows.length; i++) {
      execution.uploadQiniu(rows[i], function (err, result) {
        if (result && result.items && result.items.length > 0) {
          if (i == rows.length - 1) {
            resolve(result.items[0])
          }
        }
      })
    }
  })
  return p
}

module.exports.asyncUpload = function(filePath, fileName) {
  asyncAddOrigin(filePath, fileName)
    .then(asyncNovideo)
    .then()
    .then(asyncResize)
    .then(asyncCut)
    .then(asyncUploadQiniu)
    .then(function(data) {
      console.log(data)
    })
}
