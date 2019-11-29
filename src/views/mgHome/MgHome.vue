<template>
    <div class="mg-home">
        <div class="cont1">
            <div class="item item1">
                <div>
                    <div>企业人数</div>
                    <div class="num">{{homeData.employeeCount}}</div>
                    <div>未激活{{homeData.employeeCountNo}}人</div>
                </div>
                <img src="./../../assets/img/management/mghome_bgicon1.png" alt="">
            </div>
            <div class="item item2">
                <div>
                    <div>部门数</div>
                    <div class="num">{{homeData.departmentCount}}</div>
                    <!-- <div>未激活人数</div> -->
                </div>
                <img src="./../../assets/img/management/mghome_bgicon2.png" alt="">
            </div>
            <div class="item item3">
                <div>
                    <div>岗位数</div>
                    <div class="num">{{homeData.jobCount}}</div>
                    <!-- <div>未激活人数</div> -->
                </div>
                <img src="./../../assets/img/management/mghome_bgicon3.png" alt="">
            </div>
            <div class="item item4">
                <div>
                    <div>角色数</div>
                    <div class="num">{{homeData.roleCount}}</div>
                    <!-- <div>未激活人数</div> -->
                </div>
                <img src="./../../assets/img/management/mghome_bgicon4.png" alt="">
            </div>
        </div>
        <div class="cont2">
            <div class="title-box">公司管理</div>
            <ul>
                <li  class="list1">
                    <!-- <img src="./../../assets/img/management/mghome_company1.png" alt=""> -->
                    <el-popover
                        placement="bottom"
                        title="提示"
                        width="200"
                        trigger="manual"
                        v-model="visible"
                        content="公司已认证，如有疑问请联系平台客服"
                        @show="isCertificationShow()">
                        <el-button slot="reference" @click="certificationFn()">
                            <img src="./../../assets/img/management/mghome_company1.png" alt="">
                            <div>企业认证</div>
                            <div class="unauthorized c-EE382B">{{certificationStatus}}</div>
                        </el-button>
                    </el-popover>
                   
                   
                </li>
                <li @click="openPage('/OrganizationalStructure')" class="">
                    <img src="./../../assets/img/management/mghome_company2.png" alt="">
                    <div>组织架构</div>
                  
                </li>
                <li  class="">
                    <img src="./../../assets/img/management/mghome_company3.png" alt="">
                    <div>岗位</div>
                </li>
                <li class="">
                    <img src="./../../assets/img/management/mghome_company4.png" alt="">
                    <div>应用管理</div>
                </li>
                <li class="">
                    <img src="./../../assets/img/management/mghome_company5.png" alt="">
                    <div>企业设置</div>
                </li>
                <li @click="openPage('/PermissionsManagement')" class="">
                    <img src="./../../assets/img/management/mghome_company6.png" alt="">
                    <div>权限管理</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mghomePage,companyCertification } from "@/api/api";
    export default {
        data(){
            return{
                homeData:{},
                visible:false,
                //公司id
                currentCompanyId:this.$cookie.get('currentCompanyId')
            }
        },
        computed:{
            certificationStatus(){
                let authorized = this.homeData.certificationStatus;
                let status;
                if(authorized == 1){
                    status = '未认证'
                }else if(authorized == 2){
                    status = '认证中'
                }else if(authorized == 3){
                    status = '已认证'
                }else if(authorized == 4){
                    status = '认证失败'
                }
                return status
            }
        },
        created(){
            this.initFn()
        },
        methods:{
            openPage(path){
                this.$router.push(path)
            },
            initFn(){
                let param = {
                        param:JSON.stringify({
                            companyId:this.currentCompanyId
                        })
                }
                mghomePage(param).then(result => {
                        // console.log(result)
                        if(result.code == '000000'){
                            this.homeData = result.data
                        }else if(result.code == '100000'){
                             alert('系统错误')
                        }
                    }).catch(err => {
                        alert('请求失败')
                })
            },
            //企业认证
            certificationFn(){
                let authorized = this.homeData.certificationStatus;
                if(authorized == 1){//未认证
                    this.unauthorizedFn()
                }else if(authorized == 3){//已认证
                    this.visible = true 
                }
            },
            //未认证
            unauthorizedFn(){
                let param = {param:JSON.stringify({
                    firstCompanyId:this.currentCompanyId,
                    userId:this.$cookie.get('userId')
                })}
                companyCertification(param).then(result => {
                //    console.log(result)
					if(result.data.auth == true){
                        //已认证
                    }else if(result.data.auth == false){
                        this.dialogAutonym = true;
                        this.Autonym = result.data.authUrl
                        window.open(result.data.authUrl)
                    }
				})
				.catch(error => {
                    console.log(error)
                })
            },
            //弹框显示
            isCertificationShow(){
                setTimeout(()=>{
                    this.visible = false
                },2000)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .dis-flex{
        display: -webkit-flex;
        display: flex;
    }
    .dis-vertical-center{
        @extend .dis-flex;
        -webkit-align-items: center ;
        align-items: center ;
    }
    .dis-justify-content{
        @extend .dis-flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }
    .c-EE382B{
        color: #FD6427;
    }
    .mg-home{
        padding: 20px;
        width: calc(100% - 40px);
        .cont1{
            width: 100%;
            @extend .dis-justify-content;
            .item{
                @extend .dis-vertical-center;
                @extend .dis-justify-content;
                width: 20%;
                height: 88px;
                color: #FFF;
                padding: 20px 40px;
                background-size: 100% 100%;
                background-repeat:no-repeat;
                font-size: 16px;
                &:hover{
                    -ms-transform:scale(1.03); 
                    -webkit-transform: scale(1.03); 
                    transform: scale(1.03);
                    transition: all 0.3s;
                    -webkit-transition: all 0.3s;
                }
            }
            .item1{
                background-image: url('./../../assets/img/management/mghome_bg1.png')  
            }
            .item2{
                background-image: url('./../../assets/img/management/mghome_bg2.png')
            }
            .item3{
                background-image: url('./../../assets/img/management/mghome_bg3.png')  
            }
            .item4{
                background-image: url('./../../assets/img/management/mghome_bg4.png')
            }
            .num{
                font-size:30px;
                font-family:HelveticaNeue;
            }
        }
        .cont2{
            background:rgba(255,255,255,1);
            margin: 20px 5px 0px;
            border-radius:2px;
            .title-box{
                font-size:18px;
                font-family:PingFangSC-Medium,PingFang SC;
                font-weight: bold;
                border-bottom:solid 1px rgba(240,242,246,1);
                line-height: 70px;
                padding: 0px 40px;
            }
            ul{
                @extend .dis-justify-content;
                text-align: center;
                padding: 30px 60px  ;
            }
            li{
                font-size:14px;
                font-family:PingFangSC-Regular,PingFang;
                color:rgba(0,0,0,0.65);
                width: 100px;
                height:105px;
                cursor: pointer;
                padding-top: 10px;
                transition: all 0.3s;
                border-radius:8px;
                position: relative;
                &:hover{
                    background:rgba(0,0,0,0.03);
                    color: #409EFF;
                }
                &:active{
                    background:rgba(0,0,0,0.06);
                }
                img{
                    margin-bottom: 10px;
                }
            }
            .list1{
                .el-button{
                    padding: 5px 0px 0px;
                    border: none;
                    &:hover,&:focus{
                        background-color:  rgba(0,0,0,0);
                    }
                }
            }
            .unauthorized{
                position: absolute;
                right: 3px;
                top: 3px;
                font-size:10px;
                font-family:PingFangSC-Regular,PingFang SC;
            }
        }
    }
</style>