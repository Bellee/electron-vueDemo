<template>
    <webview id="foo" partition="persist:sonar"></webview>
</template>
<script>
export default {
  created() {
    console.log(this.producerId)
  },
  data() {
    return {
      producerId: 2
    }
  },
  mounted() {
    document.getElementById('foo').src = 'http://192.168.1.51:8083/rest/myInformation/show?producerId=' + this.producerId
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