<template>
    <div>
        <el-menu 
        class="el-menu-demo" 
        mode="vertical" 
        @select="handleSelect" 
        :unique-opened='true'>
            <div v-for="(firstItem,firstIndex) in this.datalist" :key="'first'+firstIndex">
                  <!--el-submenu 为菜单列表，含有箭头，在children.length大于0的时候使用-->
                <el-submenu :index="firstItem.path" v-if="firstItem.children&&firstItem.children.length!==0">
                <template slot="title"><i :class="firstItem.icon"></i><span>{{firstItem.name}}</span></template>
                    <div v-for="(secondItem,secondIndex) in firstItem.children" :key="'second'+secondIndex">
                            <el-submenu v-if="secondItem.children&&secondItem.children.length!==0" :index="secondItem.path">
                            <template slot="title">{{secondItem.name}}</template>
                                <!-- 因为三级菜单下面没有四级所以不需要if判断这样的话就不用再套上一层div -->
                                <el-menu-item
                                :index="thirdItem.path"
                                iscustom="true"
                                v-for="(thirdItem,thirdIndex) in secondItem.children"
                                :key="'third'+thirdIndex"
                                @click="goPath(thirdItem.path,thirdItem.name)">
                                <template slot="title">{{thirdItem.name}}</template>
                                </el-menu-item>

                            </el-submenu>

                            <el-menu-item
                                    :index="secondItem.path"
                                    v-else
                                    @click="goPath(secondItem.path,secondItem.name)">
                            <template slot="title">{{secondItem.name}}</template>
                            </el-menu-item>
                    </div>
                </el-submenu>
                  <!--在children.length等于0时，使用不带箭头的菜单-->
                <el-menu-item :index="firstItem.path"  @click="goPath(firstItem.path,firstItem.name)" v-else>
                    <template slot="title"><i class="el-icon-s-home"></i>{{firstItem.name}}</template>
                </el-menu-item>
            </div>
        </el-menu>
    </div>
</template>
<script>
    import { mapState, mapMutations, mapActions } from 'vuex';
    import { getPcMenusByOrgId } from '@/api/api';
    export default {
        name: 'ProductCenter',
        data() {
            return {
                isCollapse: true,
                mode: 'horizontal',
                menuDoms: [],
                datalist:[],
                list2: [
                    {
                        path: "/index",
                        name: "首页",
                        icon: 'el-icon-s-home',
                    },
                    // {
                    //     path: "/index110",
                    //     name: "导航666",
                    //     icon: 'el-icon-menu',
                    //     show:'false',
                    //     children: [
                    //         {
                    //             path: "/index110-1",
                    //             name: "666-1",
                    //             children: [
                    //                 {
                    //                     path: "/6-1",
                    //                     name: "导航1-1",
                    //                 },
                    //                 {
                    //                     path: "/6-2",
                    //                     name: "导航1-2",
                    //                 },
                    //                 {
                    //                     path: "/6-3",
                    //                     name: "导航1-3",
                    //                 }
                    //             ]
                    //         },
                    //         {
                    //             path: "/test",
                    //             name: "测试",
                    //         }
                    //     ]
                    // },
                    {
                        path: "/index1",
                        name: "灵活用工",
                        icon: 'el-icon-share',
                         children: [
                            // {
                            //     path: "/index11",
                            //     name: "导航a",
                            //     children: [
                            //         {
                            //             path: "/2-1",
                            //             name: "导航a-1",
                            //         },
                            //         {
                            //             path: "/2-3",
                            //             name: "导航a-2",
                            //         },
                            //         {
                            //             path: "/2-4",
                            //             name: "导航a-3",
                            //         }
                            //     ]
                            // },
                             {
                                path: "/AllBill",
                                name: "全部订单",
                            }
                        ]
                    },
                    //  {
                    //     path: "/index2",
                    //     name: "产品中心",
                    //     icon: 'el-icon-s-cooperation',
                    //      children: [
                    //         {
                    //             path: "/ProductCenter",
                    //             name: "产品中心",
                    //         }
                    //     ]
                    // },
                    {
                        path: "/index3",
                        name: "合作关系管理",
                        icon: 'el-icon-s-finance',
                         children: [
                            {
                                path: "/Partner",
                                name: "全部",
                            },
                            {
                                path: "/Client",
                                name: "客户",
                            },
                            {
                                path: "/LaborPool",
                                name: "用工池",
                            },
                            {
                                path: "/Rest",
                                name: "其他",
                            }
                        ]
                    },
                    {  
                        path: "/index6",
                        name: "服务人员管理",
                        icon: 'el-icon-s-custom',
                         children: [
                            {
                                path: "/servicePeopleList",
                                name: "服务人员",
                            }
                        ]
                    },
                    {
                        path: "/index4",
                        name: "账单",
                        icon: 'el-icon-s-data',
                        hidden:true,
                         children: [
                            {
                                path: "/Bill",
                                name: "账单",
                            }
                        ]
                    },
                    {
                        path: "/index5",
                        name: "协议管理",
                        icon: 'el-icon-menu',
                         children: [
                            {
                                path: "/CustomerContract",
                                name: "客户协议管理",
                            },
                            {
                                path: "/SupplierContract",
                                name: "用工协议管理",
                            }
                        ]
                    },
                    {
                        path: "/index7",
                        name: "请求管理",
                        icon: 'el-icon-s-promotion',
                         children: [
                            {
                                path: "/RequestMonitor",
                                name: "请求监控",
                            }
                        ]
                    }
                ]

            }
        },
        methods: {
            ...mapActions(['saveTags']),
            handleOpen(key, keyPath) {
              //  console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
              //  console.log(key, keyPath);
            },
            handleSelect() {

            },
            selectDoms(dom) {

            },
            // 点击左侧导航跳转右侧内容区域
            goPath(path, name) {
                this.$router.push(path);
                this.saveTags({path, name});  
            },
            //菜单配置
            getPcMenusByOrgId1(){
                let param = {param:JSON.stringify({
                    orgId:localStorage.getItem('host_id')
                })}
                getPcMenusByOrgId(param).then(result => {
                   // console.log(result)
                    this.datalist = result.data;
                }).catch(error => {
                    this.$router.push('/Login');
                });
            },
        },
        created(){
			// let urlHost = window.location.host;
            // console.log(urlHost);
            // if(urlHost == 'manager.goodluckplus.com' || urlHost == 'fatmanager.goodluckplus.com'){
            //     this.datalist = this.list;
            // }else{
            //     this.datalist = this.list2;
            // }
            // this.datalist = this.list2;
           this.getPcMenusByOrgId1();
            
        },
    }
</script>
<style>
    /* el-menu el-menu--popup el-menu--popup-bottom-start */

    .el-menu-demo {
        width: 220px;
        background: #272727;
        position: absolute;
    }
    .el-submenu__title,.el-menu-item{
        color:#FFFFFF;
    }
    .el-menu-item:focus, .el-menu-item:hover, .el-submenu__title:focus, .el-submenu__title:hover {
        color:#FFFFFF;
        outline: 0;
        background-color:rgba(27, 27, 27, 1)
    }
    .el-menu-item.is-active{
        color:#FFFFFF;
    }
    .el-submenu.is-active .el-submenu__title {
    border-bottom-color: red;
    }

    .el-submenu__title:hover {
        background-color:rgba(27, 27, 27, 1)
    }
    .el-menu{
        background:rgba(39, 39, 39, 1);
    }
    .el-submenu .el-menu-item{
        padding-left: 50px !important;
    }
</style>