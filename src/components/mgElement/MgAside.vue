<template>
    <div>
        <el-menu @select="handleSelect"  class="el-menu-vertical-demo" :default-active="thisPath" unique-opened>
            <el-menu-item v-for="(item,i) in menuItemNum" :key="item"  :index="sliderData[i].path"><i class="el-icon-message"></i>{{sliderData[i].name}}</el-menu-item>
            <el-submenu :index="item.name"  v-for="(item,i) in comSliderData" :key='i'>
                <template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
                <el-menu-item :index="childItem.path" v-for="(childItem,childI) in item.child" :key="childI">{{childItem.name}}</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import testSliderData from '@/assets/js/sliderData.js';
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
            this.getRouteFn()
        },
        methods: {
            handleSelect(key, keyPath) {
                // console.log(key)
                // console.log( keyPath);
                this.$router.push(key);
            },
            getRouteFn(){
                this.thisPath = this.$route.path
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>