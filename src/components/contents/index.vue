<template>
  <div>
    <ul class="cardBox clearfix">
      <li class="left">
        <el-card class="box-card">
          <el-tabs v-model="activeName" class="flexible" @tab-click="handleClick">
            <el-tab-pane label="灵活用工人数" name :disabled="true">灵活运工人数</el-tab-pane>
            <el-tab-pane label="本月" name="thisMonth">
              <h1 class="maximumSize">206</h1>
              <div class="progressBar">
                <el-progress :percentage="percentage" :color="customColorFlexibleNumber"></el-progress>
              </div>
              <p class="increase">同比增长{{percentage}}%</p>
            </el-tab-pane>
            <el-tab-pane label="上月" name="lastMonth">上月</el-tab-pane>
          </el-tabs>
        </el-card>
      </li>
      <li class="left">
        <el-card class="box-card">
          <el-tabs v-model="activeName" class="flexible" @tab-click="handleClick">
            <el-tab-pane label="灵活用工支出" name :disabled="true">灵活运工人数</el-tab-pane>
            <el-tab-pane label="本月" name="thisMonth">
              <h1 class="maximumSize">206</h1>
              <div class="progressBar">
                <el-progress :percentage="percentage" :color="customColorFlexibleSpending"></el-progress>
              </div>
              <p class="increase">同比增长{{percentage}}%</p>
            </el-tab-pane>
            <el-tab-pane label="上月" name="lastMonth">上月</el-tab-pane>
          </el-tabs>
        </el-card>
      </li>
      <li class="left">
        <el-card class="box-card">
          <el-tabs v-model="activeName" class="flexible" @tab-click="handleClick">
            <el-tab-pane label="今日用工人数" name :disabled="true">灵活运工人数</el-tab-pane>
            <el-tab-pane label="本月" name="thisMonth">
              <h1 class="maximumSize">206</h1>
              <div class="progressBar">
                <el-progress :percentage="percentage" :color="customColorTodayNumber"></el-progress>
              </div>
              <p class="increase">同比增长{{percentage}}%</p>
            </el-tab-pane>
            <el-tab-pane label="上月" name="lastMonth">上月</el-tab-pane>
          </el-tabs>
        </el-card>
      </li>
      <li class="left">
        <el-card class="box-card">
          <el-tabs v-model="activeName" class="flexible" @tab-click="handleClick">
            <el-tab-pane label="今日用工支出" name :disabled="true">灵活运工人数</el-tab-pane>
            <el-tab-pane label="本月" name="thisMonth">
              <h1 class="maximumSize">206</h1>
              <div class="progressBar">
                <el-progress :percentage="percentage" :color="customColorTodaySpending"></el-progress>
              </div>
              <p class="increase">同比增长{{percentage}}%</p>
            </el-tab-pane>
            <el-tab-pane label="上月" name="lastMonth">上月</el-tab-pane>
          </el-tabs>
        </el-card>
      </li>
    </ul>

    <div class="distanceTop secondBox">
      <el-tabs v-model="activeinformation" @tab-click="handleClick">
        <el-tab-pane label="消息盒子" name="information">
          <el-table :data="tableData" height="240" style="width: 100%" border >
            <el-table-column prop="date" label="日期" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="待办事项(0)" name="configuration"></el-tab-pane>
        <el-tab-pane label="预警事项(0)" name="role"></el-tab-pane>
        <el-tab-pane label="超期事项(0)" name="overdue"></el-tab-pane>
        <el-tab-pane label="催办事项(0)" name="urge"></el-tab-pane>
        <el-tab-pane label="通知公告(0)" name="notification"></el-tab-pane>
      </el-tabs>
    </div>

    <ul class="distanceTop fiveBigBox">
      <li class="left">
        <el-card class="fiveBox orderReceiving">
          <h1>待接单订单</h1>
          <h2>0</h2>
        </el-card>
      </li>
      <li class="left">
        <el-card class="fiveBox unpack">
          <h1>待分包订单</h1>
          <h2>0</h2>
        </el-card>
      </li>
      <li class="left">
        <el-card class="fiveBox personnel">
          <h1>人员缺口</h1>
          <h2>0</h2>
        </el-card>
      </li>
      <li class="left">
        <el-card class="fiveBox payment">
          <h1>待支付订单</h1>
          <h2>0</h2>
        </el-card>
      </li>
      <li class="left">
        <el-card class="fiveBox invoice">
          <h1>待开票订单</h1>
          <h2>0</h2>
        </el-card>
      </li>
    </ul>

    <div class="distanceTop">
      <ul class="carousel clearfix">
        <li class="TheOrderList left">
          <img src="../../assets/index/TheOrderList.png" alt />
          <h1>订单列表</h1>
        </li>
        <li class="CooperativePartner left">
          <img src="../../assets/index/CooperativePartner.png" alt />
          <h1>合作商导入</h1>
        </li>
        <li class="OrderForm left">
          <img src="../../assets/index/OrderForm.png" alt />
          <h1>订单导入</h1>
        </li>
        <li class="Bill left">
          <img src="../../assets/index/Bill.png" alt />
          <h1>账单导入</h1>
        </li>
        <li class="ProductList left">
          <img src="../../assets/index/ProductList.png" alt />
          <h1>产品列表</h1>
        </li>
        <li class="ForbiddenActivity left">
          <img src="../../assets/index/ForbiddenActivity.png" alt />
          <h1>活动管理</h1>
        </li>
        <li class="ForbiddenNote left">
          <img src="../../assets/index/ForbiddenNote.png" alt />
          <h1>短信营销</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      activeName: "thisMonth",
      activeinformation: "information",
      percentage: 20,
      customColorFlexibleNumber: "#52C41A",
      customColorFlexibleSpending: "#F8C059",
      customColorTodayNumber: "#FF3C70",
      customColorTodaySpending: "#F8C059",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang='scss'>
// tab栏不可选状态
.flexible .el-tabs__item.is-disabled {
  color: rgba(0, 0, 0, 0.4);
  margin-right: 46px;
}
.flexible .el-tabs__active-bar {
  left: 46px;
}
.el-card__body {
  padding: 20px 40px;
}
.secondBox .el-tabs__active-bar {
  left: -1px;
}
.secondBox{
  background: white;
  padding: 20px 44px;
}
.secondBox .el-tabs__item:hover{
  color:#F8C059;
}
.secondBox .el-tabs__item.is-active{
  color:#F8C059;
}
.secondBox .el-tabs__active-bar{
  background-color:#F8C059;
}
</style>

<style scoped>
/* 四张卡片 */
.box-card {
  width: 100%;
}
.flexible .maximumSize {
  font-size: 30px;
  color: #000;
}
.flexible .progressBar {
  margin: 30px 0 27px 0;
}
.flexible .increase {
  border-top: 1px solid #e8e8e8;
  font-size: 14px;
  padding-top: 10px;
}
.cardBox,
.fiveBigBox,
.carousel {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}
.cardBox li {
  margin-left: 20px;
  width: 24%;
}
.cardBox li:nth-child(1) {
  margin: 0;
}
/* 所有盒子距离top的距离 */
.distanceTop {
  margin-top: 20px;
}
/* 五张卡片 */
.fiveBigBox li {
  width: 19%;
  margin-left: 19px;
}
.fiveBigBox li:nth-child(1) {
  margin: 0;
}
.fiveBox {
  width: 100%;
  height: 130px;
  border-radius: 2px;
}
.fiveBox h1 {
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.fiveBox h2 {
  font-size: 38px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.orderReceiving {
  background: linear-gradient(
    135deg,
    rgba(65, 177, 243, 1) 0%,
    rgba(73, 102, 255, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(0, 205, 210, 0.2);
}
.unpack {
  background: linear-gradient(
    315deg,
    rgba(113, 0, 229, 1) 0%,
    rgba(148, 108, 223, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(148, 108, 225, 0.2);
}
.personnel {
  background: linear-gradient(
    135deg,
    rgba(255, 105, 84, 1) 0%,
    rgba(253, 126, 114, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(253, 126, 114, 0.2);
}
.payment {
  background: linear-gradient(
    332deg,
    rgba(77, 62, 255, 1) 0%,
    rgba(26, 160, 255, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(0, 190, 255, 0.2);
}
.invoice {
  background: linear-gradient(
    135deg,
    rgba(42, 113, 255, 1) 0%,
    rgba(33, 160, 255, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(64, 100, 229, 0.29);
}
/* 走马灯 */
.carousel {
  width: 100%;
  background: white;
  padding: 20px 0;
}
.carousel li img {
  width: 45px;
  height: 52px;
}
.carousel li {
  width: 200px;
  text-align: center;
}
</style>
