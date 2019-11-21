<template>
    <div class="tabs"> 
        <!--  effect="dark"
        :class="thisName == item.name?'bg-active':'bg-default'" -->
        
        <el-tag 
            :closable="index>0" 
            v-for="(item,index) in routTabArr" 
            :key="index"
           
            @click="changeTab(item.path)"
            @close="handleClose(item)"
            :disable-transitions="true"
            :color="thisName == item.name?'#666666':'#fbf7f7'" 
            :class="thisName == item.name?'bg-active':'bg-default'"
        >{{item.name}}</el-tag>
    </div>
    
</template> 
<script>
export default {
    data(){
        return{
            routTabArr: sessionStorage.tabArr?JSON.parse(sessionStorage.tabArr):[{
                path:'/MgHome',
                name:'首页'
            }],
            getTab:[],
            isObj:{},
            thisName:'',
        }
    },
    watch: {
        $route(){
            this.getRouteFn()
        }
    },
    created(){
        // console.log(this.tabArr)
        this.getRouteFn()
    },
    
    methods: {
        getRouteFn(){
            // console.log(this.$route)
           
            let thisRoute = this.$route;
            let thisRouteName = thisRoute.meta.name;
            let tabObj = {
                path:thisRoute.path,
                name:thisRouteName
            }
            var ishas = this.routTabArr.some(item=>{
                return thisRouteName == item.name
            })
            if(!ishas){
                this.routTabArr.push(tabObj)
            }
            this.thisName = thisRouteName
            sessionStorage.setItem('tabArr',JSON.stringify(this.routTabArr))
           
        },
        changeTab(path){
            this.$router.push(path)
        },
        handleClose(tag){
            // console.log(tag)
            // console.log(this.routTabArr.indexOf(tag))
            this.routTabArr.splice(this.routTabArr.indexOf(tag), 1);
            // console.log(this.routTabArr)
            if(this.thisName == tag.name){
                this.$router.push(this.routTabArr[this.routTabArr.length-1].path)
            }else{
                this.thisName = this.$route.meta.name
            }
            sessionStorage.setItem('tabArr',JSON.stringify(this.routTabArr))
            
        }
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