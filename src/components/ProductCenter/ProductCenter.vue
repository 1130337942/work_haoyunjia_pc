/**
* ProductCenter.vue
*
* 产品中心 产品中心
*
* @author  程纪赢
*/
<template>
    <div>
            <div class="clearfix">
               <div class="left">
                   <label>产品编码：</label>
                   <el-input
                           size='mini'
                           class="mini_input"
                           placeholder="请输入"
                           v-model="company_name">
                   </el-input>
                   <label style='margin-left:50px'>服务比率：</label>
                   <el-select v-model="value" placeholder="请选择" value="" size='mini'>
                       <el-option
                               v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
                <div class="right clearfix">
                    <el-input
                            placeholder="请输入内容"
                            class="interior_btn left"
                            size='mini'
                            v-model="company_name">
                        <el-button slot="append">搜索</el-button>
                    </el-input>
                    <el-button size="mini" class="left" style="margin-left: 10px;">高级搜索</el-button>
                </div>
            </div>
            <div class="clearfix tasks">
                <div class="left">
                    <el-button size="mini">新建</el-button>
                    <el-button size="mini">导入</el-button>
                    <el-button size="mini">导出</el-button>
                    <el-button size="mini" @click="handleOpen">复制</el-button>
                </div>
                <div class="right">
                    <el-button size="mini">刷新</el-button>
                    <el-button size="mini">列表设置</el-button>
                </div>
            </div>
            <!--表格-->
            <div style="margin-top: 10px;">
                <el-table
                        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        @selection-change="changeFun"
                        style="width: 100%"
                        height="528"
                        :header-cell-style='styleObj'>
                    <el-table-column
                        type="selection"
                        width="55">
                    </el-table-column>    
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="address"
                            label="地址">
                    </el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="block">
            <el-pagination
                    align='center'
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1,5,10,20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
            </div>
            <!-- 复制框 -->
            <el-dialog
                title="复制"
                :visible.sync="fuzhi"
                width="30%"
                :before-close="handleClose">

                <el-table :data="dataList">
                    <el-table-column property="date" label="日期" width="150"></el-table-column>
                    <el-table-column property="name" label="姓名" width="200"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                </el-table>


                <span slot="footer" class="dialog-footer">
                    <el-button @click="fuzhi = false">取 消</el-button>
                    <el-button type="primary" @click="fuzhi = false">确 定</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "regard",
        data(){
            return {
                dataList:'',
                multipleSelection: [],
                fuzhi: false,
                company_name:'',
                medium:'mini',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15219 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15319 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15419 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15519 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15519 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 15166 弄'
                }],
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 5, // 每页的数据条数
                styleObj: {
                    color:'rgba(0,0,0,0.8)',
                    background:'#CED4D9',
                    fontSize:'14px',
                    fontFamily: "PingFangSC-Medium",
                    fontWeight:500,
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            //获取选中结果
            getSelected() {
                return this.multipleSelection;
                
            },
            handleClose(done) {
                    this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            },
            handleOpen(){
                // 获取选中的数据
                var dataList = this.getSelected();
                if (!dataList || dataList.length == 0) {
                    alert("请先勾选数据!");
                    return false;
                }
                this.fuzhi = true;
                console.log(dataList);
                // dataList数据
                this.dataList = dataList
            },
            changeFun (val) {
                this.multipleSelection = val // 返回的是选中的列的数组集合
            },

        },
    }
</script>
<style lang="scss">
 
</style>
<style lang="scss" scoped>
    .mini_input{
        width:140px;
    }
    .interior_btn{
        width: 324px;
    }
    .tasks{
        margin-top:20px;
    }
</style>