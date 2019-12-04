<template>
    <div>
        <el-menu   class="el-menu-vertical-demo" :default-active="thisPath" unique-opened 
        background-color="#272727" text-color="#fff">
            <el-menu-item  @click='thisItemFn(sliderData[i])' v-for="(item,i) in menuItemNum" :key="item"  :index="sliderData[i].path"><i class="el-icon-message"></i>{{sliderData[i].name}}</el-menu-item>
            <el-submenu :index="item.name" v-for="(item,i) in comSliderData" :key='i'>
                <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                <el-menu-item @click='thisItemFn(childItem)' :index="childItem.path" v-for="(childItem,childI) in item.child" :key="childI">{{childItem.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import testSliderData from '@/assets/js/sliderData.js';
    import { mapMutations , mapActions} from 'vuex'
    export default {
        data(){
            return{
                sliderData:testSliderData,
                thisPath:'',
                menuItemNum:3,//没有子层级
            }
        },
        computed:{
            comSliderData(){
                return this.sliderData.filter((item,i)=>{
                    return i>this.menuItemNum-1
                })
            },
        },
        watch:{
            $route(){
                this.getRouteFn()
            }
        },
        created(){
            //  this.$route.meta.keepAlive = false
            this.getRouteFn()
        },
        methods: {
            ...mapMutations(['commitPostUserCodeFn']),
            getRouteFn(){
                this.thisPath = this.$route.path
            },
            thisItemFn(item){
                this.$router.push(item.path);
                if(!item.code)return
                this.commitPostUserCodeFn(item.code)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-menu{
       border-right:none
    }
</style>