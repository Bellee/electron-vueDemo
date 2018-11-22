<template>
  <div id="update-progress">
    <div class="progress-header">
      检查到新版本
      <i @click="leavex()"></i>
    </div>
    <div class="progress-content">
      <p class="title">版本号:{{version}}</p>
      <p class="progressing">下载中</p>
      <el-progress v-bind:percentage="percentage" color="#64A3FF"></el-progress>
    </div>

    <footer>
      <button class="edition-btn" @click="leavex()">取消</button>
      <button class="propt-btn">安装</button>
    </footer>
  </div>
</template>


<script>
const BrowserWindow = require('electron').remote.BrowserWindow
const window = BrowserWindow.getFocusedWindow()
const electron = require('electron')
const ipcRenderer = electron.ipcRenderer
export default {
  data () {
    return {
      version: this.$route.query.version,
      percentage: 0
    }
  },
  created () {
    let _this = this
    ipcRenderer.on('downloadProgress', function (event, arg) {
      console.log(arg)
      _this.percentage = arg
    })
  },
  methods: {
    leavex: function() {
      const window = BrowserWindow.getFocusedWindow()
      window.close()
    }

  }
}
</script>

<style>
 webkit,
  ::-webkit-scrollbar {
    width: 0;
  }
  body {
    background: #F2F2F2;
    margin: 0;
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }

  .update-progress{
    width: 436px;
    overflow: hidden;
  }

  .progress-header{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    background:#E0DFE0;
    text-align: center;
    height: 32px;
    line-height: 32px;
    color: rgba(0,0,0,0.85);
  }

  .progress-header i{
    float: right;
    display: block;
    width: 15px;
    height: 15px;
    margin-right: 1.2vw;
    margin-top: 1.4vw;
    background: url('../../../static/img/icon_x.svg') no-repeat center center;
    background-size: 15px 15px;
  }


  .progress-content{
    padding: 32px;
  }

  p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }

  .progress-content .title{
    margin-top: 32px;
    height:22px;
    font-size:16px;
    font-weight:500;
    color:rgba(0,0,0,0.65);
    line-height:22px;
  }

  .progress-content .progressing{
    margin-top: 16px;
    height:22px;
    font-size:16px;
    font-weight:400;
    color:rgba(0,0,0,0.65);
    line-height:22px;
  }

  footer button{
  float: right;
  width:88px;
  height:32px;
  background:rgba(255,255,255,1);
  border-radius:4px;
  border:1px solid rgba(217,217,217,1);
  font-size: 14px;
  }

  footer .propt-btn{
    margin-right: 16px;
    background: rgba(100,163,255,1);
    color: #fff;
  }

  footer .edition-btn{
    margin-right: 32px;
  }
</style>
