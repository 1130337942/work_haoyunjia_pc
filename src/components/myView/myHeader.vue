<template>
  <div class="top_text clearfix">
    <ul class="left clearfix">
      <li class="left">
        <template v-if="tabIcon == 'null'">
          <img src="./../../assets/index/defaultAvatar.png" width="40" height="40" > 
        </template> 
        <template v-else>
          <img :src="tabIcon" width="40" height="40" />
        </template> 
      </li>
      <li class="left">
        {{this.$cookie.get('currentCompanyName')}}
        <!-- <el-popover placement="bottom" width="400" trigger="click">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="公司" name="first">
                <el-table :data="gridData" :show-header="false">
                  <el-table-column width="60" property>
                    <template slot-scope="gridData">
                      <img :src="gridData.row.tabIconUrl" width="40" height="40" />
                    </template>
                  </el-table-column>
                  <el-table-column width="200" property="companyName"></el-table-column>
                  <el-table-column property="companyName">
                    <template scope="scope">
                      <div v-if="scope.row.companyName == currentCompanyName">使用中</div>
                      <div v-else>使用</div>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-button
            slot="reference"
            class="left_agency"
            @click="listCompany1"
          >{{this.$cookie.get('currentCompanyName')}}</el-button>
        </el-popover> -->
      </li>
      <router-link to="/Workbench" class="left switch-but" tag="div">切换</router-link>
    </ul>
    <ul class="right clearfix">
      <li class="left">业务地图</li>
      <li class="left"><img src="./../../assets/index/longString .png" alt=""></li>
      <li class="left">审批</li>
      <li class="left"><img src="./../../assets/index/longString .png" alt=""></li>
      <li class="left">我的报表</li>
      <li class="left"><img src="./../../assets/index/longString .png" alt=""></li>
      <!-- <li class="left">管理员控制台</li> -->
      <router-link  class="left" to="/mgHome" tag="li">管理员控制台</router-link>
      <li class="left"><img src="./../../assets/index/longString .png" alt=""></li>
      <!-- <li class="left">
        <el-popover placement="bottom" width="336" trigger="click">
          <div>
            <el-tabs v-model="activeName2" @tab-click="handleClick">
              <el-tab-pane label="通知" name="inform">
                <div class="inform_box">
                  <div class="inform_left_box">
                    <img src="../../assets/img/scan.png" class="inform_img" />
                  </div>
                  <div>
                    <h1>恭喜您中奖5000万</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
                <div class="inform_box">
                  <div class="inform_left_box">
                    <img src="../../assets/img/scan.png" class="inform_img" />
                  </div>
                  <div>
                    <h1>恭喜您中奖5000万</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
                <div class="inform_box">
                  <div class="inform_left_box">
                    <img src="../../assets/img/scan.png" class="inform_img" />
                  </div>
                  <div>
                    <h1>恭喜您中奖5000万</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="消息" name="news">
                <div class="news_box">
                  <div class="news_left_box">
                    <img src="../../assets/img/scan.png" class="news_img" />
                  </div>
                  <div>
                    <h1>
                      <span>张三</span>
                      评论了您
                    </h1>
                    <h1>恭喜您中奖1000万，请快速领取</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
                <div class="news_box">
                  <div class="news_left_box">
                    <img src="../../assets/img/scan.png" class="news_img" />
                  </div>
                  <div>
                    <h1>
                      <span>张三</span>
                      评论了您
                    </h1>
                    <h1>恭喜您中奖1000万，请快速领取</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
                <div class="news_box">
                  <div class="news_left_box">
                    <img src="../../assets/img/scan.png" class="news_img" />
                  </div>
                  <div>
                    <h1>
                      <span>张三</span>
                      评论了您
                    </h1>
                    <h1>恭喜您中奖1000万，请快速领取</h1>
                    <h1>1分钟前</h1>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="待办" name="backlog">
                <div class="backlog_box">
                  <div>
                    <p>
                      <span>恭喜您中奖5000万</span>
                      <el-button size="small" class="backlog_btn">小型按钮</el-button>
                    </p>
                    <h1>1分钟前</h1>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <el-button slot="reference" class="left_agency" @onblur>
            <i class="el-icon-bell"></i>
          </el-button>
        </el-popover>
      </li> -->
      <li class="left" style='width:60px;height:40px;'>
        <!-- <template v-if="headPortraitAttachment == '' || !headPortraitAttachment">
          <img :src="headPortraitAttachment" style='width: auto;height: auto;max-width: 100%;max-height: 100%;' />
        </template> 
        <template v-else>
          <img src="./../../assets/index/portrait.png" style='width: auto;height: auto;max-width: 100%;max-height: 100%;' />
        </template>  -->
         <template v-if="headPortraitAttachment == 'null'">
           <img src="./../../assets/index/portrait.png" style='width: auto;height: auto;max-width: 100%;max-height: 100%;' />
        </template> 
        <template v-else>
          <img :src="headPortraitAttachment" style='width: auto;height: auto;max-width: 100%;max-height: 100%;' />
        </template>
      </li>
      <li class="left">{{userName}}</li>
      <li class="left" style="width:80px;">
        <img
          src="./../../assets/index/userQuit.png"
          alt
          @click="logout1"
          style="width: auto;height: auto;max-width: 25%;max-height: 25%;margin-right:5px;"
        />
        <span>退出</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { type } from "os";
import {listCompany,logout} from '../../api/api'
import {mapMutations} from 'vuex'
export default {
  name: "myHeader",
  data() {
    return {
      activeName: "first", //默认选中展示部分
      activeName2: "inform",
      gridData: null,
      currentCompanyName: this.$cookie.get("currentCompanyName"),
      userName:this.$cookie.get('userName'),
      headPortraitAttachment:this.$cookie.get('headPortraitAttachment'),
      tabIcon:this.$cookie.get('tabIcon'),
    };
  },
  methods: {
    ...mapMutations(['tabArrClear']),
    handleClick(tab, event) {
      /*console.log(tab, event);*/
    },
    listCompany1() {
      var $cookie = this.$cookie;
      this.$cookie.get("token");
      this.$cookie.get("currentCompanyName");
        let param = {
           param:JSON.stringify({})
        }
        listCompany(param).then(result => {
				  this.gridData = result.data.data;
				})
				.catch(error => {
					this.$router.push('/Login');
        })
    },
    // 退出
    logout1() {
      let param = {
           param:JSON.stringify({})
        }
        logout(param).then(result => {
          console.log(result);
          if(result.code == "000000"){
            this.$cookie.remove("token");
            localStorage.removeItem('key_token');
            sessionStorage.clear();
            this.tabArrClear()
            this.$router.push("/Login");
          }else if(result.code == "100000"){

          }
				})
				.catch(error => {
          console.log(error)
					this.$router.push('/Login');
        })
    }
  },
  created() {
    var $cookie = this.$cookie;
    this.$cookie.get("currentCompanyName");
    this.$cookie.get("headPortraitAttachment");
    this.$cookie.get("userName");
 
    // console.log('currentCompanyName:===='+ this.$cookie.get('currentCompanyName'));
  }
};
</script>
<style lang="scss">
.left_agency {
  color: #ffffff;
  border: 0;
  padding: 0;
  background: transparent;
  height: 40px;
  line-height: 40px;
}
.left_agency:hover {
  background: transparent;
}
.left_agency:focus {
  background: transparent;
}
</style>
<style scoped>
/*top导航*/
.top_text {
  color: #ffffff;
  font-size: 14px;
  padding:0 1.5%;
  /* line-height: 30px;
  margin: 29px 31px 20px 35px; */
  /* padding: 1.3% 1.3%; */
}
.top_text ul li {
  cursor: pointer;
  /* height: 40px;
  line-height: 40px; */
}
.top_text ul:nth-child(1) li:nth-child(1) {
  margin-right: 10px;
}
.top_text ul:nth-child(2) li img {
  height: 14px;
  margin: 0 10px;
}
/* .top_text ul:nth-child(2) li:nth-child(7) {
  margin: 0 20px;
} */
/*通知*/
.inform_box {
  display: flex;
  height: 73px;
  border-bottom: 1px solid #e8e8e8;
  margin: 10px;
}
.inform_box h1 {
  height: 22px;
  line-height: 22px;
}
.inform_box img {
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
.inform_box .inform_left_box {
  height: 73px;
  line-height: 42px;
}
/*消息*/
.news_box {
  display: flex;
  height: 73px;
  border-bottom: 1px solid #e8e8e8;
  margin: 10px;
}
.news_box img {
  width: 32px;
  height: 32px;
  margin-right: 16px;
}
.news_box .news_left_box {
  height: 73px;
  line-height: 55px;
}
/*待办*/
.backlog_box {
  display: flex;
  height: 73px;
  border-bottom: 1px solid #e8e8e8;
  margin: 10px;
}

</style>
<style lang="scss" scoped >
  .top_text{
    .switch-but{
        margin-top: 20px;
        padding: 0px 10px;
        height:20px;
        background:rgba(230,230,230,1);
        border-radius:4px;
        text-align: center;
        line-height: 20px;
        font-size: 14px;
        color: #444444;
        margin-left: 20px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover{
            transform:scale(1.05);
            -webkit-transform:scale(1.05); 
            -moz-transform:scale(1.05); 
        }
    }
  }
</style>
