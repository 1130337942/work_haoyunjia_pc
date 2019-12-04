/**
* Partner.vue
*
* 用工池管理 全部
*
* @author  程纪赢
*/
<template>
	<div>
		<!-- {{getUserCode}}全部 -->
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
				<!-- <el-button size="mini" @click="centerDialogVisible = true">新建</el-button> -->
				<el-button type="primary" icon="el-icon-search" size='mini' @click="List2" v-show="code['code1']">查询</el-button>
				<el-button size="mini" @click="toLead = true" v-show="code['code9']">导入</el-button>
				<el-button size="mini" @click="Derive"  v-show="code['code8']">导出</el-button>
				<el-button size="mini" @click='assignRoles'  v-show="code['code10']">分配角色</el-button>
				<el-button size="mini" style="margin-left: 10px;"  v-show="code['code1']">高级搜索</el-button>
			</div>
			<div class="right">
				<el-button size="mini" @click="refresh" v-show="code['code1']">刷新</el-button>
				<el-button size="mini">列表设置</el-button>
			</div>
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
				<el-table-column show-overflow-tooltip prop='taxStatusText' label="临时税务登记" align="center" width="160"></el-table-column>
				<el-table-column v-if="code['code11']" show-overflow-tooltip prop label="附件" align="center" fixed="right" width="160">
					<template slot-scope="scope">
                            <div v-if="scope.row.taxStatusText == null" @click='dialog_sponsor(scope.row.freelanceUserId,scope.row.partnerCompanyCode)' class='btn_table'>发起</div>
                            <div v-if="scope.row.taxStatusText == '待签署' || scope.row.taxStatusTex == '草稿'" @click='examine(scope.row.downloadUrl)' class='btn_table'>查看</div>
							<!-- <a v-if="scope.row.taxStatusText == '待签署' || scope.row.taxStatusTex == '草稿'" v-bind:href='scope.row.downloadUrl' target="_blank" class='btn_table'>查看</a> -->
                            <div v-if="scope.row.taxStatusText == '已签署'" class='btn_table' @click='getTemplateUrl2(scope.row.downloadUrl,scope.row.contName)'>下载</div>
                    </template>
				</el-table-column>
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
							<el-radio v-model="templateType" label="HZS_1" style='font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.85);'>自由职业者</el-radio>
							<el-radio v-model="templateType" label="HZS_2" style='font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,0.85);'>公司/个体工商户</el-radio>
						</li>
						<li>
								<el-button slot="trigger" size="small" type="primary"  @click="getTemplateUrl1()" style='margin-top:24px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>下载模板</el-button>
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
		<!-- 分配角色 -->
		<el-dialog
			title="分配业务角色"
			:visible.sync="dialogRole"
			width="1000px"
			:before-close="handleCloseRole">
			<el-steps :active="activeRole" finish-status="success" style='margin-bottom:20px;'>
				<el-step title="定义角色"></el-step>
				<el-step title="选择对象"></el-step>
			</el-steps>
			<div v-if="activeRole == '0'">
				<el-form label-width="110px" style='text-algin:center;'>
					<el-row>
						<el-col :span="1">
							<el-form-item></el-form-item>
						</el-col>
						<el-col :span="10">
                            <el-form-item label="分类：">
                                <el-select v-model="classifyValue" placeholder="请选择" size='mini' @change="selectGetclassify" style="width: 100%;">
									<el-option
										v-for="item in classifyOptions"
										:key="item.value"
										:label="item.label"
										:value="item.value">
									</el-option>
								</el-select>
                            </el-form-item>
                        </el-col>
						<el-col :span="10">
                            <el-form-item label="业务角色：">
                                <el-select v-model="RoleValue" placeholder="请选择" size='mini' @change="selectGetRole" style="width: 100%;">
									<el-option
										v-for="item in businessRole"
										:key="item.itemCode"
										:label="item.itemName"
										:value="item.itemCode">
									</el-option>
								</el-select>
                            </el-form-item>
                        </el-col>
					</el-row>	
				</el-form>	
			</div>
			<div v-if="activeRole == '1'">
				<div class='clearfix'>
					<div class='left' style='width:68%;background:rgb(240, 242, 245,0.5);border-radius:2px;margin-right:5%;padding:20px;box-sizing: border-box;'>
						<div>
							<el-form label-width="80px" label-position="right">
								<el-row>
									<el-col :span="11">
										<el-form-item label="分类">
											<el-select v-model="RolecompanyType" placeholder="请选择" size='mini' style="width: 90%;">
												<el-option label="" value=""></el-option>
												<el-option label="自由职业者" value="1"></el-option>
												<el-option label="企业" value="2"></el-option>
											</el-select>
										</el-form-item>
									</el-col>
									<el-col :span="12">
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
								<el-table-column show-overflow-tooltip type="selection" align="center" fixed="left" width="55"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerCompanyName" label="全称" align="center" fixed="left" width="80"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerShortNameCn" label="简称" align="center" fixed="left" width="80"></el-table-column>
								<el-table-column show-overflow-tooltip prop="partnerCode" label="代码" align="center" width="80"></el-table-column>
								<el-table-column show-overflow-tooltip prop="unionCode" label="信用代码/手机号" align="center" width="150"></el-table-column>
								<el-table-column show-overflow-tooltip prop="idNumber" label="法人身份证号" align="center" width="150"></el-table-column>
								<el-table-column show-overflow-tooltip prop="importNum" label="导入批次号" align="center" width="150"></el-table-column>
								<el-table-column show-overflow-tooltip prop="companyTypeText" label="类型" align="center" width="80"></el-table-column>
							</el-table>
							<div class="block">
								<el-pagination
									align="center"
									@size-change="handleSizeChange2"
									@current-change="handleCurrentChange2"
									:current-page="currentPage2"
									:page-sizes="[10,50,100,500]"
									:page-size="pageSize2"
									:pager-count="5"
									layout="total, sizes, prev, pager, next, jumper"
									:total="total2"
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
								<!-- <el-table-column show-overflow-tooltip prop="partnerCompanyName" label="" align="center" width="150"></el-table-column> -->
								<el-table-column show-overflow-tooltip prop align="center" width="160">
									<template slot-scope="scope">
											<div v-if="scope.row.partnerCompanyName">{{scope.row.partnerCompanyName}}/{{scope.row.unionCode}}</div>
										
									</template>
								</el-table-column>
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
			</div>
			<span slot="footer" class="dialog-footer" style='display: flex;flex-flow: row nowrap;justify-content: center;'>
				<el-button @click='prev' v-if= "btnActive == '1'" class='btnprev' size="small">上一步</el-button>
				<el-button @click="next" v-if= "btnActive == '0'"  class='btnnext' size="small">下一步</el-button>
				<el-button type="primary" @click='affirm' v-if= "btnActive == '1'"  class='btnaffirm' size="small">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 税务登记表上传 :before-close="handleCloseadministration"-->
		<el-dialog
			:visible.sync="dialogadministration"
			width="500px"
			class="el_dialog__administration">
			<ul class="administration">
				<li>
					<img src="./../../assets/uploading/uploading.png" alt style="width:190px;height:141px;" />
				</li>
				<li>上传数据</li>
				<li>请上传小于5M的PDF文件</li>
				<li v-if="this.replacecontent">
					<span class='el-icon-document'></span>
					{{this.filename}}
					<span class='el-icon-close' style='cursor:pointer' @click=handleRemove2></span>
				</li>
			</ul>
			<div class='btn_administration'>
					<el-upload
						class="upload-demo"
						ref="upload"
						action
						:limit="10"
						:on-change="changeFile2"
						:on-preview="handlePreview2"
						:on-remove="handleRemove2"
						:file-list="fileList2"
						:auto-upload="false"
					>
						<el-button
							slot="trigger"
							size="small"
							type="primary"
							style="background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;margin-right:10px;"
						>点击上传</el-button>
					</el-upload>
					<el-button
						size="small"
						:disabled=disabled
						@click="submit2()"
						style="background:rgba(255,255,255,1);border-radius:4px;color:rgba(153,153,153,1);width: 170px;margin-left:10px;"
					>发起签字</el-button>
				</div>
		</el-dialog>
		<!-- 分配角色成功弹出框 -->
        <el-dialog
			title="变更结果"
            :visible.sync="dialoghint"
            width="30%">
            <P style='text-align: center;'>已成功变更<i style='color:rgba(238,56,43,1);'>{{this.tableData3Length}}</i>个合作商角色为{{this.RoleValueitemName}}</P>
        </el-dialog>
		<!-- 服务人员校验 -->
		<el-dialog
		title="服务人员校验"
		:visible.sync="dialogCheck"
		width="30%"
		:before-close="handleCloseCheck">
			<div v-show = 'flag == 1'>
				所选数据中包含“<i style='color:#EE382B'>{{textCheck}}</i>”条为已分配了服务人员的客户，是否同时解除所有客户和服务人员的分配关系
			</div>
			<div v-show = 'flag == 2'>
				所选数据中包含”<i style='color:#EE382B'>{{textCheck}}</i>“条已分配到客户， 是否同时解除服务人员和客户的分配关系
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogCheck = false">否</el-button>
				<el-button type="primary" class='btnCheck' @click="updateBizRolePc1">是</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { open } from 'fs';
import { getDictItemsByCodes, list, partnerExport, getTemplateUrl, importUrl, partnerList, updateBizRolePc, startTax, getRequestCode, check } from '../../api/api';
import { mapState, mapActions } from 'vuex'
//导出
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
let _loadsh = require('loadsh');

export default {
	name: 'Partner',
	data() {
		return {
			flag:'',//服务人员校验提示内容显示控制
			textCheck:'',//服务人员校验提示内容
			dialogCheck: false,//服务人员校验弹出框
			dialoghint:false,//分配角色成功弹出框
			partnerCompanyCode:'',//乙方公司di
			replacecontent:false,
			filename:'',
			disabled:true,
			fileList2: [],
			dialogadministration: false, //税务登记表上传弹出框
			ids:'',
			multipleSelection: [], 
			keyword:'',//其他条件
			importNum:'',//批次号
			tableData3Length:'0',
			tableList3:[],
			tableData3:[],
			tableData2:[],
			RoleValueFalg:'',
			lotNumber1:'',
			lotNumber2:'',
			classifyOptions:[//分类
				{
					label:'客户',
					value:'BRC001'
				},
				{
					label:'其他服务商',
					value:'BRC004'
				}
			],
			businessRole:[],
			RoleValue:'',//业务角色
			RoleValueitemName:'',
			RolecompanyType:'',//类型
			classifyValue:'',//分类
			classifyitemName:'',
			btnActive:0,
			activeRole: 0,
			dialogRole:false,//分配角色
			companyTypearr: [{
			value: '1',
			label: '自由职业者'
			}, {
			value: '2',
			label: '企业'
			}],
			dialogMistake:false,//导入错误提示窗口
			MistakeHint:'',//错误提示
			createUserName:'',
			companyType: '',
			sqlDate:'',
			sqlBeginDate:'',
			sqlEndDate:'',
			showFile:'true',
			templateType: 'HZS_1', //下载模板单选框
			toLead: false,
			fileList: [],
			Findkeyword: '', //搜索关键字
			medium: 'mini',
			centerDialogVisible: false,
			labelPosition: 'top',
			dataDictPO: '', //合作状态
			pullDownValue: '',
			tableData: [],
			sizeForm: {
				region: ''
			},
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
			currentPage2: 1, // 当前页码
			total: 0, // 总条数
			total2: 0, // 总条数
			pageSize: 10, // 每页的数据条数
			pageSize2: 10, // 每页的数据条数
			styleObj: {
				color: 'rgba(0,0,0,0.8)',
				background: '#CED4D9',
				fontSize: '14px',
				fontFamily: "思源",
				fontWeight: 500
			},
			code:{
				'code1':false, //查看
				'code10':false,//分配角色
				'code11':false,//发起纳税登记
				'code2':false,//新建
				'code4':false,//基本信息编辑
				'code5':false,//业务角色编辑
				'code6':false,//银行卡管理
				'code7':false,//合作状态管理
				'code8':false,//导出
				'code9':false,//导入
			},
			isCode:false
		}
	},
	computed:{
		//获取是否有权限
		...mapState(['getUserCode'])
	},
	watch:{
		// //处理权限code编码
		getUserCode(){
			console.log(this.getUserCode)
			// console.log(this.isCode)
			// if(this.isCode ){
				if(this.getUserCode.length == 0) return false
				let codeJson= this.$codeJson()
				this.getUserCode.forEach((item)=>{
					this.code[codeJson[item]] = true
				});
				// this.isCode = false
				console.log(this.code['code1']+'----code1全部')
			// }
			
			
		}
	},
	activated(){
		// console.log(this.code['code1']+'----code1全部')
		// if(this.getUserCode.length <= 0  ){
		// 	this.isCode = true
		// }else{
		// 	this.isCode = false
		// } 
		// if(this.getUserCode.length == 0 )return false
		// let codeJson= this.$codeJson()
		// this.getUserCode.forEach((item)=>{
		// 	this.code[codeJson[item]] = true
		// })
		
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
					importUrl(param).then(result => {
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
		//服务人员校验关闭窗口
		handleCloseCheck(done) {
			done();
      	},
		//全部列表 分页
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
		//分配角色 里面 分页
		handleSizeChange2(val) {
			//   console.log(`每页 ${val} 条`)
			this.currentPage2 = 1;
			this.pageSize2 = val; //每页显示的条数
			this.partnerList1();
		},
		handleCurrentChange2(val) {
			//  console.log(`当前页: ${val}`)
			this.currentPage2 = val;
			this.partnerList1();
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
								workBanch:1,
								requestCode:requestCode
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
							aLink.setAttribute('download', '合作商列表' + '.xlsx') // 设置下载文件名称
							aLink.click();
							document.body.appendChild(aLink);
							//this.$refs.loadElement.appendChild(aLink)
						}).catch(error => {
							console.log('401了哦')
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
			if(!this.code['code1']) return false //没有查看权限功能
			let param = {param:JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId'), //公司ID
					keyword: this.Findkeyword, //搜索关键字
					cooperationStatus: this.pullDownValue, //合作状态
					companyType: this.companyType, //企业类型：1个体，2企业
					sqlBeginDate:this.sqlBeginDate, //起始时间
					sqlEndDate: this.sqlEndDate, //结束时间
					createUserName: this.createUserName //创始人
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
			this.currentPage = 1
			this.List1()
		},
		//刷新
		refresh() {
			this.Findkeyword = ''
			this.pullDownValue = ''
			this.List1()
		},
		//下载
		getTemplateUrl1() {
				let param = {param:JSON.stringify({
                        templateType: this.templateType
                })}
				getTemplateUrl(param).then(result => {
					if (result.code == '000000') {
						let url = '/' + result.data.url.split('/').slice(3).join('/');	
						//console.log(url);
						//let urlHost = window.location.host;
						//console.log(urlHost);
						//let url2 = urlHost+url;
						//console.log(url2);
						this.$axios({
							method: 'get',
							//url: result.data.url,
							url: url,
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
		//打开分配角色窗口
		assignRoles(){
			this.dialogRole = true;
			this.classifyValue = '';
			this.RoleValue = '';
			this.RolecompanyType = '';
			this.importNum = '';
			this.keyword = '';
			this.tableData2 = [];
			this.tableData3 = [];
			this.activeRole = 0;
			this.btnActive = 0;
		},
		//分配角色关闭窗口
		handleCloseRole(done){
			done();
		},
		//角色分配上一步
        prev(){
            if(this.activeRole === 0){
                    
			}else if(this.activeRole === 1){ //进入第1个页面
				this.RolecompanyType = '';
				this.importNum = '';
				this.keyword = '';
                this.btnActive = 0;
            }else if(this.activeRole === 2){ //进入第2个页面
                    
            }
            this.activeRole --;
            if (this.activeRole < 0) {
                this.activeRole = 0;
            }
        },
		//角色分配下一步
		next(){
			// 点击下一步
                if(this.activeRole === 0){ //第一次点击进入第二个页面的时候
					if(this.classifyValue != '' && this.RoleValue != ''){
						this.partnerList1();
						this.RolecompanyType = '';
						this.importNum = '';
						this.keyword = '';
						this.btnActive = 1;
						this.tableData3Length = '0';//之前选择的条数清空
						this.tableData3 = [];//之前选择的数据清空
					}else{
						this.$message.warning('请选择条件');
						return false;
					}
                }else if(this.activeRole === 1){ //第二次点击进入第三个页面的时候
                    
                }
                // 最后 active +1
                this.activeRole ++;
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
			let RoleValueitemName = '';
            obj = this.businessRole.find((item)=>{//这里的classifyOptions就是上面遍历的数据源
				RoleValueitemName = item.itemName;
                return item.value === vId;//筛选出匹配数据
            });
			this.RoleValueitemName = RoleValueitemName;
		},
		//分配业务角色列表
		partnerList1() {
			let param = {param:JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId'), //公司ID
					keyword: this.keyword, //其他条件
					businessRoleClzzParent:this.classifyValue,
					businessRoleClzzChildren:this.RoleValue,
					companyType:this.RolecompanyType,
					importNum:this.importNum,
					}),pageParam: {
						pageIndex: this.currentPage2 - 1, //第几页
						pageSize: this.pageSize2 //每页几条
					}}
                partnerList(param).then(result => {
					if (result.code == '000000') {
						//成功
						this.tableData2 = result.data //表格数组
						this.total2 = result.total //表格数据长度
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
		//获取选中结果
        changeFun(val) {
			this.tableData3 = val;	
			this.tableData3Length = val.length;
			let ids = '';
			for(let i = 0; i< this.tableData3.length; i++){
				ids += this.tableData3[i].id;
				if (i != this.tableData3.length - 1) {
                    ids += ','
                }
			}
			this.ids = ids;
		},
		//全部删除选中的数据
		deleteTable(){
			this.$refs.multipleTable.clearSelection();
			this.tableData3 = [];
			this.tableData3Lengt = '0';
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
		//确认
		affirm(){
			if(this.tableData3 != ''){
				let param = {param:JSON.stringify({
							ids:this.ids,
							parentCode:this.classifyValue,
							companyId:this.$cookie.get('currentCompanyId')
						})}
						check(param).then(result => {
							if (result.code == '000000') {
								//成功
								this.textCheck = result.data.result;
								if(this.textCheck == '0'){
									this.updateBizRolePc1();
								}else{
									this.dialogCheck = true;
									this.dialoghint = true;
									if(this.classifyValue == 'BRC001'){
										this.flag = 1;
									}else if(this.classifyValue == 'BRC004'){
										this.flag = 2;
									}
								}
								
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
						this.$message.warning('请选择条件');
						return false;
					}
		},
		updateBizRolePc1(){
			let param = {param:JSON.stringify({
							ids:this.ids,
							data:[{
								parentCode:this.classifyValue,
								itemCode:this.RoleValue
							}],
						})}
						updateBizRolePc(param).then(result => {
							if (result.code == '000000') {
								//成功
								this.dialogRole = false;
								this.dialogCheck = false;
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
		//税务登记表上传窗口关闭
		handleCloseadministration(done) {
			done();
		},
		//税务登记表上传
		dialog_sponsor(freelanceUserId,partnerCompanyCode){
			//console.log(freelanceUserId)
			if(freelanceUserId == null){
				this.$message.warning('只可对自有职业者类型对象发起临时税务登记签字');
			}else{
				this.partnerCompanyCode = partnerCompanyCode;
				this.disabled = true;
				this.dialogadministration = true;
			}
		},
		//税务登记表上传
		changeFile2(file) {
			this.replacecontent = true;
			this.disabled = false;
			this.filename = file.name;
			this.fileList2.push(file);
		},
		handlePreview2(file) {
			//console.log(file);
		},
		handleRemove2(file, fileList2) {
			this.replacecontent = false;
			this.disabled = true;
			this.fileList2.splice(0, 1);
		},
		submit2() {
			let file = this.fileList2[0];
			let param = new FormData();
			param.append('file', file.raw);
			let config = {
				//添加请求头
				headers: { 'Content-Type': 'multipart/form-data' }
			}
			//上传
			this.$axios.post(process.env.VUE_APP_dfs + '/fs/uploadbig?fileName=' + file.name,param)
				.then(result => {
					this.dialogadministration = false;
					let param = {
						param: JSON.stringify({
							uploadUrl: result.data.data.url, //上传的地址
							firstId: this.$cookie.get('currentCompanyId'), //公司ID
							secondId: this.partnerCompanyCode, //乙方公司id
							fileName: file.name, //文件名
							startUserId: this.$cookie.get('userId'), //发起人用户id
						})};
					//发起签字
					startTax(param).then(result => {
						console.log(result)
						this.fileList2.splice(0, 1);
						this.replacecontent = false;
						this.filename = '';
							if (result.code == '000000') {
								//this.MistakeHint = result.data.msg;
								//this.dialogMistake = true;
								this.refresh();
								//this.showFile = false;
								this.$message.success(result.message);
							} else if (result.code == '100000') {
								this.$message.error(result.message);
							}
						})
						.catch(error => {
							console.log(error);
							this.$message.error('上传失败！');
						})
				})
				.catch(error => {
					this.$message.error('上传失败！!');
				})
		},
		//查看
		examine(url){
			//console.log(url);
			window.open(url);
		},
		//下载文件
            getTemplateUrl2(url,name){
               // console.log('后台返回给我的地址' + url)
                let url2 = '/' + url.split('/').slice(3).join('/');
                //console.log('截取后的地址' + url2)
                let urlHost = window.location.host;
                // console.log('本地地址' + urlHost)
				//console.log('拼接后的地址' + urlHost + url2)
                this.$axios({
						method: 'get',
						url:url2,
						responseType: 'arraybuffer'
					})
					.then(response => {
						const url = window.URL.createObjectURL(new Blob([response.data]))
						const link = document.createElement('a')
						link.href = url
						link.setAttribute('download', name + '.pdf') //or any other extension
						document.body.appendChild(link)
						link.click()
					})
					.catch(() => console.log('error occured'))
            },
	},
	
	
}
</script>
<style lang="scss">
.middleSizedBox .el-form--label-top .el-form-item__label {
	padding: 0;
}
.middleSizedBox .el-form-item--mini.el-form-item {
	margin-bottom: 5px;
}
.tinyBox1 .el-form-item--mini.el-form-item .el-input--mini .el-input__inner {
	width: 293px;
}
.tinyBox2 .establishItme .el-select > .el-input {
	width: 320px;
}
//税务登记表上传
.el_dialog__administration .el-dialog__body {
	padding: 0 0 30px 0;
}
.el_dialog__administration .el-dialog__header {
	background: rgba(245, 248, 255, 1);
}
//税务登记表上传默认显示的文件名隐藏掉
.el_dialog__administration .el-upload-list{
	display:none;
}
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

// 新增
// .contractBox>.middleSizedBox:nth-child(1){
//     width:333px;
// }
.middleSizedBox h1 {
	height: 24px;
	font-size: 16px;
	font-family: PingFangSC-Medium;
	font-weight: 500;
	color: rgba(248, 192, 89, 1);
	line-height: 24px;
	margin-bottom: 10px;
}
.toRight {
	margin: 200px 20px 0 20px;
}
.toRight img {
	width: 50px;
	height: 50px;
}
.tinyBox1,
.tinyBox2 {
	border: 1px solid rgba(233, 233, 233, 1);
	padding: 15px;
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
//角色分配按钮
.btnprev,.btnnext,.btnaffirm{
	padding:10px 60px;
}
.btnnext,.btnaffirm{
	background:rgba(248,192,89,1);
	border-radius:4px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.btnnext:hover,.btnaffirm:hover{
	background:rgba(255,176,30,1);
	border-color:rgba(255,176,30,1);
	color:rgba(255,255,255,1);
}
.btnnext:active,.btnaffirm:active{
	background:rgba(226,147,0,1);
	background:rgba(226,147,0,1);
	color:rgba(255,255,255,1);
}
.btnnext:focus,.btnaffirm:focus{
	background:rgba(248,198,105,1);
	border-color:rgba(248,192,89,1);
	color:rgba(255,255,255,1);
}
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
//查询
.btnpartner{
	padding:10px 37px;
	background:rgba(248,192,89,1);
	border-radius:4px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.btnpartner:hover{
	background:rgba(255,176,30,1);
	border-color:rgba(255,176,30,1);
	color:rgba(255,255,255,1);
}
.btnpartner:active{
	background:rgba(226,147,0,1);
	border-color:rgba(226,147,0,1);
	color:rgba(255,255,255,1);
}
.btnpartner:focus{
	background:rgba(248,192,89,1);
	border-color:rgba(248,192,89,1);
	color:rgba(255,255,255,1);
}
//服务人员校验确定按钮
.btnCheck{
	background:rgba(248,192,89,1);
	border-radius:4px;
	font-family:PingFangSC;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.btnCheck:hover{
	background:rgba(255,176,30,1);
	border-color:rgba(255,176,30,1);
	color:rgba(255,255,255,1);
}
.btnCheck:active{
	background:rgba(226,147,0,1);
	border-color:rgba(226,147,0,1);
	color:rgba(255,255,255,1);
}
.btnCheck:focus{
	background:rgba(248,192,89,1);
	border-color:rgba(248,192,89,1);
	color:rgba(255,255,255,1);
}
//税务登记表上传
.el-dialog__body {
	padding: 30px 0 !important;
}
.administration li {
	text-align: center;
}
.administration li:nth-child(1) {
	background: rgba(245, 248, 255, 1);
	padding-bottom: 30px;
}
.administration li:nth-child(2) {
	font-size: 16px;
	font-weight: 500;
	color: rgba(0, 0, 0, 1);
	margin-top: 20px;
}
.administration li:nth-child(3) {
	font-size: 14px;
	font-weight: 400;
	color:rgba(238,56,43,1);
	margin: 10px 0 0 0;
}
.administration li:nth-child(4) {
	font-size: 14px;
	font-weight: 400;
	margin: 10px 0 0 0;
}
.el_dialog__administration .btn_administration{
	display:flex;
	width:360px;
	margin: 40px auto 0 auto;
}
//表格内按钮
.btn_table{
	color: rgb(248, 192, 89);
	cursor: pointer;
}
</style>