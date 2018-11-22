<template>
  <div class="login-page">
    <login-form></login-form>
  </div>
</template>

<script>
  import LoginForm from '../components/LoginForm'
  import Loki from 'lokijs'
  import path from 'path'
  export default {
    name: 'login',
    components: {LoginForm},
    data () {
      return {
        db: ''
      }
    },
    created () {
      // this.getCachedUserInfo()
      // this.$refs.LoginForm.upload()
    },
    methods: {
      // 尝试从本地数据库获取用户信息
      // getCachedUserInfo () {
      //   this.db = new Loki(path.resolve(__dirname, '../..', 'app.db'))
      //   let userInfo = this.db.getCollection('userInfo')
      //   console.log(userInfo)
      //   if (userInfo === null) {
      //     // 创建集合
      //     // var user this.db.addCollection('userInfo')
      //     // 保存并创建文件
      //     this.db.saveDatabase()
      //   } else {
      //     this.remembered = true
      //   }
      //   console.log(this.db)
      // }
    }
  }
</script>

<style>
  webkit,
  ::-webkit-scrollbar {
    width: 0;
  }
  body {
    margin: 0;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    background: #fff
  }

  .login-page{
    width: 496px;
    overflow: hidden;
  }
   
</style>


