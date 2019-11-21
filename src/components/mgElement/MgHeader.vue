<template>
    <div class="headers">
        <!-- <router-link to="/index" tag="div">返回业务工作台</router-link> -->
        <div class="header-left" v-if="!isSwitch">
            <img class="logo-icon" :src="tabIcon" alt="">
            <div class="company-name">{{currentCompanyName}}</div>
            <!-- <div v-if="" class="switch-but" @click="switchFn">切换</div> -->
            <!-- <router-link  to="/Workbench" class="switch-but" tag="div">切换</router-link> -->
        </div>
        <div></div>
        <div class="header-right" v-if="!isSwitch">
            <div v-if="isDownloadAppShow" class="text">下载APP<span class="line">|</span></div>
            <div class="text" @click="backIndex()">返回业务工作台<span class="line">|</span></div>
            <div class="user-box">
                <img class="head-img" :src="headPortraitAttachment" alt=""> 
                <div class="user-name">{{userName}}</div>
            </div>
            <div class="exit-box" @click="exitFn()">
                <img class="exit-icon" src="./../../assets/index/userQuit.png"/>
                <span>退出</span>
            </div>
        </div>
        <div class="header-right"  v-if="isSwitch">
            <div class="exit-box" @click="exitFn()">
                <img class="exit-icon" src="./../../assets/index/userQuit.png"/>
                <span>退出</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {listCompany,logout} from '../../api/api'
    export default {
        data(){
            let companyUrl = this.$cookie.get('tabIcon');
            let headPortrait = this.$cookie.get('headPortraitAttachment');
            let isProductionHostUrl = window.location.host !== 'http://manager.goodluckplus.com'? true:false
            return{
                currentCompanyName:this.$cookie.get('currentCompanyName'),//公司名字
                tabIcon:companyUrl == 'null'?require('./../../assets/index/defaultAvatar.png'):companyUrl,//公司头像
                userName:this.$cookie.get('userName'),//用户名
                headPortraitAttachment:headPortrait == 'null'?require('./../../assets/index/portrait.png'):headPortrait, //头像
                isDownloadAppShow : isProductionHostUrl, //是否展示下载App
                isSwitch:false//是否显示切换按钮
            }
        },
        created(){
            // console.log(this.$cookie.get('currentCompanyName'))
            // console.log(this.$cookie.get('tabIcon'))
            // console.log(this.$cookie.get('userName'))
            // console.log(this.$cookie.get('headPortraitAttachment'))
            // console.log(window.location.host == 'http://manager.goodluckplus.com')
          
            this.watchRouteFn()
        },
        methods:{
            backIndex(){
                localStorage.removeItem('TagsView');
                this.$router.push('/index');
            },
            exitFn(){
                let param = {
                    param:JSON.stringify({})
                }
                logout(param).then(result => {
                    // console.log(result);
                    if(result.code == "000000"){
                        this.$cookie.remove("token");
                        localStorage.removeItem('key_token');
                        localStorage.removeItem('TagsView');
                        sessionStorage.removeItem('tabArr')
                        this.$router.push("/Login");
                    }else if(result.code == "100000"){

                    }
                }).catch(error => {
                    console.log(error)
                    this.$router.push('/Login');
                })
            },
            watchRouteFn(){
                if(this.$route.name == 'Workbench'){
                    this.isSwitch = true
                }else{
                    this.isSwitch = false
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .dis-flex{
        display: -webkit-flex;
        display: flex;
    }
    .dis-vertical-center{
        @extend .dis-flex;
        -webkit-align-items: center ;
        align-items: center ;
    }
    $C_409EFF:#409EFF;
   
    .headers{
        @extend .dis-vertical-center;
        justify-content:space-between;
        -webkit-justify-content: space-between;
        height: 100%;
        font-size: 14px;
        padding: 0px 1.5%;
        .header-left{
            @extend .dis-vertical-center;
            height: 40px;
            overflow: hidden;
        }
        .company-name{
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            // &:hover{
            //     color: $C_409EFF;
            // }
        }
        .logo-icon{
            width: 40px;
            height: 40px;
            overflow: hidden;
        }
        .header-right{
            @extend .dis-vertical-center;
            div{
                cursor: pointer;
                height: 40px;
                line-height: 41px;
            }
            .text{
                &:hover{
                    color: $C_409EFF;
                }
            }
            .line{
                margin: 0px 10px;
            }
        }
        .head-img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
        }
        .user-box{
            @extend .dis-vertical-center;
            margin-left: 10px;
        }
        .user-name{
            margin-left: 10px;
            height: 40px;
            line-height: 40px;
        }
        .exit-box{
            @extend .dis-vertical-center;
            width: 60px;
            margin-left: 20px;
            cursor: pointer;
            &:hover{
                color: $C_409EFF;
            }
            .exit-icon{
                width: 20px;
                height: 20px;
                margin-bottom: -5px;
                margin-right: 5px;
            }
        }
        .switch-but{
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