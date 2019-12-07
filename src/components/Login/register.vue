<template>
          <div id="register">
              <el-form :model="ruleForm2"  status-icon :rules="rules2"  ref="ruleForm2" label-width="0" class="login-form">
                  <p class="title">注册</p>
                  <el-form-item prop="mobile" class="tel">
                      <el-input v-model="ruleForm2.mobile" maxlength="11" auto-complete="off" placeholder="请输入手机号"></el-input>
                  </el-form-item>
                  <el-form-item prop="pass" class="pass">
                      <el-input type="password" v-model="ruleForm2.passwd" auto-complete="off" placeholder="输入密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="checkPass" class="checkPass">
                      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="确认密码"></el-input>
                  </el-form-item>
                  <el-form-item prop="email" class="mailbox">
                      <el-input auto-complete="off" v-model="ruleForm2.email" placeholder="请输入邮箱（非必填）"></el-input>
                  </el-form-item>
                  <el-form-item prop="smscode" class="code">
                      <el-input v-model="ruleForm2.verifyCode" placeholder="请输入验证码"></el-input>
                      <el-button type="primary" :disabled='isDisabled' @click="sendCode">{{buttonText}}</el-button>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm2')" style="
                    width:100%;
                    background: #E79A18;
                    color: #FFFFFF;
                    border:0;
                    height:54px;">注册</el-button>
                      <p class="login"><span @click = CutPhone>已有账号？立即登录</span></p>
                  </el-form-item>
              </el-form>
          </div>
</template>

<script>
import {register,verifyCode} from '../../api/api' 
    export default {
        name: "Register",
        components: {

        },
        data() {
            // <!--验证手机号是否合法-->
            let checkTel = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号码'))
                } else if (!this.checkMobile(value)) {
                    callback(new Error('手机号码不合法'))
                } else {
                    callback()
                }
            }
            //  <!--验证码是否为空-->
            let checkverifyCode = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机验证码'))
                } else {
                    callback()
                }
            }
            // <!--验证密码-->
            let validatePass = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请输入密码"))
                } else {
                    if (this.ruleForm2.checkPass !== "") {
                        this.$refs.ruleForm2.validateField("checkPass");
                    }
                    callback()
                }
            }
            // <!--二次验证密码-->
            let validatePass2 = (rule, value, callback) => {
                if (value === "") {
                    callback(new Error("请再次输入密码"));
                } else if (value !== this.ruleForm2.passwd) {
                 //   console.log(value + '+' + this.ruleForm2.passwd);
                    callback(new Error("两次输入密码不一致!"));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    mobile: "",
                    passwd: "",
                    checkPass: "",
                    email:"",
                    verifyCode: ""
                },
                rules2: {
                    passwd: [{ validator: validatePass, trigger: 'change' }],
                    checkPass: [{ validator: validatePass2, trigger: 'change' }],
                    mobile: [{ validator: checkTel, trigger: 'change' }],
                    verifyCode: [{ validator: checkverifyCode, trigger: 'change' }],
                },
                buttonText: '发送验证码',
                isDisabled: false, // 是否禁止点击发送验证码按钮
                flag: true
            }
        },
        watch:{
            'ruleForm2.mobile':function(){
                this.ruleForm2.mobile = this.ruleForm2.mobile.replace(/\s+/g,'')
            }
        },
        methods: {
            // <!--发送验证码-->
            sendCode () {
                let mobile = this.ruleForm2.mobile
                let param = {param:JSON.stringify({mobile:mobile,domain:window.location.host})}
                verifyCode(param).then(result => {
                  //      console.log(esult)
                        if(result.code == '100000'){
                            this.$message(result.message);
                        }else if(result.code == '000000'){
                             this.$message('已发送');
                        }
                    }).catch(err => {
                      //  alert('请求失败')
                })
                if (this.checkMobile(mobile)) {
                  //  console.log(mobile)
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
            // <!--提交注册-->
            submitForm(formName) {
                var $cookie = this.$cookie;
                let param = {
                    param:JSON.stringify({
                        mobile:this.ruleForm2.mobile,
                        verifyCode:this.ruleForm2.verifyCode,
                        passwd:this.ruleForm2.passwd,
                        email:this.ruleForm2.email
                        })
                    }
                register(param).then(result => {
                    //console.log(result.code)
                        if(result.code == '100000'){
                            this.$message(result.message)
                        }else if(result.code == '000000'){
                            this.$cookie.set('token',result.data.token);
                            this.$cookie.set('userName','V' + this.ruleForm2.mobile);
                            this.$router.push('/TheCompanyIn');
                            this.$cookie.set('currentCompanyName',result.data.currentCompanyName)
                            this.$cookie.set('currentCompanyId',result.data.currentCompanyId)
                            this.$cookie.set('mobile',this.userName)
                            this.$cookie.set('userId',result.data.userId)
                            this.$cookie.set('tabIcon',result.data.tabIcon)
                            localStorage.setItem("key_token", result.data.token);
                        }
                    }).catch(err => {
                        alert('请求失败')
                })
            },
            // 验证手机号
            checkMobile(str) {
                let re = /^1\d{10}$/
                if (re.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            //已有账号？立即登录
            CutPhone(){
                this.$parent.reguster_show(1);
            }
        }
    };
</script>
<style lang="scss">
    .tel .el-input__inner,
    .mailbox .el-input__inner,
    .code .el-input__inner,
    .pass .el-input__inner,
    .checkPass .el-input__inner{
        background:rgba(0, 0, 0, 1);
        border:0;
        height: 54px;
        border-radius: 2px;
    }
    .code .el-button{
        border-radius:0 2px 2px 0;
    }
</style>
<style scoped>

    .register-wrapper img {
        position: absolute;
        z-index: 1;
    }
    #register {
        width: 460px;
        background-color: rgba(255, 255, 255, 0.05);
        margin: 0 auto;
        border-radius: 2px;
        
    }
    .login-form{
        padding:15px 30px;
    }
    .title {
        font-size: 26px;
        line-height: 50px;
        font-weight: bold;
        margin: 10px;
        text-align: center;
    }
    .login {
        margin-top: 10px;
        font-size: 14px;
        line-height: 22px;
        color: #E79A18;
        text-align: right;
        text-indent: 8px;
    }
    .login span{
        cursor: pointer;
    }
    .code >>> .el-form-item__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .code button {
        width: 130px;
        height: 54px;
        text-align: center;
        background: rgba(231, 154, 24, 0.2);
        color:rgba(231, 154, 24, 1);
        border:0;
        font-size:14px;
    }

</style>
