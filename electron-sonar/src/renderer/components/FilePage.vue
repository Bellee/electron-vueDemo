<template>
    <div class="block" id="file-page">
    <div style="float:right;">
    <el-pagination
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size.sync="currentSize"
      layout="sizes, prev, pager, next"
      :total="message"
      >
    </el-pagination>
    <input class="page" type="text" placeholder="5" v-model="goPage"/><label>页</label>
    <div class="page-go" @click="handleGo(goPage)">跳转</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'file-page',
    methods: {
      handleCurrentChange(data) {
        this.$emit('childByValue', data, this.currentSize)
      },
      handleSizeChange(data) {
        this.$emit('childByValue', this.currentPage, data)
      },
      handleGo(goPage) {
        this.$emit('childByValue', goPage, this.currentSize)
        this.currentPage = parseInt(goPage)
      }
    },
    props: ['message'],
    data () {
      return {
        currentPage: 5,
        currentSize: 10,
        goPage: 1
      }
    }
  }
</script>
 
<style>
.el-pagination{
  display: inline-block;
  vertical-align: middle;
}

.el-pager li{
    border: 1px solid #d9d9d9;
    margin-right: 6px;
    border-radius: 4px;
    min-width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 14px;
    font-weight: 400;
}

.el-pager li.active {
    background: #64A3FF;
    cursor: default;
    color: #fff;
}

.el-pagination button, .el-pagination span:not([class*=suffix]){
    min-width: 1.3rem;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.58rem;
}

.page{
  width: 2rem;
  height: 1.1rem;
  line-height: 1.1rem;
  margin-right: 0.42rem;
  border-radius:4px;
  border:1px solid #d9d9d9;
}

label{
  font-size: 0.58rem;
}

.page-go{
  width: 1.66rem;
  height: 1.3rem;
  line-height: 1.3rem;
  background-color: #64A3FF;
  border: 1px solid #64A3FF;
  border-radius:4px;
  color: #fff;
  font-size: 0.58rem;
  margin-left: 0.42rem;
  display: inline-block;
  text-align: center;
  font-size: 14px;
  box-sizing: border-box;
}
</style>
