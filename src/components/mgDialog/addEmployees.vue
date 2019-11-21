<template>
<!-- 添加/编辑 员工 -->
    <div class="addEmployees">
        <el-dialog
            class="dialog-box "
            :title="employeesData.title"
            :visible.sync="isEmployeesShow"
            center
            :before-close="closeEmployeesFn">
            <!-- 嵌套弹框 -->
            <el-dialog
                class="department-dialog"
                width="820px"
                title='部门选择'
                :visible.sync="isDepartmentShow"
                center
                append-to-body>
                <div class="cont-box">
                    <div class="cont-item cont-left">
                        <div class="div1">选择</div>
                        <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                            v-model="inputDepartmentVal"
                            @change="searchDepartmentFn()"
                        >
                        <template slot="append">搜索</template>
                        </el-input>
                        <div class="breadcrumb-box">
                            <el-breadcrumb separator-class="el-icon-arrow-right">
                                <el-breadcrumb-item  v-for="(item,i) in breadcrumbData" :key="item.id">
                                    <span :class="isActiveBreadcrumb == i?'active-readcrumb':'init-readcrumb'"  @click="breadcrumbFn(item,i)">{{item.name}}</span>
                                </el-breadcrumb-item> 
                            </el-breadcrumb>
                        </div>
                        <div class="un-data" v-if="isUnDepartmentData">暂无部门</div>
                        <div v-else class="check-box">
                            <div class="check-all">
                                <!-- :indeterminate="isIndeterminate" -->
                                <el-checkbox  v-model="checkAll" @change="checkDepartmentAllFn">全选</el-checkbox>
                            </div>
                            <div class="check-item-box">
                                <div class="checkItem" v-for="(item,i) in dxDepartmentData" :key="item.id">
                                    <el-checkbox @change="checkedDepartmentItemFn(item.checked,i)" v-model="item.checked">{{item.name}}</el-checkbox>
                                    <div class="subordinate" @click="loadNode(item.id)">下级</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                  
                    <div class="cont-item cont-right">
                        <div class="div1">已选<span>{{checkDepartmentTrue.length}}</span>个</div>
                        <div class="true-itme">
                            <div class="check-true" v-for="(item,i) in checkDepartmentTrue" :key="item.id">
                                <div>{{item.name}}</div>
                                <div class="icon-box" @click="delDepartmentItemFn(i,item.id)"><i class="el-icon-close"></i></div>
                            </div>
                        </div>
                    </div>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="warning" @click="saveDepartmentFn()">保存</el-button>
                    <el-button type="warning" plain @click="cancelDepartmentFnFn()" >取消</el-button>
                </span>
            </el-dialog>
            <div>
                <el-form 
                    :inline="true"
                    class="demo-form-inline"
                    label-position="rigth" 
                    label-width="82px" 
                    :model="formLabelAlign" 
                    ref="formLabelAlign">
                    <div class="item">
                        <!--     -->
                        <el-form-item label="姓名"  
                        prop="userName" 
                        :rules='rulesName'
                        >
                            <el-input :disabled="realnameAuthenticationStatus || isClickEdit" type="name" v-model="formLabelAlign.userName" ></el-input>
                        </el-form-item>
                        <!--   :rules="[{ required: true, message: '手机号不能为空'}, 
                            { type: 'number', message: '手机号必须为数字值',trigger: 'change'}]" -->
                        <el-form-item label="手机号"
                           prop="mobile" 
                           :rules="rulesMobile"
                        >
                            <el-input :disabled="employeesData.type == 2 || isClickEdit" v-model="formLabelAlign.mobile" autocomplete="off" maxlength="11"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" 
                            prop="sex"
                            :rules="{ required: true, message: '请选择性别', trigger: 'change' }"
                        >
                            <el-select v-model="formLabelAlign.sex" :disabled="realnameAuthenticationStatus || isClickEdit" placeholder="请选择性别">
                            <el-option label="男" :value="1"></el-option>
                            <el-option label="女" :value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <!--  :rules="[{ required: true, message: '工号不能为空', trigger: 'change' },{
                            type: 'number', message: '工号必须为数字值'
                        }]"   -->
                        <el-form-item label="工号"  
                        prop="jobNumber" 
                        :rules = rulesJobNumber
                        >
                            <el-input :disabled="isClickEdit"  v-model="formLabelAlign.jobNumber" ></el-input>
                        </el-form-item>
                        <!--   -->
                        <el-form-item label="入职日期"
                            prop="hiredDate" 
                            :rules="{ required: true, message: '请选择入职日期', trigger: 'change' }"
                        >
                            <el-date-picker 
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd" 
                            @change="timeFn"
                            :disabled="isClickEdit"
                            type="date" placeholder="选择日期" v-model="formLabelAlign.hiredDate"></el-date-picker>
                        </el-form-item>
                        <!-- prop="arrivalDate" 
                            :rules="{ required: true,type: 'date', message: '请选上岗日期', trigger: 'change' }" -->
                        <el-form-item label="上岗日期">
                            <el-date-picker format="yyyy-MM-dd" :disabled="isClickEdit"
                            value-format="yyyy-MM-dd"  :picker-options="pickerOptions" type="date" placeholder="选择日期" v-model="formLabelAlign.arrivalDate"></el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="item">
                        <!--  -->
                        <div @click="departmentFn">
                            <el-form-item label="部门"  
                            prop="departmentName" 
                            :rules="{ required: true, message: '部门名称不能为空', trigger: 'change' }"
                        >
                            <el-input :disabled="isClickEdit" type="textarea" v-model="formLabelAlign.departmentName" readonly 
                            :autosize="{ minRows: 1.5, maxRows: 4}"></el-input>
                        </el-form-item>
                        </div>
                        <!--  prop="role" 
                            :rules="{ required: true, message: '角色不能为空', trigger: 'blur' }" -->
                        <el-form-item label="角色"
                           
                        >
                            <el-input type="role" disabled v-model="formLabelAlign.role" ></el-input>
                        </el-form-item>
                        <el-form-item label="岗位">
                            <el-input @focus="jobsFn()" disabled  v-model="formLabelAlign.position" readonly></el-input>
                        </el-form-item>
                    </div>
                    <div class="item item3">
                        <el-form-item label="备用电话">
                            <el-input :disabled="isClickEdit" v-model="formLabelAlign.alternatePhone" ></el-input>
                        </el-form-item>
                        <el-form-item label="状态" 
                            prop="workStatus"
                            :rules="{ required: true, message: '状态不能为空', trigger: 'change' }"
                        >
                           <!--  -->
                            <el-radio-group :disabled=" isDimission || isClickEdit"  v-model="formLabelAlign.workStatus">
                                <el-radio :label="1">在职</el-radio>
                                <el-radio :label="2">离职</el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <div v-if="employeesData.type == 1" style="width:290px;"></div>
                        <el-form-item v-else label="激活状态">
                            <el-input disabled  v-model="formLabelAlign.accountStatus" readonly></el-input>
                        </el-form-item>
                    </div>
                    <div class="item4">
                        <el-form-item label="备注">
                            <el-input :disabled="isClickEdit" v-model="formLabelAlign.remark" ></el-input>
                        </el-form-item>
                    </div>
                    <div class="item item5">
                        <el-form-item label="企业邮箱" >
                            <el-input :disabled="isClickEdit" type="email" v-model="formLabelAlign.email" ></el-input>
                        </el-form-item>
                        <el-form-item label="座机号">
                            <el-input :disabled="isClickEdit" v-model="formLabelAlign.phoneNumber" ></el-input>
                        </el-form-item>
                        <el-form-item label="分机号">
                            <el-input :disabled="isClickEdit" v-model="formLabelAlign.extensionNnumber" ></el-input>
                        </el-form-item>
                    </div>
                    <div class="item6">
                        <el-form-item label="办公地点">
                            <el-input :disabled="isClickEdit" v-model="formLabelAlign.workPlace" ></el-input>
                        </el-form-item>
                    </div>
                    <div class="item item7" v-if="employeesData.type == 2">
                        <el-form-item label="创建人" >
                            <el-input disabled  v-model="formLabelAlign.createDate" ></el-input>
                        </el-form-item>
                        <el-form-item label="创建时间" >
                            <el-input disabled  v-model="formLabelAlign.createUser" ></el-input>
                        </el-form-item>
                        <div  style="width:290px;"></div>
                    </div>
                    <div class="item item8" v-if="employeesData.type == 2">
                        <el-form-item label="最后更新人" >
                            <el-input disabled v-model="formLabelAlign.lastModifyUser" ></el-input>
                        </el-form-item>
                        <el-form-item label="最后更时间" >
                            <el-input disabled readonly v-model="formLabelAlign.lastModifyDate" ></el-input>
                        </el-form-item>
                        <div  style="width:290px;"></div>
                    </div>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" v-if="employeesData.type == 2 && this.isClickEdit == true" @click="editEmployeesFn()">编辑</el-button>
                <el-button type="warning" v-if="employeesData.type == 1 || this.isClickEdit == false" @click="saveEmployeesFn('formLabelAlign','hide')">保存</el-button>
                <el-button type="warning" v-if="employeesData.type == 1" @click="saveEmployeesFn('formLabelAlign','show')">保存并继续添加</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import { listByCompanyId,listByParentId,addEmployee,listByLike,updateEmployeeById} from '@/api/api'
    export default {
        props:{
            isEmployeesShow:Boolean,
            default:false
        },
        data() {
            //名字校验
            let checkUserName = (rule, value, callback)=>{
                // setTimeout(() => {
                    if(value == ''){
                        callback(new Error('姓名不能为空'));
                    }else{
                        callback();
                    }
                // }, 500);
            };
            //电话校验
            let checMobile = (rule, value, callback) => {
                // console.log(value)
                // console.log(rule,value)
                
                let reg = /^1[3456789]\d{9}$/;
                let reg2 = /^[0-9]*$/;
               
                setTimeout(() => {
                    // console.log(!reg.test(value))
                    if(!reg2.test(value)){
                        callback(new Error('只能输入数字'));
                    }else if(!reg.test(value)){
                        callback(new Error('请输入正确的手机号'));
                    }else{
                        callback();
                    }
                }, 500);
            };
            //工号校验
            let checJobNumber = (rule, value, callback) =>{
                let reg2 = /^[0-9]*$/;
                setTimeout(() => {
                    if(!reg2.test(value)){
                        callback(new Error('只能输入数字'));
                    }else{
                        callback();
                    }
                }, 500);
            };
            return {
                pickerOptions:{
                    disabledDate(time) {
                        let d = new Date(sessionStorage.hiredDate)
                        d = d.setDate(d.getDate()-1)
                        return time.getTime() < new Date(d);
                    },
                },
                rulesName:[{required: true,validator:checkUserName , trigger: 'change' }],
                rulesMobile:[
                    {required: true, message: '手机号不能为空',trigger: 'change'},
                    {validator: checMobile, trigger: 'change'
                }],
                rulesJobNumber:[{ required: true, message: '工号不能为空', trigger: 'change' },{
                    validator: checJobNumber, trigger: 'change'
                }],
                formLabelAlign:{},//表单数据
                
                employeesData:{},
                isDepartmentShow:false,//选择部门子弹框是否显示
                isSaveAdd : '',//是否保存继续添加
                realnameAuthenticationStatus:'',//名字实名认证是不可以编辑
                isClickEdit:false,//是否点击编辑按钮
                isDimission:false,//是否离职(已离职不可编辑)

                // ------部门选择(嵌套弹框)-----
                inputDepartmentVal:'',//搜索value值
                checkAll: false,
                checkDepartmentTrue: [],//已选择的部门
                // editDepartmentTrue:[],//编辑时 已选的数据
                departmentNameData: [],//部门名字数据
                initDepartmentNameData:[],//部门名字数据最终结果
                isIndeterminate: true,
                isUnDepartmentData:false,//是否有部门数据
                dxDepartmentData:[],//部门数据
                breadcrumbData:[],//面包屑数据
                isActiveBreadcrumb:Number,//点击的当前的面包屑
                currentCompanyName:this.$cookie.get('currentCompanyName'),//公司名字
                
            };
        },
        computed:{
            
        },
        watch:{
            'formLabelAlign.userName':function(){
                this.formLabelAlign.userName = this.formLabelAlign.userName.replace(/\s+/g,'')
            }
        },
        created(){
         
        },
        methods:{
            //取消
            closeEmployeesFn(){
                let emitData = {
                    isShow:false
                }
                this.$emit('closeEmployeesFn',emitData);
               
            },
            //点击编辑按钮
            editEmployeesFn(){
                this.isClickEdit = false
            },
            //保存添加员工 / 编辑员工 
            saveEmployeesFn(formName,isShow) {
                this.isSaveAdd = isShow;
               
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // alert('submit!');
                        if(this.employeesData.type == 1){ //添加员工
                            this.postAddEmployeeFn()
                        }else{//编辑员工
                            this.postEditEmployeeFn() 
                        }
                        
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
            },
            //请求添加员工接口
            postAddEmployeeFn(){
                // console.log(this.formLabelAlign)
                let param = {
                    param: JSON.stringify(this.formLabelAlign)
                }
                addEmployee(param).then(result => {
                    // console.log(result)
                    if (result.code == '000000') {
                        this.addSuccessFn(result)
                        // this.departmentNameFn(result.data)
                    } else if (result.code == '100000') {
                        this.addErrorFn(result)
                    }
                }).catch(error => {
                        console.log(error)
                })
            },
            //编辑员工接口
            postEditEmployeeFn(){
                // console.log(this.formLabelAlign)
                let param = {
                    param: JSON.stringify(this.formLabelAlign)
                }
                updateEmployeeById(param).then(result => {
                    // console.log(result)
                    if (result.code == '000000') {
                        this.addSuccessFn(result)
                        // this.departmentNameFn(result.data)
                    } else if (result.code == '100000') {
                        this.addErrorFn(result)
                       
                    }
                }).catch(error => {
                        // console.log(error)
                })
            },
            //添加员工成功处理
            addSuccessFn(result){
                if(this.isSaveAdd == 'hide'){
                    this.closeEmployeesFn()
                }else{
                    this.formDataFn()
                }
                this.$message({
                    message: result.message,
                    type: 'success',
                    offset:300,
                    duration:3000,
                    // showClose:true
                });
                
                this.$emit('refreshFn');
            },
            //错误处理
            addErrorFn(result){
                this.$message({
                    message: result.message,
                    type: 'error',
                    offset:300,
                    duration:3000,
                    // showClose:true
                });
            },
            //父组件调子组件方法
            employeesDataFn(data){
                // console.log(data)
                this.employeesData = data;
                if( data.type == 2){//编辑
                    this.isClickEdit = true //编辑 默认先不可编辑(点击编辑按钮可以编辑)
                    let editData = Object.assign({},data.itemData)
                    this.formLabelAlign = editData;
                    //添加员工编辑处理数据
                    this.editSetDataFn(data.itemData);
                }else{//添加
                 
                    this.isClickEdit = false
                    this.formDataFn()
                }
            },
            formDataFn(){
                let defaultData = this.employeesData.defaultData
                let formData = {
                    userName: '',//姓名
                    mobile:'',//手机号
                    sex:'',//性别
                    jobNumber:"",//工号
                    hiredDate:new Date(),//入职日期
                    arrivalDate:new Date(),//到岗日期
                    departmentName:defaultData.departmentName,//部门名字
                    departmentId:defaultData.departmentId?defaultData.departmentId:'0',//部门id
                    role:'',//角色
                    position:'',//岗位
                    alternatePhone:'',//备用电话
                    workStatus:1,//在职状态
                    remark:'',//备注
                    email:'',//企业邮箱
                    phoneNumber:'',//座机号
                    extensionNnumber:'',//分机号
                    workPlace: '',//办公地点
                    companyId:this.$cookie.get('currentCompanyId'),//公司id
                };
                // console.log(defaultData.departmentId)
                this.formLabelAlign = Object.assign(formData,{})
                this.realnameAuthenticationStatus = false;//名字实名认证是不可以编辑
                this.checkDepartmentTrue = [{
                    name:defaultData.departmentName, //默认当前部门
                    id: defaultData.departmentId?defaultData.departmentId:'0'
                }];
                // this.editDepartmentTrue = this.checkDepartmentTrue.map(item=>{
                //     return item
                // });
            },
            //编辑 添加员工  处理数据
            editSetDataFn(itemData){
                // console.log(this.editDepartmentTrue)
                //已选的部门数据
                this.checkDepartmentTrue = itemData.departmentIdAndNameRes;
                // this.editDepartmentTrue = itemData.departmentIdAndNameRes.map(item=>{
                //     return item
                // });
                //部门名字
                let nameArr =  itemData.departmentIdAndNameRes.map(item=>{
                    return item.name
                });
                this.formLabelAlign.departmentName = nameArr.join();
                //激活状态 账号状态:1已激活 2未激活 3停用 4黑名单
                let isStatus = '';
                if( itemData.accountStatus == 1){
                    isStatus = '已激活'
                }else if(itemData.accountStatus == 2){
                    isStatus = '未激活'
                }else if(itemData.accountStatus == 3){
                    isStatus = '停用'
                }else if(itemData.accountStatus == 4){
                    isStatus = '黑名单'
                }
                this.formLabelAlign.accountStatus = isStatus;
                //员工是否认证(已认证不可编辑) 实名认证状态:1未认证/2认证审核/3已认证/4 认证不通过 
                let isCertification = itemData.realnameAuthenticationStatus == 'USER_AUTH003'?true:false
                this.realnameAuthenticationStatus = isCertification
                //已离职不可以编辑
                this.isDimission = Number(itemData.workStatus) == 2? true:false
                
            },
            //部门选择 显示
            departmentFn(){
                if(this.isClickEdit)return false
                this.isDepartmentShow = true;
                this.checkAll=false,
                this.listByCompanyId1()
            },
            //选择全选
            checkDepartmentAllFn(val) {
                // console.log(val)
                // this.initDepartmentNameData = val ? this.departmentNameData : [];
                this.isIndeterminate = false;
                this.dxDepartmentData.forEach((item,i)=>{
                    this.$set(item,'checked',val);
                    this.departmentTrueData(val,item,true)
                })

                let allTrue = []
                let isObj = {}
                if(val && this.checkDepartmentTrue.length>0){
                    for(let i = 0;i<this.checkDepartmentTrue.length;i++){
                        if(!isObj[this.checkDepartmentTrue[i].id]){
                            isObj[this.checkDepartmentTrue[i].id] = 1
                            allTrue.push(this.checkDepartmentTrue[i])   
                        }
                    }
                    this.checkDepartmentTrue = allTrue
                }
               

            },
            //选择部门的某一项
            checkedDepartmentItemFn(isChecked,i) {
                let thisData = this.dxDepartmentData
                this.checkAll = thisData.every(item=> item.checked == true)
                this.departmentTrueData(isChecked,thisData[i],false)
            },
            //删除部门
            delDepartmentItemFn(index,id){
                // console.log(index,id)
                let thisData = this.dxDepartmentData;
                let delIndex =  thisData.findIndex((item) =>{
                    return item.id == id
                } )
                if(delIndex>=0){
                    this.$set(thisData[delIndex],'checked',false)
                } 
                this.checkDepartmentTrue.splice(index, 1);
                this.checkAll =  thisData.every(item=> item.checked == true)
                this.isIndeterminate = true
    
            },
            //1级部门
            listByCompanyId1() {
                let param = {
                    param: JSON.stringify({
                        companyId: this.formLabelAlign.companyId //公司ID
                    })
                }
                listByCompanyId(param)
                    .then(result => {
                        // console.log(result)
                        if (result.code == '000000') {
                            // console.log(result.data.departmentVOList)
                            this.dxPushItemCheckFn( result.data.departmentVOList);
                            this.breadcrumbData = []
                            this.breadcrumbData.push({name:this.currentCompanyName})
                            if(this.dxDepartmentData.length == 0){
                                this.isUnDepartmentData = true
                            }else{
                                this.isUnDepartmentData = false
                            }
                          
                            // this.departmentNameFn(result.data)
                        } else if (result.code == '100000') {
                        }
                    })
                    .catch(error => {
                        // console.log(error)
                    })
            },
            //子级部门
            loadNode(departmentld) {
                let param = {
                    param: JSON.stringify({
                        departmentld
                    })
                }
                listByParentId(param).then(result => {
                   
                    if (result.code == '000000') {
                        this.dxPushItemCheckFn(result.data.departmentVOList);
                        //面包屑 //
                        this.breadcrumbData = result.data.pcListParentBySonResponses;
                        this.breadcrumbData.unshift({name:this.currentCompanyName})
                        if (this.dxDepartmentData.length === 0) {
                            this.isUnDepartmentData = true 
                        }else{
                            this.isUnDepartmentData = false 
                        }
                        
                        // this.checkAll = false
                    } else if (result.code == '100000') {
                    }
                }).catch(error => {
                    // console.log(error)
                })
               
            },
            //处理部门名字数据
            departmentNameFn(arr){
                let nameArr = arr.map((item)=>{
                    return item.name
                })
                return nameArr
            },
            dxPushItemCheckFn(arr){
                if(this.checkDepartmentTrue.length != 0){
                    arr.forEach((item,i)=>{
                        this.$set(item,'checked',false)
                        // console.log(this.checkDepartmentTrue)
                        this.checkDepartmentTrue.forEach((trueItem,rtueI)=>{
                            // console.log(trueItem.id +'----'+ item.id)
                            if(trueItem.id === item.id){
                                // console.log(i+'----------')
                                this.$set(item,'checked',true)
                            }
                        })
                    })
                }
                this.checkAll =  arr.every(item=> item.checked == true)
                this.dxDepartmentData = arr
            },
            departmentTrueData(isChecked,item,isAll){
                if(isChecked){
                    this.checkDepartmentTrue.push(item)
                }else{
                    this.checkDepartmentTrue.forEach((trueItem,i)=>{
                        if(trueItem.id === item.id){
                            this.checkDepartmentTrue.splice(i, 1);
                            this.$set(item,'checked',false)
                        }
                    })
                    
                };
            },
            //面包屑导航事件
            breadcrumbFn(item,i){
                this.isActiveBreadcrumb = i
                if(this.breadcrumbData.length <= 1) return
                if(item.id == undefined){
                    this.listByCompanyId1()
                }else{
                    this.loadNode(item.id)
                }
            },
            //部门搜索
            searchDepartmentFn(){
                // console.log(this.inputDepartmentVal)
                let param = {
					param: JSON.stringify({
						companyId: this.formLabelAlign.companyId, //公司ID
						likeName: this.inputDepartmentVal
					})
				}
				listByLike(param)
					.then(result => {
                        // console.log(result)
						if (result.code == '000000') {
                            // this.data = result.data
                            this.dxPushItemCheckFn(result.data);
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						console.log(error)
					})
            },
            //部门选择 保存
            saveDepartmentFn(){
                this.isDepartmentShow = false;
                let saveName = this.checkDepartmentTrue.map((item)=>{
                    return item.name
                })
                let saveId = this.checkDepartmentTrue.map((item)=>{
                    return item.id
                })
                this.formLabelAlign.departmentName = saveName.join()
                this.formLabelAlign.departmentId = saveId.join()
            },
            //部门 取消 选择
            cancelDepartmentFnFn(){
                this.isDepartmentShow = false;
                // console.log(this.editDepartmentTrue)
                // this.checkDepartmentTrue = this.editDepartmentTrue
                // console.log(this.$data)
                // this.$set(this.$data,'checkDepartmentTrue',this.editDepartmentTrue)
            },
            //岗位
            jobsFn(){

            },
            timeFn(){
                // console.log(this.formLabelAlign.hiredDate)
                sessionStorage.setItem('hiredDate',this.formLabelAlign.hiredDate)
            },
            //日期转换
            getDateFn(date){
                // console.log(date)
                if(!date){
                    return ''
                }else{
                    let d = new Date(date);
                    let resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
                    return resDate
                }
               
            },
            p(s) {
                return s < 10 ? '0' + s : s
            },
        }
    }
</script>

<style lang="scss" scoped>
    .dis-flex{
        display: -webkit-flex;
        display: flex;
    }
    .justify-content-between{
        @extend .dis-flex;
        justify-content:space-between;
        -webkit-justify-content: space-between;
    }
    .flex-wrap{
        -webkit-flex-wrap: wrap;
        flex-wrap: wrap;
    }
    .addEmployees{
        /deep/.el-dialog__title{
            font-weight: bold;
        }
        /deep/.el-dialog__header{
            text-align: left
        }
        /deep/.el-dialog--center{
            width: 80%;
            min-width: 1210px;
            // .el-dialog__body{
            //     padding: 40px 60px 20px 50px;
            // }
        }
        /deep/ .el-dialog__footer{
            padding: 0px 20px 40px;
        }
        .el-input,.el-textarea{
            width: 200px;
        }
        .el-button{
            width: 175px;
        }
        .item{
            @extend .justify-content-between;
            @extend .flex-wrap;
            .el-form--inline{
                .el-form-item{
                    width: 280px;
                }
            } 
        }
        .item3{
           .el-radio-group{
                width: 200px;
            }
            .el-radio{
                margin-right: 40px;
            }
        }
        .item4{
            border-bottom: solid 1px rgba(233,233,233,1);
            .el-input{
                width: 800px;
            }
            /deep/.el-form--inline{
                 /deep/.el-form-item{
                    width: 100%;
                }
            } 
        }
        .item5,.item7{
            padding-top:20px;
        }
        .item7{
            border-top: solid 1px rgba(233,233,233,1);
        }
    }
    .department-dialog{
        /deep/.el-dialog__header{
            text-align: left
        }
        /deep/ .el-dialog__footer{
            padding: 0px 20px 25px;
            text-align: center;
        }
        /deep/.el-breadcrumb__separator[class*=icon]{
            margin: 0px;
        }
        /deep/.el-breadcrumb__inner{
            cursor: pointer;
            line-height: 25px;
        }
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner, 
        /deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner{
            background-color: #E79A18;
            border-color: #E79A18;
            
        }
        /deep/.el-checkbox__inner{
            border-color: #DCDFE6;
            &:hover, &:focus{
                border-color: #E79A18;
            }
        }
        /deep/.el-checkbox__input.is-checked+.el-checkbox__label{
            color: #E79A18;
        }
        /deep/.el-input-group__append{
            color: #E79A18;
            cursor: pointer;
        }
        .el-button{
            width: 175px;
        }
        .cont-box{
            @extend .justify-content-between;
           
            .cont-item{
                padding: 20px 20px 30px;
                background:rgba(240,242,245,0.5);
                border-radius:2px;
                width: 330px;
                
            }
        }
        .cont-left{
            .div1{
                margin-bottom: 15px;
            }
        }
        .breadcrumb-box{
            margin-top: 10px;
        }
        .check-all{
            height: 40px;
            line-height: 40px;
            background: #ffffff;
            padding: 0px 10px;
        }
        .checkItem{
            height: 40px;
            line-height: 40px;
            padding: 0px 10px;
            @extend .justify-content-between;
            &:nth-child(2n-1){
                background: #ffffff
            }
        }
        .check-box{
           
            margin-top: 15px;
           
        }
        .check-item-box{
            height: 300px;
            overflow: auto;
        }
        .subordinate{
            font-size:14px; 
            cursor: pointer;
        }
        .cont-right{
            .true-itme{
                height: 428px;
                overflow: auto;
            }
            .div1{
                padding-left: 10px;
                margin-bottom: 15px;
                span{
                    color: #F8C059;
                    margin: 0px 5px;
                }
            }
            .check-true{
                @extend .justify-content-between;
                height: 40px;
                line-height: 40px;
                padding-left: 10px;
                &:nth-child(2n){
                    background: #ffffff
                }
            }
            .el-button{
                width: 20px;
                height: 20px;
            }
            .icon-box{
                height: 40px;
                width: 40px;
                text-align: center;
                cursor: pointer;
                &:hover{
                    .el-icon-close{
                        color: red;
                    }
                }
            }
        }
        .active-readcrumb{
            color: #E79A18;
            cursor: pointer;
        }
        .init-readcrumb{
            cursor: pointer;
            &:hover{
                color: #E79A18;
            }
        }
        .un-data{
            margin-top: 40px;
            text-align: center;
            color: #E79A18;
        }
       
    }
</style>