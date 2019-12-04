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
      
         /deep/ .el-main {
            background-color: #e9eef3;
            color: #333;
            padding: 0;
        }
        /deep/ .el-container{
            height: 100%;
        }
        /deep/ .el-aside{
             background-color: #272727;
        }
        
    }
</style>