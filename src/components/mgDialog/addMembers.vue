/**
权限管理-添加角色成员
 */
<template>
    <div class="addMembers">
        <el-dialog
            class="width_80"
            title='添加角色成员'
            :before-close="closeFn"
            :visible.sync="isMembersShow"
            center>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div class="grid-content cont-left ">
                        <div class="fz-14  margin-bottom-10 ">选择</div>
                        <el-input
                            placeholder="搜索"
                            prefix-icon="el-icon-search"
                            v-model="inputSearchVal"
                           ><!-- @change="searchDepartmentFn"   .filter(data => !inputSearchVal || data.userName.toLowerCase().includes(inputSearchVal.toLowerCase()))--->
                        </el-input>
                        <div class="margin-top-20 ">
                            <el-table
                                ref="multipleTable" 
                                :data="membersListData"
                                style="width:100%"
                                :row-style="{height:'45px'}"
                                height="400"
                                @selection-change="handleSelectionChange"
                            >
                                <el-table-column type="selection" width="55"></el-table-column>
                                <el-table-column prop="userName" label="姓名" width="120"></el-table-column>
                                <el-table-column prop="mobile" label="手机号" width="160"></el-table-column>
                                <el-table-column prop="jobNumber" label="工号" width="80"></el-table-column>
                                <el-table-column label='部门' width="160">
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
                </el-col>
                <el-col :span="8">
                    <div class="grid-content cont-right">
                        <div class="fz-14  margin-bottom-10 ">已选择<span class="color-FD6427">{{checkTrueData.length}}</span>个</div>
                        <div class="list-box">
                            <ul>
                                <li class="list" v-for="(item,i) in checkTrueData" :key="i">
                                    <span>{{item.userName}}/{{item.mobile}}</span><i class="el-icon-close" @click="delcheckTrueFn(item)"></i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmFn">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {pcGetEmpAddRoleEmpByCompanyId,addRoleEmployee} from '@/api/mgModule/authorityApi';
    import { getCompanyId } from '@/api/cookieStorage';
    import {departmentDisposeFn} from '@/assets/js/common'
    let _ = require('loadsh')
    export default {
        data(){
            return{
                // isMembersShow:true,
                inputSearchVal:'',//搜索val
                companyId:getCompanyId(),//公司id
                membersListData:[],//员工列表
                checkTrueData: [],//check true 选择的员工
                dialogData:{},//父组件传来数据
            }
        },
        props:{
            isMembersShow:Boolean,
        },
        watch:{
            'inputSearchVal':function(){
                this.debounceFn()
            }
        },
        created(){
            // this.membersListFn()
            this.debounceFn = _.debounce(this.membersListFn,1000,false)
        },
        methods:{
            confirmFn(){
                this.addRoleEmployeeFn()
                setTimeout(()=>{
                    this.$emit('confirmDialogMembersFn')
                },500)
            },
            closeFn(){
                this.$emit('closeDialogMembersFn')
            },
            //父组件调用方法
            membersDialogFn(data){
                this.dialogData = data
                this.membersListFn()
            },
            //成员列表(所有)-加搜索
            async membersListFn(){
                try{
                    let data = {
                        companyId:this.companyId,
                        likeName:this.inputSearchVal,
                        roleId:this.dialogData.roleId,
                    }
                    let res = await pcGetEmpAddRoleEmpByCompanyId(data);
                    res.data.map(item=>{
                        //处理部门数据
                        item.departmentText = departmentDisposeFn(item.departmentIdAndNameRes)
                    })
                    this.membersListData = res.data
                }catch(error){
                    console.log(error)
                }
            },
            //添加员工-保存
            async addRoleEmployeeFn(){
                try{
                    let data ={
                        ids:this.getIdsFn(),
                        roleId:this.dialogData.roleId,
                        refType:1,
                        companyId:this.companyId,
                    }
                    let res = await addRoleEmployee(data)
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }catch(error){
                    console.log(error)
                }
            },
            //checked true的数据
            handleSelectionChange(val) {
                this.checkTrueData = val;
            },
            //删除 checked true的数据
            delcheckTrueFn(item){
                this.$refs.multipleTable.toggleRowSelection(item);
            },
            //获取成员列表选中的成员id
            getIdsFn(){
                return  this.checkTrueData.map(item=>{
                    return item.userId
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/dialog.scss';
    @import '@/assets/css/public.scss';
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        background: #F0F2F5;
        padding: 20px;
    }
    .addMembers{
        .el-dialog{
            height: 600px;
        }
        .list-box{
            background: #FFFFFF;
            border-radius: 4px;
            height: 460px;
            overflow: auto;
            .list{
                padding: 0px 20px;
                line-height: 40px;
                height: 40px;
                @extend .justify-conten-between;
                @extend .dis-align-center;
                &:nth-child(2n){
                   background:  #FAFAFA
                }
            }
            /deep/.el-icon-close{
                cursor: pointer;
                &:hover{
                    @extend .color-FD6427;
                }
            }
           
        }
        .el-col-8{
            height: 100%;
        }
        .cont-right{
            height: calc(100% - 40px);
        }
    }
    
</style>