<template>
    <div>
        <el-menu  :default-active="thisPath" class="el-menu-vertical-demo" unique-opened
        background-color="#272727" text-color="#fff">
            <el-submenu :index="item.name" v-for="item in sideData" :key='item.code'>
                <template slot="title"><i :class="item.icon"></i> <span>{{item.name}}</span> </template>
                <el-menu-item @click="goPath(list)" :index="list.path" v-for="list in item.children" :key='list.path'>{{list.name}}</el-menu-item>
            </el-submenu>
            <!-- 没有子集菜单 -->
            <!-- <el-menu-item index="2"><i class="el-icon-menu"></i><span slot="title">导航二</span></el-menu-item> -->
        </el-menu>
    </div>
</template>
<script>
    import { getPcMenusByOrgId } from '@/api/matchesModule/matchesApi';
    import {ifUserIsRole} from '@/api/mgModule/authorityApi'
    import * as auth from '@/api/cookieStorage'
    import { mapMutations,mapActions } from 'vuex'
import { json } from 'body-parser';
    export default {
        name: 'ProductCenter',
        data() {
            return {
                companyId:auth.getCompanyId(),
                sideData:[],//侧边栏数据
                thisPath:'',//当前路由
                thisRouter:{},
            }
        },
        watch:{
            $route(){
                this.getRouteFn()
            }
        },
        created(){
            this.getPcMenusByOrgIdFn();
        },
        methods: {
            ...mapMutations(['commitPostUserCodeFn']),
            ...mapActions(['getUserCodeFn']),
            getRouteFn(){
                this.thisPath = this.$route.path;
                this.thisRouterDataFn(this.sideData)
                if(!this.thisRouter.code) return
                this.commitPostUserCodeFn(this.thisRouter.code)
                //获取是否有权限
                // this.getUserCodeFn();
            },
            // 点击左侧导航跳转右侧内容区域
            goPath(item) {
                this.$router.push(item.path);
            },
            //菜单配置
            async getPcMenusByOrgIdFn(){
                try{
                    let data = {
                        orgId:localStorage.getItem('host_id'),
                        companyId:this.companyId
                    };
                    let res = await getPcMenusByOrgId(data)
                    this.sideData = res.data;
                    this.getRouteFn()
                }catch(error){
                    console.log(error)
                }
            },
            thisRouterDataFn(data){
                data.forEach((item)=>{
                    if(item.children){
                        this.thisRouterDataFn(item.children)
                    }
                    if(item.path == this.thisPath){
                        this.thisRouter = item
                    }
                   
                });
            },
            
        }
       
    }
</script>
<style  lang="scss" scoped>
    .el-menu{
       border-right:none
    }
</style>