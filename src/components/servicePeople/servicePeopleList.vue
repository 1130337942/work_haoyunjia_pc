/**
* Client.vue
*
* 服务人员管理 服务人员
*
* @author  程纪赢
*/
<template>
	<div>
		<!-- {{getUserCode}}服务人员 -->
		<div class="clearfix referResult">
			<div style='width:100%;'>
				<p style='font-size:16px;font-family:PingFangSC;font-weight:1000;color:rgba(0,0,0,0.85);margin-bottom:15px;'>客户列表</p>
				<ul class='clearfix top_screen'>
					<li class='left' style=''>
						<label style='width:40px;'>客户：</label>
						<el-input v-model="partnerCompanyName" placeholder="请输入创始人姓名" size="mini" style='width:200px;'></el-input>
					</li>
					<li class='left' style="">
						<label>有无服务人员：</label>
						<el-select v-model="havePerson" placeholder="请选择" size="mini" style='width:200px;'>
							<el-option label="" value=""></el-option>
							<el-option label="有" value="1"></el-option>
							<el-option label="无" value="0"></el-option>
							<!-- <el-option
								v-for="item in dataDictPO"
								:key="item.itemCode"
								:label="item.itemName"
								:value="item.itemCode"
							></el-option> -->
						</el-select>
					</li>
				</ul>
			</div>
		</div>
		<div class="clearfix tasksResult">
			<div class="left">
				<el-button v-show="code['servicePeopleList1']" type="primary" icon="el-icon-search" size='mini' @click="List2">查询</el-button>
				<el-button v-show="code['servicePeopleList2']" size="mini" @click="toLead = true">导入分配</el-button>
				<el-button v-show="code['servicePeopleList3']" size="mini" @click=Derive>导出</el-button>
			</div>
		</div>
		<!--表格-->
		<div class='pagingResult'>
			<el-table
				:data="tableData"
				id="out-table"
				style="width: 100%;"
				height="200"
				border
				empty-text="暂未查到匹配条件的数据"
				highlight-current-row
				@current-change="changeFun2"
				:header-cell-style="styleObj"
			>
				<el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
				<el-table-column show-overflow-tooltip prop="partnerCompanyName" label="全称" align="center" fixed="left" width="250"></el-table-column>
				<el-table-column show-overflow-tooltip prop="allocationNum" label="已分配人员" align="center" fixed="left" width="120"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createContNum" label="已发起协议" align="center" width="120"></el-table-column>
				<el-table-column show-overflow-tooltip prop="signContNum" label="已签协议" align="center" width="120"></el-table-column>
				<el-table-column show-overflow-tooltip prop="expireContNum" label="协议已到期" align="center" width="125"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createDate" label="创建时间" align="center" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createUserName" label="创建人" align="center" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="lastModifyDate" label="最后更新时间" align="center" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="lastModifyUserName" label="最后更新人" align="center" width="200"></el-table-column>
			</el-table>
				<!--分页-->
			<div class="block">
				<el-pagination
					align="center"
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
		<!-- 查询区域2 -->
		<div class="clearfix tasksResult">
			<div class="left">
				<p style='font-size:16px;font-family:PingFangSC;font-weight:1000;color:rgba(0,0,0,0.85);margin-bottom:15px;'>服务人员列表</p>
				<el-button v-show="code['servicePeopleList5']" size="mini" @click=assignRoles>添加</el-button>
				<el-button v-show="code['servicePeopleList4']" size="mini" @click=DeriveServe>导出</el-button>
				<el-button v-show="code['servicePeopleList5']" size="mini" @click=DeleteList>移除</el-button>
			</div>
		</div>
		<!--表格2-->
		<div class='pagingResult'>
			<el-table
				:data="tableData4"
				id="out-table"
				style="width: 100%;"
				height="200"
				border
				empty-text="暂未查到匹配条件的数据"
				@selection-change="handleSelectionChange">
				:header-cell-style="styleObj"
			>
				<el-table-column show-overflow-tooltip type="selection" align="center" fixed="left" width="55"></el-table-column>
				<el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
				<el-table-column show-overflow-tooltip prop="userName" label="姓名" align="center" fixed="left" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="mobile" label="手机号" align="center" fixed="left" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="idNumber" label="身份证号" align="center" width="200"></el-table-column>
				<el-table-column show-overflow-tooltip prop="allocationDate" label="分配时间" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createUserName" label="分配操作人" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="serviceDayNum" label="已服务天数" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="signContTxt" label="是否有签合同" align="center" width="150"></el-table-column>
				<!-- <el-table-column show-overflow-tooltip prop="signCont" label="是否有签合同" align="center" width="200">
					<template slot-scope="scope">
                            <div v-if='scope.row.signCont == true'>有</div>
                            <div v-else>无</div>
                        </template>
				</el-table-column> -->
			</el-table>
				<!--分页-->
			<div class="block">
				<el-pagination
					align="center"
					@size-change="handleSizeChange2"
					@current-change="handleCurrentChange2"
					:current-page="currentPage2"
					:page-sizes="[10,50,100,500]"
					:page-size="pageSize2"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total4"
				></el-pagination>
			</div>
		</div>
		<!-- 导入分配 -->
		<!-- 导入 -->
		<el-dialog title :visible.sync="toLead" :close-on-click-modal='false' center width='800px'>
			<!-- <el-button slot="trigger" size="small" type="primary" :disabled="!!fileList.length">选取文件</el-button> -->
			<div class="clearfix downloadUploading">
				<div style="margin-bottom:20px;">
					<el-steps :active="2" align-center>
						<el-step title="下载模板"></el-step>
						<el-step title="导入数据"></el-step>
					</el-steps>
				</div>
				<div class="left" style="width:50%;">
					<ul>
						<li>
							<img src="./../../assets/uploading/download.png" alt class="bigLogo" />
						</li>
						<li style='font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:color:rgba(0,0,0,1);'>下载导入模板</li>
						<li style='font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(238,56,43,1);'>下载前，请仔细确认您需要导入的数据类型选择正确的模板 合作商类型选择：</li>
						<li>
								<el-button slot="trigger" size="small" type="primary"  @click="getTemplateUrl1()" style='margin-top:50px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>下载模板</el-button>
						</li>
					</ul>
				</div>
				<div class="left" style="width:50%">
					<ul>
						<li>
							<img src="./../../assets/uploading/uploading.png" alt class="bigLogo" />
						</li>
						<li style='font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:color:rgba(0,0,0,1);'>上传数据</li>
						<li style='font-size:14px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(238,56,43,1);'>请上传小于5M的xls或xlsx格式文件</li>
						<li style='height:54px;'>
							<img src="./../../assets/uploading/file_icon.png" alt class="smallLogo" />
						</li>
						<li>
                            <el-upload
								class="upload-demo"
								ref="upload"
								action=""
								:limit="10"
								:on-change="changeFile"
								:on-preview="handlePreview"
								:on-remove="handleRemove"
								:file-list="fileList"
								:auto-upload="false"
							>
							<el-button slot="trigger" size="small" type="primary" style='margin-top: 13px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>点击上传</el-button>
                            </el-upload>
						</li>
					</ul>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="closeToLead" style="margin-top: 12px;border-radius:4px;border:1px solid rgba(248,192,89,1);color:rgba(248,192,89,1);width: 170px;">取 消</el-button>
				<el-button type="primary" @click="submit" style='margin-top: 12px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>确 定</el-button>
			</span>
		</el-dialog>
		<!-- 导入错误提示 -->
		 <el-dialog
                title="提示"
                :visible.sync="dialogMistake"
                width="30%">
				<pre style='height:110px;overflow-y: auto;'>{{MistakeHint}}</pre>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogMistake = false">取 消</el-button>
                    <el-button type="primary" @click="dialogMistake = false">确 定</el-button>
                </span>
        </el-dialog>
		<!-- 添加服务人员 -->
		<el-dialog
			:title="dialogTitleType"
			:visible.sync="dialogRole"
			width="1000px"
			:before-close="handleCloseRole">
			<div class='clearfix'>
					<div class='left' style='width:68%;background:rgb(240, 242, 245,0.5);border-radius:2px;margin-right:5%;padding:20px;box-sizing: border-box;'>
						<div>
							<el-form label-width="80px" label-position="right">
								<el-row>
									<el-col :span="13">
										<el-form-item label="创建时间">
											 <el-date-picker
												v-model="sqlDate"
												value-format="yyyy-MM-dd HH:mm:ss" 
												type="datetimerange"
												align="right"
												size='mini'
												style="width: 100%;"
												unlink-panels
												range-separator="至"
												start-placeholder="开始日期"
												end-placeholder="结束日期"
												@change="getSqlBeginDate"
												:picker-options="pickerOptions1">
											</el-date-picker>
										</el-form-item>
									</el-col>
									<el-col :span="9">
										<el-form-item label="导入批次">
											<el-input
												placeholder="这是一个占位符"
												size='mini'
												v-model="importNum">
											</el-input>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row>
									<el-col :span="19">
										<el-form-item label="其他条件">
											<el-input
												placeholder="请输入内容"
												size='mini'
												style='width:90%;'
												v-model="keyword">
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="4" style='margin:8px 0 0 0;'>
											<el-button type="primary" size='mini' @click='partnerList1()' class='btnpartner'>查询</el-button>										
									</el-col>
								</el-row>
							</el-form>
							<el-table
								:data="tableData2"
								ref="multipleTable"
								id="out-table"
								style="width: 100%; padding:0 35px 0 0; margin:0 0 20px 10px; background:rgba(240,242,245,0);border:none;"
								height="240"
								border
								empty-text="暂未查到匹配条件的数据"
								@selection-change="changeFun"
								:header-cell-style="styleObj"
							>
								<el-table-column show-overflow-tooltip type="selection" fixed="left" width="55"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerCompanyName" label="姓名" align="center" fixed="left" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="mobile" label="手机" align="center" fixed="left" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="idNumber" label="身份证号" align="center" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="serviceTypeName" label="服务类型" align="center" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="companyTypeText" label="类型" align="center" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerCode" label="内部代码" align="center" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="importNum" label="导入批次号" align="center" width="100"></el-table-column>
								<el-table-column show-overflow-tooltip prop="createDate" label="创建时间" align="center" width="100"></el-table-column>
							</el-table>
							<div class="block">
								<el-pagination
									align="center"
									@size-change="handleSizeChange3"
									@current-change="handleCurrentChange3"
									:current-page="currentPage3"
									:page-sizes="[10,50,100,500]"
									:page-size="pageSize3"
									:pager-count="5"
									layout="total, sizes, prev, pager, next, jumper"
									:total="total3"
								></el-pagination>
							</div>
							
						</div>
					</div>
					<div class='left' style='width:25%;background:rgba(240,242,245,0.5);border-radius:2px;padding: 5px 10px 0 10px;box-sizing: border-box;'>
						<ul class='clearfix'>
							<li class='left'>
								已选
								<i>{{this.tableData3Length}}</i>
								条
							</li>
							<li class='right' style='cursor:pointer;color:#FF3C70' @click='deleteTable'>
								清除
							</li>
						</ul>
						<el-table
								:data="tableData3"
								id="out-table"
								style="width: 100%; padding:0 40px 0 0; margin:10px 0 20px 0; background:rgba(240,242,245,0);border:none;"
								height="400"
								:header-cell-style="styleObj"
							>
								<el-table-column show-overflow-tooltip prop="id" label="" align="center" width="150" v-if="false"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerCompanyName" label="姓名" align="center" width="70"></el-table-column>
								<el-table-column show-overflow-tooltip prop="mobile" label="手机号" align="center" width="90"></el-table-column>
								<el-table-column
									fixed="right"
									label=""
									width="60">
									<template slot-scope="scope">
										<img src="./../../assets/uploading/remove.png" @click.prevent="deleteRow(scope.$index, scope.row)" style='cursor:pointer; width: auto;height: auto;max-width: 100%;max-height: 100%;'>
									</template>
									</el-table-column>
							</el-table>
					</div>
				</div>
			<span slot="footer" class="dialog-footer" style='display: flex;flex-flow: row nowrap;justify-content: center;'>
				<el-button class='btnprev' @click='closeDialog' size="small">关闭</el-button>
				<el-button type="primary" @click='affirm'  class='btnaffirm' size="small">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 添加服务人员成功弹出框 -->
        <el-dialog
			title="添加结果"
            :visible.sync="dialoghint"
            width="30%">
            <P style='text-align: center;'>已成功分配<i style='color:rgba(238,56,43,1);'>{{this.tableData3Length}}</i>个服务人员到{{this.customerName}}</P>
        </el-dialog>
	</div>
</template>

<script>
import { open } from 'fs';
import { getDictItemsByCodes, customerList, ServicePeopleList, partnerExport, allacatonPartners, addServicePeople, getTemplateUrl, delServicePeople, serveTemplateUrl, serveimport } from '../../api/api';
//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
	name: 'servicePeopleList',
	data() {
		return {
			dialoghint:false,//添加服务人员成功弹出框
			sqlDate:'',//添加服务人员窗口内时间
			sqlBeginDate:'',
			sqlEndDate:'',
			dialogTitleType:'',//添加服务人员窗口title
			addis:'',//添加服务列表选中的id
			Deleteids:'',//删除时 客户对应的合作商id
			DeleteData:[],//要删除的数据
			DeleteDataList:[],
			customerName:'',//所选客户的名称
			partnerId:'',//客户对应的合作商id
			dialogMistake:false,//导入错误提示窗口
			MistakeHint:'',//错误提示
			fileList: [],
			showFile:'true',
			toLead: false,
			templateType: 'HZS_5', //下载模板单选框
			ids:'',
			multipleSelection: [], 
			keyword:'',//其他条件
			importNum:'',//批次号
			tableData3Length:0,
			tableData3:[],
			tableData2:[],
			RoleValueFalg:'',
			lotNumber1:'',
			lotNumber2:'',
			businessRole:[],
			RoleValue:'',//业务角色
			RoleValueitemName:'',
			classifyitemName:'',
			dialogRole:false,//分配角色
			partnerCompanyName:'',
			Findkeyword: '', //搜索关键字
			medium: 'mini',
			havePerson: '',
			tableData: [],
			tableData4: [],
			currentPage: 1, // 当前页码
			currentPage2: 1, // 当前页码
			currentPage3: 1, // 当前页码
			total: 0, // 总条数
			total4: 0, // 总条数
			total3: 0, // 总条数
			pageSize: 10, // 每页的数据条数
			pageSize2: 10, // 每页的数据条数
			pageSize3: 10, // 每页的数据条数
			styleObj: {
				color: 'rgba(0,0,0,0.8)',
				background: '#CED4D9',
				fontSize: '14px',
				 fontFamily: "思源",
				fontWeight: 500
			},
			//添加服务人员窗口内 日期选择 创建时间
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
			code:{
				'servicePeopleList1':false,//查看
				'servicePeopleList2':false,//导入分配人员
				'servicePeopleList3':false,//客户导出
				'servicePeopleList4':false,//服务人员导出
				'servicePeopleList5':false,//添加&移除服务人员
			},
			getUserCode:[]
		}
	},
	created() {
		this.getUserCodeFn()

		var $cookie = this.$cookie;
		this.$cookie.get('token');
		this.List1();
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
		//客户 分页
		handleSizeChange(val) {
			//   console.log(`每页 ${val} 条`)
			this.currentPage = 1;
			this.pageSize = val; //每页显示的条数
			this.List1();
		},
		handleCurrentChange(val) {
			//  console.log(`当前页: ${val}`)
			this.currentPage = val;
			this.List1();
		},
		//服务人员 分页
		handleSizeChange2(val) {
			//console.log(`每页 ${val} 条`)
			this.currentPage2 = 1;
			this.pageSize2 = val; //每页显示的条数
			this.ServiceList();
		},
		handleCurrentChange2(val) {
			//  console.log(`当前页: ${val}`)
			this.currentPage2 = val;
			this.ServiceList();
		},
		//添加时查询出来的 服务人员 分页
		handleSizeChange3(val) {
			//   console.log(`每页 ${val} 条`)
			this.currentPage3 = 1;
			this.pageSize3 = val; //每页显示的条数
			this.partnerList1();
		},
		handleCurrentChange3(val) {
			//  console.log(`当前页: ${val}`)
			this.currentPage3 = val;
			this.partnerList1();
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done()
				})
				.catch(_ => {})
		},
		//客户列表
		List1() {
			if(!this.code['servicePeopleList1']) return false //没有查看权限功能
			let param = {param:JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId'), //公司ID
					partnerCompanyName: this.partnerCompanyName, 
					havePerson: this.havePerson, 
					}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}}
                customerList(param).then(result => {
					//console.log(result)
					if (result.code == '000000') {
						//成功
						this.tableData = result.data //表格数组
						this.total = result.total //表格数据长度
					} else if (result.code == '100000') {
						//失败
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
		//获取选中结果 客户列表
        changeFun2(val) { 
			//console.log(val)
			let dataList = [];
			dataList.push(val);
			console.log(dataList)
			let partnerId = '';
			let customerName = '';
			for(let i = 0; i< dataList.length; i++){
				partnerId += dataList[i].id;
				customerName += dataList[i].partnerCompanyName;
				if (i != dataList.length - 1) {
                    partnerId += ','
                }
			}
			this.partnerId = partnerId;
			console.log('选中客户列表的id==========='+ this.partnerId)
			this.customerName = customerName;
			this.dialogTitleType = '添加服务人员' + '(' + customerName + ')';
			this.ServiceList();
		},
		//服务人员列表
		ServiceList(partnerId){
			let param = {param:JSON.stringify({
					partnerId: this.partnerId
					}),pageParam: {
						pageIndex: this.currentPage2 - 1, //第几页
						pageSize: this.pageSize2 //每页几条
					}}
                ServicePeopleList(param).then(result => {
					if (result.code == '000000') {
						//成功
						this.tableData4 = result.data //表格数组
						this.total4 = result.total //表格数据长度
					} else if (result.code == '100000') {
						//失败
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
		//搜索
		List2(){
			this.currentPage = 1
			this.List1()
		},
		//刷新
		refresh() {
			this.partnerCompanyName = ''
			this.havePerson = ''
			this.List1()
		},
		//打开分配角色窗口
		assignRoles(){
			if(this.partnerId != ''){
                this.sqlDate = '';
                this.importNum = '';
                this.keyword = '';
                this.tableData2 = [];
                this.tableData3 = [];
				this.dialogRole = true;
			}else{
				this.$message.warning('请先选择客户');
			}
			
		},
		//分配角色关闭窗口
		handleCloseRole(done){
			done();
		},

		//分配changge事件
		selectGetclassify(vId){
			let obj = {};
            obj = this.classifyOptions.find((item)=>{//这里的classifyOptions就是上面遍历的数据源
                return item.value === vId;//筛选出匹配数据
            });
			this.classifyitemName = obj.label
		//	console.log(this.classifyitemName)
			getDictItemsByCodes({
			        param:JSON.stringify({
                        parentCode:vId
					})
				}).then(result => {
				   let dataDictPO = result.data[0].dataDictPO;
				   for(let i = 0; i<= dataDictPO.length; i++){
					   if(vId == 'BRC001'){
						   if(dataDictPO[i].itemCode == 'BUR001'){
							    this.RoleValue = '';
							    this.businessRole = [];
								this.businessRole.push(dataDictPO[i]);
					   		}
						}else if(vId == 'BRC004'){
							if(dataDictPO[i].itemCode == 'BUR040'){
								 this.RoleValue = '';
								this.businessRole = [];
								this.businessRole.push(dataDictPO[i]);
					   		}
						}
				   }
				}).catch(error => {})
		},
		selectGetRole(vId){
			let obj = {};
            obj = this.businessRole.find((item)=>{//这里的classifyOptions就是上面遍历的数据源
                return item.value === vId;//筛选出匹配数据
            });
		},
		//分配业务角色列表
		partnerList1() {
			let param = {param:JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId'), //公司ID
					keyword: this.keyword, //其他条件
					businessRoleClzzChildren:this.RoleValue,
					companyType:'1',
					importNum:this.importNum,
					sqlBeginDate:this.sqlBeginDate,
					sqlEndDate:this.sqlEndDate
					}),pageParam: {
						pageIndex: this.currentPage3 - 1, //第几页
						pageSize: this.pageSize3 //每页几条
					}}
                allacatonPartners(param).then(result => {
					//console.log(result)
					if (result.code == '000000') {
						//成功
						this.tableData2 = result.data //表格数组
						this.total3 = result.total //表格数据长度
					} else if (result.code == '100000') {
						//失败
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
		//获取添加服务人员窗口内选中结果
        changeFun(val) {
			this.tableData3 = val;
			let ids = '';
			for(let i = 0; i< this.tableData3.length; i++){
				ids += this.tableData3[i].id;
				if (i != this.tableData3.length - 1) {
                    ids += ','
                }
			}
			this.addis = ids;
			this.tableData3Length = val.length;
		},
		//全部删除选中的数据
		deleteTable(){
			this.tableData3 = [];
			this.tableData3Length = '';
			this.$refs.multipleTable.toggleAllSelection(this.tableData3);
		},
		//删除选中的数据
		deleteRow(index, row) {
			this.tableData3.splice(index, 1);
			if (row) {
				this.$refs.multipleTable.toggleRowSelection(row);
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		//导出客户列表
		Derive() {
				this.$axios({
				url: process.env.VUE_APP_basic + '/pcpeople/rest/customerListExport',
				method: 'post',
				responseType:'blob',  //指定blob类型`
				data: {
					param: JSON.stringify({
						companyId: this.$cookie.get('currentCompanyId'), //公司ID
						partnerCompanyName: this.partnerCompanyName, 
						havePerson:this.havePerson
					})
				},
				headers: {
					'Content-Type': 'application/json',
					Authorization: this.$cookie.get('token')
				},
				responseType:'blob'//后端响应数据格式为blob类型。
			})
				.then(result => {
					//console.log(result)
					const aLink = document.createElement("a");
					let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
					aLink.href = URL.createObjectURL(blob)
					aLink.setAttribute('download', '客户列表' + '.xlsx') // 设置下载文件名称
					aLink.click();
					document.body.appendChild(aLink);
					//this.$refs.loadElement.appendChild(aLink)
				}).catch(error => {
					console.log('401了哦')
					this.$router.push('/Login');
				});
		},
		//导出服务人员列表
		DeriveServe() {
			if(this.partnerId == ''){
				this.$message.warning('请先选择客户');
				return;
			}else{
				this.$axios({
					url: process.env.VUE_APP_basic + '/pcpeople/rest/servicePeopleExport',
					method: 'post',
					responseType:'blob',  //指定blob类型`
					data: {
						param: JSON.stringify({
							partnerId: this.partnerId, //客户对应的合作商id
							customerName: this.customerName,
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
						let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
						aLink.href = URL.createObjectURL(blob)
						aLink.setAttribute('download', '服务人员列表' + '.xlsx') // 设置下载文件名称
						aLink.click();
						document.body.appendChild(aLink);
						//this.$refs.loadElement.appendChild(aLink)
					}).catch(error => {
						console.log('401了哦')
						this.$router.push('/Login');
					});
			}
		},
		//上传
		changeFile(file) {
			this.fileList.push(file)
		},
		submit() {
			let file = this.fileList[0];
			let param = new FormData();
			param.append('file', file.raw)
			let config = {
				//添加请求头
				headers: { 'Content-Type': 'multipart/form-data' }
			}
			//上传
			this.$axios.post(process.env.VUE_APP_dfs + '/fs/uploadbig?fileName=' +file.name,param)
				.then(result => {
					this.toLead = false;
					let param = {param:JSON.stringify({
						fileName: file.name,
						url: result.data.data.url,
						companyId: this.$cookie.get('currentCompanyId')
					})}
					serveimport(param).then(result => {
						if (result.code == '000000') {
							this.MistakeHint = result.data.msg;
							this.dialogMistake = true;
							this.refresh();
							this.fileList.splice(0, 1);
							this.showFile = false;
						} else if (result.code == '100000') {
							this.fileList.splice(0, 1);
							this.$message.error(result.message);
						}
					})
					.catch(error => {
						this.$message.error('上传失败！');
					})  
					})
				.catch(error => {
					this.$message.error('上传失败！！');
				})
		},
		//关闭
		closeToLead() {
			this.fileList.splice(0, 1);
			this.toLead = false;
		},
		handleRemove(file, fileList) {
			this.fileList.splice(0, 1)
		},
		handlePreview(file) {
			//    console.log(file);
		},
		//下载
		getTemplateUrl1() {
				let param = {param:JSON.stringify({
                    templateType: this.templateType
                })}
				serveTemplateUrl(param).then(result => {
					if (result.code == '000000') {
						let potstUrl = '/' + result.data.url.split('/').slice(3).join('/');	
						this.$axios({
							method: 'get',
							url: potstUrl,
							responseType: 'arraybuffer'
						})
						.then(response => {
							const url = window.URL.createObjectURL(new Blob([response.data]));
							const link = document.createElement('a');
							link.href = url;
							link.setAttribute('download', result.data.name ); //or any other extension
							document.body.appendChild(link);
							link.click();
						})
						.catch(() => console.log('error occured'));
					} 
					else if (result.code == '100000') {
						//失败
						this.$message({
                            showClose: true,
                            message:result.message,
                            type: 'error'
                        });
					}
				}).catch(error => {
					this.$router.push('/Login');
				})
		},
		//添加服务人员窗口内 创建时间
		getSqlBeginDate(val) {
			if(this.sqlDate != null){
				this.sqlBeginDate = this.sqlDate[0];
				this.sqlEndDate = this.sqlDate[1];
			}else if(this.sqlDate == null){
				this.sqlBeginDate = '';
				this.sqlEndDate = '';
			}
		},
		//添加服务人员
		affirm(){
			if(this.tableData3 != ''){
						let param = {param:JSON.stringify({
							partnerId: this.partnerId,
							ids:this.addis 
							})}
						addServicePeople(param).then(result => {
							if (result.code == '000000') {
								//成功
								    this.dialoghint = true;
									this.ServiceList();
									this.List1();
									this.dialogRole = false;
							} else if (result.code == '100000') {
								//失败
								this.$message({
									showClose: true,
									message:result.message,
									type: 'error'
								});
							}
						}).catch(error => {
							this.$router.push('/Login');
						});
					}else{
						this.$message({
							message: '请选择条件',
							type: 'warning'
						});
						return false;
					}
		},
		//删除服务人员列表
		DeleteList(){
			if(this.partnerId == ''){
				this.$message.warning('请先选择客户');
				return;
			}else{
				if(this.DeleteData.length == ''){
					this.$message.warning('请至少选择一条数据');
					return;
				}else{
					let param = {param:JSON.stringify({
								partnerId: this.partnerId,
								ids:this.Deleteids 
								})}
							delServicePeople(param).then(result => {
								if (result.code == '000000') {
									//成功
									this.$confirm('是否确认移除所选服务人员?')
									.then(_ => {
										this.$message.success('移除成功');
										this.ServiceList();
									})
									.catch(_ => {});
								} else if (result.code == '100000') {
									//失败
									this.$message({
										showClose: true,
										message:result.message,
										type: 'error'
									});
								}
							}).catch(error => {
								this.$router.push('/Login');
							});
				}
			}
			
		},
		//获取删除选中的数据 服务人员列表
		handleSelectionChange(val){
			this.DeleteDataList = [];
			this.DeleteDataList.push(val);
			this.DeleteData = this.DeleteDataList[0];
			console.log(this.DeleteData)
			console.log(this.DeleteData.length)
			let ids = '';
			for(let i = 0; i< this.DeleteData.length; i++){
				ids += this.DeleteData[i].id;
				if (i != this.DeleteData.length - 1) {
                    ids += ','
                }
			}
			this.Deleteids = ids;
			console.log('删除时选中的id========'+ this.Deleteids);
		},
		//关闭添加服务人员窗口
		closeDialog(){
            this.dialogRole = false;
		}
	},
	
}
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.el-button--primary,.el-button--primary:hover,.el-button--primary:active{
    border-color: rgb(248, 192, 89);
    outline: 0;
}
.mini_input {
	width: 140px;
}
.interior_btn {
	width: 230px;
}
//顶部筛选
.top_screen label{
	display: inline-block;
	width:130px;
	text-align: right;
} 
//带图标按钮
.el-button--primary{
	background-color: #FFF;
	border: 1px solid #DCDFE6;
    color: #606266;
}
.btnprev,.btnaffirm{
	padding:10px 60px;
}
//取消
.btnprev{
	border-color:rgba(248,192,89,1);
	color:rgba(248,192,89,1);
}
.btnprev:hover{
	background:#FFF;
	border-color:rgba(248,198,105,1);
	color:rgba(248,198,105,1);
}
.btnprev:active{
	background:#FFF;
	border-color:rgba(234,174,61,1);
	color:rgba(248,192,89,1);
}
.btnprev:focus{
	background:#FFF;
	border-color:rgba(248,192,89,1);
	color:rgba(248,192,89,1);
}
//确认
.btnaffirm{
	background:rgba(248,192,89,1);
	border-radius:4px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.btnaffirm:hover{
	background:rgba(255,176,30,1);
	border-color:rgba(255,176,30,1);
	color:rgba(255,255,255,1);
}
.btnaffirm:active{
	background:rgba(226,147,0,1);
	background:rgba(226,147,0,1);
	color:rgba(255,255,255,1);
}
.btnaffirm:focus{
	background:rgba(248,198,105,1);
	border-color:rgba(248,192,89,1);
	color:rgba(255,255,255,1);
}
//下载上传弹出框
.downloadUploading div ul {
	margin: 20px 20px 8px 20px;
	font-size: 14px;
	list-style: none;
	text-align: center;
	line-height: 22px;
}
.downloadUploading div li {
	// display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	margin: 5px 0 0 5px;
}
.downloadUploading div li .bigLogo {
	width: 231px;
	height: 157px;
}
.downloadUploading div li .smallLogo {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
</style>