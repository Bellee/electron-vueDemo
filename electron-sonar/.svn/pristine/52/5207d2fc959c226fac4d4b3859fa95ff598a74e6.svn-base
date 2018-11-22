<template>
    <div id="connection">
        <el-tooltip class="item" effect="dark">
            <div slot="content">为防止上传错误，请将视频文件命名为<br/>片源名称-集数.mp4 格式，例如***-1.mp4</div>
            <div class="lauch-upload">
                <span class="lauch-btn">批量上传</span>
                <input type="file" ref="file" multiple="multiple" accept="audio/mp4" @change="showDialog()"/> 
            </div>
        </el-tooltip>
<el-dialog
  title="确认关联信息"
  :visible.sync="dialogVisible"
  width="61%">
  <div class="connection-file">
    <div class="warn" style="display:none;" v-show="warnDialog">
        <span></span>
        <i @click="warnDialogclose()">x</i>
        <P>{{repeatedWarn}}</p>
        <P>重复选择，请重新确认</p>
    </div>
    <ul>
         <li class="file-join" v-for="(connections,index) in connection" v-bind:key="index">
            <span class="vedio-name">
              <i>{{connections.projectName}}</i>
              <i v-if="connections.episodeName" class="vedio-projectName">{{connections.episodeName}}</i>
            </span>
            <span class="join">
            </span>
            <span class="vedio-file">
              <i class="vedio-edit" @click="edit()">修改</i>
              <el-select v-model="connections.name" placeholder="请选择" value-key="item" size="small" @change="rejoin(index)">
                <el-option
                  v-for="(item,index) in chosedFiles"
                  :key="index"
                  :label="item.file.name"
                  :value="item.file"
                  >
                </el-option>
              </el-select>
            </span>
        </li>
    </ul>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="submit()">确定无误</el-button>
    <el-button @click="cannel()">取 消</el-button>
  </span>
</el-dialog>
    </div>  
</template>

<script>
import Bus from '../../actions/utils/bus'
import episode from '@/scripts/episode.js'
// import {getFileMimeType} from '../../actions/utils/filetype'
import { watch } from 'fs'
export default {
  name: 'connection',
  data () {
    return {
      value: '',
      dialogVisible: false,
      warnDialog: false,
      editpart: true,
      num: [],
      chosedMap: new Map(),
      filename: [],
      chosedFiles: [],
      connection: [],
      repeatedWarn: ''
    }
  },
  computed: {
  },
  beforeCreate() {
    let _this = this
    Bus.$on('test', function(num) {
      _this.num = num
      console.log(_this.num)
    //   Array.from(num).forEach(element => {
    //     element.relatedFileName = element.projectName + '_?'
    //     _this.chosedMap.set(element.projectName, element.projectName + '_?')
    //   })
    //   // 事件的解绑问题
    //   console.log(_this.chosedMap)
    })
  },
  methods: {
    edit() {
    },

    submit() {
      // console.log(this.connection)
      let connectionArr = []
      let newArr = []
      let oldconnection = []
      // 判断选择文件是否为空或者重复
      for (let i = 0; i < this.connection.length; i++) {
        connectionArr.push(this.connection[i].name)
        if (newArr.indexOf(connectionArr[i]) == -1) {
          newArr.push(connectionArr[i])
          // 将匹配的数据存一下，防止对话框消失时清空
          oldconnection.push(this.connection[i])
          if (i == this.connection.length - 1) {
            this.dialogVisible = false
            episode.addList(oldconnection)
            // for (let j = 0; j < oldconnection.length; j++) {
            //   let fileTitle = oldconnection[j].projectName + '-' + oldconnection[j].sets
            //   episode.addItem(oldconnection[j].path, fileTitle, oldconnection[j].projectEpisodeId)
            //   console.log(fileTitle + 'hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
            // }
            this.$refs.file.value = null
            this.connection = []
            this.chosedFiles = []
          }
        } else {
          this.warnDialog = true
          if (connectionArr[i] == undefined) {
            console.log(connectionArr[i])
            this.repeatedWarn = '匹配文件不能为空'
            console.log(i)
          } else {
            this.repeatedWarn = connectionArr[i]
          }
          break
        }
      }
      console.log(connectionArr)
      console.log(this.connection)
    },
    // 解决v-model只能绑定name的问题
    rejoin(index) {
      if (this.connection[index].name.path != null) {
        this.connection[index].path = this.connection[index].name.path
        this.connection[index].name = this.connection[index].name.name
      }
    },
    // 关闭文件重复的警告
    warnDialogclose() {
      this.warnDialog = false
    },
    cannel() {
      this.dialogVisible = false
      this.$refs.file.value = null
      this.chosedFiles = []
      this.connection = []
    },
    showDialog () {
      let that = this
      that.dialogVisible = true
      // todo:计算匹配关系
      console.log(that.$refs.file.files)
      Array.from(that.$refs.file.files).forEach(file => {
        // console.log(file)
        // that.chosedFiles.push({
        //   'fileName': file.name
        // })
        that.chosedFiles.push({'file': file, 'flag': false})
      })
      // console.log(that.chosedFiles)
      for (let i = 0; i < that.num.length; i++) {
        var episodeNameStr = that.num[i].episodeName
        if (episodeNameStr == '' || episodeNameStr == null) {
          episodeNameStr = 1
        } else {
          episodeNameStr = episodeNameStr.substring(1, episodeNameStr.length - 1)
        }
        that.connection.push(that.num[i])
        // console.log(episodeNameStr)
        for (let j = 0; j < that.chosedFiles.length; j++) {
          let flag = that.chosedFiles[j].flag
          if (flag) {
            continue
          }
          let curFile = that.chosedFiles[j].file
          // 将特殊的File对象转成Object
          let fileupload = {}
          fileupload[i] = {
            name: curFile.name,
            path: curFile.path
          }
          let fileName = curFile.name
          let leng = fileName.indexOf('.')
          let fileNameString = fileName.substring(0, leng)
          fileName = fileNameString.split('-')
          // 电影的集数都为1
          if (fileName[1] == undefined) {
            fileName[1] = '1'
          }
          // console.log(fileName)
          if (fileName[0] == that.num[i].projectName && fileName[1] == episodeNameStr) {
            var connectionFile = Object.assign(fileupload[i], that.num[i])
            that.connection.pop()
            that.connection.push(connectionFile)
            that.chosedFiles[j].flag = true
            break
          }
        }
      }
      console.log(that.connection)
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}

.lauch-upload{
  position: relative;
  color: #fff;
  font-size: 14px;
  height: 20px;
  display: inline-block;
  width: 8vw;
}

.lauch-upload input{
  *zoom: 1;
  opacity: 0;
  position: absolute;
  top: -15px;
  left: 10px;
  height: 1.33rem;
  width: 3.66rem;
}

ul{
  position: relative;
  -webkit-margin-before: 0em;
  -webkit-margin-after: 0em;
  -webkit-padding-start: 0px;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  width: 100%;
  height: 11.6rem;
  overflow-y: scroll;
  z-index: 1;
}

.connection-file:before{
  position: absolute;
  content: '';
  border-radius:4px;
  border:1px solid rgba(0,0,0,0.15);
  display: block;
  height: 11.6rem;
  width: 35%;
  top: 3.6rem;
  left: 2.4rem;
}

.connection-file:after{
  position: absolute;
  content: '';
  border-radius:4px;
  border:1px solid rgba(0,0,0,0.15);
  display: block;
  height: 11.6rem;
  width: 35%;
  top: 3.6rem;
  right: 2.4rem;
}

.file-join{
    font-size: 0;
}

.file-join span{
    color:rgba(0,0,0,0.65);
    font-size: 14px;
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    vertical-align: middle;
}

.vedio-name{
    width: 40%;
    text-align: right;
}

i{
   font-style: normal;
}

.vedio-projectName{
  margin-left: 0.4rem;
}

.join{
    width: 20%;
    height: 14px;
    background: url('../../../static/img/join.png') no-repeat  center center;
    background-size: 7vw 20px;
}

.vedio-file{
    width: 40%;
    text-align: left;
    position: relative;
}

.vedio-edit{
  color:rgba(100,163,255,1);
  position: absolute;
  top:0;
  right: 0.4rem;
}

.vedio-edit_join{
  position: absolute;
  top:0;
  left: 0;
}

.lauch-btn{
  position: absolute;
  top:-15px;
  left: 10px;
  font-size: 0.58rem;
  background: #409EFF;
  border-radius: 5px;
  height: 1.33rem;
  width: 3.66rem;
  text-align: center;
  line-height: 1.33rem;
}

.el-dialog__header{
    border: #efefef solid 1px;
    background: #F0F0F0;
}

/*警告框*/
.connection-file .warn{
    position: absolute;
    top: 6rem;
    left: 11.4rem;
    background: #595959;
    z-index: 10000;
    width: 19vw;
    height: 11.4vw;
    border-radius:4px;
    text-align: center;
    padding-top: 2.5vw;
    box-sizing: border-box;
    padding-bottom: 2.5vw;
}

.connection-file .warn span{
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url('../../../static/img/icon_warning.svg') no-repeat  center center;
    background-size: 24px 24px;
}

.connection-file .warn p{
    height: 30px;
    line-height: 30px;
    font-size: 16px;
    color: #fff;
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
}

.connection-file .warn i{
  position: absolute;
  top: 5px;
  right: 5px;
  display: inline-block;
  color:#fff;
  cursor: pointer;
}

.el-select{
  width: 99%;
}

.el-input__inner{
  border: 1px solid #fff;
}

</style>

<style>
.el-dialog__body{
  padding: 1.2rem 2.4rem;
}
.el-dialog__header{
    background: #F0F0F0;
}
.el-dialog__footer{
    text-align: center;
}

.vedio-file .el-input__inner{
  border: 1px solid #fff;
}

.vedio-file .el-icon-arrow-up:before {
    content: "修改";
}

.el-input__icon {
    width: 50px;
}

.el-select .el-input .el-select__caret{
  transform: rotateZ(0deg);
  color: #409EFF;
}

.el-select .el-input .el-select__caret.is-reverse{
  content: "收起";
}
</style>

