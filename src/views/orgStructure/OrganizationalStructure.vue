<template>
	<div style="position: relative;margin:20px;" class="clearfix">
		<div class="left leftBox">
			<el-input
				placeholder="请输入关键词搜索"
				v-model="inputTree"
				@change="searchTree"
				suffix-icon="el-icon-search"
				class="treeinquire"
				size="mini"
			></el-input>
			<h1 class="treeHint">组织架构</h1>
			<el-tree
				:props="defaultProps"
				:load="loadNode"
				:data="data"
				ref="tree"
				:render-content="renderContent"
				icon-class="el-icon-arrow-right"
				class="treeBox"
				lazy
				accordion
				@node-click="handleNodeClick"
			></el-tree>
		</div>
		<div class="left rightBox">
			<div class="topTitle">
				<p class="clearfix">
					<span class='left'>{{addDepartmentName}}</span>
					<i class="left" @click="editDepartmentFn()" style="margin-left:5px;" v-if="shows">编辑</i>
				</p>
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :key="index" v-for="(item,index) in BreadcrumbList">
						<span @click="breadcrumbData(item.id,item.name)" class='breadcrumbBtn' :class="{'breadcrumbColor':item.id==addDepartmentId}" >
							{{item.name}}
						</span>
					</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			<!--表格下级部门-->
			<div class="pagingResult">
				<p class="clearfix topDepartment">
					<img src="./../../assets/img/OrganizationalStructure/department.png" alt />
					<span>下级部门</span>
					<el-button
						type="primary"
						size="small"
						class="right addTree"
						style="margin-top:9px;"
						v-if="showBtn"
						@click="addDepartmentFn()"
					>添加子部门</el-button>
				</p>
				<el-table
					:data="tableData"
					:show-header="false"
					style="width: 100%;"
					height="300"
					empty-text="暂未查到匹配条件的数据"
				>
					<el-table-column show-overflow-tooltip prop="name" align="left" width="1200">
						<template slot-scope="scope">
							<span v-if="scope.row.name">
								{{scope.row.name}}
								<span>{{'(' + scope.row.staffNumber + ')'}}</span>
							</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<!--表格部门成员-->
			<div class="pagingResult">
				<p class="clearfix topDepartment">
					<img src="./../../assets/img/OrganizationalStructure/member.png" alt />
					<span>部门成员</span>
					<el-button
						type="primary"
						size="small"
						class="right addTree"
						style="margin-top:9px;"
						v-if="showBtn"
						@click="addEmployeesFn()"
					>添加成员</el-button>
				</p>
				<el-table :data="tableData2" style="width: 100%;" height="300" border empty-text="暂未查到匹配条件的数据">
					<el-table-column type="selection" align="center" fixed="left" width="60"></el-table-column>
					<el-table-column show-overflow-tooltip prop="managerId" align="center" width="190" v-if="show"></el-table-column>
					<el-table-column show-overflow-tooltip prop="userId" align="center" width="190" v-if="show"></el-table-column>
					<el-table-column show-overflow-tooltip prop="userName" align="center" label="姓名" width="190">
						<!-- <template slot-scope="scope">
							<div  @click="editEmployeesFn(scope.$index,scope.row)">
								<div v-if="scope.row.managerId == scope.row.userId">
									{{scope.row.userName}}
									<span class="tableBtn">主管</span>
								</div>
								<div v-else class='tableName'>{{scope.row.userName}}</div>
							</div>
						</template> -->
						<template slot-scope="scope">
							<div  @click="editEmployeesFn(scope.$index,scope.row)">
								<div v-if="scope.row.isManage == 'Y'">
									{{scope.row.userName}}
									<span class="tableBtn">主管</span>
								</div>
								<div v-else class='tableName'>{{scope.row.userName}}</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column show-overflow-tooltip prop="mobile" align="center" label="手机" width="190"></el-table-column>
					<el-table-column show-overflow-tooltip prop="jobNumber" align="center" label="工号" width="190"></el-table-column>
					<el-table-column
						show-overflow-tooltip
						prop="positionName"
						align="center"
						label="岗位"
						width="190"
					></el-table-column>
					<!-- <el-table-column show-overflow-tooltip  prop="departmentName" align="center"  label="部门" width="130"></el-table-column> -->
					<!-- <el-table-column show-overflow-tooltip  prop="name" align="center"  label="角色" width="130"></el-table-column> -->
					<!-- <el-table-column show-overflow-tooltip  prop="userName" align="center"  label="岗位" width="130"></el-table-column> -->
					<!-- <el-table-column show-overflow-tooltip  prop="alternatePhone" align="center"  label="备用电话" width="130"></el-table-column> -->
					<el-table-column show-overflow-tooltip prop="workStatus" align="center" label="状态" width="190">
						<template slot-scope="scope">
							<div v-if="scope.row.workStatus == '1'">在职</div>
							<div v-else>离职</div>
						</template>
					</el-table-column>
					<!-- <el-table-column show-overflow-tooltip  prop="accountStatus" align="center"  label="激活状态" width="130">
                    <template slot-scope="scope">
                            <div v-if="scope.row.accountStatus == '1'" >激活</div>
                            <div v-if="scope.row.accountStatus == '2'">未激活</div>
                            <div v-if="scope.row.accountStatus == '3'">停用</div>
                            <div v-else>黑名单</div>
                    </template>
					</el-table-column>-->
					<!-- <el-table-column show-overflow-tooltip  prop="remark" align="center"  label="备注" width="130"></el-table-column> -->
					<el-table-column show-overflow-tooltip prop="email" align="center" label="企业邮箱" width="190"></el-table-column>
					<!-- <el-table-column show-overflow-tooltip  prop="phoneNumber" align="center"  label="座机号" width="130"></el-table-column>
                <el-table-column show-overflow-tooltip  prop="extensionNumber" align="center"  label="分机号" width="130"></el-table-column>
					<el-table-column show-overflow-tooltip  prop="workPlace" align="center"  label="办公地点" width="130"></el-table-column>-->
				</el-table>
			</div>
		</div>
		<!-- -------------------------------------------- -->
      <!-- 添加部门对话框 -->
      <add-department-dialog 
        :isDepartmentShow="isDepartmenShow" 
        @cancelFn="cancelDepartmentFn"
		@refreshFn="refreshFn"
        ref='departmentDialog'
    ></add-department-dialog>
    <!--  @cancelFn="cancelDepartmentFn" --> 
    <add-employees-dialog 
        :isEmployeesShow="isEmployeesShow"
        @closeEmployeesFn="closeEmployeesFn"
		@refreshFn="refreshFn"
        ref='employeesDialog'
    ></add-employees-dialog>
    </div>
</template>

<script>
import { listByCompanyId, listByParentId, listByLike, addEmployee, updateDepartmentById } from '../../api/api'
import addDepartmentDialog from '@/components/mgDialog/addDepartment.vue'
import addEmployeesDialog from '@/components/mgDialog/addEmployees.vue'
export default {
	data() {
		return {
			formLabelAlignId:'',//上级id
			redactName:'',
			redactId:'',
			BreadcrumbList:[],//右侧面包屑
            frameworkOne_img:require('./../../assets/img/OrganizationalStructure/frameworkOne.png'),
            frameworkTwo_img:require('./../../assets/img/OrganizationalStructure/frameworkTwo.png'),
            frameworkThree_img:require('./../../assets/img/OrganizationalStructure/frameworkThree.png'),
            frameworkFour_img:require('./../../assets/img/OrganizationalStructure/frameworkFour.png'),
			show: false, //隐藏表格列
			shows:false,//编辑按钮
			showBtn:false,//添加按钮
			inputTree: '', //搜索框Tree
			data: [],
			departmentld: '', //大部门id
			defaultProps: {
				label: 'name',
				staffNumber: 'staffNumber', //数量
				id: 'id',
				children: 'employeeVOS'
			},
			tableData: [], //部门表格
			tableData2: [], //成员表格
			addDepartmentName: '', //当前选中的部门
			departmentId:'',//当前选择的部门id
			// --------------------------------------------------
			isDepartmenShow: false, //是否显示添加部门弹框
			isEmployeesShow: false //是否显示添加部门弹框
		}
	},
	components: {
		addDepartmentDialog,
		addEmployeesDialog
	},
	created() {
		//this.listByCompanyId1()
	},
	methods: {
		//tree 当前点击的数据 
		handleNodeClick(node,data,value) {
			// console.log('-----------------node')
			// console.log(node)
			// console.log('-----------------data')
				 this.redactName = data.data.name;//当前点击的部门名称
				 this.redactId = data.data.id;//当前点击的部门id
			// console.log(data)
			// console.log(data.level);
			// console.log('-----------------value')
			// console.log(value)
			//console.log('当前树选中的级别' + data.level);
			if(data.level == '0'){//左侧树当前第几级 控制新增按钮
				this.showBtn = false;
			}else{
				this.showBtn = true;
			}
			if(data.level == '1'){//左侧树当前第几级 控制编辑按钮
				this.shows = false;
			}else{
				this.shows = true;
			}

			this.addDepartmentId = node.id; //这个 我要传 因为那边编辑的时候要去赋值
			this.addDepartmentName = node.name;
			// console.log(this.addDepartmentId);
			// console.log(typeof(this.addDepartmentId))
			// console.log(node.id);
			if(node.id == undefined){
				this.BreadcrumbList = []; //每次点击一级 先清空 再赋值
				this.BreadcrumbList.push({
					name:this.$cookie.get("currentCompanyName"),
					id:'0'
				});
				//当前公司下部门 二级
				let param = {
				param: JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId') //公司ID
				})
				}
				listByCompanyId(param)
					.then(result => {
						if (result.code == '000000') {
							// let dataList = [];//右侧成员表格
							// for(let i = 0; i< result.data.length; i++){
							// 	let employeeArr = result.data[i].employeeVOS;
							// 	for(let j =0; j< employeeArr.length; j++){
							// 		dataList.push(employeeArr[j]);
							// 	}
							// }
							this.tableData = result.data.departmentVOList;
							this.tableData2 = result.data.employeeVOS;
							
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						console.log(error)
					})
			}else{
				let param = {
					param: JSON.stringify({departmentld: node.id})
				}
				listByParentId(param).then(result => {
						if (result.code == '000000') {
							//右侧表格 + 面包屑数据
							this.tableData = result.data.departmentVOList;
							this.BreadcrumbList = result.data.pcListParentBySonResponses;
							// console.log(this.BreadcrumbList);
							// console.log(result.data.pcListParentBySonResponses);
							this.BreadcrumbList.unshift({ //每次点击左侧树 除了一级 都把当前公司添加到面包屑最前面
								name:this.$cookie.get("currentCompanyName"),
								id:'0' //毕传null , ''是不行的 
							});
							//console.log(this.BreadcrumbList);
							// if (result.data.departmentVOList != '') {
							// 	for(let i = 0; i< this.tableData.length; i++){
							// 		this.tableData2 = this.tableData[i].employeeVOS;
							// 	}
							// }
							this.tableData2 = result.data.employeeVOS;
							let superiorId = result.data.pcListParentBySonResponses;
							let superiorIdS =  superiorId[superiorId.length-2].id;
							if(superiorIdS == 'null'){
								superiorIdS = '0';
							}
							this.formLabelAlignId = superiorIdS;
						//	console.log(superiorIdS);
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		//tree 2级
		listByCompanyId1() {
			console.log(222)
			let param = {
				param: JSON.stringify({
					companyId: this.$cookie.get('currentCompanyId') //公司ID
				})
			}
			listByCompanyId(param)
				.then(result => {
					if (result.code == '000000') {
						this.data = result.data.departmentVOList;
						// let dataList = [];//右侧成员表格
						// 	for(let i = 0; i< result.data.length; i++){
						// 		let employeeArr = result.data[i].employeeVOS;
						// 		for(let j =0; j< employeeArr.length; j++){
						// 			dataList.push(employeeArr[j]);
						// 		}
						// 	}
						// 	this.tableData2 = dataList;
						this.tableData = result.data.departmentVOList;
						this.tableData2 = result.data.employeeVOS;
					} else if (result.code == '100000') {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//tree 子级方法
		loadNode(node, resolve) {
			// console.log("node");
			// console.log(node);
			// console.log(node.data.id);//这里可以打印我选中的数据的id
			// this.listByParentId1(node.data.id);
			// console.log(node);
			// console.log(resolve);
			if(node === ''){//刷新的时候走这一步
				this.data = [{ name: this.$cookie.get("currentCompanyName") }];
			}else{
				let children = [];
				if (node.level === 0) {
					//默认显示当前公司 一级
					return resolve([{ name: this.$cookie.get("currentCompanyName") }]);
				}else if(node.level === 1){
					//当前公司下部门 二级
					let param = {
					param: JSON.stringify({
						companyId: this.$cookie.get('currentCompanyId') //公司ID
					})
					}
					listByCompanyId(param)
						.then(result => {
							if (result.code == '000000') {
							//	this.data = result.data
								children = result.data.departmentVOList;
								// let dataList = [];//右侧成员表格
								// for(let i = 0; i< result.data.length; i++){
								// 	let employeeArr = result.data[i].employeeVOS;
								// 	for(let j =0; j< employeeArr.length; j++){
								// 		dataList.push(employeeArr[j]);
								// 	}
								// }
								// this.tableData2 = dataList;
								this.tableData = result.data.departmentVOList;
								this.tableData2 = result.data.employeeVOS;
								
							} else if (result.code == '100000') {
							}
						})
						.catch(error => {
							console.log(error)
						})
				}else{
					//所有子级
					let param = {
						param: JSON.stringify({
							departmentld: node.data.id
						})
					}
					listByParentId(param)
						.then(result => {
							if (result.code == '000000') {
								children = result.data.departmentVOList;
							} else if (result.code == '100000') {
							}
						})
						.catch(error => {
							console.log(error)
						})
				}
				setTimeout(() => {
						resolve(children)
					}, 500)
			}
		},
		//tree搜索
		searchTree(value) {
			//console.log(value)
			if (value == '') {//搜索完之后把条件清空只显示当前公司
				this.data=[{
					name:this.$cookie.get("currentCompanyName"),
					id:'null'
				}];
			} else {
				let param = {
					param: JSON.stringify({
						companyId: this.$cookie.get('currentCompanyId'), //公司ID
						likeName: this.inputTree
					})
				}
				listByLike(param)
					.then(result => {
						if (result.code == '000000') {
							this.data = result.data;
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						console.log(error)
					})
			}
		},
		//tree添加图标
		renderContent(h, { node, data, store }) {
			//console.log(node)
			if (node.level == 1) {
                //一级的tree图标
				return (
					<span class="custom-tree-node">
                        <span>
                            <img src={this.frameworkOne_img} class="treeRefresh" />
                        </span>
						<span>
							{node.label}
						</span>
					</span>
				)
			} else if (node.level == 2){
				return (
                    <span class="custom-tree-node">
                        <span>
                            <img src={this.frameworkTwo_img} class="treeRefresh" />
                        </span>
						<span>
							{node.label + '(' + node.data.staffNumber + ')'}
						</span>
					</span>
				)
			} else if (node.level == 3){
				return (
                    <span class="custom-tree-node">
                        <span>
                            <img src={this.frameworkThree_img} class="treeRefresh" />
                        </span>
						<span>
							{node.label + '(' + node.data.staffNumber + ')'}
						</span>
					</span>
				)
			} else {
				return (
                    <span class="custom-tree-node">
                        <span>
                            <img src={this.frameworkFour_img} class="treeRefresh" />
                        </span>
						<span>
							{node.label + '(' + node.data.staffNumber + ')'}
						</span>
					</span>
				)
			}
		},
		//右侧面包屑
		breadcrumbData(id,name){
			if(name == null){
				this.addDepartmentName = '繁昌一招盈人力资源服务有限公司';
			}else{
				this.addDepartmentName = name;
			}
			
			this.addDepartmentId = id;
			let param = {
				param: JSON.stringify({
					departmentld: id
				})
			}
			listByParentId(param)
				.then(result => {
					if (result.code == '000000') {
						this.tableData = result.data.departmentVOList;
						if (result.data.departmentVOList != '') {
							for(let i = 0; i< this.tableData.length; i++){
								this.tableData2 = this.tableData[i].employeeVOS;
							}
						}
					} else if (result.code == '100000') {
					}
				})
				.catch(error => {
					console.log(error)
				})
		},
		//-------------------------------------------
			//取消添加部门对话框
            cancelDepartmentFn(emitData){
                // this.departmentData.isShow = emitData.isShow
                 this.isDepartmenShow = emitData.isShow
            },
            //添加部门对话框
            addDepartmentFn(){
                //  this.departmentData.isShow = true
                this.isDepartmenShow = true
                let refsDepartmentData = {
					title : '添加部门',
					redactRegion:this.BreadcrumbList,//上级部门
					redactName:this.redactName, //部门名称
					redactId:this.redactId, //部门id
					defaultData:{
						departmentId:this.redactId,
						departmentName:this.redactName 
					}
                }
                this.$refs.departmentDialog.departmentDataFn(refsDepartmentData)
            },
            //编辑部门对话框
            editDepartmentFn(){
                // this.departmentData.isShow = true;
                this.isDepartmenShow = true;
                let refsDepartmentData = {
					title : '编辑部门',
					redactName:this.redactName, //部门名称
					redactId:this.redactId, //部门id
					redactRegion:this.BreadcrumbList,//上级部门
					formLabelAlignId:this.formLabelAlignId//上级部门id
                }
                this.$refs.departmentDialog.departmentDataFn(refsDepartmentData)
            },
            //取消 添加员工对话框
            closeEmployeesFn(emitData){
                console.log(emitData)
                this.isEmployeesShow = emitData.isShow
            },
            //添加员工对话框
            addEmployeesFn(){
                this.isEmployeesShow = true;
                let refsEmployeesData = {
					title : '添加员工',
					type:1,
					defaultData:{
						departmentId:this.redactId,
						departmentName:this.redactName 
					}
                }
                this.$refs.employeesDialog.employeesDataFn(refsEmployeesData)
            },
             //编辑员工对话框
            editEmployeesFn(index,itemData){
				console.log(index,itemData)
				this.isEmployeesShow = true;
				let aa = itemData
                let refsEmployeesData = {
					title : '编辑员工',
					type:2,
					itemData
					// itemData:this.tableData2[index],
                }
                this.$refs.employeesDialog.employeesDataFn(refsEmployeesData)
			},
			refreshFn(){
				this.loadNode('',[])
			},
			//公用方法向子组件传数据
			refsDialogDataFn(data) {
				this.$refs.departmentDialog.departmentDataFn(data)
			}
	}
}
</script>

<style lang="scss" scoped>
//左侧盒子
.leftBox {
	width: 325PX;
	height: 840px;
	text-align: center;
	margin-right: 2%;
	padding: 20px 20px 40px 20px;
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	border-radius: 2px;
}
//左侧搜索框
.treeinquire {
	width: 100%;
	border-radius: 4px;
}
//组织架构文字
.treeHint {
	width: 100%;
	height: 30px;
	line-height: 30px;
	margin: 20px 0;
	font-weight: 500;
	color: rgba(0, 0, 0, 1);
	font-size: 16px;
	font-family: PingFangSC;
	background: rgba(243, 245, 255, 1);
	border-radius: 2px;
}
//树形组件
.treeBox {
	width: 100%;
	height: 700px;
	overflow-y:auto;
}
.custom-tree-node > span:nth-child(1) {
	margin-right: 5px;
}
//左侧添加btn
.addTree {
	background: rgba(248, 192, 89, 1);
	border-color: rgba(248, 192, 89, 1);
	border-radius: 4px;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(255, 255, 255, 1);
}
.addTree:hover {
	background: rgba(255, 176, 30, 1);
	border-color: rgba(255, 176, 30, 1);
	color: rgba(255, 255, 255, 1);
}
.addTree:active {
	background: rgba(226, 147, 0, 1);
	background: rgba(226, 147, 0, 1);
	color: rgba(255, 255, 255, 1);
}
.addTree:focus {
	background: rgba(248, 198, 105, 1);
	border-color: rgba(248, 192, 89, 1);
	color: rgba(255, 255, 255, 1);
}
//右侧盒子
.rightBox {
	height: 840px;
	width:calc(100% - 360px);
	box-sizing: border-box;
	background: rgba(255, 255, 255, 1);
	border-radius: 2px;
}
//右侧盒子上面字段
.rightBox .topTitle {
	padding: 20px 40px 0 40px;
	box-sizing: border-box;
}
.rightBox .topTitle p {
	margin-bottom: 10px;
	padding-right: 10px;
}
.rightBox .topTitle p span {
	font-size: 18px;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(0, 0, 0, 1);
}
.rightBox .topTitle p i {
	cursor: pointer;
	font-size: 14px;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(253, 100, 39, 1);
}
.rightBox .topTitle p i{
    cursor: pointer;
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(253,100,39,1);
}
//右侧 下级部门/部门成员
.topDepartment {
	height: 50px;
	line-height: 50px;
	padding: 0 20px;
	background: rgba(243, 245, 255, 1);
}
.topDepartment img {
	width: 30px;
	height: 30px;
}
//表格内 主管按钮
.tableBtn {
	display: inline-table;
	width: 36px;
	height: 14px;
	color: rgba(255, 255, 255, 1);
	background: rgba(248, 192, 89, 1);
	border-radius: 2px;
}
//表格内 成员列表 姓名
.tableName{
	color: #f8c059;
    cursor: pointer;
}
//右侧面包屑
.breadcrumbBtn{
	cursor: pointer;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(248,192,89,1);
}
//初始化右侧面包屑样式
.breadcrumbColor{
   color:rgba(0,0,0,1);
}
</style>
<style>
/* tree布局 */
.custom-tree-node {
	/* flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 8px; */
    font-size:14px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,0,0,0.65);
}
.custom-tree-node .treeRefresh {
	width:30px;
    height:30px;
    /* background:rgba(248,192,89,1); */
}
</style>