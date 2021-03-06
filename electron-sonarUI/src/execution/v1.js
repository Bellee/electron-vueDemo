var db = require('../lib/db_none_transational')
var ffmpeg = require('../lib/ffmpeg')
var moment = require('moment')
var acrcloud = require('../lib/acrcloud')
var qiniu = require('../lib/qiniu')
var async = require('async')
var ffmpegConfig = require('../config/ffmpeg')
var acrcloudConfig = require('../config/acrcloud')
var qiniuConfig = require('../config/qiniu')
var scheduleOptions = require('../config/schedule')

var cut = (item, callback) => {
  ffmpeg.execution(item.file_origin_path, item.file_path, item.cut_options, (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      // 保存信息到数据库
      item.upload_status = 0
      item.created_at = new Date()
      item.cut_options = JSON.stringify(item.cut_options)
      db.replaceTable('mv_cut', [item], callback)
    }
  })
}

var upload = (row, callback) => {
  acrcloud.uploadAudio({
    endpoint: '/v1/audios',
    data_type: acrcloudConfig.dataType,
    bucket_name: row.acr_bucket_name,
    audio_file: acrcloudConfig.dataType == 'fingerprint' && row.file_fingerprint
      ? row.file_fingerprint
      : row.file_path,
    audio_id: row.id,
    title: row.file_title
  }, (err, httpResponse, body) => {
    if (err) {
      callback(err, null)
    } else if (!(httpResponse.statusCode == 200 || httpResponse.statusCode == 201)) {
      callback(body, null)
    } else {
      row.acr_id = body.acr_id
      row.acr_title = body.title
      row.acr_state = body.state
      row.acr_audio_id = body.audio_id
      row.upload_type = acrcloudConfig.dataType
      row.upload_status = true
      row.updated_at = new Date()
      db.updateTable('mv_novideos', 'id', [row], callback)
    }
  })
}

module.exports.novideo = (row, callback) => {
  async.waterfall([
    // 先获取基本信息
    (callback) => {
      ffmpeg.info(ffmpegConfig.basePath.origin.replace('${acr_bucket_name}', row.acr_bucket_name) + row.file_path, callback)
    },
    // 抽取音频
    (metadata, callback) => {
      var fileName = row.file_path.split('.')[0]
      var extention = row.file_path.split('.')[1]
      var options = {
        'noVideo': true,
        'audioCodec': 'copy'
      }
      ffmpeg.execution(ffmpegConfig.basePath.origin.replace('${acr_bucket_name}', row.acr_bucket_name) + row.file_path, ffmpegConfig.basePath.novideo + fileName + '.m4a', options, (err, result) => {
        if (err) {
          // callback(err, null);
          row.novideo_status = -1
          db.updateTable('mv_origin', 'id', [row], callback)
        } else {
          // 保存信息到数据库
          var options = {
            fileName: fileName,
            inputFile: ffmpegConfig.basePath.novideo + fileName + '.m4a',
            outputFile: ffmpegConfig.basePath.fingerprint + fileName + '.acr'
          }
          acrcloud.createFingerprint(options, (err, stdout, stderr) => {
            if (err) {
              console.log('acrcloud fingerprint error:', err)
              row.novideo_status = -2
              db.updateTable('mv_origin', 'id', [row], callback)
            } else {
              var item = {
                instance_id: scheduleOptions.instance_id,
                file_path: ffmpegConfig.basePath.novideo + fileName + '.m4a',
                file_name: fileName + '.m4a',
                file_fingerprint: ffmpegConfig.basePath.fingerprint + fileName + '.acr',
                file_title: row.file_title,
                acr_bucket_name: row.acr_bucket_name,
                upload_status: 0,
                created_at: new Date()
              }
              db.insertIgnoreTable('mv_novideos', [item], (err, result) => {
                if (err) {
                  callback(err, null)
                } else {
                  row.novideo_status = true
                  row.updated_at = new Date()
                  db.updateTable('mv_origin', 'id', [row], callback)
                }
              })
            }
          })
        }
      })
    }
  ], (err, result) => {
    if (err) {
      if (err.message.indexOf('No such file or directory') != -1) {
        // 源文件缺失
        row.novideo_status = -2
        db.updateTable('mv_origin', 'id', [row], callback)
      } else if (err.message.indexOf('Invalid data found when processing input') != -1) {
        // 源文件缺失
        row.novideo_status = -1
        db.updateTable('mv_origin', 'id', [row], callback)
      } else {
        callback(err, null)
      }
    } else {
      callback(null, result.items)
    }
  })
}

module.exports.uploadACRCloud = (row, callback) => {
  if (acrcloudConfig.dataType == 'fingerprint' && !row.file_fingerprint) {
    // 重新生成指纹文件
    var fileName = row.file_name.split('.')[0]
    var options = {
      fileName: fileName,
      inputFile: row.file_path,
      outputFile: ffmpegConfig.basePath.fingerprint + fileName + '.acr'
    }
    acrcloud.createFingerprint(options, (err, stdout, stderr) => {
      if (err) {
        callback(err, null)
      } else {
        row.file_fingerprint = options.outputFile
        upload(row, callback)
      }
    })
  } else {
    upload(row, callback)
  }
}

module.exports.asyncACRCloud = (row, callback) => {
  acrcloud.asyncAudio({
    endpoint: '/v1/audios/' + row.acr_id
  }, (err, httpResponse, body) => {
    if (err) {
      callback(err, null)
    } else if (!(httpResponse.statusCode == 200 || httpResponse.statusCode == 201)) {
      if (body.status == 500) {
        // 内部错误
        row.acr_state = -1
        db.updateTable('mv_novideos', 'id', [row], callback)
      } else {
        callback(body, null)
      }
    } else {
      row.acr_sid = body.id
      row.acr_bucket_id = body.bucket_id
      row.acr_duration = body.duration
      row.acr_state = body.state
      row.updated_at = new Date()
      db.updateTable('mv_novideos', 'id', [row], callback)
    }
  })
}

module.exports.resize = (row, callback) => {
  // console.log ('row = ' ,row);
  async.waterfall([
    // 先获取基本信息
    (callback) => {
      ffmpeg.info(ffmpegConfig.basePath.origin.replace('${acr_bucket_name}', row.acr_bucket_name) + row.file_path, callback)
    },
    // 降低码率
    (metadata, callback) => {
      var fileName = row.file_path.split('.')[0]
      var extention = row.file_path.split('.')[1]
      if (metadata.streams.length >= 2 && metadata.streams[0].codec_type == 'video') {
        console.log('开始转码')
        var vidoeStream = metadata.streams[0]
        var audioStream = metadata.streams[1]
        var width = vidoeStream.width
        var height = vidoeStream.height
        var resize = ffmpegConfig.resize[row.resize]
        // 源文件码率大于目标码率，则降码处理
        var options = {
          audioBitrate: vidoeStream.bit_rate > resize.videoBitrate * 1024
            ? resize.videoBitrate
            : 0,
          videoBitrate: audioStream.bit_rate > resize.audioBitrate * 1024
            ? resize.audioBitrate
            : 0
        }
        if (resize && width > resize.width && height > resize.height) {
          // 源文件宽高大与目标宽高
          console.log('源文件宽高大与目标宽高')
          if (width * resize.height >= height * resize.width) {
            // 长和宽必须是偶数
            var fixedWidth = 2 * Math.round(width * resize.height / (height * 2))
            options.size = fixedWidth + 'x' + resize.height
          } else {
            // 长和宽必须是偶数
            var fixedHeight = 2 * Math.round(height * resize.width / (width * 2))
            options.size = resize.width + 'x' + fixedHeight
          }
        } else {
          // 源文件宽高小于目标宽高，判断是否要强制转码
          console.log('源文件宽高小于目标宽高')
          options.size = width + 'x' + height
          if (!ffmpegConfig.resize.forceResize) {
            // 不强制转码
            console.log('不强制转码')
            var item = {
              instance_id: scheduleOptions.instance_id,
              file_path: ffmpegConfig.basePath.origin.replace('${acr_bucket_name}', row.acr_bucket_name) + row.file_path,
              file_name: row.file_path,
              file_title: row.file_title,
              cut_status: 0,
              upload_status: 0,
              created_at: new Date()
            }
            db.insertIgnoreTable('mv_resize', [item], (err, result) => {
              if (err) {
                callback(err, null)
              } else {
                row.duration = metadata.format.duration
                row.size = metadata.format.size
                row.start_time = metadata.format.start_time
                row.bit_rate = metadata.format.bit_rate
                row.resize_status = true
                row.updated_at = new Date()
                db.updateTable('mv_origin', 'id', [row], callback)
              }
            })
            return
          }
        }
        ffmpeg.execution(ffmpegConfig.basePath.origin.replace('${acr_bucket_name}', row.acr_bucket_name) + row.file_path, ffmpegConfig.basePath.resize + fileName + '-' + options.size + '.mp4', options, (err, result) => {
          if (err) {
            // callback(err, null);
            row.resize_status = -1
            db.updateTable('mv_origin', 'id', [row], callback)
          } else {
            // 保存信息到数据库
            var item = {
              instance_id: scheduleOptions.instance_id,
              file_path: ffmpegConfig.basePath.resize + fileName + '-' + options.size + '.mp4',
              file_name: fileName + '-' + options.size + '.mp4',
              file_title: row.file_title,
              cut_status: 0,
              upload_status: 0,
              created_at: new Date()
            }
            db.insertIgnoreTable('mv_resize', [item], (err, result) => {
              if (err) {
                callback(err, null)
              } else {
                row.duration = metadata.format.duration
                row.size = metadata.format.size
                row.start_time = metadata.format.start_time
                row.bit_rate = metadata.format.bit_rate
                row.resize_status = true
                row.updated_at = new Date()
                db.updateTable('mv_origin', 'id', [row], callback)
              }
            })
          }
        })
      } else {
        // 非视频文件
        console.log('streams length = ', metadata.streams.length, 'codec_type = ', metadata.streams[0].codec_type)
        console.log('非视频文件, row = ', row)
        row.resize_status = -1
        db.updateTable('mv_origin', 'id', [row], callback)
        // callback(null, {
        //   message: '非视频文件',
        //   items: []
        // });
      }
    }
  ], (err, result) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, result)
    }
  })
}

module.exports.cut = (row, callback) => {
  async.waterfall([
    // 先获取基本信息
    (callback) => {
      ffmpeg.info(row.file_path, callback)
    },
    // 剪切
    (metadata, callback) => {
      var fileName = row.file_name.split('.')[0]
      if (metadata.format) {
        row.duration = metadata.format.duration
        row.size = metadata.format.size
        row.start_time = metadata.format.start_time
        row.bit_rate = metadata.format.bit_rate
        var block = (row.duration - ffmpegConfig.cut.duration) % ffmpegConfig.cut.interval
          ? Math.round((row.duration - ffmpegConfig.cut.duration) / ffmpegConfig.cut.interval) + 1
          : (row.duration - ffmpegConfig.cut.duration) / ffmpegConfig.cut.interval + 1
        var opts = []
        for (var i = 0; i < block; i++) {
          var item = {
            instance_id: scheduleOptions.instance_id,
            file_origin_path: row.file_path,
            file_origin_name: row.file_name,
            file_origin_title: row.file_title,
            file_path: ffmpegConfig.basePath.cut + fileName + '-cut-' + ffmpegConfig.cut.duration + '-' + ffmpegConfig.cut.interval + '-' + i + '.mp4',
            file_name: fileName + '-cut-' + ffmpegConfig.cut.duration + '-' + ffmpegConfig.cut.interval + '-' + i + '.mp4',
            cut_options: {
              startTime: i * ffmpegConfig.cut.interval,
              duration: (i != block - 1)
                ? ffmpegConfig.cut.duration
                : 0
            }
          }
          opts.push(item)
        }
        console.log(item)
        db.query('select file_name from mv_cut where file_origin_name = ? ', [row.file_name], (err, rows, fields) => {
          // 去重过滤
          var fileNames = rows.map(row => row.file_name)
          opts = opts.filter(item => fileNames.indexOf(item.file_name) == -1)
          async.mapLimit(opts, scheduleOptions.cut.cutlimit, cut, (err, results) => {
            // 全部切割完毕后更新resize文件状态
            row.cut_status = true
            row.updated_at = new Date()
            db.updateTable('mv_resize', 'id', [row], callback)
          })
        })
      } else {
        callback(null, '未获取到视频格式信息')
      }
    }
  ], (err, result) => {
    if (err) {
      if (err.message.indexOf('No such file or directory') != -1) {
        // 源文件缺失
        row.cut_status = -2
        db.updateTable('mv_resize', 'id', [row], callback)
      } else if (err.message.indexOf('Invalid data found when processing input') != -1) {
        // 源文件缺失
        row.cut_status = -1
        db.updateTable('mv_resize', 'id', [row], callback)
      } else {
        callback(err, null)
      }
    } else {
      callback(null, result)
    }
  })
}

module.exports.uploadQiniu = (row, callback) => {
  qiniu.uploadFile(row.file_name, row.file_path, null, (err, body, info) => {
    if (err) {
      callback(err, null)
    } else {
      if (body && body.hash && body.key) {
        row.qiniu_zone = qiniuConfig.zone
        row.qiniu_bucket = qiniuConfig.bucket
        row.qiniu_hash = body.hash
        row.qiniu_key = body.key
        row.upload_status = 1
        row.updated_at = new Date()
        db.updateTable('mv_cut', 'id', [row], callback)
      } else {
        callback(null, 'qiniu upload error:' + body)
      }
    }
  })
}

module.exports.feimuCut = (row, callback) => {
  var uploadItems = []
  async.waterfall([
    // 先获取基本信息
    (callback) => {
      ffmpeg.info(row.file_resize_path, callback)
    },
    // 剪切
    (metadata, callback) => {
      var dateStr = moment().format('YYYYMMDDHHmmssSSS')
      var file_name = row.member_id + '-' + dateStr + '.mp4'
      var jpg_name = row.member_id + '-' + dateStr + '0.jpg'
      var gif_name = row.member_id + '-' + dateStr + '0.gif'
      var options = {
        'startTime': row.start,
        'duration': row.end - row.start
      }
      ffmpeg.execution(row.file_resize_path, ffmpegConfig.basePath.feimuCut + file_name, options, (err, result) => {
        if (err) {
          row.cut_status = -1
          db.updateTable('mv_feimu', 'id', [row], callback)
        } else {
          row.file_path = ffmpegConfig.basePath.feimuCut + file_name
          row.jpg_name = jpg_name
          row.jpg_path = ffmpegConfig.basePath.feimuCutJPG + jpg_name
          row.gif_name = gif_name
          row.gif_path = ffmpegConfig.basePath.feimuCutGIF + gif_name
          var item = {
            instance_id: scheduleOptions.instance_id,
            feimu_code: row.feimu_code,
            file_name: file_name,
            file_path: row.file_path,
            qiniu_zone: qiniuConfig.feimu.zone,
            qiniu_bucket: qiniuConfig.feimu.bucket.cut,
            created_at: new Date()
          }
          uploadItems.push(item)
          ffmpeg.info(row.file_path, callback)
        }
      })
    },
    // jpg图
    (metadata, callback) => {
      var options = {
        frames: 1
      }
      ffmpeg.execution(row.file_path, row.jpg_path, options, (err, result) => {
        if (err) {
          row.cut_status = -1
          db.updateTable('mv_feimu', 'id', [row], callback)
        } else {
          var item = {
            instance_id: scheduleOptions.instance_id,
            feimu_code: row.feimu_code,
            file_name: row.jpg_name,
            file_path: row.jpg_path,
            qiniu_zone: qiniuConfig.feimu.zone,
            qiniu_bucket: qiniuConfig.feimu.bucket.jpg,
            created_at: new Date()
          }
          uploadItems.push(item)
          callback(null, metadata)
        }
      })
    },
    // gif图
    (metadata, callback) => {
      var options = {
        'fps': ffmpegConfig.thumbnail.fps,
        'duration': ffmpegConfig.thumbnail.duration
      }
      var vidoeStream = metadata.streams[0]
      var width = vidoeStream.width
      var height = vidoeStream.height
      var resize = ffmpegConfig.thumbnail.resize
      // 长和宽必须是偶数
      if (resize && width > resize.width && height > resize.height) {
        if (width * resize.height >= height * resize.width) {
          var fixedWidth = 2 * Math.round(width * resize.height / (height * 2))
          options.size = fixedWidth + 'x' + resize.height
        } else {
          var fixedHeight = 2 * Math.round(height * resize.width / (width * 2))
          options.size = width + 'x' + fixedHeight
        }
      } else {
        options.size = width + 'x' + height
      }
      ffmpeg.execution(row.file_path, row.gif_path, options, (err, result) => {
        if (err) {
          row.cut_status = -1
          db.updateTable('mv_feimu', 'id', [row], callback)
        } else {
          var item = {
            instance_id: scheduleOptions.instance_id,
            feimu_code: row.feimu_code,
            file_name: row.gif_name,
            file_path: row.gif_path,
            qiniu_zone: qiniuConfig.feimu.zone,
            qiniu_bucket: qiniuConfig.feimu.bucket.jpg,
            created_at: new Date()
          }
          uploadItems.push(item)
          db.insertIgnoreTable('mv_feimu_upload', uploadItems, (err, results) => {
            if (err) {
              row.cut_status = -2
              db.updateTable('mv_feimu', 'id', [row], callback)
            } else {
              row.cut_status = 1
              row.updated_at = new Date()
              db.updateTable('mv_feimu', 'id', [row], callback)
            }
          })
        }
      })
    }
  ], (err, result) => {
    if (err) {
      if (err.message.indexOf('No such file or directory') != -1) {
        // 源文件缺失
        row.cut_status = -2
        db.updateTable('mv_feimu', 'id', [row], callback)
      } else if (err.message.indexOf('Invalid data found when processing input') != -1) {
        // 源文件缺失
        row.cut_status = -1
        db.updateTable('mv_feimu', 'id', [row], callback)
      } else {
        callback(err, null)
      }
    } else {
      callback(null, result)
    }
  })
}

module.exports.uploadFiemuCut = (row, callback) => {
  qiniu.uploadFile(row.file_name, row.file_path, row.qiniu_bucket, (err, body, info) => {
    if (err) {
      callback(err, null)
    } else {
      if (body && body.hash && body.key) {
        row.qiniu_zone = row.qiniu_zone
        row.qiniu_bucket = row.qiniu_bucket
        row.qiniu_hash = body.hash
        row.qiniu_key = body.key
        row.updated_at = new Date()
        db.updateTable('mv_feimu_upload', 'id', [row], callback)
      } else {
        callback(null, 'qiniu upload error:' + body)
      }
    }
  })
}
