<template>
  <div class="login-container" :style ="note">
    <!--头部-->
    <ul class="right-nav clearfix">
      <li class="left" style="display:none;">
        <a href="#">官方</a>
      </li>
      <li class="left" style="display:none;">
        <a href="#">下载</a>
      </li>
      <li class="left" style="display:none;">
        <a href="#">超级合伙人</a>
      </li>
      <li class="left">
        <el-button type="warning" @click="reguster_show(2)" v-show="flag == 1">注册</el-button>
      </li>
      <li class="left">
        <el-button type="warning" @click="reguster_show(1)" v-show="flag == 2">登陆</el-button>
      </li>
      <li class="left">
        <el-button type="warning" @click="reguster_show(1)" v-show="flag == 3">登陆</el-button>
      </li>
    </ul>
    <div class="card">
      <!--注册-->
      <div v-if="flag == 2">
        <Register></Register>
      </div>
      <!--手机号登陆-->
      <div ref="Phone" v-else-if="flag == 1">
        <el-form class="login-form" autocomplete="on" label-position="left">
          <div style="padding:30px;">
            <h3 class="title">{{indexTitle}}</h3>
            <el-form-item>
              <el-input v-model="userName" placeholder="请输入手机号" class="username"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="请输入登陆密码" v-model="password" type="password" class="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="warning"
                style="background: rgb(231, 154, 24); width:100%;height:54px;font-size:18px;"
                @click="log_in()"
              >登陆</el-button>
            </el-form-item>
            <p class="clearfix">
              <span
                class="right"
                style="font-size:14px;color:rgba(231, 154, 24, 1);cursor: pointer;"
                @click="reguster_show(3)"
              >忘记密码？</span>
            </p>
          </div>
        </el-form> 
      </div>
      <!-- 找回密码 -->
      <div v-else-if="flag == 3">
        <RetrievePassword></RetrievePassword>
      </div>
    </div>
    <!--底部-->
    <div
      style="
        position: absolute;
        bottom: 30px;
        left: 50%;
        margin-left: -130px;
        text-align:center;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;"
    >
      <ul style="width:283px;">
        <li>
          <ul class="help clearfix">
            <li class="left">帮助</li>
            <li class="left">隐私</li>
            <li class="left">条款</li>
          </ul>
        </li>
        <!-- <li style="margin:8px 0 30px 0;font-size:12px;">
          copyright
          <img
            src="../../assets/img/c_icon.png"
            alt="图片错误"
            style="width: 12px;height:12px;"
          /> {{copyrightDiy}}
        </li> -->
      </ul>
    </div>
     <p style="font-size: 12px;text-align: center;position: absolute;bottom: 10px;width: 100%;">
          copyright
          <img
            src="../../assets/img/c_icon.png"
            alt="图片错误"
            style="width: 12px;height:12px;"
          /> {{copyrightDiy}}
        </p>
  </div>
</template>

<script>
import Register from "./register";
import RetrievePassword from "./RetrievePassword";
import { logIn,getLogin, getByOrgAndCompanyId, getPcMenusByOrgId } from "../../api/api";

export default {
  name: "Login",
  components: {
    Register,
    RetrievePassword
  },
  data() {
    return {
      userName: "",
      password: "",
      error: false,
      success: true,
      flag: 1,
      numberValidateForm: {
        age: ''
      },
      copyrightDiy:'2019繁昌一招盈人力资源服务有限公司',
      indexTitle:'',
      note:{
       // background: url("../../assets/img/login.jpg"),
       backgroundImage: "url(" + localStorage.getItem('backgroundImage') + ")",
        backgroundRepeat:"no-repeat",
        backgroundPosition:'center'
      }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    reguster_show(score) {
      switch (score) {
        case 1:
          //手机号登陆时 内容区手机号登陆出现 注册按钮也出现
          //调用下面本地储存方法
          this.localStorage(score);
          break;
        case 2:
          this.localStorage(score);
          break;
        case 3:
          this.localStorage(score);
          break;
      }
    },
    localStorage(score) {
      this.flag = score;
      // 本地储存
      localStorage.setItem("flag", score);
    },
    log_in() {
      var $cookie = this.$cookie;
     // let sha256 = require("js-sha256").sha256;//这里用的是require方法
      let param = {param:JSON.stringify({
              mobile:this.userName,
             // passwd:sha256(this.password)
              passwd:this.password
          })
          }
        getLogin(param).then(result => {
               if(result.code == "100000"){
                  this.$message(result.message);
               }else if(result.code == "000000"){
                  this.$cookie.set('token',result.data.token)
                  this.$cookie.set('currentCompanyName',result.data.currentCompanyName)
                  this.$cookie.set('currentCompanyId',result.data.currentCompanyId)
                  this.$cookie.set('mobile',this.userName)
                  this.$cookie.set('userId',result.data.userId)
                  this.$cookie.set('headPortraitAttachment',result.data.headPortraitAttachment)
                  this.$cookie.set('tabIcon',result.data.tabIcon)
                  this.$cookie.set('userName',result.data.userName)
                  localStorage.setItem("mobile",this.userName);
                  localStorage.setItem("passwd",this.password);
                  localStorage.setItem("key_token", result.data.token);
                  this.$router.push('/index');
                 
                  
               }
          }).catch(err => {
             // alert('请求失败')
          })
      },
    },
    mounted(){
      //个性化配置
      this.copyrightDiy = localStorage.getItem('copyrightDiy');
      this.indexTitle = localStorage.getItem('indexTitle');
    },
  // created(){
  //  // console.log(process.env.VUE_APP_basic,process.env.VUE_APP_export,process.env.VUE_APP_dfs);
  //  this.getByOrgAndCompanyId1();
  // }
};
</script>
<style type="text/css" src="../../Style/init.css"></style>
<style lang="scss">
/*输入框样式*/
.el-form-item[data-v-657094ba] {
  width: 400px;
}
.username .el-input__inner,
.password .el-input__inner,
.code_phone .el-input__inner,
.code .el-input__inner {
  background: rgba(0, 0, 0, 1) !important;
  border: 0;
  height: 54px;
  border-radius: 2px;
  color:white;
}
.code .el-input-group__append {
  background: rgba(231, 154, 24, 0.2);
  color: rgba(231, 154, 24, 1);
  border: 0;
  font-size: 14px;
}
</style>
<style lang="scss" scoped>
.title {
  font-size: 26px;
  line-height: 50px;
  font-weight: bold;
  margin: 10px;
  text-align: center;
}
.el-form-item {
  text-align: center;
}
.login-form {
  width: 460px;
  background-color: rgba(255, 255, 255, 0.05);
  margin: 0 auto;
  border-radius: 2px;
}
.login-container .card {
  position: absolute;
  top: 50%;
  margin-top: -230px;
  left: 50%;
  margin-left: -230px;
}
.login-container .card > div:nth-child(1) {
  margin-top: -55px;
}
.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background: url("../../assets/img/login.jpg") no-repeat center;
  background-size: cover;
  overflow: hidden;
}
/*官方 下载 合伙人 注册*/
.right-nav {
  position: absolute;
  top: 64px;
  right: 100px;
}
.right-nav > li {
  font-size: 18px;
  margin-left: 40px;
  line-height: 38px;
}
.right-nav > li > a {
  color: #ffffff;
}
/*二维码*/

.qr_code {
  background: url("../../assets/img/qr_code.png") no-repeat center;
  width: 60px;
  height: 60px;
}
.mobile {
  background: url("../../assets/img/mobile.png") no-repeat center;
  width: 60px;
  height: 60px;
}
.qr_code_full {
  background: url("../../assets/img/qr_code_full.png") no-repeat center;
  width: 160px;
  height: 160px;
}
.scan {
  background: url("../../assets/img/scan.png") no-repeat center;
  width: 32px;
  height: 32px;
  padding: 6px;
}
.qr_code,
.mobile,
.qr_code_full,
.scan {
  background-size: cover;
  overflow: hidden;
  color: #7ea7df;
  font-size: 14px;
  cursor: pointer;
  display: inline-block;
}
/*打开好运App*/
.bottom_text {
  width: 135px;
  margin: 20px auto;
}
.bottom_text li {
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
}
.bottom_text li:nth-child(2),
.bottom_text li:nth-child(3) {
  width: 90px;
  text-align: left;
}
/*底部*/
.help li {
  margin: 0 0 0 42px;
  font-size: 14px;
}
</style>
