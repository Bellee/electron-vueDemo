<template>
    <div class="block" id="file-page">
    <el-pagination
      :current-page.sync="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="sizes, prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'file-page',
    data () {
      return {
        currentPage: 5
      }
    }
  }
</script>
 
<style>
#file-page{
  position: fixed;
  bottom: 2.5vw;
  right: 2.5vw;

}

.el-pagination{
  float: right;
}
</style>
