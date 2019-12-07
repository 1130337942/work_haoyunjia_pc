/***
权限管理
 */
 <template>
  
     <div class="PermissionsManagement">
       <!-- <div style="top: 89px;position: absolute;">{{getUserCode}}权限管理</div> -->
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
                :props="{
                    children: 'roles',
                    label: 'name'
                }"
                accordion
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
                node-key="name"
                :default-expanded-keys="treeKey1"
                :current-node-key="checkedKey1"
                :highlight-current='true'
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
                            v-if="data.category == 1 || code['PermissionsManagement3']">
                            修改
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-button v-show="code['PermissionsManagement3']" class="add-but-left" @click="addRoleFn" type="primary">添加</el-button>
        </div>
        <div class="cont-right">
            <div class="cont1">
                <span class="fz-18 font-bold">{{roleItemData.name}}</span>
                <div  v-show="roleItemData.name || code['PermissionsManagement3']" @click="editRole_Fn" class="color-FD6427 fz-14 edit-txt">修改</div>
            </div>
            <div class="cont2">
                <div class="div-c2-1">
                   <div>
                        <img class="icon-img" src="@/assets/img/management/Permissions_3.png" alt="">
                        <span class="fz-14">权限列表</span>
                        <!-- <span class="fz-12 color-B3B3B3 span2">已选择3个功能，6个权限</span> -->
                   </div>
                   <el-button v-show="tableTreeData.length>0 || code['PermissionsManagement4']" @click="searveFn" type="primary">保存</el-button>
                </div><!-- :load="load" lazy border--->
                <el-table 
                        v-loading="tableTreeLoading"
                        :data="tableTreeData"
                        style="width: 100%"
                        row-key="id"
                        height="400"
                        :row-style="{height:'45px'}"
                        :header-cell-style="{height:'45px'}"
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
                            <!-- 1都有权限 2Web端有权限 3App有权限 -->
                            <el-checkbox @change="itemWEBTrue(scope.row)"  v-if="scope.row.pcOrApp==1 || scope.row.pcOrApp==2" v-model="scope.row.pcChecked"></el-checkbox>
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
                            <el-checkbox @change="itemAPPTrue(scope.row)" v-if="scope.row.pcOrApp==1 || scope.row.pcOrApp==3"  v-model="scope.row.appChecked"></el-checkbox>
                        </template>
                    </el-table-column>
                </el-table>
                <div v-show="code['PermissionsManagement5']">
                    <div class="div-c2-2" >
                        <div class="fz-14">
                            <img class="icon-img" src="@/assets/img/management/Permissions_4.png" alt="">
                            成员列表
                        </div>
                        <div v-show="roleItemData.name">
                            <el-button v-show="code['PermissionsManagement6']" @click="addMembersFn" type="primary">添加</el-button>
                            <el-button v-show="code['PermissionsManagement2']" @click="delMembersFn" type="danger">移除</el-button>
                        </div>
                    </div>
                    <el-table
                    v-loading="tableLoading"
                    ref="multipleTable"
                    :data="membersListData"
                    style="width:100%"
                    :row-style="{height:'45px'}"
                    :header-cell-style="{height:'45px'}"
                    @selection-change="membersListTrueFn"> 
                        <el-table-column type="selection" ></el-table-column>
                        <el-table-column prop="userName" label="姓名"></el-table-column>
                        <el-table-column prop="mobile" label="手机号" ></el-table-column>
                        <el-table-column prop="jobNumber" label="工号" ></el-table-column>
                        <el-table-column label='部门' >
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
        </div>
        <add-role-el :isShow='isRoleShow'
        @confirmDialogAddRoleFn='confirmDialogAddRoleFn'
        @closeDialogAddRoleFn='closeDialogAddRoleFn'
        ref="addRoleDialog">
        </add-role-el>
        <add-members-el 
        :isMembersShow='isMembersShow'
        @confirmDialogMembersFn='confirmDialogMembersFn'
        @closeDialogMembersFn='closeDialogMembersFn'
        ref="membersDialog">
        </add-members-el>
     </div>
 </template>
 
 <script>
    import addRoleEl from '@/components/mgDialog/addRole';
    import addMembersEl from '@/components/mgDialog/addMembers';
    import { 
        getRoleSetByCompanyId,
        getResourceList,
        getRoleUserByCompanyId,
        deleteRoleEmployee,
        updateResource,
        // ifUserIsRole
    } from '@/api/mgModule/authorityApi';
    import { getCompanyId , getUserId} from '@/api/cookieStorage';
    import {departmentDisposeFn} from '@/assets/js/common'
    import {mapState,mapGetters,mapActions} from 'vuex'
    export default {
        name:'PermissionsManagement',
        data(){
            return{
                companyId:getCompanyId(),//公司id
                userId:getUserId(),//用户id
                tableTreeLoading: true,//权限列表加载Loading
                tableLoading:true,//成员列表加载Loading
                isRoleShow:false,//添加角色对话框是否显示
                isMembersShow:false,//添加角色成员对话框显示
                roleData:[],//角色列表数据
                tableTreeData:[],//权限列表数据
                icon1:require('@/assets/img/management/Permissions_1.png'),
                icon2:require('@/assets/img/management/Permissions_2.png'),
                searchVal:'',//角色列表搜索
                membersListData:[],//成员列表数据
                roleId:'',//角色id
                roleItemData:{},//当前点击的角色数据
                membersListTrueData: [],//选择成员列表true
                serveTrueData:[], //保存 权限  true  的数据
                treeKey1:[],//树形结构默认展开第一个
                checkedKey1:'',//默认选中第一个
                code:{
                    'PermissionsManagement1':false,//查看
                    'PermissionsManagement2':false,//删除
                    'PermissionsManagement3':false,//添加&编辑角色
                    'PermissionsManagement4':false,//权限管理
                    'PermissionsManagement5':false,//角色员工查看(查看列表)
                    'PermissionsManagement6':false,//角色成员管理
                },
                getUserCode:[],//权限编码
            }
        },
        components:{
            addRoleEl,//添加角色和角色组
            addMembersEl,//添加成员
        },
        watch: {
            searchVal(val) {
                this.$refs.tree.filter(val);
            },
        },
        created(){
            this.getUserCodeFn()
            
            
        },
        methods: {
           //获取权限列表
            async getUserCodeFn(){
                try{
                    let data = this.$codePostObj()
                    let res = await this.$ifUserIsRoleFn(data)
                        // console.log(res)
                    this.getUserCode = res.data
                    this.isCodeTrueFn();
                    //角色列表
                    this.getRoleSetByCompanyIdFn();
                }catch(error){
                    console.log(error)
                } 
            },
            //当前页面有权限为true
            isCodeTrueFn(){
                if(this.getUserCode.length == 0 )return false
                let codeJson= this.$codeJson()
                this.getUserCode.forEach((item)=>{
                    this.code[codeJson[item]] = true
                });
                
            },
            //点击角色列表
            treeClickFn(roleData,Node,el){
                // console.log(roleData)
                if(!roleData.category){
                    this.roleItemData = {//当前角色数据
                        name:roleData.name,
                        roleSetId:roleData.id,//角色组id
                        roleId:roleData.roleId,//角色id
                    }
                    this.roleId = roleData.roleId;//角色id
                    this.tableTreeLoading = true;
                    this.tableLoading = true
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
                // console.log(data)
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
                    data:this.roleItemData
                }
                this.$refs.addRoleDialog.addRoleDialogFn(obj)
            },
            //接收子组件事件-添加角色-确定事件
            confirmDialogAddRoleFn(){
                this.isRoleShow = false;
                this.getRoleSetByCompanyIdFn()
            },
            //接收子组件事件-添加角色-取消事件
            closeDialogAddRoleFn(){
                this.isRoleShow = false
            },
            //添加成员-显示对话框
            addMembersFn(){
                this.isMembersShow = true;
                let obj = {
                    roleId:this.roleId
                }
                this.$refs.membersDialog.membersDialogFn(obj)
            },
            //删除成员列表
            async delMembersFn(){
                if(this.membersListTrueData.length==0) return 
                try{
                    let data = {
                        ids:this.getIdsFn(),
                        roleId:this.roleId
                    }
                    let res = await deleteRoleEmployee(data)
                    this.$message({
                        message: res.message,
                        type: 'success',
                        duration:2000
                    });
                    this.tableLoading = true
                    setTimeout(()=>{
                        this.getRoleUserByCompanyIdFn()
                    },1000)
                }catch(error){
                    console.log(error)
                }
            },
            //接收子组件事件-添加角色成员-成功事件
            confirmDialogMembersFn(){
                this.isMembersShow = false;
                this.getRoleUserByCompanyIdFn()
            },
            //接收子组件事件-添加角色成员-取消事件
            closeDialogMembersFn(){
                 this.isMembersShow = false
            },
            //过滤角色列表
            filterNode(value, data) {
                // console.log(value)
                // console.log(data)
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            //成员列表true
            membersListTrueFn(val){
                this.membersListTrueData = val;
            },
            //获取角色组列表
            async getRoleSetByCompanyIdFn(){
                //没有查看权限功能
                if(!this.code['PermissionsManagement1']){
                    this.tableTreeLoading = false;
                    this.tableLoading = false
                    return false 
                } 
                try{
                    let data = {
                        companyId:this.companyId
                    }
                    
                    let res = await getRoleSetByCompanyId(data)
                    // console.log(res)
                    this.roleData = res.data;
                    //默认展开第一个和选中第一个
                    this.treeKey1.push(this.roleData[0].name);
                    
                    this.$nextTick(function(){
                        //setCurrentKey element方法
                        this.$refs.tree.setCurrentKey(this.checkedKey1); 
                    });
                    //有角色
                    if(res.data[0].roles.length == 0 || !res.data[0].roles){
                        this.tableTreeLoading = false;
                        this.tableLoading = false
                    }
                    if(!res.data[0].roles.length>0 || !res.data[0].roles)return false
                    this.checkedKey1 = this.roleData[0].roles[0].name
                    let data0 = res.data[0].roles[0]
                    this.roleItemData = {//当前角色数据
                        name:data0.name,
                        roleSetId:data0.id,//角色组id
                        roleId:data0.roleId,//角色id
                    }
                    this.roleId = data0.roleId
                    //权限列表
                    this.getResourceListFn();
                    //成员列表
                    this.getRoleUserByCompanyIdFn()
                   
                }catch(error){
                    console.log(error)
                }
            },
            //获取权限列表
            async getResourceListFn(){
                try{
                    let data = {roleId:this.roleId}
                    let res = await getResourceList(data);
                    this.tableTreeLoading = false
                    // console.log(res)
                    this.tableTreeData = res.data;

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
                    let res = await getRoleUserByCompanyId(data);
                    this.tableLoading = false
                    res.data.map(item=>{
                        item.departmentText = departmentDisposeFn(item.departmentIdAndNameRes)
                    })
                    this.membersListData = res.data
                    // console.log(res)
                }catch(error){
                    console.log(error)
                }
            },
            //获取成员列表选中的成员id
            getIdsFn(){
                return  this.membersListTrueData.map(item=>{
                    return item.userId
                })
            },
            //权限列表 web true的选项
            itemWEBTrue(data){
                // console.log(data)
                this.checkedFn(data,'itemWEBTrue','pcChecked')
            },
            //权限列表 app true的选项
            itemAPPTrue(data){
                this.checkedFn(data,'itemAPPTrue','appChecked')
            },
            //check公用方法
            checkedFn(data,fnNmame,check){
                data.resources.map(item=>{
                    item[check] = data[check];
                 
                    // console.log(item)
                    if(item.resources.length>0){
                        this[fnNmame](item)
                    }
                    
                })
                
            },
            searveFn(){
                this.serveTrueData = [];//已选的数据列表为空
                //修改setPcOrAppRole值
                this.setPcOrAppRoleFn(this.tableTreeData)
                this.getFn(this.tableTreeData)
                // console.log(this.serveTrueData)
                //权限保存post请求
                this.permissionsSaveFn()
            },
             //权限保存post请求
            async permissionsSaveFn(){
                 let codeArr = this.serveTrueData.map(item=>{
                    return item.code
                })
                let pcOrAppRoleArr = this.serveTrueData.map(item=>{
                    return item.pcOrAppRole
                })
                let code = codeArr.join();
                let pcOrAppRole = pcOrAppRoleArr.join();
                let data ={
                    code,
                    pcOrAppRole,
                    roleId:this.roleId
                }
                // console.log(data)
                try{
                    let res = await updateResource(data)
                    this.$message({
                        message: res.message,
                        type: 'success',
                        duration:2000
                    });
                    this.tableTreeLoading = true
                    setTimeout(()=>{
                        //权限列表
                        this.getResourceListFn()
                    },2000)
                }catch(error){
                    console.log(error)
                }
            },
            //修改setPcOrAppRole值
            setPcOrAppRoleFn(data){
                this.tableTreeData.map(item=>{
                    this.ifFn(item)
                    if(item.resources.length>0){
                        this.itemFn(item.resources)
                    }
                });
                
                // console.log( this.tableTreeData)
            },
            itemFn(data){
                data.map(item=>{
                    this.ifFn(item)
                    if(item.resources.length>0){
                        this.itemFn(item.resources)
                    }
               
                });
            },
            ifFn(item){
                // console.log(item)
                if(item.pcChecked && item.appChecked){//web和app都有权限
                    item.pcOrAppRole = 1
                }else if(item.pcChecked && !item.appChecked){ //pc有权限
                    item.pcOrAppRole = 2
                }else if(!item.pcChecked && item.appChecked){ //app有权限
                    item.pcOrAppRole = 3
                }else if(!item.pcChecked && !item.appChecked){//都没有权限
                    item.pcOrAppRole = null
                }
                // return item
            },
            getFn(data){
                data.forEach(item=>{
                    if(item.pcChecked || item.appChecked){
                        this.serveTrueData.push(item)
                    }
                    if(item.resources.length>0){
                       this.getFn(item.resources)
                    }
                })
            },
           
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