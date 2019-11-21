<template>
  <div id="RetrievePassword">
    <el-form class="RetrievePassword-form" autocomplete="on" label-position="left">
      <div style="padding:30px;">
        <h3 class="title">找回密码</h3>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position='top'>
          <el-form-item  label="" prop="phone" v-if = 'flagging == "phone"'>
            <el-input type="phone" v-model.number="ruleForm.phone" placeholder="输入手机号"/>
            <p>{{this.messages}}</p>
          </el-form-item>
          <el-form-item label="" prop="" v-if = 'flagging == "phone"'>
             <div class="drag" ref="dragDiv">
              <div class="drag_bg"></div>
              <div class="drag_text">{{confirmWords}}</div>
              <div
                ref="moveDiv"
                @mousedown="mousedownFn($event)"
                :class="{'handler_ok_bg':confirmSuccess}"
                class="handler handler_bg"
                style="position: absolute;top: 0px;left: 0px;"
              ></div>
            </div>
          </el-form-item>
          <el-form-item prop="smscode" class="code" v-if = 'flagged == 2'>
              <el-input v-model="ruleForm.verifyCode" placeholder="请输入验证码"></el-input>
              <el-button type="primary" :disabled='isDisabled' @click="checkExistMobile1" style='position: absolute;right: 0;height: 54px; background:rgba(248,192,89,1); border:0'>{{buttonText}}</el-button>
          </el-form-item>
          <el-form-item prop="" class="" v-if = 'flagged == 2'>
              <el-button type="primary" @click='nextStep' style='width:100%;height:54px;background:rgba(248,192,89,1);border-radius:2px;border:0'>下一步</el-button>
          </el-form-item>
          <el-form-item label="" prop="pass" v-if = " flagged == 3">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="输入密码"></el-input>
          </el-form-item>
          <el-form-item label="" prop="checkPass" v-if = 'flagged == 3'>
            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
          </el-form-item>
          <el-form-item prop="" class="" v-if = 'flagged == 3'>
              <el-button type="primary" @click='resetThePassword' style='width:100%;height:54px;background:rgba(248,192,89,1);border-radius:2px;border:0'>下一步</el-button>
          </el-form-item>
           <el-form-item prop="" class="" v-if = 'flagged == 4'>
              <p>您已经成功设置密码，请使用新密码登录</p>
              <el-button type="primary" @click='anewLogIn' style='width:100%;height:54px;background:rgba(248,192,89,1);border-radius:2px;border:0'>下一步</el-button>
          </el-form-item>
          </el-form>
      </div>
    </el-form>
  </div>
</template>

<script>
import {checkExistMobile,verifyCode,updatePasswd} from '../../api/api'
export default {
  name: "RetrievePassword",
  components: {},
  data() {
        //手机号验证是否违法
        var checkPhone = (rule, value, callback) => {
        if (!value) {
            this.phoneValidate = false;
            this.confirmSuccess = false;
            this.beginClientX = 0;
            this.mouseMoveStata = false;
            this.confirmWords = "拖动滑块验证";
            document.getElementsByClassName("drag_text")[0].style.color = "#fff";
            document.getElementsByClassName("handler")[0].style.left = "0px";
            document.getElementsByClassName("drag_bg")[0].style.width = "0px";
          return callback(new Error('手机号不能为空'));
        } else {
          const reg = /^1[3456789]\d{9}$/;
          // console.log(reg.test(value));
          //输入正确的时候
          if (reg.test(value)) {
            this.phoneValidate = true;
            document.getElementsByTagName("html")[0].addEventListener("mousemove", this.mouseMoveFn);
            document.getElementsByTagName("html")[0].addEventListener("mouseup", this.moseUpFn);
            callback();
          } else {
            this.phoneValidate = false;
            this.confirmSuccess = false;
            this.beginClientX = 0;
            this.mouseMoveStata = false;
            this.confirmWords = "拖动滑块验证";
            document.getElementsByClassName("drag_text")[0].style.color = "#fff";
            document.getElementsByClassName("handler")[0].style.left = "0px";
            document.getElementsByClassName("drag_bg")[0].style.width = "0px";
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
       //  <!--验证码是否为空-->
            let checkverifyCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            }
      //输入密码
       var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      //确认密码
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
       ruleForm: {
          phone: '',
          pass: '',
          checkPass: '',
          verifyCode: '',
        },
        flagging:'phone', //控制手机号，滑块显示隐藏
        flagged: '', //个别组件显示隐藏
        fakeCode:'', //验证码外层接受
        messages:'', //手机号未被注册
        rules: {
          phone: [
            {validator:checkPhone, trigger:'change'}
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          verifyCode: [
            { validator: checkverifyCode, trigger: 'blur' }
          ],
        },
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveStata: false /*触发拖动状态  判断*/,
      maxwidth: "" /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: "拖动滑块验证" /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/,
      phoneValidate:false /*通过正则来控制滑块的滑动*/,
      buttonText: '发送验证码',
      isDisabled: false, // 是否禁止点击发送验证码按钮
      flag: true
    };

  },
  methods: {
    mousedownFn: function(e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
        //this.phoneValidate是true并且this.mouseMoveStata也等于true才可以滑动
        if((this.phoneValidate) && (this.mouseMoveStata = true)){
          // let param = {param:JSON.stringify({mobile:this.ruleForm.phone})}
          // checkExistMobile(param).then(result => {
          //                if(result.code == "100000"){
          //                   this.$message.error(result.message);
          //                   this.isDisabled = true
          //                }else if(result.code == "000000"){
          //                   this.isDisabled = false
          //                }
          // }).catch(err => {})
        }
        this.beginClientX = e.clientX;
                    
      }
    }, //mousedoen 事件
    successFunction() {
      this.confirmSuccess = true;
      this.confirmWords = "验证通过";
      this.flagged = '2'; //验证码和下一步按钮出现
      if (window.addEventListener) {
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("mousemove", this.mouseMoveFn);
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("mouseup", this.moseUpFn);
      } else {
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("mouseup", () => {});
      }
      document.getElementsByClassName("drag_text")[0].style.color = "#fff";
      document.getElementsByClassName("handler")[0].style.left =
        this.maxwidth + "px";
      document.getElementsByClassName("drag_bg")[0].style.width =
        this.maxwidth + "px";
    }, //验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        let width = e.clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          document.getElementsByClassName("handler")[0].style.left =
            width + "px";
          document.getElementsByClassName("drag_bg")[0].style.width =
            width + "px";
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    }, //mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false;
      var width = e.clientX - this.beginClientX;
      if (width < this.maxwidth) {
        document.getElementsByClassName("handler")[0].style.left = 0 + "px";
        document.getElementsByClassName("drag_bg")[0].style.width = 0 + "px";
      }
    },
    nextStep(){
        if(this.ruleForm.verifyCode == ''){
          this.$message.error('验证码不能为空');
        }else if(this.fakeCode  === 'false'){//正式环境用户电脑上看不到验证码只能看到是真是假
          this.$message.error('验证法获取失败，请从新获取');
        }
        // if (this.ruleForm.verifyCode != this.fakeCode){
        //   this.$message.error('验证码输入错误');
        // }
        else{
          this.flagging = '' //手机号，滑块，下一步按钮隐藏
          this.flagged = 3 //确认密码，下一步按钮显示
        }
    },
    //更改密码
    resetThePassword(){
        let param = {param:JSON.stringify({
            mobile:this.ruleForm.phone,
            verifyCode:this.ruleForm.verifyCode,
            passwd:this.ruleForm.pass,
        })}
        updatePasswd(param).then(result =>{
           // console.log(result)
            if(result.code == '000000'){ //成功
                this.$message(result.message);
                this.flagged = 4
            }else if(result.code == '100000'){ //失败
                this.$message.error(result.message);
            }  
            }).catch((err)=>{});              
    },
    //重新登陆
    anewLogIn(){
      this.$parent.reguster_show(1);
    },
    checkExistMobile1(){
      let param = {param:JSON.stringify({mobile:this.ruleForm.phone})}
          checkExistMobile(param).then(result => {
                         if(result.code == "100000"){
                            this.$message.error(result.message);
                           // this.isDisabled = true
                         }else if(result.code == "000000"){
                           // this.isDisabled = false
                            this.sendCode();
                         }
          }).catch(err => {})
    },
     //发送验证码
    sendCode() {
            let param = {param:JSON.stringify({ 
                mobile:this.ruleForm.phone,
                domain:window.location.host
              })}
                verifyCode(param).then(result =>{
                    if(result.code == '000000'){
                        this.fakeCode = result.data.sucess
                    }else if(result.code == '100000'){
                        this.$message.error(result.message);
                      }  
                      }).catch((error)=>{
                        this.$router.push('/Login');
                      });    
                if (this.ruleForm.phone) {
                    let time = 60
                    this.buttonText = '已发送'
                    this.isDisabled = true
                    if (this.flag) {
                        this.flag = false;
                        let timer = setInterval(() => {
                            time--;
                            this.buttonText = time + ' 秒'
                            if (time === 0) {
                                clearInterval(timer);
                                this.buttonText = '重新获取'
                                this.isDisabled = false
                                this.flag = true;
                            }
                        }, 1000)
                    }
                }
            },
  },
  mounted() {
    this.maxwidth =
      this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document
      .getElementsByTagName("html")[0]
      .addEventListener("mousemove", this.mouseMoveFn);
    document
      .getElementsByTagName("html")[0]
      .addEventListener("mouseup", this.moseUpFn);
  }
};
</script>
<style lang="scss">
#RetrievePassword .el-input__inner {
  width: 400px;
  height: 54px;
  background-color: rgba(0, 0, 0, 1);
  border: 0;
  border-radius: 2px;
  opacity: 0.55;
  color:white;
  &::placeholder {
        color: white;
    }
}
</style>
<style scoped>
#RetrievePassword {
  width: 460px;
  background-color: rgba(255, 255, 255, 0.05);
  margin: 0 auto;
  border-radius: 2px;
}
.RetrievePassword-form h3 {
  height: 38px;
  font-size: 38px;
  text-align: center;
  margin: 20px 0 50px 0;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 38px;
}
/* 滑块 */
.drag {
  position: relative;
  background-color: #e8e8e8;
  width: 100%;
  height: 53px;
  line-height: 53px;
  text-align: center;
}
.handler {
  width: 40px;
  height: 53px;
  border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTEyNTVEMURGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTEyNTVEMUNGMkVFMTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MTc5NzNmZS02OTQxLTQyOTYtYTIwNi02NDI2YTNkOWU5YmUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YiRG4AAAALFJREFUeNpi/P//PwMlgImBQkA9A+bOnfsIiBOxKcInh+yCaCDuByoswaIOpxwjciACFegBqZ1AvBSIS5OTk/8TkmNEjwWgQiUgtQuIjwAxUF3yX3xyGIEIFLwHpKyAWB+I1xGSwxULIGf9A7mQkBwTlhBXAFLHgPgqEAcTkmNCU6AL9d8WII4HOvk3ITkWJAXWUMlOoGQHmsE45ViQ2KuBuASoYC4Wf+OUYxz6mQkgwAAN9mIrUReCXgAAAABJRU5ErkJggg==")
    no-repeat center;
    height:51px;
}
.handler_ok_bg {
  background: #fff
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZDhlNWY5My05NmI0LTRlNWQtOGFjYi03ZTY4OGYyMTU2ZTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDlBRDI3NjVGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NDlBRDI3NjRGMkQ2MTFFNEI5NDBCMjQ2M0ExMDQ1OUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphNWEzMWNhMC1hYmViLTQxNWEtYTEwZS04Y2U5NzRlN2Q4YTEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NGQ4ZTVmOTMtOTZiNC00ZTVkLThhY2ItN2U2ODhmMjE1NmU2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+k+sHwwAAASZJREFUeNpi/P//PwMyKD8uZw+kUoDYEYgloMIvgHg/EM/ptHx0EFk9I8wAoEZ+IDUPiIMY8IN1QJwENOgj3ACo5gNAbMBAHLgAxA4gQ5igAnNJ0MwAVTsX7IKyY7L2UNuJAf+AmAmJ78AEDTBiwGYg5gbifCSxFCZoaBMCy4A4GOjnH0D6DpK4IxNSVIHAfSDOAeLraJrjgJp/AwPbHMhejiQnwYRmUzNQ4VQgDQqXK0ia/0I17wJiPmQNTNBEAgMlQIWiQA2vgWw7QppBekGxsAjIiEUSBNnsBDWEAY9mEFgMMgBk00E0iZtA7AHEctDQ58MRuA6wlLgGFMoMpIG1QFeGwAIxGZo8GUhIysmwQGSAZgwHaEZhICIzOaBkJkqyM0CAAQDGx279Jf50AAAAAABJRU5ErkJggg==")
    no-repeat center;
    height:51px;
}
.drag_bg {
  background-color: #7ac23c;
  height: 53px;
  width: 0px;
}
.drag_text {
  position: absolute;
  top: 0px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
</style>
