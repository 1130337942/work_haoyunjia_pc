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
                           ><!-- @change="searchDepartmentFn"--->
                        </el-input>
                        <div class="margin-top-20 ">
                            <el-table
                                ref="multipleTable"
                                :data="tableData"
                                tooltip-effect="dark"
                                style="width: 100%"
                                height="380"
                                ><!--@selection-change="handleSelectionChange"-->
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
                </el-col>
                <el-col :span="8">
                    <div class="grid-content cont-right">
                        <div class="fz-14  margin-bottom-10 ">已选择<span class="color-FD6427">1</span>个</div>
                        <div class="list-box">
                            <ul>
                                <li class="list"><span>张三/13512345678</span><i class="el-icon-close"></i></li>
                                <li class="list"><span>张三/13512345678</span><i class="el-icon-close"></i></li>
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
    export default {
        data(){
            return{
                // isMembersShow:true,
                inputSearchVal:'',//搜索val
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
        props:{
            isMembersShow:Boolean,
        },
        methods:{
            confirmFn(){
                this.$emit('confirmDialogMembersFn')
            },
            closeFn(){
                this.$emit('closeDialogMembersFn')
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
        .el-row{
            height: 508px;
        }
        .list-box{
            background: #FFFFFF;
            border-radius: 4px;
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