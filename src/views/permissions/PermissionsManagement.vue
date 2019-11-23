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
                :data="roleData"
                :props="defaultProps"
                accordion
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
                :node-key="`roleId${data.roleId}`"
                @node-click="treeClickFn"
            >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>
                        <img v-if="data.category == 1" class="icon-img"  :src="icon1" alt="">
                        <img v-if="!data.category" class="icon-img"  :src="icon2" alt="">
                        {{node.label}}
                    </span>
                    <span>
                        <el-button
                            type="text"
                            size="mini"
                            class="color-FD6427"
                            @click="() => editRolesFn(data)"
                            v-if="data.category == 1">
                            修改
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-button class="add-but-left" @click="addRoleFn" type="primary">添加</el-button>
        </div>
        <div class="cont-right">
            <div class="cont1">
                <span class="fz-18 font-bold">{{roleItemData.name}}</span>
                <div @click="editRole_Fn" class="color-FD6427 fz-14 edit-txt">修改</div>
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
                        :data="tableTreeData"
                        style="width: 100%"
                        row-key="id"
                        height="400"
                        :row-style="{height:'45px'}"
                        :tree-props="{children: 'resources', hasChildren: 'hasChildren'}">
                    <el-table-column
                        prop="name"
                        label="功能及权限"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="WEB端是否授权"
                        align="center"
                        width="180">
                        <!-- <template slot="header" slot-scope="scope">
                            <el-checkbox v-model="checked" ></el-checkbox>
                        </template> -->
                        <template slot-scope="scope">
                            <!-- {{scope.row.name}} -->
                            <!-- 1都有 2Web端有 3App有 -->
                            <el-checkbox v-if="scope.row.pcOrApp==1 || scope.row.pcOrApp==2" v-model="scope.row.status"></el-checkbox>
                        </template>
                   
                    </el-table-column>
                    
                    <el-table-column
                        prop="address"
                        align="center" 
                        label="APP端是否授权">
                        <!-- <template slot="header" slot-scope="scope">
                            <el-checkbox v-model="checked" ></el-checkbox>
                        </template> -->
                        <template slot-scope="scope">
                            <el-checkbox v-if="scope.row.pcOrApp==1 || scope.row.pcOrApp==3"  v-model="scope.row.status"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="div-c2-2">
                    <div class="fz-14">
                        <img class="icon-img" src="@/assets/img/management/Permissions_4.png" alt="">
                        成员列表
                    </div>
                    <div>
                        <el-button @click="addMembersFn" type="primary">添加</el-button>
                        <el-button type="danger">移除</el-button>
                    </div>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="membersListData"
                    style="width:100%"
                    :row-style="{height:'45px'}"
                > <!--@selection-change="handleSelectionChange"-->
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column> <!-- :prop="item.prop"-->
                    <el-table-column
                        v-for="(item,i) in membersTableHeadData"
                        :key="`index_${i}`"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width">
                    </el-table-column>
                     <el-table-column label='部门'
                     width="160"><!--departmentDisposeFn(scope.row.departmentIdAndNameRes)-->
                        <template  slot-scope="scope" >{{ scope.row.departmentText }}</template>
                    </el-table-column>
                    <el-table-column label='岗位'>
                        <template  slot-scope="scope">{{ scope.row.positionName }}</template>
                    </el-table-column>
                    <el-table-column label='在职状态'>
                        <template  slot-scope="scope">{{ scope.row.workStatus==1?'在职':'离职' }}</template>
                    </el-table-column>
                    <!--show-overflow-tooltip-->
                </el-table>
            </div>
        </div>
        <add-role-el :isShow='isRoleShow'
        @confirmDialogAddRoleFn='confirmDialogAddRoleFn'
        @closeDialogAddRoleFn='closeDialogAddRoleFn'
        ref="addRoleDialog">
        </add-role-el>
        <add-members-el 
        :isMembersShow='isMembersShow'
        @confirmDialogMembersFn='confirmDialogMembersFn'
        @closeDialogMembersFn='closeDialogMembersFn'>
        </add-members-el>
     </div>
 </template>
 
 <script>
    import addRoleEl from '@/components/mgDialog/addRole';
    import addMembersEl from '@/components/mgDialog/addMembers';
    import { 
        getRoleSetByCompanyId,
        getResourceList,
        getRoleUserByCompanyId
    } from '@/api/mgModule/authorityApi';
    import { getCompanyId } from '@/api/cookieStorage'
    let id = 1000;
    export default {
        
        data(){
            return{
                isRoleShow:false,//添加角色对话框是否显示
                isMembersShow:false,//添加角色成员对话框显示
                companyId:getCompanyId(),//公司id
                roleData:[],//角色列表数据
                tableTreeData:[],//权限列表数据
                icon1:require('@/assets/img/management/Permissions_1.png'),
                icon2:require('@/assets/img/management/Permissions_2.png'),
                searchVal:'',//角色列表搜索
                membersTableHeadData:[ //成员列表header数据
                    {
                        label:'姓名',
                        prop:'userName',
                        width:'60'
                    },
                    {
                        label:'手机号',
                        prop:'mobile',
                        width:'160'
                    },
                    {
                        label:'工号',
                        prop:'jobNumber',
                        width:'60'
                    },
                ],
                membersListData:[],//成员列表数据
                roleId:'',//角色id
                roleItemData:{},//当前点击的角色数据
                data: [
                    {
                    id: 1,
                    label: '角色组 1',
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
                        label: '角色组 2',
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
                        label: '角色组 3',
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
                    }
                ],
                defaultProps:{
                    children: 'roles',
                    label: 'name'
                } ,
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
            addRoleEl,//添加角色和角色组
            addMembersEl,//添加成员
        },
        watch: {
            searchVal(val) {
                this.$refs.tree.filter(val);
            }
        },
        created(){
            //角色列表
            this.getRoleSetByCompanyIdFn();
        },
        methods: {
            //点击角色列表
            treeClickFn(data,Node,el){
                console.log(data)
               
                if(!data.category){
                    this.roleItemData = {//当前角色数据
                        name:data.name,
                        roleSetId:data.id,//角色组id
                    }
                    this.roleId = data.roleId;//角色id
                    //权限列表
                    this.getResourceListFn();
                    //成员列表
                    this.getRoleUserByCompanyIdFn()
                }
            },
            //添加角色-显示对话框
            addRoleFn(){
                this.isRoleShow = true
                let obj = {
                    isAddEdit : true,//添加/编辑 --- true添加 false编辑
                    isRole : true,//角色/角色组--- true角色 fales角色组
                }
                this.$refs.addRoleDialog.addRoleDialogFn(obj)
              
            },
            //编辑角色组-显示弹框
            editRolesFn(data) {
                // const newChild = { id: id++, label: 'testtest', children: [] };
                // if (!data.children) {
                // this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
                console.log(data)
                this.isRoleShow = true;
                let obj = {
                    isAddEdit : false,//添加/编辑 --- true添加 false编辑
                    isRole : false,//角色/角色组--- true角色 fales角色组
                    data,//编辑角色数据
                }
                this.$refs.addRoleDialog.addRoleDialogFn(obj)
            },
            //编辑角色-显示弹框
            editRole_Fn(){
                this.isRoleShow = true;
                let obj = {
                    isAddEdit : false,//添加/编辑 --- true添加 false编辑
                    isRole : true,//角色/角色组--- true角色 fales角色组
                    
                }
                this.$refs.addRoleDialog.addRoleDialogFn(obj)
            },
            //接收子组件事件-添加角色-确定事件
            confirmDialogAddRoleFn(){
                this.isRoleShow = false
            },
            //接收子组件事件-添加角色-取消事件
            closeDialogAddRoleFn(){
                this.isRoleShow = false
            },
            //添加成员-显示对话框
            addMembersFn(){
                this.isMembersShow = true
            },
            //接收子组件事件-添加角色成员-成功事件
            confirmDialogMembersFn(){
                this.isMembersShow = false
            },
            //接收子组件事件-添加角色成员-取消事件
            closeDialogMembersFn(){
                 this.isMembersShow = false
            },
            filterNode(value, data) {
                console.log(value)
                console.log(data)
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
           
            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            //获取角色组列表
            async getRoleSetByCompanyIdFn(){
                try{
                    let data = {
                        companyId:this.companyId
                    }
                    let res = await getRoleSetByCompanyId(data)
                    console.log(res)
                    this.roleData = res.data
                }catch(error){
                    console.log(error)
                }
            },
            //获取权限列表
            async getResourceListFn(){
                try{
                    let data = {roleId:this.roleId}
                    let res = await getResourceList(data)
                    console.log(res)
                    this.tableTreeData = res.data
                }catch(error){
                    console.log(error)
                }
            },
            //获取成员列表
            async getRoleUserByCompanyIdFn(){
                try{
                    let data = {
                        companyId:this.companyId,
                        id:this.roleId
                    }
                    let res = await getRoleUserByCompanyId(data)
                    res.data.map(item=>{
                        item.departmentText = this.departmentDisposeFn(item.departmentIdAndNameRes)
                    })
                    this.membersListData = res.data
                    // console.log(res)
                }catch(error){
                    console.log(error)
                }
            },
            //部门数据处理
            departmentDisposeFn(data){
                let nameArr = data.map(item=>{
                    return item.name
                })
                return nameArr.join('>')
            }
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
        min-height: calc(100% - 71px);
        overflow: auto;
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
            /deep/.el-button--primary,
            /deep/.el-button--danger{
                padding: 5px 18px;
            }
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