<template>
    <div id="loginForm">
     <span class="loginlogo"></span>
     <p class="logintTitle">唢呐网络科技欢迎您</p>
     <div>
       <p class="formTitle">用户名密码登录</p>
       <el-form style="center">
          <div class="form-propt">
            <p v-show="loginUnusual">账号或密码错误，请重新输入</p>
          </div>
          <input ref="input" v-model="username" v-on:blur.lazy="userCodeShow()" class="user" placeholder="唢呐">
          <div class="userCode"><div v-show="userCode">内容主编号：{{userCode}}</div></div>
          <input type="password" v-model="password" class="password" placeholder="密码">
          <div class="re-password">
            <input type="checkbox" v-model="checked">记住密码
            <div class="show-box" @click="checked=!checked"></div>
          </div>
        <el-button class="login" @click="upload()">登录</el-button>
       </el-form>
     </div>
     <footer>copyright ©️ 2018 环融科技产品部出品</footer>
  </div>
</template>

<script>
import {get, post, httpRequestConstant} from '../../actions/utils/httpClient'
import server from '../../actions/config/server'
import md5 from 'js-md5'
const BrowserWindow = require('electron').remote.BrowserWindow
const windows = BrowserWindow.getFocusedWindow()

const ipcRenderer = require('electron').ipcRenderer
const session = require('electron').remote.session
export default {
  name: 'login-form',
  data () {
    return {
      checked: false,
      username: '',
      password: '',
      loginUnusual: false,
      loginResult: '',
      tokenCookie: '',
      producerId: '',
      userCode: '',
      selectuserName: ''
    }
  },
  mounted() {
    this.$refs['input'].focus()
    this.getCookies()
  },
  created() {

  },
  methods: {
    upload() {
      var _this = this
      // 使用md5密码加盐
      let passwordMd5 = md5(_this.password + 'bcba098e516128fed0cee16057ddbf8980000163fe7752786adb115839237e1a')
      console.log(passwordMd5)
      // post({
      //   json: true,
      //   body: {
      //     username: _this.username,
      //     password: passwordMd5
      //   },
      //   url: 'http://192.168.1.51:8083/api/login'
      // }, function(response) {
      //   _this.loginResult = response.result
      //   console.log(response)
      //   _this.tokenCookie = response.data.appToken
      //   if (_this.checked == true) {
      //     _this.saveNameAndPassword()
      //     // _this.setCookie(response.data.appToken, _this.username, _this.password, 7)
      //   }
      //   if (_this.loginResult == 'success') {
      _this.loginUnusual = false
      const win = new BrowserWindow({
        height: 750,
        useContentSize: true,
        width: 1300,
        titleBarStyle: 'hiddenInset',
        backgroundColor: '#fff'
      })
      const winURL = process.env.NODE_ENV === 'development'
        ? 'http://localhost:9080'
        : `file://${__dirname}/index.html`
      win.loadURL(`${winURL}#/upload?producerId=${_this.producerId}&selectuserName=${_this.selectuserName}&producerName=${_this.producerName}`)
      console.log(_this.userCode)

      win.openDevTools('/Users/yaobei/Library/Application Support/Google/Chrome/Default/Extensions/hjccockbjjdckanpgpncmegnklpijbho/4.1.4_0')
      // 关闭旧的窗口
      // windows.close()
    //     } else {
    //       _this.loginUnusual = true
    //     }
    //   }, function(fail) {
    //     console.log(fail)
    //   })
    },
    saveNameAndPassword () {
      this.setCookie('appToken', this.tokenCookie)
      this.setCookie('username', this.username)
      this.setCookie('password', this.password)
    },
    setCookie(name, value) {
      let Days = 30
      let exp = new Date()
      let date = Math.round(exp.getTime() / 1000) + Days * 24 * 60 * 60
      const cookie = {
        url: 'http://www.github.com',
        name: name,
        value: value,
        expirationDate: date
      }
      var ses = session.fromPartition('persist:sonar')
      ses.cookies.set(cookie, (error) => {
        if (error) console.error(error)
      })
    },
    getCookies() {
      let that = this
      var ses = session.fromPartition('persist:sonar')
      ses.cookies.get({ url: 'http://www.github.com' }, function (error, cookies) {
        console.log(cookies)
        that.checked = true
        if (cookies.length > 0) {
          that.username = cookies[1].value
          that.password = cookies[2].value
          console.log(cookies[1].value)
          console.log(cookies[2].value)
        }
        if (that.username != null) {
          that.userCodeShow()
        }
      })
    },
    userCodeShow() {
      let _this = this
      get({
        json: true,
        // headers: {
        //   'appToken': _this.tokenCookie
        // },
        url: 'http://192.168.1.51:8083/api/producer/getUserByLoginName?loginName=' + _this.username
      }, function(response) {
        console.log(response)
        console.log(_this.userCode)
        if (response.data.userInfo != null) {
          _this.userCode = response.data.userInfo.userCode
          _this.producerId = response.data.userInfo.producerId
          _this.selectuserName = response.data.userInfo.userName
          _this.producerName = response.data.producerInfo.producer.producerName
          _this.producerName = _this.producerName.replace(/\#/g, ',')
        }
      }, function(fail) {
        console.log(fail)
      })
    }

    /*
    // 设置cookie
    setCookie(c_token, c_name, c_pwd, exdays) {
      var exdate = new Date()
      // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays)
      // 保存的天数
      // 字符串拼接cookie
      window.document.cookie = 'appToken' + '=' + c_token + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userName' + '=' + c_name + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'passWord' + '=' + c_pwd + ';path=/;expires=' + exdate.toGMTString()
    },
    // 获取cookie里的值
    getCookie: function () {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ')// 这里显示的格式需要切割一下自己可输出看下
        console.log(arr)
        this.checked = true
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=')// 再次切割
          // 判断查找相对应的值
          if (arr2[0] == 'userName') {
            this.username = arr2[1]// 保存到保存数据的地方
          } else if (arr2[0] == 'passWord') {
            this.password = arr2[1]
          }
        }
      }
    },
    // 清除cookie
    clearCookie: function () {
      this.setCookie('', '', '', -1)// 修改2值都为空，天数为负1天就好了
    } */

  }
}
</script>
<style scoped>
  #loginForm{
    text-align: center;
    padding-top:64px;
    padding-bottom: 54px;
    background: #fff;
  }

  .loginlogo{
    display: inline-block;
    background: url('../../../static/img/icon_logo_login.svg') no-repeat center center;
    background-size: 169px 48px;
    width: 169px;
    height: 48px;
  }

  .logintTitle{
    font-size: 14px;
    color:#000000;
    opacity: 0.45;
    margin-top: 8px;
    margin-bottom: 32px;
  }

  .formTitle{
    color:#64A3FF;
    display: inline-block;
    width: 136px;
    border-bottom:#64A3FF 2px solid;
    height: 24px;
    padding-bottom: 5px;
    line-height: 24px;
    font-size: 16px;
    font-weight: 300;
  }

  p{
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
  }

  .form-propt{
    width:368px;
    display: inline-block;
    text-align: left;
    font-size: 16px;
    color: #F5222D;
    padding-bottom: 8px;
    padding-top: 8px;
  }

  .user{
     background: url('../../../static/img/icon_number.svg') no-repeat 10px center;
     background-size: 16px 16px;
  }

  .password{
    background: url('../../../static/img/icon_password.svg') no-repeat 10px center;
     background-size: 16px 16px;
  }

  .user,.password{
    padding: 0 30px;
    -webkit-appearance: none;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height:24px;
    width:368px;
    outline: 0;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    font-size: 16px;
  }

  .password:focus{
    border-color: #64A3FF;
    outline: 0;
  }

  .user:focus{
    border-color: #64A3FF;
    outline: 0;
  }

  .userCode{
    width: 368px;
    display: inline-block;
    text-align: left;
    height: 32px;
    line-height: 32px;
    color:rgba(0,0,0,0.45);
    font-size: 14px;
}
  .re-password{
    display: inline-block;
    width: 368px;
    text-align: left;
    position: relative;
  }

  .re-password{
    color: rgba(0,0,0,0.65);
    margin-top: 16px;
    margin-bottom: 32px;
    font-size: 14px;    
  }

  .re-password input{
    margin-left: 10px;
    opacity: 0;
  }

  .login{
    width: 368px;
    height: 40px;
    background:#64A3FF;
    border-radius:4px;
    border: 1px solid #64A3FF;
    color: #fff;
    font-size: 16px;
    font-weight:300;
    letter-spacing: 5px;
  }
  
  input:checked + .show-box {
    background: #64A3FF;
  }

  .show-box {
    position: absolute;
    top: 2px;
    left: 0;
    width: 14px;
    height: 14px;
    border-radius: 2px;
    border: 1px solid #d8d8d8;
    background: white;  
  }

    .show-box:before {  
      content: '';  
      position: absolute;
      top: 2px;
      left: 5px;
      width: 3px;  
      height: 8px;  
      border: solid white;  
      border-width: 0 1px 1px 0;  
      transform: rotate(45deg); 
    }

    footer{
      margin-top: 128px;
      display: inline-block;
      color:rgba(0,0,0,0.45);
      font-size:12px;
    }
  
</style>

 