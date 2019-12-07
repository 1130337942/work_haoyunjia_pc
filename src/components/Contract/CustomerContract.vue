/**
* CustomerContract.vue
*
* 合同管理 客户合同管理
*
* @author  程纪赢
*/
<template>
    <div>
        <!-- {{getUserCode}}客户协议管理 -->
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
                        <label>创建时间：</label>
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
                        <label>签署时间：</label>
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
                    <ul style='margin-top:10px;'>
                        <li>
                            <label>签署状态：</label>
                            <el-select v-model="value" placeholder="请选择" size='mini' style="width: 10%;">
                            <el-option label="" value=""></el-option>
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                            </el-select>
                        </li>
                    </ul>
               </div>    
            </div>
            <div class="clearfix tasksResult">
                <div class="left">
                    <el-button v-show="code['CustomerContract1']" type="primary" icon="el-icon-search" size='mini' @click="List2">查询</el-button>
                    <el-button v-show="code['CustomerContract2']" size="mini" style="margin-left: 10px;" @click="interiorList3">下载</el-button>
                    <el-button v-show="code['CustomerContract2']" size="mini" style="margin-left: 10px;" @click="selectAll">{{this.btnselectAll}}</el-button>
                    <el-button v-show="code['CustomerContract1']" size="mini" style="margin-left: 10px;">高级搜索</el-button>
                </div>
                <div class="right">
                    <el-button v-show="code['CustomerContract1']" size="mini" @click=refresh >刷新</el-button>
                    <el-button  size="mini">列表设置</el-button>
                </div>
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
                        @selection-change="changeFun"
                        @select='selectchangeFun'
                        :header-cell-style='styleObj'>
                    <el-table-column type="selection" align="center" fixed="left" width="55"></el-table-column>  
                    <el-table-column show-overflow-tooltip type="index" align="center" fixed="left" label="序号" width="50"></el-table-column>    
                    <el-table-column show-overflow-tooltip prop="pcContNo" align="center" fixed="left" label="协议编码" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="firstCompanyName" align="center" fixed="left" label="甲方公司" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondCompanyName" align="center" label="乙方公司" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="signStatus" align="center" label="签署状态" width="180">
                    <template slot-scope="scope">
                            <div v-if="scope.row.signStatus == 1">待签署</div>
                            <div v-if="scope.row.signStatus == 2">草稿</div>
                            <div v-if="scope.row.signStatus == 3">已签署</div>
                            <div v-if="scope.row.signStatus == 4">已到期</div>
                            <div v-else>草稿</div>
                    </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="templateName" align="center" label="协议模板名称" width="180">
                        <template>
                            <div>灵活用工-业务承揽协议</div>
                    </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="contName" align="center" label="协议名称" width="180"></el-table-column>
                    <el-table-column align="center" label="协议状态" width="180">
                        <template slot-scope="scope">
                            <div v-if='scope.row.signStatus != 3'>未生效</div>
                            <div v-else-if='timetamp <  scope.row.effectDate2'>未生效</div>
                            <div v-else-if='timetamp >= scope.row.effectDate2 && timetamp <= scope.row.failureDate2'>生效中</div>
                            <div v-else>已到期</div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="serviceTypeText" align="center" label="服务类型名称" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementMethodText" align="center" label="结算方式名称" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="effectDate1" align="center" label="生效日期" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="failureDate1" align="center" label="失效日期" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="startDate" align="center" label="发起日期" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="signDate" align="center" label="签署日期" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementMethod" align="center" label="乙方结算方式" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementAccount" align="center" label="乙方结算账户" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementAccountUser" align="center" label="乙方结算开户人" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="belongCompanyId" align="center" label="所属公司" width="180" v-if="false" ></el-table-column>
                    <el-table-column prop="downloadUrl" align="center" label="附件" fixed="right" width="180">
                        <template slot-scope="scope">
                            <div v-if='scope.row.signStatus != 3'>
                                <a :href="scope.row.downloadUrl" target="view_window" style='color:#F8C059' >查看</a>
                            </div>
                            <div v-else>
                                 <span slot="trigger" size="small" type="primary" style='color:#F8C059;cursor:pointer;' @click="getTemplateUrl1(scope.row.downloadUrl,scope.row.contName)">下载</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="contRemark" align="center" label="协议备注" width="180"></el-table-column>
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
                            :total="total">
                    </el-pagination>
                </div>
            </div>
             <!-- 下载 -->
            <el-dialog
                title="下载"
                :visible.sync="dialogDownload "
                width="576px"
                center
                :before-close="DownloadClose">
                <div style='text-align: center;'>
                    <img src="./../../assets/uploading/download.png" alt="" 
                        style='width: auto;height: auto;max-width: 50%;max-height: 50%;margin-bottom:20px;'>
                    <!-- <p style=' font-size: 14px;font-family: PingFangSC-Regular;font-weight: 400;color: rgb(238, 56, 43);
                            margin-bottom:20px;'>
                        下载前，请仔细确认您需要导入的数据类型选择正确的模板 合作商类型选择：
                    </p> -->
                    <ul class='clearfix' style='display: flex;flex-flow: row nowrap;justify-content: center;margin-bottom:10px;font-size: 14px;font-family: PingFangSC-Regular;font-weight: 400;color: rgb(238, 56, 43);'>
                        <li class='left' style='width:200px;padding: 0 10px;'>
                            您即将下载已签署的电子合同PDF文件、身份证正面、身份证反面等图片文件
                        </li>
                        <li class='left' style='width:200px;padding: 0 10px;'>
                            您将下载一份包含合同列表字段的Excel表格数据
                        </li>
                    </ul>
                    <p class='DownloadSelect'>
                        <el-radio v-model="radioDownload" label="1" style='width:180px;'>下载附件</el-radio>
                        <el-radio v-model="radioDownload" label="2" style='width:180px;'>下载合同记录</el-radio>
                    </p>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button slot="trigger" size="small" type="primary" @click="getDownload" style='margin-top: 13px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>下载</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import { getAll,downloadAttachments } from '../../api/api';
let _loadsh = require('loadsh');
    export default {
        name: "CustomerContract",
        data(){
            return {
                btnselectAll:'全选',
                timetamp:'',//当前日期
                flagxz:'false',
                dataAllLength:'',//单选数据长度
                typeAll:'',
                dataAll:'',//全选条件
                ids1:'',
                dataList1:'',
                radioDownload: '1',//下载选择框
                dialogDownload: false,//下载弹出框
                company_name:'',
                medium:'mini',
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
                //日期选择 创建时间
                pickerOptions1: {
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
                //日期选择 签署时间
                pickerOptions2: {
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
                value: '',
                createDate:"", //创建时间
                createDate1:"", //创建时间
                createDate2:"", //创建时间
                signDate:'', //签署时间
                signDate1:'', //签署时间
                signDate2:'', //签署时间
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
                },
                code:{
                    'CustomerContract1':false,//查看
                    'CustomerContract2':false//下载
                },
                getUserCode:[],
            }
        },
        created(){
            this.getUserCodeFn()
            //当前日期
            let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
            let time  =  new Date(_timetamp).getTime();
            this.timetamp = time;
            this.List();
        },
        activated(){
        },
        methods: {
            //获取权限列表
            async getUserCodeFn(){
                try{
                    let data = this.$codePostObj()
                    let res = await this.$ifUserIsRoleFn(data)
                        // console.log(res)
                    this.getUserCode = res.data
                    this.isCodeTrueFn()
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
            //合同列表页创建时间
            getCreateDate(val) {
                if(this.createDate != null){
                    this.createDate1 = this.createDate[0];
                    this.createDate2 = this.createDate[1];
                }else if(this.createDate == null){
                    this.createDate1 = '';
                    this.createDate2 = '';
                }
            },
            //合同列页签署时间
            getSignDate(val) { 
                if(this.signDate != null){
                    this.signDate1 = this.createDate[0];
                    this.signDate2 = this.createDate[1];
                }else if(this.signDate == null){
                    this.signDate1 = '';
                    this.signDate2 = '';
                }
            },
            //刷新
            refresh(){
                this.createDate = '';
                this.signDate = '';
                this.value = '';
                let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
                let time  =  new Date(_timetamp).getTime();
                this.timetamp = time;
                this.List();   
            },   
            //列表
            List(){  
                if(!this.code['CustomerContract1']) return false //没有查看权限功能       
                let param = {param:JSON.stringify({
                        secondId:this.$cookie.get('currentCompanyId'), //甲方公司ID编码
                        belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                        sqlBeginDate:this.createDate1,
                        sqlEndDate:this.createDate2,
                        signBeginDate:this.signDate1,
                        signEndDate:this.signDate2,
                        signStatus:this.value,
                        }), pageParam:{
                        pageIndex:this.currentPage-1, //第几页
                        pageSize:this.pageSize //每页几条
                    }
                    }
                    getAll(param).then(result =>{
                                //console.log(result)
                                if(result.code == '000000'){ //成功
                                this.tableData = result.data.pcContInfoVOList //表格数组
                                this.total = result.data.allCount //表格数据长度
                            }else if(result.code == '100000'){ //失败
                                this.$message({
                                    showClose: true,
                                    message:result.message,
                                    type: 'error'
                                });
                                }  
                            }).catch((error)=>{}); 
                },
            //搜索
            List2: _loadsh.debounce(function(){ 
                this.dataAll = '';
                this.currentPage = 1;
                let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
                let time  =  new Date(_timetamp).getTime();
                this.timetamp = time;
                this.List();
            },500),
            //获取选中结果
            getSelected() {
                return this.multipleSelection;
            },
            changeFun(val) {
                this.multipleSelection = val // 返回的是选中的列的数组集合
            },
            selectchangeFun(val){
                this.dataAll = '';
            },
            //点击选中的数据添加到第三步
            interiorList3(){
                // 获取选中的数据
                var dataList = this.getSelected();
                if (!dataList || dataList.length == 0) {
                    this.$message.warning("请至少选择一条数据操作并保留在当前页面!");
                    return false;
                }
                this.dialogDownload = true;
                this.dataList1 = dataList;  
                let id = [];
                for(let i = 0; i< this.dataList1.length; i++){
                    id.push(this.dataList1[i].id);
                }
                this.ids1 = id;
                this.dataAllLength = this.dataList1.length;
                
                let signStatus = [];
                for(let i = 0; i< dataList.length; i++){
                    signStatus.push(dataList[i].signStatus);
                } 
                for(let j = 0; j< signStatus.length; j++){
                    if(signStatus[j] != '3'){
                        this.flagxz = false;
                        return
                    }else if(signStatus[j] == '3'){
                        this.flagxz = true;
                    }
                }
            },
            getDownload: _loadsh.debounce(function(){ 
                if(this.dataAll == '1'){//1为全选
                    if(this.radioDownload == '2'){ //合同记录
                        this.$axios({
                            url: process.env.VUE_APP_export + '/pcCont/rest/downloadContractRecord',
                            method: 'post',
                            responseType:'blob',  //指定blob类型`
                            data: {
                                param: JSON.stringify({
                                type:1,
                                secondId:this.$cookie.get('currentCompanyId'), //乙方公司ID编码
                                belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                createDate:this.createDate1,
                                createEndDate:this.createDate2,
                                signDate:this.signDate1,
                                signEndDate:this.signDate2,
                                signStatus:this.value,
                                createUser:this.$cookie.get('userId'),//发起人id
                                createUserName:this.$cookie.get('userName'),//发起人
                                })
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: this.$cookie.get('token')
                            },
                            responseType:'blob'//后端响应数据格式为blob类型。
                        }).then(result => {
                                console.log(result)
                                const aLink = document.createElement("a");
                                let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                aLink.href = URL.createObjectURL(blob)
                                aLink.setAttribute('download', '合同记录' + '.xlsx') // 设置下载文件名称
                                aLink.click();
                                //document.body.appendChild(aLink)
                                this.$refs.loadElement.appendChild(aLink);
                            }).catch(error => {}); 
                    }else if(this.radioDownload == '1'){ //合同附件
                            if(this.total > '101'){
                                this.$message.warning('一次最多只可选择下载100个合同的附件!')
                                return;
                            }else if(this.flagxz){
                                this.$axios({
                                    url: process.env.VUE_APP_export + '/pcCont/rest/downloadZip',
                                    method: 'post',
                                    responseType:'blob',  //指定blob类型`
                                    data: {
                                        param: JSON.stringify({
                                            type:1,
                                            firstId:this.$cookie.get('currentCompanyId'), //甲方公司ID编码
                                            belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                            createDate:this.createDate1,
                                            createEndDate:this.createDate2,
                                            signDate:this.signDate1,
                                            signEndDate:this.signDate2,
                                            signStatus:this.value,
                                            createUser:this.$cookie.get('userId'),//发起人id
                                            createUserName:this.$cookie.get('userName'),//发起人
                                        })
                                    },
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: this.$cookie.get('token')
                                    },
                                    responseType:'blob'//后端响应数据格式为blob类型。
                                })
                                    .then(result => {
                                        console.log(result)
                                        const aLink = document.createElement("a");
                                    //  let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                        let blob = new Blob([result.data], {type: "application/zip"})
                                        aLink.href = URL.createObjectURL(blob)
                                        aLink.setAttribute('download', 'V0910' + '.zip') // 设置下载文件名称
                                        aLink.click();
                                        this.$refs.loadElement.appendChild(aLink)
                                    }).catch(error => {});
                            }else if(!this.flagxz){
                                this.$message.warning('只支持已签署状态协议的附件下载');
                                return
                            }
                        } 
                }else {//null为单选
                    if(this.radioDownload == '2'){
                        this.$axios({
                            url: process.env.VUE_APP_export + '/pcCont/rest/downloadContractRecord',
                            method: 'post',
                            responseType:'blob',  //指定blob类型`
                            data: {
                                param: JSON.stringify({
                                type:2,
                                ids:this.ids1,
                                belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                createUser:this.$cookie.get('userId'),//发起人id
                                createUserName:this.$cookie.get('userName'),//发起人
                                })
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: this.$cookie.get('token')
                            },
                            responseType:'blob'//后端响应数据格式为blob类型。
                        }).then(result => {
                                console.log(result)
                                const aLink = document.createElement("a");
                                let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                aLink.href = URL.createObjectURL(blob)
                                aLink.setAttribute('download', '合同记录' + '.xlsx') // 设置下载文件名称
                                aLink.click();
                                //document.body.appendChild(aLink)
                                this.$refs.loadElement.appendChild(aLink);
                            }).catch(error => {});    
                    }else if(this.radioDownload == '1'){
                             if(this.dataAllLength > '101'){
                                 this.$message.warning('一次最多只可选择下载100个合同的附件')
                                 return;
                             }else if(this.flagxz){
                                this.$axios({
                                url: process.env.VUE_APP_export + '/pcCont/rest/downloadZip',
                                method: 'post',
                                responseType:'blob',  //指定blob类型`
                                data: {
                                    param: JSON.stringify({
                                        type:2,
                                        ids:this.ids1,
                                        belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                        createUser:this.$cookie.get('userId'),//发起人id
                                        createUserName:this.$cookie.get('userName'),//发起人
                                    })
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: this.$cookie.get('token')
                                },
                                responseType:'blob'//后端响应数据格式为blob类型。
                            })
                                .then(result => {
                                    console.log(result)
                                    const aLink = document.createElement("a");
                                  //  let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                    let blob = new Blob([result.data], {type: "application/zip"})
                                    aLink.href = URL.createObjectURL(blob)
                                    aLink.setAttribute('download', 'V0910' + '.zip') // 设置下载文件名称
                                    aLink.click();
                                    this.$refs.loadElement.appendChild(aLink)
                                }).catch(error => {});
                             }else if(!this.flagxz){
                                this.$message.warning('只支持已签署状态协议的附件下载');
                                return
                            } 
                        } 
                }
            },500),
            //下载弹出框
            DownloadClose(done) {
                this.dataAll = '';
                done();
            },
            //全选
            selectAll() {
                this.$refs.multipleTable.toggleAllSelection();
                if(this.dataAll == ''){
                    this.btnselectAll = '取消全选';
                    this.dataAll = '1';
                }else if(this.dataAll == '1'){
                    this.btnselectAll = '全选';
                    this.dataAll = '';
                }
            }
        },
        
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
        width:60px;
        text-align: right;
    } 
    //带图标按钮
    .el-button--primary{
        background-color: #FFF;
        border: 1px solid #DCDFE6;
        color: #606266;
    }
</style>