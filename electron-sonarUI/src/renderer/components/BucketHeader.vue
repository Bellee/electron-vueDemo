<template>
  <div class="header-bucket" style="-webkit-app-region: drag">
    <div class="header-btn"><i @click="leavex()"></i></div>
    <div class="header">
     <div class="header-logo"><i></i></div>
     <span class="goback" @click="goback()"></span>
     <span class="go" @click="go()"></span>
      <div class="header-title">
        <span class="header-company">
          爱奇艺影视制片公司
        </span>
        <span class="header-user">
          用户名
        </span>
        <span class="header-leave" @click="leave()">
          退出
        </span>
      </div>
    </div>
  </div>
</template>

<script>
const BrowserWindow = require('electron').remote.BrowserWindow
const window = BrowserWindow.getFocusedWindow()
export default {
  name: 'bucket-header',
  data () {
    return {
      listSeen: false
    }
  },
  methods: {
    goback: function() {
      this.$router.go(-1)
    },
    go: function() {
      this.$router.go(1)
    },
    leavex: function() {
      const window = BrowserWindow.getFocusedWindow()
      window.close()
    },
    leave: function() {
      const win = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 700,
        titleBarStyle: 'default'
      })
      const winURL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:9080'
        : `file://${__dirname}/index.html`
      win.loadURL(`${winURL}#/login`)
      // 关闭旧的窗口
      window.close()
    }
  }
}
</script>

<style scope>
  .header-bucket {
    position: fixed;
    z-index: 400;
    width: 100%;
    background: #fff;
    -webkit-app-region: drag;
    border-bottom:#bbbaba solid 1px;
  }

  .header-btn{
    width: 100%;
    background:#f0f0f0;
    height: 50px;
  }

  .header-btn i{
    float: right;
    display: block;
    width: 1.84vw;
    height: 1.84vw;
    margin-right: 1.2vw;
    margin-top: 1vw;
    background: url('../../../static/img/icon_x.svg') no-repeat center center;
    background-size: 1.84vw 1.84vw;
  }

  .header{
    height: 64px;
  }

  .header-logo,.header-company,.header-user,.header-leave{
    height: 64px;
    line-height: 64px;
  }

  .header-logo{
    display: inline-block;
    width: 12.3vw;
  }

  .header-logo i{
    display: inline-block;
    width: 12.3vw;
    height: 64px;
    background: url('../../../static/img/company.jpg') no-repeat 2.5vw center;
    background-size: 8.2vw 35px;
  }

  .header-title{
    float: right;
    margin-right: 2.5vw;
  }

  .header-control{
    display: inline-block;
  }

  .header-company{
    color: #333333;
    font-size: 18px;
    font-weight: Medium;
  }

  .header-user{
    font-size: 14px;
    color: #333333;
    font-weight: Medium;
    margin-left: 2.5vw;
  }

  .header-leave{
    font-size: 14px;
    color: #666666;
    margin-left: 5vw;
  }

 .goback{
    display: inline-block;
    width: 1.85vw;
    height: 64px;
    background: url('../../../static/img/icon_left_circle.svg') no-repeat center center;
    background-size: 1.85vw 1.85vw;
    margin-left: 2.5vw;
  }

  .go{
    display: inline-block;
    width: 1.85vw;
    height: 64px;
    background: url('../../../static/img/icon_right_circle.svg') no-repeat center center;
    background-size: 1.85vw 1.85vw;
    margin-left: 2.5vw;
  }

</style>