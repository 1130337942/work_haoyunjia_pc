/**
    切换工作台
 */
<template>
    <div class="Workbench">
        <el-header><mg-header-el></mg-header-el></el-header>
        <div class="cont1">
            <div class="c1-left">
                <div class="img-box" >
                    <img  :src="!userInfo.headPortraitAttachmentUrl?'/img/portrait.ea34a9c5.png':userInfo.headPortraitAttachmentUrl" alt="">
                </div>
                <div class="txt-box">
                    <p class="fz-20">{{userInfo.userName}}</p>
                    <div class="tag tag1" v-show="userInfo.realnameAuthenticationStatus">{{userInfo.realnameAuthenticationStatus}}</div>
                </div>
            </div>
            <div class="c1-right">
                <el-button type="warning">
                    <router-link tag="a" target="_blank" to='/TheCompanyIn' >公司入驻</router-link>
                </el-button> 
                <!-- <router-link tag="a" target="_blank" to='/TheCompanyIn' >公司入驻</router-link> -->
                <el-tooltip class="item" :value="isTooltipShow1" :manual="true" effect="dark" content="功能暂未开放，敬请期待！" placement="bottom">
                    <el-button type="warning" @click="isTooltipShowFn(1)">创建店铺</el-button>
                </el-tooltip>
                <el-tooltip class="item" :value="isTooltipShow2" :manual="true" effect="dark" content="功能暂未开放，敬请期待！" placement="bottom">
                    <el-button type="warning" @click="isTooltipShowFn(2)">公司注册</el-button>
                </el-tooltip>
                <el-tooltip class="item" :value="isTooltipShow3" :manual="true" effect="dark" content="期待您的加入，请联系平台客服！" placement="bottom">
                    <el-button type="warning" @click="isTooltipShowFn(3)">申请自由职业者</el-button>
                </el-tooltip>
            </div>
        </div>
        <div class="cont3">
            <el-popover
                placement="bottom"
                width="200"
                trigger="click"
                content="选择工作台功能提供切换工作主体的功能。工作主体分公司和我的店铺两种
                        在此部分找不到指定公司或店铺， 则请联系管理员把当前账号加入指定公司下成为公司员工。或可通过公司入驻/创建店铺， 新建公司/店铺
                        工作主体为其他自有职业者（如司机， 搬运工， 等）， 请下载APP，在移动端使用相关功能。">
                <el-button type="text" class="help" slot="reference">帮助?</el-button>
            </el-popover>
        </div>
        <div class="cont2">
            <div class="box box1">
                <div class="top">
                    <p class="$cTheme fz-18">公司</p>
                    <div class="input-box">
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="likeName">
                        </el-input>
                    </div>
                </div>
                <div class="item-box" :class="[isMore?'more-item-box':'un-more-item-box']"  v-if="workBenchListData.length>0">
                    <div  class="item"  
                    :class="{'dimission':item.workStatus == 2}"   
                    @click="switchFn(item)"
                    v-for="(item,i) in workBenchListData" :key='i'>
                        <div class="fz-18 fz-bold">{{item.companyName}}</div>
                        <div class="fz-14 margin-top-10">行业类型：{{item.industryType}}</div>
                        <div class="fz-14 margin-top-10">认证状态：{{item.certificationStatusText}}</div>
                        <div class="tag tag1" v-if='item.status == 1'>使用中</div>
                        <div class="tag tag2" v-if='item.workStatus == 2'>已离职</div>
                    </div>
                </div>
                <div v-else class="unData">暂无数据</div>
                <div class="more-but fz-18" v-if='isMoreWorkBenchShow'  @click="moreWorkBenchFn">{{moreTxt}} <i :class="[isMore?'el-icon-caret-top':'el-icon-caret-bottom']"></i></div>
            </div>
            <div class="box box2">
                <div class="top">
                    <p class="$cTheme fz-18">店铺</p>
                    <div class="input-box">
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="input2">
                        </el-input>
                    </div>
                </div>
                <!-- <div class="item-box" >
                    <div  class="item">
                        <div class="fz-18 fz-bold">成都宝利莱食品有限公司</div>
                        <div class="fz-14 margin-top-10">主体信息：未认证</div>
                        <div class="fz-14 margin-top-10">公司状态：营业中</div>
                    </div>
                </div> -->
                <div class="unData">暂无数据</div>
            </div>
        </div>
    </div>
</template>

<script>
    import mgHeaderEl from '@/components/mgElement/MgHeader.vue'
    import { workBenchList ,switchWorkbench} from "@/api/api";
    import {mapMutations} from 'vuex'
    let _ = require('lodash')
    export default {
        data(){
            return{
                userId:this.$cookie.get('userId'),
                likeName:'',//公司搜索的内容
                PostWorkBenchListData:[],//接口原数据
                workBenchListData:'',//工作台列表
                userInfo:{},//用户信息
                isMoreWorkBenchShow:false,//是否显示更多
                pageNum:1,
                isTooltipShow1:false,
                isTooltipShow2:false,
                isTooltipShow3:false,
                input2:'',
                moreTxt:'更多',
                isMore:false,//是否展示更多
            }
        },
        components:{
            mgHeaderEl,
        },
        created(){
            this.workBenchListFn()
            this.debounceFn =_.debounce(this.workBenchListFn,1000,false)
        },
        watch:{
            likeName(){
                this.likeName = this.likeName.replace(/\s+/g,'')
                this.debounceFn()
            },
        },
        methods:{
            ...mapMutations(['tabArrClear']),
            isTooltipShowFn(index){
                this[`isTooltipShow${index}`] = true
                setTimeout(()=>{
                   this[`isTooltipShow${index}`] = false
                },1500)
            },
            //工作台数据
            workBenchListFn(){
                let param = {param:JSON.stringify({
                    likeName:this.likeName,
                    userId:this.userId
                })}
                workBenchList(param).then(result => {
                    // console.log(result)
                    if(result.code*1 === 0 ){
                        let arr = result.data.companyInfoVOS
                        // var arr = []
                        // for(var i = 0;i<10;i++){
                        //     arr.push(result.data.companyInfoVOS[0])
                        // }
                        this.workBenchListData = arr
                       
                        this.isMoreWorkBenchShow = arr.length>3
                        this.userInfo = result.data.userInfoVO
                    }else if(result.code*1 === 100000){
                        this.$message({
                            message: result.message,
                            type: 'error',
                            duration:3000,
                            // showClose:true
                        });
                    }
					
				})
				.catch(error => {
                    console.log(error)
                })
            },
           
            //点击切换工作台
            switchFn(item){
                if(item.status == 1){
                    this.$router.push('/index')
                    return
                }
                let param = {param:JSON.stringify({
                    id:item.id,//公司id
                    workBenchType:item.workBenchType,//工作台类型
                })}
                switchWorkbench(param).then(result => {
                    // console.log(result)
                    if(result.code*0 === 0){
                        sessionStorage.clear();
                        this.tabArrClear()
                        this.$cookie.set('currentCompanyName',item.companyName)
                        this.$cookie.set('currentCompanyId',item.id)
                        this.$cookie.set('tabIcon',item.tabIconUrl)
                        this.$router.push('/index')
                    }else{

                    }
					
				})
				.catch(error => {
                    console.log(error)
                })
            },
            
            moreWorkBenchFn(){
                this.isMore = !this.isMore
                this.moreTxt = this.isMore? '收起':'更多'
            }
          
        }
    }
</script>
<style type="text/css" src="@/Style/init.css"></style>
<style lang="css">
    #app{
        background: #f0f2f5;
        overflow: auto;
    }
</style>
<style lang="scss" scoped>
    @import '@/assets/css/public.scss';
    .tag{
        font-size:14px;
        padding: 0px 8px;
        height:22px;
        line-height: 22px;
        border-radius:4px;
        text-align: center;
        margin-top: 8px;
    }
    .tag1{
        border:1px solid rgba(80,227,194,1);
        color: #50E3C2;
    }
    .tag2{
        border:1px solid #999999;
        color: #999999;
    }
    .Workbench{
        height: 100%;
        color: #333333;
        background:rgba(240,242,245,1);
        .unData{
            width: 100%;
            text-align: center;
            margin-top: 40px;
            color: $cTheme;
            font-size: 18px;
        }
        /deep/ .el-header {
            background-color: #272727;
            border-bottom: 1px #666 solid;
            color: #ffffff;
            padding: 0px;
            position: fixed;
            z-index: 100;
            width: 100%;
        }
        .cont1{
            @extend .justify-conten-between;
            @extend .dis-align-center;
            padding: 100px 100px 30px;
            .img-box{
                width:80px;
                height:80px;
                border-radius: 50%;
                overflow: hidden;
            }
            .c1-left{
                @extend .dis-align-center;
                
            }
            .txt-box{
                margin-left: 26px;
            }
            .c1-right{
                .el-button--warning{
                    padding: 8px 20px;      
                }
                a{
                    color: #FFF;
                }
            }
            
        }
        .cont2{
            margin: 0px 60px; 
            .box{
                padding: 24px 40px 40px;
                background: #FFF;
                margin-bottom: 40px;
                border-radius:4 px;
                .top{
                    @extend .dis-align-center;
                    @extend .justify-conten-between;
                    border-bottom:solid 1px #E9E9E9;
                    padding-bottom: 20px;
                }
                .input-box{
                    width: 284px;
                }
            }
            .item-box{
                // @extend .justify-conten-between;
                // @extend .flex-wrap1;
               
                padding-bottom: 3px;
               
                .item{
                    width: calc((100%/3 - 42px) - 20px);
                    float: left;
                    margin-right: calc(20px*3 / 2);
                    border-radius:4px;
                    border:1px solid rgba(233,233,233,1);
                    margin-top: 20px;
                    padding: 20px 20px;
                    position: relative;
                    float: left;
                    transition: all 0.2s;
                    -webkit-transition: all 0.2s;
                    &:nth-child(3n){
                        margin-right: 0;
                    }
                    &:hover{
                        transform: scale(0.99);
                        -webkit-transform:scale(0.99); 
                        -moz-transform:scale(0.99); 
                        cursor: pointer;
                        border: 1px solid #FFF;
                        box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
                    }
                }
                .tag{
                    position: absolute;
                    bottom: 20px;
                    right:  20px;
                }
                .dimission{
                    background:rgba(246,246,246,1);
                    pointer-events: none;
                    border: 1px solid rgba(246,246,246,1);
                }
            }
            .more-item-box{
                max-height: 430px;
                overflow: auto;
            }
            .un-more-item-box{
                height: 145px;
                overflow: hidden;
            }
            .more-but{
                text-align: center;
                color: $cTheme;
                margin-top: 30px;
                cursor: pointer;
            }
        }
        .cont3{
            position: relative;
            height: 30px;
            margin: 0px 60px;
            .help{
                position: absolute;
                right: 0px;
            }
            /deep/.el-button--text{
                padding: 0px;
                text-decoration:underline
            }
        }
    }
</style>