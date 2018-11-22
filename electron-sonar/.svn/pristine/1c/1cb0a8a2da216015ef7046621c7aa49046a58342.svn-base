<template>
    <div id="file-uploading-page"> 
    <!--上传中-->
    <el-table
        :data="tableData2"
        style="width: 100%"
        stripe
        :header-class-name="tableRowClassName">
        <el-table-column
        prop="name"
        label="片源名称"
        width="">
         <template scope="scope">
          <p>{{scope.row.name}}</p>
        </template>
        </el-table-column>
        <el-table-column
        prop="divname"
        label="分集名称"
        width="">
         <template scope="scope">
            <div v-if="!scope.row.edit" @click="penEdit(scope.$index, scope.row)">
              <p>{{scope.row.part}}</p>
              <span class="i-icon">修改</span>
            </div>
            <div class="form-group" v-if="scope.row.edit">
              <div class="input-group">
                <el-input size="small" value="第一集"></el-input>
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
        <template scope="scope">
          <span class="circle" v-bind:style="{background: scope.row.color}"></span>
          <span>{{scope.row.status}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="reason"
        label="进度"
        width="">
        <template scope="scope" style="position: relative;">
              <div class="progress-status" @click="scope.row.stepsVisible=!scope.row.stepsVisible" v-bind:style="{left: scope.row.leftData + 'px'}">{{scope.row.progressStatus}}</div>
              <el-progress :percentage="70" class="progress" color="#67c23a"></el-progress>
              <el-dialog
              title="三生三世十里桃花-1"
              :visible.sync="scope.row.stepsVisible"
              width="90%"
              :modal="false" class="sk-steps">
              <ul class="steps">
                <li>
                  <span class="step"><i></i></span>
                  <div class="content"><span>抽取音频文件</span><span>提取音频指纹 </span></div>
                </li>
                <li>
                  <span class="step"><i></i></span>
                  <div class="content"><span>上传音频文件至声码云</span></div>
                </li>
                <li class="active">
                  <span  class="step"><i></i></span>
                  <div class="content"><span>视频转码</span></div>
                </li>
                <li>
                  <span class="step"><i></i></span>
                  <div class="content"><span>视频切片中</span></div>
                </li>
                <li>
                  <span class="step" ><i></i></span>
                  <div class="content"><span>上传视频文件至七牛云</span></div>
                </li>
              </ul>
              </el-dialog> 
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="100">
        <template scope="scope">
          <p v-if="!scope.row.stop"  @click="handleEdit(scope.$index, scope.row)">开始</p>
          <p v-if="scope.row.stop" @click="handleEdit(scope.$index, scope.row)">暂停</p>
        </template>
        </el-table-column>
    </el-table>
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
  export default {
    name: 'file-uploading',
    data () {
      return {
        tableData2: [{
          name: '复仇者联盟',
          part: '第一集',
          divname: '待审核',
          status: '待审核',
          reason: '',
          stop: true,
          edit: false,
          progressStatus: '切片中',
          leftData: 20,
          stepsVisible: false,
          color: '#999999'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第二集',
          divname: '王小虎',
          status: '已通过',
          reason: '',
          stop: false,
          edit: true,
          progressStatus: '转码中',
          leftData: 60,
          stepsVisible: false,
          color: '#F5222D'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第三集',
          divname: '王小虎',
          status: '已通过',
          reason: '',
          stop: true,
          edit: false,
          progressStatus: '读取音频',
          leftData: 100,
          stepsVisible: false,
          color: '#52C41A'
        }
        ]
      }
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row'
        } else if (rowIndex === 3) {
          return 'success-row'
        }
        return ''
      },
      handleEdit (index, row) {
        console.log(row)
        console.log(index)
        this.tableData2[index].stop = !this.tableData2[index].stop
      },
      penEdit (index, row) {
        console.log(row)
        console.log(index)
        this.tableData2[index].edit = !this.tableData2[index].edit
      }

    }
  }
</script>

<style scoped>
   
   .i-icon{
    display: inline-block;
    font-size: 14px;
    color: #64A3FF;
    margin-left: 10px;
  }

  p{
    display: inline-block;
  }
  
  .form-group{
    height: 32px;
    line-height: 32px;
  }

  .input-group{
    margin-right: 10px;
    width: 10.8vw;
    display: inline-block;
    }

  .preserve{
      color: #64A3FF;
    }

  .progress{
    width:240px;
    display: inline-block;
  }

  .operate{
    color: #64A3FF;
  }

  .circle{
    border-radius:45%;
    width: 6px;
    height: 6px;
    display: inline-block;
    margin-right: 10px;
  }

   /*切片进度提示*/
  .progress-status{
    color: #64A3FF;
    font-size: 12px;
    position: absolute;
    top: 15px;
    display: inline-block;
    background: url('../../../static/img/progress-status.png') no-repeat center;
    width: 60px;
    height: 20px;
    background-size: 60px 20px;
    text-align: center;
  }

  .steps{
    list-style: none;
    font-size: 0;
    margin-left: 6vw;
  }

  .steps li{
    display: inline-block;
    width: 20%;
    font-size: 12px;
  }

  .steps li .step{
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #fff;
    border-radius: 50%;
    border: 1px solid #000;
    display: flex;
    justify-content:center;
    align-items:Center;
  }

  .steps li .step i{
    display: inline-block;
    width:8px;
    height: 8px;
    background: #64A3FF;
    border-radius: 50%;
    vertical-align:middle;
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
  top: 5px;
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
  top: 2vw;
  width: 100%;
  text-align:center;
}

.steps li .content span{
  display: block;
}

</style>
<style>
.sk-steps .el-dialog__header,.sk-steps .el-dialog__body{
  background: #595959;
  color: #fff;
}
.sk-steps .el-dialog__body{
  height: 9.6vw;
}

.sk-steps .el-dialog__title{
  color: #fff;
  font-size: 16px;
}
</style>

