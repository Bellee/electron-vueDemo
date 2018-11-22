<template>
    <div id="file-list-page">
       <div class="search-input">
            <el-input
              placeholder="请输入片名搜索"
              suffix-icon="el-icon-search"
              v-model="name"
              @blur="getFileList"
              @keyup.enter.native="getFileList">
            </el-input>
        </div>
    <el-table
        :data="fileList"
        style="width: 100%"
        :header-cell-style="getRowClass"
         stripe
        >
        <el-table-column
        label="片源名称"
        width="">
         <template slot-scope="scope">
          <p>{{scope.row.projectName}}</p>
        </template>
        </el-table-column>
        <el-table-column
        label="分集名称"
        width="">
         <template slot-scope="scope">
            <div v-if="!scope.row.edit" @click="penEdit(scope.$index, scope.row)">
              <p>{{scope.row.episodeName}}</p>
              <span class="i-icon">修改</span>
            </div>
            <div class="form-group" v-if="scope.row.edit">
              <div class="input-group">
                <el-input size="small" v-model="scope.row.episodeName"></el-input>
              </div>
              <span class="preserve" @click="penEdit(scope.$index, scope.row)">保存</span>
            </div>
        </template>
        </el-table-column>      
        <el-table-column
        prop="status"
        label="状态"
        width="">
        <template slot-scope="scope">
          <span class="circle" v-bind:style="scope.row.viewBackground"></span>
          <span>{{scope.row.viewStatus}}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <div v-if="scope.row.viewOptDisable =='0'">
            <p  class="operate" v-if="!scope.row.is_pause">
              {{scope.row.viewOpt}}
              <input type="file" ref="uploadFile" accept=".mp4" @change="getfilePath(scope.$index, scope.row,scope.$event)"/>
            </p>
            <p  class="operate" v-else-if="scope.row.is_pause" @click="handleEdit(scope.$index, scope.row)">
              {{scope.row.viewOpt}}
            </p>
          </div>
          <div class="upload-again" v-else-if="scope.row.viewOptDisable=='1'">
            <p>重新上传</p>
            <el-tooltip placement="bottom-end">
                <div slot="content">如需重新上传请与<br/>唢呐平台线下沟通</div>
                <div></div>
              </el-tooltip>
          </div>
        </template>
        </el-table-column>
    </el-table>
    <file-page :message="total" v-on:childByValue="childByValue"></file-page>
    </div>
</template>

<script>
import {get, post, httpRequestConstant} from '../../actions/utils/httpClient'
import FilePage from '../components/FilePage'
import { join } from 'path'
import mockdata from '@/scripts/mockdata.js'
import server from '../../actions/config/server'
import episode from '@/scripts/episode.js'
export default {
  name: 'file-list',
  components: {FilePage},
  data () {
    return {
      fileList: [],
      total: 0,
      cPage: 1,
      csize: 10,
      producerId: this.$route.query.producerId,
      oldepisodeName: [],
      name: ''// 搜索查询条件
    }
  },
  created() {
    // episode.pauseAll(this.producerId)
    this.getFileList()
  },
  filters: {
    // 将abc状态转换成文字
    Status: function(data) {
      if (data == null) {
        return '上传中的各种状态'
      } else {
        switch (data) {
          case 'A': return '待审核'
          case 'B': return '审核通过'
          case 'C': return '审核不通过'
        }
      }
    },
    Color: function(data) {
      if (data == null) {
        return 'background:#999999'
      } else {
        switch (data) {
          case 'A': return 'background:#FCB812'
          case 'B': return 'background:#52C41A'
          case 'C': return 'background:#FCB812'
        }
      }
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#fafafa'
      } else {
        return ''
      }
    },
    handleEdit (index, row) {
      let _this = this
      console.log(row)
      console.log(index)
      if (_this.fileList[index].is_pause == 0) {
        console.log(_this.fileList[index].projectEpisodeId)
        episode.pauseItem(_this.fileList[index].projectEpisodeId)
      } else {
        episode.continueItem(_this.fileList[index].projectEpisodeId)
      }
    },
    penEdit (index, row) {
      let _this = this
      console.log(row)
      console.log(index)
      // 修改和保存按钮的转换
      _this.fileList[index].edit = !_this.fileList[index].edit
      // 当点击保存按钮时，将修改后的数据传给数据库
      if (_this.fileList[index].edit == false) {
        // 解决中文乱码问题
        let episodeName = encodeURIComponent(_this.fileList[index].episodeName)
        let episodeId = _this.fileList[index].projectEpisodeId
        let projectId = _this.fileList[index].projectId
        console.log(episodeName)
        console.log(episodeId)
        console.log(projectId)
        get({
          json: true,
          url: server.host + server.api.api_episode_updateEpisodeName + '?episodeName=' + episodeName + '&episodeId=' + episodeId + '&projectId=' + projectId
        }, function(response) {
          // 数据库中有两条相同数据冲突返回fail提示
          if (response.result == 'fail') {
            let message = response.message
            _this.$message({
              showClose: true,
              message: message
            })
            // 并将原数据绑定在input框中
            _this.fileList[index].episodeName = _this.oldepisodeName[index]
          }
          console.log(response)
        }, function(fail) {
          console.log(fail)
        })
      } else {
        // 点击修改时用数组暂存episodeName剧集名称
        _this.oldepisodeName[index] = _this.fileList[index].episodeName
      }
    },
    // 初始化时显示的列表信息
    getFileList() {
      var _this = this
      // get({
      //   json: true,
      //   url: server.host + server.api.api_episode_list + '?page=' + _this.cPage + '&rows=' + _this.csize
      //   // + '&producerId' + _this.producerId
      // }, function(response) {
      //   console.log(response)
      //   _this.total = response.data.total
      //   _this.fileList = response.data.rows
      //   console.log(_this.total)
      //   for (var i = 0; i < _this.fileList.length; i++) {
      //     _this.$set(_this.fileList[i], 'edit', false)
      //     _this.$set(_this.fileList[i], 'stop', false)
      //     // this.$set(this.fileList[i], 'againa', '0')
      //     _this.fileList[i].againa = '0'
      //   }
      // }, function(fail) {
      //   console.log(fail)
      // })
      episode.getEpisodeList(this.producerId, 0, this.name, this.cPage, this.csize, function(items) {
        console.log(items)
        _this.fileList = items.rows
        _this.total = items.total
        for (var i = 0; i < _this.fileList.length; i++) {
          _this.$set(_this.fileList[i], 'edit', false)
          _this.$set(_this.fileList[i], 'stop', false)
          // this.$set(this.fileList[i], 'againa', '0')
        }
        // todo
      })
    },
    getfilePath(index, row, $event) {
      let _this = this
      let files = event.target.files
      if (!files.length) {
        this.fileName = ''
        return
      }
      // 判断文件类型
      // if (event.target.files != 'video/mp4') {
      //   _this.$message({
      //     showClose: true,
      //     message: '上传的文件只能是mp4格式!'
      //   })
      // } else {}
      _this.filePath = files[0].path
      console.log(_this.filePath)
      console.log(_this.fileList[index])
      let fileTitle = _this.fileList[index].projectName + '-' + _this.fileList[index].sets
      console.log(fileTitle)
      episode.addItem(_this.filePath, fileTitle, _this.fileList[index].projectEpisodeId)
      // 选择文件后这条数据消失
      _this.fileList.splice(index, 1)
      // 文件重复上传
      event.target.value = null
      // }
    },
    // 子组件传数据，当前页，显示当前数据条数
    childByValue: function (currentPage, currentSize) {
      var _this = this
      // childValue就是子组件传过来的值
      _this.cPage = currentPage
      _this.csize = currentSize
      console.log(_this.cPage)
      console.log(_this.csize)
      _this.getFileList()
    }

  }
}
</script>

<style scoped>
  .operate{
     position: relative;
   }

  .operate input{
     opacity: 0;
     position: absolute;
     top: 0rem;
     left: 0rem;
   }

  .i-icon{
      display: inline-block;
      font-size: 0.58rem;
      color: #64A3FF;
      margin-left: 10px;
  }

  p{
    display: inline-block;
  }
  
  .form-group{
    height: 1.33rem;
    line-height: 1.33rem;
  }

  .input-group{
    margin-right: 0.42rem;
    width: 5.88rem;
    display: inline-block;
    }

  .progress{
    width:10rem;
    display: inline-block;
    font-size: 0.58rem;
  }

  .preserve{
    color: #64A3FF;
  }

  .circle{
    border-radius:45%;
    width: 0.25rem;
    height: 0.25rem;
    display: inline-block;
    margin-right: 0.42rem;
  }
  .operate{
    color: #64A3FF;
  }

  .upload-again{
    position: relative;
  }

  .upload-propt{
    display: none;
  }

  .upload-again:hover .upload-propt{
    display: block;
    position: absolute;
    top: 2.7vw;
    right: -0.54vw;
    background: url('../../../static/img/icon-bg.png') no-repeat center center;
    width: 10vw;
    height: 4.3vw;
    background-size: 10vw 4.3vw;
    border-radius:4px;
    color:#fff;
    font-size: 0.9vw;
    padding: 0.7vw 1.1vw 0.7vw 1.3vw;
    z-index: 999;
  }
  
  .upload-again p{
    color:#AAAAAA;
  }

  .upload-again div{
    background: url('../../../static/img/icon_question.svg') no-repeat center 1px;
    width: 30px;
    height: 14px;
    background-size: 14px 14px;
    display: inline-block;
  }
</style>

<style>
.el-table .cell{
  overflow: inherit;
  padding-bottom: 0.42rem;
  padding-top: 0.42rem;
}
</style>

 