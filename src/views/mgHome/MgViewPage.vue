<template>
    <div class="mg-view-page">
        <el-container>
            <el-header><mg-header-el></mg-header-el></el-header>
            <el-container>
                <el-aside width="220px"><mg-aside-el></mg-aside-el></el-aside>
                <el-main>
                    <div class="tab-box"><mgTabEl></mgTabEl></div>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import mgHeaderEl from '@/components/mgElement/MgHeader.vue'
    import mgAsideEl from '@/components/mgElement/MgAside.vue'
    import mgTabEl from '@/components/mgElement/MgTab.vue'
    export default {
        data(){
            return{
                
            }
        },
        components:{
            mgHeaderEl,
            mgAsideEl,
            mgTabEl
        },
        computed:{
            
        },
        created(){
            
        },
        methods:{
        }
       
    }
</script>
<style src="@/Style/init.css"></style>
<style lang="scss" scoped>
    .mg-view-page{
         height: 100%;
        /deep/ .el-header {
            background-color: #272727;
            border-bottom: 1px #666 solid;
            color: #ffffff;
            padding: 0px;
        }
        .el-aside{
            overflow: hidden;
        }
         /deep/ .el-main {
            background-color: #e9eef3;
            color: #333;
            padding: 0;
        }
        /deep/ .el-menu {
            background-color: #272727;
            width: 220px;
           
        }
        /deep/ .el-container{
            height: 100%;
        }
        /deep/ .el-aside{
             background-color: #272727;
        }
        /deep/ .el-submenu__title{
            color: #ffffff;
            // padding-left: 20px;
            &:hover{
                background-color: rgba(27, 27, 27, 1);
            }
        }
        /deep/ .el-menu-item.is-active{
            color: #ffffff;
            background-color: rgba(27, 27, 27, 1);
            
        }
        /deep/ .el-menu-item{
            color: #ffffff;
            // padding-left: 20px;
            background-color: #272727;
            &:hover{
                background-color: rgba(27, 27, 27, 1);
            }
        }
       .tab-box{
           padding-top: 2px;
           padding-bottom: 1px;
           padding-left: 1px;
           background: #ffffff;
       }
    }
</style>