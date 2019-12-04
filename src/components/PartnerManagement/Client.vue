/**
* Client.vue
*
* 用工池管理 客户
*
* @author  程纪赢
*/
<template>
	<div>
		<!-- {{getUserCode}}客户 -->
		<div class="clearfix referResult">
			<div style='width:100%;'>
				<ul class='clearfix top_screen'>
					<li class='left' style='width:40%;'>
						<el-input
							placeholder="请输入用工人全称或简称"
							suffix-icon="el-icon-search"
							size="mini"
							style='width:98%;'
							v-model="Findkeyword">
						</el-input>
					</li>
					<li class='left' style='width:20%'>
						<label>创建人：</label>
						<el-input v-model="createUserName" placeholder="请输入创始人姓名" size="mini" style='width:60%;'></el-input>
					</li>
					<li class='left' style="width: 20%;">
						<label>合作状态：</label>
						<el-select v-model="pullDownValue" placeholder="请选择" size="mini" style='width:65%;'>
							<el-option label="" value=""></el-option>
							<el-option
								v-for="item in dataDictPO"
								:key="item.itemCode"
								:label="item.itemName"
								:value="item.itemCode"
							></el-option>
						</el-select>
					</li>
					<li class='left' style="width: 20%;">
						<label>类型：</label>
						<el-select v-model="companyType" placeholder="请选择" size="mini" @change=selectContract style='width:60%;'>
							<el-option label="" value=""></el-option>
							<el-option
							v-for="item in companyTypearr"
							:key="item.value"
							:label="item.label"
							:value="item.value">
							</el-option>
						</el-select>
					</li>
				</ul>
				<div style='margin-top:10px;'>
				<label>创建时间：</label>
                    <el-date-picker
                        v-model="sqlDate"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        type="datetimerange"
                        align="right"
                        size='mini'
                        style="width: 20%;"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getSqlBeginDate"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
				</div>
			</div>
		</div>
		<div class="clearfix tasksResult">
			<div class="left">
				<el-button type="primary" v-show="code['Client1']" icon="el-icon-search" size='mini' @click="List2">查询</el-button>
				<el-button size="mini" v-show="code['Client8']" @click="Derive">导出</el-button>
			</div>
			<!-- <div class="right">
				<el-button size="mini" @click="refresh">刷新</el-button>
				<el-button size="mini">列表设置</el-button>
			</div> -->
		</div>
		<!--表格-->
		<div class='pagingResult'>
			<el-table
				:data="tableData"
				id="out-table"
				style="width: 100%;"
				height="528"
				border
				empty-text="暂未查到匹配条件的数据"
				:header-cell-style="styleObj"
			>
				<el-table-column type="index" label="序号" align="center" fixed="left" width="50"></el-table-column>
				<el-table-column show-overflow-tooltip prop="importNum" label="批次号" align="center" fixed="left" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="partnerCode" label="代码" align="center" fixed="left" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="companyTypeText" label="类型" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="certificateStatusPcText" label="认证状态" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="partnerCompanyName" label="全称" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="partnerShortNameCn" label="简称" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="unionCode" label="信用代码/手机号" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="partnerShortNameEn" label="英文简称" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="idNumber" label="法人身份证号" align="center" width="120"></el-table-column>
				<el-table-column show-overflow-tooltip prop="showBusinessRoleName" label="业务角色" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="labelText" label="标签" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="serviceTypeName" label="服务类型" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="contacts" label="联系人" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="contactsMobile" label="联系人手机号" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="contactsPhone" label="联系人电话" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="contactsMail" label="联系人邮箱" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="ourCsm" label="我方客户经理" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="belongDeptName" label="所属部门" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="invoicePrefix" label="单据前缀" align="center" width="100"></el-table-column>
				<el-table-column show-overflow-tooltip prop="isSettlementObject" label="是否结算对象" align="center" width="150"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createUserName" label="创建人" align="center" width="80"></el-table-column>
				<el-table-column show-overflow-tooltip prop="createDate" label="创建时间" align="center" width="160"></el-table-column>
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
	</div>
</template>

<script>
import { open } from 'fs';
import { getDictItemsByCodes, list, partnerExport, getRequestCode } from '../../api/api';
import { mapActions,mapState} from 'vuex'
//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

let _loadsh = require('loadsh');


export default {
	name: 'Client',
	data() {
		return {
			companyTypearr: [{
			value: '1',
			label: '自由职业者'
			}, {
			value: '2',
			label: '企业'
			}],
			createUserName:'',
			companyType: '',
			sqlDate:'',
			sqlBeginDate:'',
			sqlEndDate:'',
			Findkeyword: '', //搜索关键字
			medium: 'mini',
			dataDictPO: '', //合作状态
			pullDownValue: '',
			tableData: [],
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
			currentPage: 1, // 当前页码
			total: 0, // 总条数
			pageSize: 10, // 每页的数据条数
			styleObj: {
				color: 'rgba(0,0,0,0.8)',
				background: '#CED4D9',
				fontSize: '14px',
				 fontFamily: "思源",
				fontWeight: 500
			},
			code:{
				'Client1':false,//查看
				'Client2':false,//新建
				'Client4':false,//基本信息编辑
				'Client5':false,//业务角色编辑
				'Client6':false,//银行卡管
				'Client7':false,//合作状态管理
				'Client8':false,//导出
			}
		}
	},
	computed:{
		...mapState(['getUserCode'])
	},
	watch:{
		//处理权限code编码
		getUserCode(){
			console.log(this.getUserCode)
			if(this.getUserCode.length == 0) return false
			let codeJson= this.$codeJson()
			this.getUserCode.forEach((item)=>{
				this.code[codeJson[item]] = true
			})
		}
	},
	created() {
		var $cookie = this.$cookie;
		this.$cookie.get('token');
		this.getDictItemsByCodes1();
		this.List1();
	},
	methods: {
		//获取类型id
		selectContract(vId){
			this.companyType = vId
		},
		//创建时间
		getSqlBeginDate(val) {
			if(this.sqlDate != null){
				this.sqlBeginDate = this.sqlDate[0];
				this.sqlEndDate = this.sqlDate[1];
			}else if(this.sqlDate == null){
				this.sqlBeginDate = '';
				this.sqlEndDate = '';
			}
		},
		//分页
		handleSizeChange(val) {
			//   console.log(`每页 ${val} 条`)
			this.currentPage = 1
			this.pageSize = val //每页显示的条数
			this.List1()
		},
		handleCurrentChange(val) {
			//  console.log(`当前页: ${val}`)
			this.currentPage = val
			this.List1()
		},
		handleClose(done) {
			this.$confirm('确认关闭？')
				.then(_ => {
					done()
				})
				.catch(_ => {})
		},
		//导出
		Derive() {
			let param = {param:JSON.stringify({})};
			let requestCode = '';
			getRequestCode(param).then(result => {
				if(result.code == '000000'){
					requestCode = result.data.code;
					this.$axios({
						url: process.env.VUE_APP_basic + '/pcpartener/rest/partnerExport',
						method: 'post',
						responseType:'blob',  //指定blob类型`
						data: {
							param: JSON.stringify({
								companyId: this.$cookie.get('currentCompanyId'), //公司ID
								keyword: this.Findkeyword, //搜索关键字
								cooperationStatus: this.pullDownValue, //合作状态
								companyType: this.companyType, //企业类型：1个体，2企业
								sqlBeginDate: this.sqlBeginDate, //起始时间
								sqlEndDate: this.sqlEndDate, //结束时间
								createUserName: this.createUserName, //创始人
								businessRoleClzzParent:'BRC001',
								workBanch:2,
								requestCode:requestCode
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
							aLink.setAttribute('download', '客户列表' + '.xlsx') // 设置下载文件名称
							aLink.click();
							document.body.appendChild(aLink);
							//this.$refs.loadElement.appendChild(aLink)
						}).catch(error => {
							console.log(error)
							this.$router.push('/Login');
						});
				}
			}).catch(error => {
				this.$router.push('/Login');
			});
		},
		//公共字典获取合作状态
		getDictItemsByCodes1() {
			let param = {param:JSON.stringify({
					parentCode: 'PAS'
					}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}}
                getDictItemsByCodes(param).then(result => {
					//console.log(result.data[0].dataDictPO)
					this.dataDictPO = result.data[0].dataDictPO
				})
				.catch(error => {
					this.$router.push('/Login');
				})
		},
		//列表
		List1: _loadsh.debounce(function(){   
			if(!this.code['Client1']) return false //没有查看权限功能
			let param = {param:JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId'), //公司ID
					keyword: this.Findkeyword, //搜索关键字
					cooperationStatus: this.pullDownValue, //合作状态
					companyType: this.companyType, //企业类型：1个体，2企业
					sqlBeginDate:this.sqlBeginDate, //起始时间
					sqlEndDate: this.sqlEndDate, //结束时间
                    createUserName: this.createUserName, //创始人
                    businessRoleClzzParent:'BRC001'
					}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}}
                list(param).then(result => {
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
					// console.log(XMLHttpRequest.status);
					// console.log(XMLHttpRequest.readyState);
					// console.log(textStatus);
					// console.log(error)
					
				});
		},500),
		//搜索
		List2(){
			this.currentPage = 1;
			this.List1();
		},
		//刷新
		refresh() {
			this.Findkeyword = '';
			this.pullDownValue = '';
			this.List1();
		},
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