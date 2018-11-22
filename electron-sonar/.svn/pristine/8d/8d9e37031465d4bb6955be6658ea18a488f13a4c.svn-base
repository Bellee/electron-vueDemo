'use strict'

import rp from 'request-promise'
const httpRequestConstant = {
  GET: 'GET',
  POST: 'POST'
}

const defaultOptions = {
  method: httpRequestConstant.GET,
  json: true
}

function get(options, successCallback, failCallback, finallyCallback) {
  options.method = httpRequestConstant.GET
  console.log(options)
  httpRequest(options, successCallback, failCallback, finallyCallback)
}

function post(options, successCallback, failCallback, finallyCallback) {
  options.method = httpRequestConstant.POST
  console.log(options)
  httpRequest(options, successCallback, failCallback, finallyCallback)
}

async function httpRequest(options, successCallback, failCallback, finallyCallback) {
  // checkUri(options.uri)
  // let curConfig = options || defaultOptions
  // defaultOptions.url = ''
  const res = await rp(options)
    .then(response => {
      //
      if (isFunction(successCallback)) {
        successCallback(response)
      }
    }).catch(error => {
      //

      if (isFunction(failCallback)) {
        failCallback(error)
      }
    }).finally(function () {
      //
      if (isFunction(finallyCallback)) {
        finallyCallback()
      }
    })
}

function checkUri(uri) {
  return uri
}

/* 通用方法,todo:需要改进 */

// todo:判断需要改进
function isFunction(obj) {
  return varType(obj) === 'object'
}

//
function varType(n) {
  var typeStr = Object.prototype.toString.call(n)
  // var typeOfName = (typeof n);
  var typeName = ''
  switch (typeStr) {
    case '[object String]':
      typeName = 'string'
      break
    case '[object Number]':
      typeName = 'number'
      break
    case '[object Boolean]':
      typeName = 'boolean'
      break
    case '[object Undefined]':
      typeName = 'undefined'
      break

    case '[object Object]':
      typeName = 'object'
      break
    case '[object Array]':
      typeName = 'array'
      break
    case '[object Null]':
      typeName = 'null'
      break
    case '[object RegExp]':
      typeName = 'RegExp'
      break

    case '[object Symbol]':
      typeName = 'symbol'
      break
    case '[object JSON]':
      typeName = 'json'
      break
    case '[object Math]':
      typeName = 'math'
      break

    default:
      typeName = 'object'
  }

  return typeName
}
export {
  get,
  post,
  httpRequestConstant
}
