<template>
    <div id="file-list-page">
    <el-table
        :data="tableData2"
        style="width: 100%"
        :header-cell-style="getRowClass">
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
        width="">
        <template scope="scope">
          <span class="circle" v-bind:style="{background: scope.row.color}"></span>
          <span>{{scope.row.status}}</span>
        </template>
        </el-table-column>
        <el-table-column
        label="操作"
        width="120">
        <template scope="scope">
          <div v-if="scope.row.again=='0'">
          <p  class="operate" v-if="!scope.row.stop"  @click="handleEdit(scope.$index, scope.row)">{{scope.row.editStatus}}</p>
          <p  class="operate" v-if="scope.row.stop" @click="handleEdit(scope.$index, scope.row)">暂停</p>
          </div>
          <div class="upload-again" v-else-if="scope.row.again=='1'">
            <p>重新上传<span></span></p>
          </div>
        </template>
        </el-table-column>
    </el-table>
    </div>
</template>

<script>
  export default {
    name: 'file-list',
    data () {
      return {
        tableData2: [{
          name: '复仇者联盟',
          part: '第一集',
          status: '待审核',
          reason: '',
          stop: true,
          edit: false,
          editStatus: '-',
          color: '#999999',
          again: '0'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第二集',
          status: '已通过',
          reason: '',
          stop: false,
          edit: true,
          editStatus: '重新切片',
          color: '#F5222D',
          again: '0'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第三集',
          status: '已通过',
          reason: '',
          stop: true,
          edit: false,
          editStatus: '继续',
          color: '#52C41A',
          again: '1'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第四集',
          status: '已通过',
          reason: '',
          stop: false,
          edit: true,
          editStatus: '继续',
          color: '#FCB812',
          again: '0'
        }, {
          name: '三生三世十里桃花第一集',
          part: '第五集',
          status: '上传中',
          reason: '',
          stop: false,
          edit: false,
          editStatus: '重新切片',
          color: '#999999',
          again: '0'
        }
        ]
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
  .source-icon{
    background: url('../../../static/img/source-icon.png') no-repeat center;
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
    vertical-align: middle;
  }

  .i-icon{
    display: inline-block;
    font-size: 14px;
    color: #64A3FF;
    margin-left: 10px;
  }

  .edit-icon{
    background: url('../../../static/img/edit-icon.png') no-repeat center;
    width: 20px;
    height: 18px;
    background-size: 20px 18px;
    vertical-align: middle;
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

  .progress{
    width:240px;
    display: inline-block;
    font-size: 14px;
  }

  .preserve{
    color: #64A3FF;
  }

  .circle{
    border-radius:45%;
    width: 6px;
    height: 6px;
    display: inline-block;
    margin-right: 10px;
  }
  .operate{
    color: #64A3FF;
  }
  
  .upload-again p{
    color:#AAAAAA;
  }

  .upload-again p span{
    background: url('../../../static/img/icon_question.svg') no-repeat center 1px;
    width: 14px;
    height: 14px;
    background-size: 14px 14px;
    display: inline-block;
    margin-left: 9px;
  }
</style>
