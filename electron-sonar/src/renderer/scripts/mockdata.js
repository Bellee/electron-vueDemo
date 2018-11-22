import Mock from 'mockjs'
const data = Mock.mock({
  'result': 'success',
  'respCode': 100,
  'message': '',
  'datas': {
    'total': 162,
    'records': 1619,
    'rows|0-10': [{
      'projectEpisodeId|1-50': 24,
      'sets|1-50': 17,
      'episodeName': '@ctitle(2,6)',
      'epAuditStatus': /^||[A-C]/,
      'projectName': '@ctitle(2,6)',
      'projectId|1-50': 8
    }]
  }
})

export default {
  data
}
