/**
* RequestMonitor.vue
*
* 请求管理 请求监控
*
* @author  程纪赢
*/
<template>
    <div>
            <div class="clearfix referResult">
               <div class="left" style='width:100%;'>
                <ul class='clearfix top_screen'>
                        <li class='left' style='width:40%;'>
                            <el-input
                                placeholder="请输入内容"
                                suffix-icon="el-icon-search"
                                size="mini"
                                style='width:91%;'
                                v-model="company_name">
                            </el-input>
                        </li>
                        <li class="left" style='width:30%;'>
                        <label>发起时间：</label>
                        <el-date-picker
                        v-model="createDate"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        type="datetimerange"
                        align="right"
                        size='mini'
                        style="width: 70%;"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getCreateDate"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </li>
                    <li class="left" style='width:30%;'>
                        <label>处理完成时间：</label>
                        <el-date-picker
                        v-model="signDate"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        type="datetimerange"
                        align="right"
                        size='mini'
                        style="width: 70%;"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getSignDate"
                        :picker-options="pickerOptions2">
                        </el-date-picker>
                    </li>
                    </ul>
                    <ul style='margin-top:10px;' class='clearfix'>
                        <li class="left" style='width:15%;'>
                            <label>进度：</label>
                            <el-select v-model="ScheduleValue" placeholder="请选择" size='mini' style="width: 70%;">
                            <el-option label="" value=""></el-option>
                            <el-option
                                    v-for="item in ScheduleOptions"
                                    :key="item.itemCode"
                                    :label="item.itemName"
                                    :value="item.itemCode">
                            </el-option>
                            </el-select>
                        </li>
                        <li class="left" style='width:15%;'>
                            <label>状态：</label>
                            <el-select v-model="StateValue" placeholder="请选择" size='mini' style="width: 70%;">
                            <el-option label="" value=""></el-option>
                            <el-option
                                    v-for="item in StateOptions"
                                    :key="item.itemCode"
                                    :label="item.itemName"
                                    :value="item.itemCode">
                            </el-option>
                            </el-select>
                        </li>
                    </ul>
               </div>    
            </div>
            <div class="clearfix tasksResult">
                <div class="left">
                    <el-button type="primary" icon="el-icon-search" size='mini' @click="List2">查询</el-button>
                </div>
                <!-- <div class="right">
                    <el-button size="mini" @click=refresh >刷新</el-button>
                    <el-button size="mini">列表设置</el-button>
                </div> -->
            </div>
            <!--表格-->
            <div class='pagingResult'>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        style="width: 100%"
                        height="528"
                        border
                        empty-text="暂未查到匹配条件的数据"
                        :header-cell-style='styleObj'>
                    <el-table-column type="selection" width="55"></el-table-column>     
                    <!-- <el-table-column show-overflow-tooltip prop="pcContNo" label="请求编号" width="300">
                        <template>
                            {{requestCode}}
                        </template>
                    </el-table-column> -->
                    <el-table-column show-overflow-tooltip prop="requestCode" label="请求编号" width="300"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="workNameText" label="功能名称" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="plan" label="进度" width="100"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="startDate" label="发起时间" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="beginDate" label="开始执行时间" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="endDate" label="处理完成时间" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="statusText" label="状态" width="180"></el-table-column>
                    <!-- <el-table-column show-overflow-tooltip prop="statusText" label="状态" width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.statusText == 1">正常</div>
                            <div v-if="scope.row.statusText == 2">警告</div>
                            <div v-if="scope.row.statusText == 3">错误</div>
                        </template>
                    </el-table-column> -->
                    <el-table-column show-overflow-tooltip prop="secondId" label="请求日志" width="100">
                        <template slot-scope="scope">
                            <span style='cursor:pointer;color:#e29300' @click=LookOver(scope.row.plan,scope.row.workNameText,scope.row.fileUrl,scope.row.requestCode,scope.row.createNum)>
                                查看    
                            </span>    
                        </template> 
                    </el-table-column>
                     <el-table-column show-overflow-tooltip prop="userName" label="发起人" width="150"></el-table-column>
                </el-table>
                <!--分页-->
                <div class="block">
                    <el-pagination
                        align='center'
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10,50,100,500]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
            <!--完成-->
            <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <template slot="title">
                <div class='titleZise'>处理结果<span>({{workNameText}})</span></div>    
            </template>    
                <!-- 总{{allNum}}条,成功{{successNum}}条,失败{{errorNum}}条 -->
                   <div class='clearfix'>
                        <ul>
                            <li class='left datablack'> 总 </li><li class='left datared'> {{allNum}} </li><li class='left datablack'> 条,成功 </li><li class='left datared'> {{successNum}} </li><li class='left datablack'> 条,失败 </li><li class='left datared'> {{errorNum}} </li><li class='left datablack'> 条 </li>
                        </ul>
                        <el-button type="primary"  class='right btnDownload' size="small" @click=downloadFile>下载文件</el-button>
                        <div class="smallLogo" >
                            <img src="./../../assets/uploading/file_icon.png" @click=downloadFile />
                            <p class='hint'>点击下载处理结果附件</p>
                        </div>
                   </div>
            </el-dialog>
            <!--处理中-->
            <el-dialog
            :visible.sync="dialogVisible2"
            width="30%"
            :before-close="handleClose">
            <template slot="title">
                <div class='titleZise'>处理结果<span>({{workNameText}})</span></div>    
            </template>    
                   <div class='clearfix'>
                        <ul class='beingProcessed '>
                            <li class='left datablack'> 总 </li><li class='left datared'> {{allNum}} </li><li class='left datablack'> 条,请求处理中,请稍后查看!</li>
                        </ul>
                   </div>
            </el-dialog>
            <!--创建合同功能-->
            <el-dialog
            :visible.sync="dialogVisible3"
            width="700px"
            :before-close="handleClose">
            <template slot="title">
                <div class='titleZise'>处理结果<span>({{workNameText}})</span></div>    
            </template>    
                   <div>
                        <ul class='clearfix'>
                            <li class='left datablack'> 总 </li><li class='left datared'> {{allNum}} </li><li class='left datablack'> 条,成功 </li><li class='left datared'> {{successNum}} </li><li class='left datablack'> 条,失败 </li><li class='left datared'> {{errorNum}} </li><li class='left datablack'> 条 </li>
                        </ul>
                        <el-button type="primary"  class='right btnDownload' size="small" @click=downloadFile>下载文件</el-button>
                        <div class="smallLogo" >
                            <el-table
                                ref="multipleTable"
                                :data="contractData"
                                style="width: 100%"
                                height="250"
                                border
                                empty-text="暂未查到匹配条件的数据"
                                :header-cell-style='styleObj'>
                            <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>   
                            <el-table-column show-overflow-tooltip prop="contNo" label="合同编号" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="secondName" label="乙方全称" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="status" label="状态" width="100">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.status == 4">成功</div>
                                    <div v-if="scope.row.status == 5">失败</div>
                                </template>
                            </el-table-column>
                            <el-table-column show-overflow-tooltip prop="msg" label="失败原因" width="150"></el-table-column>
                        </el-table>
                        <!--分页-->
                        <div class="block">
                            <el-pagination
                                align='center'
                                @size-change="handleSizeChangeContract"
                                @current-change="handleCurrentChangeContract"
                                :current-page="currentPageContract"
                                :page-sizes="[10, 50, 100, 500]"
                                :page-size="pageSizeContract"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalContract">
                            </el-pagination>
                        </div>
                        </div>
                   </div>
            </el-dialog>
    </div>
</template>

<script>
import { requestWorkgetAll, getRequestCode, getDictItemsByCodes, getRequestDetail, getResult } from '../../api/api';
let _loadsh = require('loadsh');
    export default {
        name: "RequestMonitor",
        data(){
            return {
                //合作商返回条数
                dataresult:'',
                //查看窗口内下载
                fileUrl:'',
                workNameText:'',//储存下载的是个列表方便给文件命名
                //请求进度-创建合同
                dialogVisible3:false,
                contractData:[],//合同列表
                currentPageContract: 1, // 当前页码
                totalContract: 0, // 总条数
                pageSizeContract: 10, // 每页的数据条数
                //请求进度-处理中&待处理窗口
                dialogVisible2:false,
                //总
                allNum:'',
                //成功
                successNum:'',
                //失败
                errorNum:'',
                //完成弹出窗
                dialogVisible: false,
                //列表中显示字段
                requestCode:'',//请求编码
                userName:this.$cookie.get('userName'),//发起人
                // 列表搜索区域
                company_name:'',
                ScheduleValue: '',
                ScheduleOptions:[],//保存进度下拉框 
                StateValue: '',
                StateOptions:[
                    {
                        itemName:'正常',
                        itemCode:'1'
                    },
                    {
                        itemName:'警告',
                        itemCode:'2'
                    },
                    {
                        itemName:'错误',
                        itemCode:'3'
                    }
                ],//保存状态下拉框
                createDate:"", //发起时间
                createDate1:"", //发起时间
                createDate2:"", //发起时间
                signDate:"", //处理完成时间
                signDate1:"", //处理完成时间
                signDate2:"", //处理完成时间
                options: [{
                    value: '1',
                    label: '待签署'
                }, {
                    value: '2',
                    label: '草稿'
                }, {
                    value: '3',
                    label: '已签署'
                }, {
                    value: '4',
                    label: '已到期'
                }],
                pickerOptions1: {//日期选择 发起时间
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                pickerOptions2: { //日期选择 处理完成时间
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },
                // 列表+分页+样式
                tableData: [],
                currentPage: 1, // 当前页码
                total: 0, // 总条数
                pageSize: 10, // 每页的数据条数
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
            //窗口内分页
            handleSizeChangeContract(val) {
             //   console.log(`每页 ${val} 条`);
                this.currentPageContract = 1;
                this.pageSizeContract = val;
              //  this.List();
            },
            handleCurrentChangeContract(val) {
              //  console.log(`当前页: ${val}`);
                this.currentPageContract = val;
               // this.List();
            },
            //外边分页
            handleSizeChange(val) {
             //   console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
                this.List();
            },
            handleCurrentChange(val) {
              //  console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.List();
            },
            //发起时间
            getCreateDate(val) {
                if(this.createDate != null){
                    this.createDate1 = this.createDate[0];
                    this.createDate2 = this.createDate[1];
                }else if(this.createDate == null){
                    this.createDate1 = '';
                    this.createDate2 = '';
                }
            },
            //处理完成时间
            getSignDate(val) { 
                if(this.signDate != null){
                    this.signDate1 = this.signDate[0];
                    this.signDate2 = this.signDate[1];
                }else if(this.signDate == null){
                    this.signDate1 = '';
                    this.signDate2 = '';
                }
            },
            //刷新
            // refresh(){
            //     this.createDate = '';
            //     this.signDate = '';
            //     this.value = '';
            //     this.List();   
            // },   
            //列表
            List(){        
                let param = {param:JSON.stringify({
                       belongCompanyId: this.$cookie.get('currentCompanyId'), //公司ID
                       workNameText:this.company_name,
                       sqlStartDate:this.createDate1,
                       sqlEndDate:this.createDate2,
                       sqlDealStartDate:this.signDate1,
                       sqlDealEndDate:this.signDate2,
                       plan:this.ScheduleValue,
                       status:this.StateValue,
                    }),pageParam:{
                        pageIndex:this.currentPage-1, //第几页
                        pageSize:this.pageSize //每页几条
                    }}
                    requestWorkgetAll(param).then(result =>{
                                if(result.code == '000000'){ //成功
                                this.tableData = result.data.list //表格数组
                                this.total = result.data.total //表格数据长度
                            }else if(result.code == '100000'){ //失败
                                this.$message({
                                    showClose: true,
                                    message:result.message,
                                    type: 'error'
                                });
                                }  
                            }).catch((error)=>{
                                console.log(error)
                            }); 
                },
            //搜索
            List2: _loadsh.debounce(function(){ 
                this.dataAll = '';
                this.currentPage = 1;
                this.List();
            },500),
            //列表中请求编码
            getRequestCode1(){
                let param = {param:JSON.stringify({})};
                getRequestCode(param).then(result => {
                    if(result.code == '000000'){
                        this.requestCode = result.data.code;
                    }
                }).catch(error => {
                    this.$router.push('/Login');
                });
            },
            //公共字典获取 进度
            schedule() {
                let param = {param:JSON.stringify({
                    parentCode: 'REP'
                }),pageParam: {
                    pageIndex: this.currentPage - 1, //第几页
                    pageSize: this.pageSize //每页几条
                 }}
                getDictItemsByCodes(param).then(result => {
                    if(result.code == '000000'){
                        this.ScheduleOptions = result.data[0].dataDictPO;
                        this.ScheduleValue = 'REP002';
                        this.List();
                    }else if(result.code == '100000') {
                        this.$message({
                            showClose: true,
                            message:result.message,
                            type: 'error'
                        });
                    }
                    
                }).catch(error => {
                    this.$router.push('/Login');
                });
            },
            //公共字典获取 状态
            // state() {
            //     let param = {param:JSON.stringify({
            //         parentCode: 'RES'
            //     }),pageParam: {
            //         pageIndex: this.currentPage - 1, //第几页
            //         pageSize: this.pageSize //每页几条
            //      }}
            //     getDictItemsByCodes(param).then(result => {
            //      //   console.log(result.data[0].dataDictPO)
            //         this.StateOptions = result.data[0].dataDictPO;
            //     }).catch(error => {
            //         this.$router.push('/Login');
            //     });
            // },
            //查看
            LookOver(plan,workNameText,fileUrl,requestCode,createNum){
                this.workNameText = workNameText;
                if(createNum == null){//合作商
                    let param = {param:JSON.stringify({
                        requestCode:requestCode //请求编码
                    })}
                    getResult(param).then(result => {
                     //   console.log(result)
                        this.fileUrl = result.data.fileUrl;
                        if(result.data.allNum == null){
                            this.allNum = '0'
                        }else{
                            this.allNum = result.data.allNum;
                        }
                        if(result.data.successNum == null){
                            this.successNum = '0'
                        }else{
                            this.successNum = result.data.successNum;
                        }
                        if(result.data.errorNum == null){
                            this.errorNum = '0'
                        }else{
                            this.errorNum = result.data.errorNum;
                        }
                        if(workNameText == '合作商/全部/导出' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/客户/导出' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/用工池/导出' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/其他/导出' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/全部/导出' && plan == '待处理'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/客户/导出' && plan == '处理中'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/用工池/导出' && plan == '待处理'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/其他/导出' && plan == '处理中'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/全部/导入' && plan == '待处理'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/客户/导入' && plan == '处理中'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/用工池/导入' && plan == '待处理'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/其他/导入' && plan == '处理中'){
                            this.dialogVisible2 = true;
                        }else if(workNameText == '合作商/全部/导入' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/客户/导入' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/用工池/导入' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合作商/其他/导入' && plan == '完成'){
                            this.dialogVisible = true;
                        }
                    }).catch(error => {
                        this.$router.push('/Login');
                    });
                }else{
                    debugger
                    this.fileUrl = fileUrl;
                    let param = {param:JSON.stringify({
                        createNum:createNum //请求编码
                    })}
                    getRequestDetail(param).then(result => {
                        console.log(result);
                        console.log(plan);
                    // const oLi='<li><div>我是ES6</div><p>这是我的拼接</p></li>';
                        this.allNum = result.data.allNum;
                        // console.log(result.data.fileUrl)
                        // this.fileUrl = result.data.fileUrl;
                        if(result.data.successNum == null){
                            this.successNum = '0'
                        }else{
                            this.successNum = result.data.successNum;
                        }
                        if(result.data.errorNum == null){
                            this.errorNum = '0'
                        }else{
                            this.errorNum = result.data.errorNum;
                        }
                        if(workNameText == '合同/供应商合同/发起签署' && plan == '待处理'){
                            this.dialogVisible3 = true;
                            this.contractData = result.data.requestManageDetails;
                            this.totalContract = result.data.requestManageDetails.length //表格数据长度
                        }else if(workNameText == '合同/供应商合同/发起签署' && plan == '处理中'){
                            this.dialogVisible3 = true;
                        if(result.data.requestManageDetails != null){
                                this.contractData = result.data.requestManageDetails;
                                this.totalContract = result.data.requestManageDetails.length //表格数据长度
                            }
                        }else if(workNameText == '合同/供应商合同/发起签署' && plan == '完成'){
                            this.dialogVisible3 = true;
                        if(result.data.requestManageDetails != null){
                                this.contractData = result.data.requestManageDetails;
                                this.totalContract = result.data.requestManageDetails.length //表格数据长度
                            }
                        }else if(workNameText == '合同记录/下载' && plan == '待处理'){
                            this.dialogVisible = true;``
                        }else if(workNameText == '合同记录/下载' && plan == '完成'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合同附件/下载' && plan == '处理中'){
                            this.dialogVisible = true;
                        }else if(workNameText == '合同附件/下载' && plan == '完成'){
                            this.dialogVisible = true;
                        }
                    }).catch(error => {

                    });
                }
                
            },
            //完成弹出窗
            handleClose(done) {
                done();
            },
            //窗口内下载
            downloadFile: _loadsh.debounce(function(){ 
                debugger
                console.log(this.fileUrl);
                if(this.fileUrl == null){
                    return
                }else{
                    // console.log('后台返回给我的地址' + url)
                    let url2 = '/' + this.fileUrl.split('/').slice(3).join('/');
                    // console.log('截取后的地址' + url2)
                    let urlHost = window.location.host;
                    // console.log('本地地址' + urlHost)
                    // console.log('拼接后的地址' + urlHost + url2)
                    this.$axios({
                            method: 'get',
                            url:url2,
                            responseType: 'arraybuffer'
                        })
                        .then(response => {
                            const url = window.URL.createObjectURL(new Blob([response.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            if(this.workNameText == '合作商/全部/导出'){
                                link.setAttribute('download', '全部列表' + '.xlsx'); //or any other extension
                            }else if(this.workNameText == '合作商/客户/导出'){
                                link.setAttribute('download', '客户列表' + '.xlsx');
                            }else if(this.workNameText == '合作商/用工池/导出'){
                                link.setAttribute('download', '用工池列表' + '.xlsx');
                            }else if(this.workNameText == '合作商/其他/导出'){
                                link.setAttribute('download', '其他列表' + '.xlsx');
                            }else if(this.workNameText == '合作商/全部/导入'){
                                link.setAttribute('download', '全部列表' + '.xlsx'); //or any other extension
                            }else if(this.workNameText == '合作商/客户/导入'){
                                link.setAttribute('download', '客户列表' + '.xlsx');
                            }else if(this.workNameText == '合作商/用工池/导入'){
                                link.setAttribute('download', '用工池列表' + '.xlsx');
                            }else if(this.workNameText == '合作商/其他/导入'){
                                link.setAttribute('download', '其他列表' + '.xlsx');
                            }else if(this.workNameText == '合同/供应商合同/发起签署'){
                                link.setAttribute('download', '供应商合同' + '.xlsx');
                            }else if(this.workNameText == '合同记录/下载'){
                                link.setAttribute('download', '合同记录' + '.xlsx');
                            }else if(this.workNameText == '合同附件/下载'){
                                link.setAttribute('download', '合同附件' + '.xlsx');
                            }
                            document.body.appendChild(link);
                            link.click();
                        })
                        .catch(() => console.log('error occured'));
                    }
            },500),
        },
        created(){
            this.getRequestCode1(); 
            this.schedule();
          //  this.state();
          //this.List();
        }
    }
</script>
<style lang="scss">
 //选择框
    .DownloadSelect .el-radio__input.is-checked .el-radio__inner{
        border-color: rgb(248, 192, 89);
        background: rgb(248, 192, 89);
    }
    .DownloadSelect .el-radio__input.is-checked+.el-radio__label{
        color: rgb(248, 192, 89);
    }
    .DownloadSelect .el-radio__inner:hover{
        border-color: rgb(248, 192, 89);
    }
</style>
<style lang="scss" scoped>
    .mini_input{
        width:140px;
    }
    .interior_btn{
        width: 230px;
    }
    // 下载按钮
    .el-button--primary{
        border-color: rgb(248, 192, 89);
    }
    .el-button--primary:focus, .el-button--primary:hover{
        border-color: rgb(248, 192, 89);
    } 
    //顶部筛选
    .top_screen label{
        display: inline-block;
        width:85px;
        text-align: right;
    } 
    //带图标按钮
    .el-button--primary{
        background-color: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
    }
    //请求监控数据红色
    .datared{
        margin:0 5px;
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(238,56,43,1);
    }
    //请求监控数据黑色
    .datablack{
        font-size:14px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(0,0,0,1);
    }
    //下载文件按钮
    .btnDownload{
        padding:5px 25px;
    }
    .btnDownload{
        background:rgba(248,192,89,1);
        border-radius:4px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
    }
    .btnDownload:hover{
        background:rgba(255,176,30,1);
        border-color:rgba(255,176,30,1);
        color:rgba(255,255,255,1);
    }
    .btnDownload:active{
        background:rgba(226,147,0,1);
        background:rgba(226,147,0,1);
        color:rgba(255,255,255,1);
    }
    .btnDownload:focus{
        background:rgba(248,198,105,1);
        border-color:rgba(248,192,89,1);
        color:rgba(255,255,255,1);
    }
    //下载文件图标
    .smallLogo{
        width:100%;
        text-align:center;
        margin-top:50px;
    }
    .smallLogo img{
        width:66px;
        height:66px;
        cursor: pointer;
    }
    .hint{
        font-size:12px;
        font-family:PingFangSC-Light,PingFangSC;
        font-weight:300;
        color:rgba(0,0,0,1);
    }
    //正在处理中
    .beingProcessed{
        width:100%;
        text-align:center;
    }
    //窗口内标题样式
    .titleZise{
        font-size:16px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(0,0,0,0.65);
    }
    .titleZise span{
        font-size:12px;
        font-family:PingFangSC-Light,PingFangSC;
        font-weight:300;
        color:rgba(0,0,0,1);
    }
</style>