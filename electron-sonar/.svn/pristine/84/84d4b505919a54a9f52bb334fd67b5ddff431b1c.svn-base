<template>
    <div id="file-wait-page">
    <el-table
        :data="tableData2"
        style="width: 100%"
        stripe
        :header-class-name="tableRowClassName">
        <el-table-column
        type="selection"
        width="40">
        </el-table-column>
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
        label="操作"
        width="100"
        >
        <template scope="scope">
          <p class="operate" v-if="!scope.row.stop"  @click="handleEdit(scope.$index, scope.row)">上传</p>
          <p class="operate" v-if="scope.row.stop" @click="handleEdit(scope.$index, scope.row)">暂停</p>
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
    name: 'file-wait',
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
          editStatus: ''
        }, {
          name: '三生三世十里桃花第一集',
          part: '第二集',
          divname: '王小虎',
          status: '已通过',
          reason: '',
          stop: false,
          edit: true,
          editStatus: ''
        }, {
          name: '三生三世十里桃花第一集',
          part: '第三集',
          divname: '王小虎',
          status: '已通过',
          reason: '',
          stop: true,
          edit: false,
          editStatus: ''
        }, {
          name: '三生三世十里桃花第一集',
          part: '第四集',
          divname: '王小虎',
          status: '已通过',
          reason: '',
          stop: false,
          edit: true,
          editStatus: ''
        }, {
          name: '三生三世十里桃花第一集',
          part: '第五集',
          divname: '王小虎',
          status: '上传中',
          reason: '',
          stop: false,
          edit: false,
          editStatus: '重新切片'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第五集',
          divname: '王小虎',
          status: '上传中',
          reason: '',
          edit: true,
          stop: false,
          editStatus: '暂停'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第五集',
          divname: '王小虎',
          status: '上传中',
          reason: '',
          edit: true,
          stop: false,
          editStatus: '开始'
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
</style>
