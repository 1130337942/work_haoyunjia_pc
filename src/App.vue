<template>
  <div id="app">
    <!-- <keep-alive>
      <router-view v-if="this.$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
    components: {
      
    },
    beforeMount(){

      // var name = localStorage.mobile;
      // var passwd = localStorage.passwd;
      // if(!name || !passwd){
      //   this.$router.push({path: '/Login'})
      // }else{ //这里少些一个r
      //   if(this.$route.path === '/Login'){      
      //     return 
      //   }
      //   this.$router.push({path: '/index'})
      // }
      // // console.log(this.$route.path)
    },
    created(){
      
    }
  }
  
</script>
<style>
  html,body{
    height: 100%;
    font-family:'思源' !important;
  }
  #app{
    height: 100%;
  }
  /* 列表布局 */
  /* 下 */
  .pagingResult{
    background: white; 
    padding: 20px 40px;
    box-sizing: border-box;
  }
  /* 中 */
  .tasksResult {
    margin:10px 0;
    background: #ffffff;
    padding:16px 40px;
  }
  /* 上 */
  .referResult{
    padding: 20px 40px;
    background: #ffffff;
  }
  /* 设置表格内容字体大小 */
  .el-table{ 
    font-size: 14px;
  }
  /* 设置表格内容高度 */
  .el-table .cell{
    height:20px;
    line-height: 20px;
  }
 .el-table td, .el-table th{
    padding: 6px 0 !important;
  }
  /* 弹出框标题加下划线 */
  .el-dialog__header{
    border-bottom: 1px #E9E9E9 solid;
  }

</style>

