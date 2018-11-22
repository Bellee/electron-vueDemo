<template>
    <div id="file-uploading-page"> 
      <div class="search-input">
          <el-input
            placeholder="请输入片名搜索"
            suffix-icon="el-icon-search"
            v-model="name"
            @change="getFileList"
            @keyup.enter.native="getFileList">
          </el-input>
      </div>
    <!--上传中-->
    <el-table
        :data="fileUpload"
        style="width: 100%"
        stripe
        :header-cell-style="getRowClass">
        <el-table-column
        prop="name"
        label="片源名称"
        width="">
         <template slot-scope="scope">
          <p>{{scope.row.projectName}}</p>
        </template>
        </el-table-column>
        <el-table-column
        prop="divname"
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
        width=""
        align="center">
        <template slot-scope="scope">
          <span class="circle" v-bind:style="scope.row.viewBackground"></span>
          <span>{{scope.row.viewStatus}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="reason"
        label="进度"
        width="">
        <template slot-scope="scope" style="position: relative;">
              <div class="progress-status" @click="scope.row.stepsVisible=!scope.row.stepsVisible" v-bind:style="{left: scope.row.viewProcPercent + 'px'}">{{scope.row.viewProcStatus}}</div>
              <el-progress :percentage="scope.row.viewProcPercent" class="progress" color="#67c23a"></el-progress>
              <el-dialog
              title="三生三世十里桃花-1"
              :visible.sync="scope.row.stepsVisible"
              width="90%"
              :modal="false" class="sk-steps">
              <ul class="steps">
                <li v-for="(item,index) in scope.row.items"  v-bind:key="index" :class="{'active':item.show===true}">
                  <span class="step"><i :class="{'activechange':item.show===true}"></i></span>
                  <div class="content"><span v-html="item.sort"></span></div>
                </li>
              </ul>
              </el-dialog> 
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <p class="operate"  @click="handleEdit(scope.$index, scope.row)">{{scope.row.viewOpt}}</p>
        </template>
        </el-table-column>
    </el-table>
    <file-page :message="total" v-on:childByValue="childByValue"></file-page>
    </div>
</template>

<style>
  .el-table .warning-row {
    background: #efefef;
  }

  .el-table .success-row {
    background: #efefef;
  }
</style>

<script>
import {get, post, httpRequestConstant} from '../../actions/utils/httpClient'
import mockdata from '@/scripts/mockdata.js'
import server from '../../actions/config/server'
import FilePage from '../components/FilePage'
import episode from '@/scripts/episode.js'
export default {
  name: 'file-uploading',
  components: {FilePage},
  data () {
    return {
      fileUpload: [],
      total: 0,
      oldepisodeName: [],
      name: '',
      cPage: 1,
      csize: 10,
      producerId: this.$route.query.producerId,
      control: '',
      items: [
        {sort: '抽取音频文件<br/>提取音频指纹', show: false},
        {sort: '上传音频文件至声码云', show: false},
        {sort: '视频转码', show: true},
        {sort: '视频切片中', show: false},
        {sort: '上传视频文件至七牛云', show: false}
      ]
    }
  },
  created() {
    this.getFileList()
  },
  filters: {
    Status: function(data) {
      switch (data) {
        case 'A': return '待审核'
        case 'B': return '审核通过'
        case 'C': return '审核不通过'
      }
    },
    Color: function(data) {
      switch (data) {
        case 'A': return 'background:red'
        case 'B': return 'background:yellow'
        case 'C': return 'background:green'
      }
    }
  },
  methods: {
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return 'background:#EFEFEF'
      } else {
        return ''
      }
    },
    handleEdit (index, row) {
      let _this = this
      console.log(row)
      console.log(index)
      if (_this.fileUpload[index].is_pause == 0) {
        console.log(_this.fileUpload[index].projectEpisodeId)
        episode.pauseItem(_this.fileUpload[index].projectEpisodeId)
      } else {
        episode.continueItem(_this.fileUpload[index].projectEpisodeId)
      }
    },
    penEdit (index, row) {
      let _this = this
      console.log(row)
      console.log(index)
      _this.fileUpload[index].edit = !_this.fileUpload[index].edit
      if (_this.fileUpload[index].edit == false) {
        let episodeName = encodeURIComponent(_this.fileUpload[index].episodeName)
        let episodeId = _this.fileUpload[index].projectEpisodeId
        let projectId = _this.fileUpload[index].projectId
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
            _this.fileUpload[index].episodeName = _this.oldepisodeName[index]
          }
          console.log(response)
        }, function(fail) {
          console.log(fail)
        })
      } else {
        // 点击修改时用数组暂存episodeName剧集名称
        _this.oldepisodeName[index] = _this.fileUpload[index].episodeName
      }
    },
    childByValue: function (currentPage) {
      // childValue就是子组件传过来的值
      this.name = currentPage
      console.log(this.name)
    },
    // 初始化时显示的列表信息
    getFileList() {
      var _this = this
      episode.getEpisodeList(this.producerId, 2, this.name, this.cPage, this.csize, function(items) {
        console.log(items)
        _this.fileUpload = items.rows
        _this.total = items.total
        for (var i = 0; i < _this.fileUpload.length; i++) {
          _this.$set(_this.fileUpload[i], 'edit', false)
          _this.$set(_this.fileUpload[i], 'stop', true)
          _this.$set(_this.fileUpload[i], 'stepsVisible', false)
          _this.$set(_this.fileUpload[i], 'items', _this.items)
          // this.$set(this.fileList[i], 'againa', '0')
        }
        // todo
      })
    }

  }
}
</script>

<style scoped>
   .i-icon{
    display: inline-block;
    font-size: 0.58rem;
    color: #64A3FF;
    margin-left: 0.42rem;
  }

  p{
    display: inline-block;
  }
  
  .form-group{
    height: 1.33rem;
    line-height: 1.33rem;
  }

  .input-group{
    margin-right: 1.33rem;
    width: 5.88rem;
    display: inline-block;
    }

  .preserve{
      color: #64A3FF;
    }

  .progress{
    width: 9.2rem;
    display: inline-block;
  }

  .operate{
    color: #64A3FF;
  }

  .circle{
    border-radius:45%;
    width: 0.25rem;
    height: 0.25rem;
    display: inline-block;
    margin-right: 0.42rem;
  }

   /*切片进度提示*/
  .progress-status{
    color: #64A3FF;
    font-size: 0.5rem;
    position: absolute;
    top: 0.22rem;
    display: inline-block;
    background: url('../../../static/img/progress-status.png') no-repeat center center;
    width: 3.4rem;
    height: 1.25rem;
    padding-top: 2px;
    background-size: 3.4rem 1.25rem;
    text-align: center;
  }

  .steps{
    list-style: none;
    font-size: 0;
    margin-left: 3.25rem;
  }

  .steps li{
    display: inline-block;
    width: 20%;
    font-size: 0.5rem;
  }

  .steps li .step{
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    justify-content:center;
    align-items:Center;
  }

  .steps li .step i{
    display: inline-block;
    width: 0.33rem;
    height: 0.33rem;
    background: #64A3FF;
    border-radius: 50%;
    vertical-align:middle;
  }

  @-webkit-keyframes ChangeCycle {
    from{
        background:rgba(82,196,26,1);
      }20%{
        background:rgba(82,196,26,0.8);
      }40%{
        background:rgba(82,196,26,0.6);
      }60%{
        background:rgba(82,196,26,0.4);
      }80%{
        background:rgba(82,196,26,0.2);
      }100%{
        background:rgba(82,196,26,0.1);   
      }
  }

  .activechange{
    -webkit-animation: ChangeCycle 1s ease-in-out infinite;
  }

/* 选中之后的圆圈为灰色 */
  .steps li.active ~ li i {
  background-color: #BFBFBF;
 }

  .steps li{
    position: relative;
  }

  .steps .active .step i{
    background: #52C41A;
  }

  .steps li.active .content{
    color:#52C41A;
  }

  .steps li ~ li:after {
  content: '';
  width: 93%;
  height: 2px;
  background-color: #64A3FF;
  position: absolute;
  left: -93%;
  top: 0.2rem;
}

.steps li.active::after{
  background-color: #64A3FF;
}

/* 选中之后的连线为灰色 */
.steps li.active ~ li:after {
  background-color: #BFBFBF;
}

.steps li .content{
  position: absolute;
  left:-45%;
  top: 1rem;
  width: 100%;
  text-align:center;
}

.steps li .content span{
  display: block;
}

.operate{
    color: #64A3FF;
  }


</style>
<style>
.sk-steps .el-dialog__header,.sk-steps .el-dialog__body{
  background: #595959;
  color: #fff;
}
.sk-steps .el-dialog__body{
  height: 5.2rem;
}

.sk-steps .el-dialog__title{
  color: #fff;
  font-size: 0.66rem;
}
</style>

