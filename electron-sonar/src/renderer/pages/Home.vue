<template>
    <webview id="foo"></webview>
</template>
<script>
export default {
  data() {
    return {
      producerId: this.$route.query.producerId
    }
  },
  mounted() {
    document.getElementById('foo').src = 'http://192.168.1.51:8083/frontPage-look?producerId=' + this.producerId
  }
}
</script>

 <style>
    body { margin: 0; }
    #foo {
        width: 100%;
        height: 100vh;
    }
    .home-content{
        width: 87.7vw;
        margin-left: 12.3vw;
    }
 </style>
