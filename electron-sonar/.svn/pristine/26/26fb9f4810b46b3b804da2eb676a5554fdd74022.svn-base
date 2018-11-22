<template>
    <div id="connection">
         <div class="lauch-upload">
            <span class="lauch-btn">批量上传</span>
            <input type="file" multiple="multiple" @change="showDialog()"/> 
          </div>
<el-dialog
  title="确认关联信息"
  :visible.sync="dialogVisible"
  width="61%">
  <el-row class="connection-file">
    <div class="warn" style="display:none;">
        <span></span>
        <P>三生三世十里桃花 第一集</p>
        <P>重复选择，请重新确认</p>
    </div>
    <el-col class="vedio-file">
        <p>视频文件</p>
        <ul>
            <li>三生三世十里桃花第1集.rmvb</li>
            <li>三生三世十里桃花第2集.avi</li>
            <li>三生三世十里桃花3集.mp4</li>
            <li>三生三世十里桃花45集.mov</li>
            <li>三生三世十里桃花第1集.rmvb</li>
            <li>三生三世十里桃花第2集.avi</li>
            <li>三生三世十里桃花3集.mp4</li>
            <li>三生三世十里桃花45集.mov</li>
        </ul>
    </el-col>
    <el-col class="join">
        <p></p>
        <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </el-col>
    <el-col class="vedio-name">
        <p>剧集名称</p>
        <ul class="vedio-name_content">
            <li>三生三世十里桃花 第一集
                <span class="edit" @click="editpart=true">
                    修改
                </span>
                <ul class="join-edit" v-show="editpart">
                    <li>三生三世十里桃花 第二集<span class="edit-back" @click="editpart=false">收起</span></li>
                    <li>三生三世十里桃花 第三集</li>
                    <li>三生三世十里桃花 第四集</li>
                    <li>三生三世十里桃花 第五集</li>
                    <li>三生三世十里桃花 第六集</li>
                    <li>三生三世十里桃花 第七集</li>
                </ul>
            </li>
            <li>三生三世十里桃花 第二集
                <span class="edit" @click="editpart=true">
                    修改
                </span>
                <ul class="join-edit" v-show="false">
                    <li>三生三世十里桃花 第二集<span class=“edit-back” @click="editpart=false">收起</span></li>
                    <li>三生三世十里桃花 第三集</li>
                    <li>三生三世十里桃花 第四集</li>
                    <li>三生三世十里桃花 第五集</li>
                    <li>三生三世十里桃花 第六集</li>
                    <li>三生三世十里桃花 第七集</li>
                </ul>
                </li>
            <li>三生三世十里桃花 第三集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第四集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第二集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第三集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第四集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第二集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第三集<span class="edit">修改</span></li>
            <li>三生三世十里桃花 第四集<span class="edit">修改</span></li>
        </ul>
    </el-col>       
  </el-row>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确定无误</el-button>
    <el-button @click="dialogVisible = false">取 消</el-button>
  </span>
</el-dialog>
    </div>  
</template>

<script>
export default {
  name: 'connection',
  data () {
    return {
      dialogVisible: false,
      editpart: false
    }
  },
  methods: {
    showDialog () {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped>
.lauch-upload{
  position: relative;
  color: #fff;
  font-size: 15px;
  height: 20px;
}

.lauch-upload input{
  *zoom: 1;
  opacity: 0;
  position: absolute;
  top: -15px;
  left: 10px;
  height: 30px;
  width: 6vw;
}

.lauch-btn{
  position: absolute;
  top:-15px;
  left: 10px;
  background: #409EFF;
  padding: 4px 10px 4px 10px;
  border-radius: 5px;
}

.el-dialog__header{
    border: #efefef solid 1px;
    background: #F0F0F0;
}

.vedio-file{
    width: 22.3vw;
    display: inline-block;
}

ul{
    list-style: none;
    width: 100%;
    -webkit-padding-start: 0px;
    height: 21.5vw;
}

ul li{
    height: 40px;
}

.vedio-file ul{
    border: #efefef solid 1px;
    overflow-y: scroll;
    box-sizing: border-box;
    padding-right: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
}

.vedio-file ul li{
    position: relative;
    text-align: right;
}

.join{
    display: inline-block;
    width: 6.9vw;
}

.join li{
    background: url('../../../static/img/join.png') no-repeat  center center;
    background-size: 6vw 30px;
}

.vedio-name{
    display: inline-block;
    width: 22.3vw;
}

.vedio-name_content{
    border: #efefef solid 1px;
    overflow-y: scroll;
    padding-left: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    box-sizing: border-box;
}

.vedio-name_content li{
    position: relative;
}


/* .connection-file ul .part-join:after{
    content: ""; 
    position: absolute; 
    width:70%; 
    height:2px;
    background:#CCCCCC;
    top:8px;
    margin-left: 60px;
} */

.connection-file p{
    text-align: center;
    height:24px;
    line-height: 24px;
}

.connection-file ul li{
    color: #595959;
    font-size: 14px;
}

.edit{
    color:#409EFF;
    margin-left: 5px;
}

.join-edit{
   background:#fff;
   position: absolute;
   top: 2.5vw;
   left: -10px;
   height: 13.7vw;
   width: 21.4vw;
   z-index: 1000;
   border: 1px solid #000;
   overflow:hidden;
}

.edit-back{
    float: right;
    color:#409EFF;
    margin-right: 16px;
}

/*警告框*/
.connection-file .warn{
    position: absolute;
    top: 6vw;
    left: 16.8vw;
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

</style>

<style>
.el-dialog__header{
    background: #F0F0F0;
}
.el-dialog__footer{
    text-align: center;
}


</style>

