/***
权限管理
 */
 <template>
     <div class="PermissionsManagement">
        <div class="cont-left">
            <el-input
                placeholder="请输入关键词搜索"
                prefix-icon="el-icon-search"
                v-model="searchVal">
            </el-input>
            <div class="cont1 fz-16">角色列表</div>
            <el-tree
                class="filter-tree"
                :data="data"
                :props="defaultProps"
                accordion
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                        <img v-if="data.hierarchy == 1" class="icon-img"  :src="icon1" alt="">
                        <img v-if="data.hierarchy == 2" class="icon-img"  :src="icon2" alt="">
                        {{ node.label }}
                    </span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                            class="color-FD6427"
                            @click="() => append(data)"
                            v-if="data.hierarchy == 1">
                            修改
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-button class="add-but-left" @click="addRoleFn" type="primary">添加</el-button>
        </div>
        <div class="cont-right">
            <div class="cont1">
                <span class="fz-18 font-bold">角色1</span>
                <div class="color-FD6427 fz-14 edit-txt">修改</div>
            </div>
            <div class="cont2">
                <div class="div-c2-1">
                   <div>
                        <img class="icon-img" src="@/assets/img/management/Permissions_3.png" alt="">
                        <span class="fz-14">权限列表</span>
                        <span class="fz-12 color-B3B3B3 span2">已选择3个功能，6个权限</span>
                   </div>
                   <el-button type="primary">保存</el-button>
                </div><!-- :load="load" lazy border--->
                <el-table 
                        :data="tableData1"
                        style="width: 100%"
                        row-key="id"
                        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                    <el-table-column
                        prop="date"
                        label="功能及权限"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="WEB端是否授权"
                        align="center"
                        width="180">
                        <template slot="header" slot-scope="scope">
                            WEB端是否授权
                            <el-checkbox v-model="checked" ></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <!-- {{scope.row.name}} -->
                            <el-checkbox v-model="checked"></el-checkbox>
                        </template>
                   
                    </el-table-column>
                    
                    <el-table-column
                        prop="address"
                        align="center" >
                        <template slot="header" slot-scope="scope">
                            APP端是否授权
                            <el-checkbox v-model="checked" ></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox v-model="checked"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="div-c2-2">
                    <div class="fz-14">
                        <img class="icon-img" src="@/assets/img/management/Permissions_4.png" alt="">
                        成员列表
                    </div>
                    <div>
                        <el-button type="primary">添加</el-button>
                        <el-button type="danger">移除</el-button>
                    </div>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <add-role-el :isRokeShow='isRokeShow'
        @confirmDialogAddRoleFn='confirmDialogAddRoleFn'
        @closeDialogAddRoleFn='closeDialogAddRoleFn'>
        </add-role-el>
     </div>
 </template>
 
 <script>
    import addRoleEl from '@/components/mgDialog/addRole'
    let id = 1000;
    export default {
        
        data(){
            return{
                isRokeShow:false,//添加角色对话框是否显示
                icon1:require('@/assets/img/management/Permissions_1.png'),
                icon2:require('@/assets/img/management/Permissions_2.png'),
                searchVal:'',
                data: [{
                    id: 1,
                    label: '一级 1',
                    hierarchy:1,
                    children: [{
                        hierarchy:2,
                        id: 4,
                        label: '二级 1-1',
                        children: [{
                            id: 9,
                            label: '三级 1-1-1'
                        }, {
                            id: 10,
                            label: '三级 1-1-2'
                        }]
                    }]
                }, {
                    id: 2,
                    label: '一级 2',
                    hierarchy:1,
                    children: [{
                        hierarchy:2,
                        id: 5,
                        label: '二级 2-1'
                    }, {
                        hierarchy:2,
                        id: 6,
                        label: '二级 2-2'
                    }]
                }, {
                    id: 3,
                    label: '一级 3',
                    hierarchy:1,
                    children: [{
                        hierarchy:2,
                        id: 7,
                        label: '二级 3-1'
                    }, {
                        hierarchy:2,
                        id: 8,
                        label: '二级 3-2'
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                tableData1: [{
                    id: 1,
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                }, {
                    id: 2,
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    children: [{
                        id: 31,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄',
                        children: [{
                            id: 33,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                            id: 34,
                            date: '2016-05-01',
                            name: '王小虎',
                            address: '上海市普陀区金沙江路 1519 弄'
                        }]
                    }, {
                        id: 32,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }]
                }, {
                    id: 4,
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: []
            }
        },
        components:{
            addRoleEl,
        },
        watch: {
            searchVal(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            //添加角色-显示弹框
            addRoleFn(){
                this.isRokeShow = true
            },
            //接收子组件事件-添加角色-确定事件
            confirmDialogAddRoleFn(){
                this.isRokeShow = false
            },
            //接收子组件事件-添加角色-取消事件
            closeDialogAddRoleFn(){
                this.isRokeShow = false
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            append(data) {
                const newChild = { id: id++, label: 'testtest', children: [] };
                if (!data.children) {
                this.$set(data, 'children', []);
                }
                data.children.push(newChild);
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            // load(tree, treeNode, resolve) {
            //     console.log(tree)
            //     setTimeout(() => {
            //         resolve([
            //             {
            //             id: 31,
            //             date: '2016-05-01',
            //             name: '王小虎',
            //             address: '上海市普陀区金沙江路 1519 弄',
            //              hasChildren: true,
                       
            //             }, {
            //             id: 32,
            //             date: '2016-05-01',
            //             name: '王小虎',
            //             address: '上海市普陀区金沙江路 1519 弄'
            //             }
            //         ])
            //     }, 1000)
            // }
        },
    }
 </script>
 
 <style lang="scss" scoped>
    @import '@/assets/css/public.scss';
    .PermissionsManagement{
        height: calc(100% - 71px);
        .icon-img{
            width: 30px;
            height: 30px;
        }
        .custom-tree-node {
            flex: 1;
            @extend .dis-align-center;
            @extend .justify-conten-between;
            font-size: 14px;
            padding-right: 8px;
        }
        /deep/.el-button--primary,
        /deep/.el-button--danger{
            padding: 5px 18px;
        }
        padding: 20px;
        @extend .justify-conten-between;
        .cont-left,.cont-right{
            background: #ffffff;
            border-radius:4px;
        }
        .cont-left{
            width: 260px;
            padding: 20px;
            position: relative;
            .cont1{
                text-align: center;
                height: 30px;
                line-height: 30px;
                background:#F3F5FF;
                margin-top: 20px;
                border-radius:4px;
            }
            .filter-tree{
                margin-top: 20px;
                /deep/.el-tree-node {
                    padding: 5px 0px;
                }
            }
            .add-but-left{
                padding: 8px 18px;
                width: 175px;
                position: absolute;
                bottom: 40px;
                left: 50%;
                transform: translateX(-50%)
            }
        }
        .cont-right{
            width: calc(100% - 310px);
            .cont1{
                line-height: 60px;
                height: 60px;
                border-bottom: solid 1px #D9E1F2;
                padding: 0px 40px;
                @extend .justify-conten-between;
            }
            .edit-txt{
                cursor: pointer;
            }
            .cont2{
                padding: 0px 40px;
            }
            .div-c2-1{
                height: 50px;
                @extend .justify-conten-between;
                @extend .dis-align-center;
                .span2{
                    margin-left: 10px;
                }
            }
            .div-c2-2{
                @extend .justify-conten-between;
                @extend .dis-align-center;
                margin-top: 40px;
            }
        }
    }
    
 </style>