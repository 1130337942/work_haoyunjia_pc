<template>
  <div class="content_box">
    <el-container class="content_box">
      <el-header>
        <myHeader></myHeader>
      </el-header>
      <el-container style="height:100%;" class='containerScroll'>
        <el-aside width="220px" style='background: rgba(39, 39, 39, 1);'>
          <zh-menu></zh-menu>
        </el-aside>
        <el-container>
          <el-main>
            <div class="top_tag">
                <myMain></myMain>
            </div>
            <div class="bottom_content">
              <div class="content">
                <keep-alive>
                  <router-view v-if="$route.meta.keepAlive"/>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"/> 
              </div>
            </div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import myHeader from "./components/myView/myHeader";
import myAside from "./components/myView/myAside";
import myMain from "./components/myView/myMain";
export default {
  name: "myView",
  components: {
    myHeader,
    myMain,
    "zh-menu": myAside
  }
};
</script>
<style src="./Style/init.css"></style>
<style lang="scss" scoped>

</style>
<style lang="scss">
.el-container{
  overflow-y: auto;
}
.content_box {
  height: 100%;
  overflow: hidden;
}
.el-header,
.el-footer {
  color: #999999;
  height: 60px;
  line-height:60px;
  padding: 0;
}
.el-header {
    background-color: rgb(39, 39, 39);
    border-bottom: 1px #666 solid;
}
.el-footer {
  background-color: #f0f2f5;
  text-align: center;
}
/*左侧*/
.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}
/*标签页 + 内容*/
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
  .top_tag {
    background: #ffffff;
    height: 55px;
    line-height: 55px;
  }
  .bottom_content {
    padding: 20px 0 0 20px;
    box-sizing: border-box;
    width: 99%;
  }
  .content {
    height: 100%;
  }
}
/*分页*/
.el-pager li.active,
.el-pager li:hover {
  color: #f8c059;
}
// 表格
.table {
  border: 1px #e9e9e9 solid;
  border-radius: 2px;
  overflow: hidden;
}
// 搜索按钮
.interior_btn .el-input-group__append {
  color: white;
  background: #f8c059;
}
//标签页
.el-main .top_tag{
  height: 32px !important;
  line-height: 38px !important;
}
.el-tag .el-tag__close{
  color: #B3B3B3;
}
</style>
