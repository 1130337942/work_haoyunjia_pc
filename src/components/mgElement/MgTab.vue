<template>
    <div class="tabs"> 
        <!--  effect="dark"
        :class="thisName == item.name?'bg-active':'bg-default'" -->
        <el-tag 
            :closable="index>0" 
            v-for="(item,index) in pageTabArr" 
            :key="index"
            @click="changeTab(item)"
            @close="handleClose(item)"
            :disable-transitions="true"
            :color="thisName == item.name?'#666666':'#fbf7f7'" 
            :class="thisName == item.name?'bg-active':'bg-default'"
        >{{item.name}}</el-tag>
    </div>
    
</template> 
<script>
import { json } from 'body-parser'
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            thisName:'',
        }
    },
    watch: {
        $route(){
            this.getRouteFn();
            // console.log(this.pageTabArr)
        }
    },
    computed:{
        ...mapState(['pageTabArr']),
    },
    created(){
        this.getRouteFn()
    },
    methods: {
        ...mapMutations(['commitTabArrFn','closeTabArrFn']),
        getRouteFn(){
            // console.log(this.$route.name)
            if(this.$route.name == 'index'){ //业务工作台
                sessionStorage.setItem('moduleTabType','1')
            }else if(this.$route.name == 'MgHome'){//管理控制台
                sessionStorage.setItem('moduleTabType','2')
            }
            this.tabArrFn()
        },
        changeTab(item){
            this.$router.push({name:item.pathName})
        },
        handleClose(tag){
            this.closeTabArrFn(tag)
            if(this.thisName == tag.name){
                this.$router.push(this.pageTabArr[this.pageTabArr.length-1].path)
            }else{
                this.thisName = this.$route.meta.name
            }
        },
        tabArrFn(){
            let thisRoute = this.$route;
            this.thisName =  thisRoute.meta.name;
            let tabObj = {
                path:thisRoute.path,
                name:this.thisName,
                pathName:thisRoute.name
            }
            this.commitTabArrFn(tabObj);
          
        },
       
    }
}
</script>
<style lang="scss" scoped>
    .tabs{
        .el-tag{
            height: 28px;
            border-radius:8px 8px 0px 0px;
            font-size: 14px;
            color: #000000;
            border: none;
            &:hover{
                cursor: pointer;
            }
        }
        .bg-active{
            // border-color:#666666;
            color: #FFF;
        }
        .bg-default{
            // border-color:#fbf7f7;
            color: #000000;

        }
        /deep/ .el-tag__close{
            color: #B3B3B3;
            &:hover{
                color: #FFF;
            }
        }
    }
</style>