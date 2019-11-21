<template>
<!-- 添加/编辑 部门 -->
    <div class="addDepartment">
        <!-- :visible.sync="departmentData.isShow" -->
        <el-dialog
            class="dialog-box"
            :title="departmentData.title"
            :visible.sync="isDepartmentShow"
            center
            :before-close="handleCloseFn">
            <!-- 嵌套弹框 -->
            <el-dialog
                class="department-dialog"
                width="820px"
                title='上级部门选择'
                :visible.sync="departmentShow"
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
                                <!-- <el-checkbox  v-model="checkAll" @change="checkDepartmentAllFn">全选</el-checkbox> -->
                            </div>
                            <div class="checkItem" v-for="(item,i) in dxDepartmentData" :key="item.id">
                                <el-checkbox @change="checkedDepartmentItemFn(item.checked,i)" v-model="item.checked" :label="item.id">{{item.name}}</el-checkbox>
                                <div class="subordinate" @click="loadNode(item.id)">下级</div>
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
                <el-form label-position="rigth" label-width="80px" :model="formLabelAlign" ref="formLabelAlign">
                    <el-form-item label="部门名称"  
                        prop="name" 
                        :rules="{ required: true, message: '部门名称不能为空', trigger: 'blur' }"
                    >
                        <el-input type="name" v-model="formLabelAlign.name" ></el-input>
                    </el-form-item>
                    <div @click="departmentFn">
                            <el-form-item label="上级部门"  
                            prop="region" 
                            :rules="{ required: true, message: '部门名称不能为空', trigger: 'change' }"
                        >
                            <el-input type="textarea" v-model="formLabelAlign.region" readonly 
                            :autosize="{ minRows: 1.5, maxRows: 4}"></el-input>
                        </el-form-item>
                        </div>
                    <el-form-item label="部门主管">
                        <!-- <el-input v-model="formLabelAlign.type" ></el-input> -->
                        <el-autocomplete 
                            type="name" 
                            v-model="formLabelAlign.type" 
                            :fetch-suggestions="querySearchAsyncType"
                            @select="handleSelectType"
                            style='width:100%;'
                            >
                        </el-autocomplete>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="warning" @click="saveFn('formLabelAlign')">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script> 

    import {listByLike, addDepartment, updateDepartmentById, ListType, listByCompanyId, listByParentId} from '../../api/api'
    // import addEmployeesDialog from '@/views/orgStructure/OrganizationalStructure.vue'
    // import child  from './../../views/orgStructure/OrganizationalStructure.vue'
    export default {
        // props:['departmentData'],  
        props:{
            test:{
                type:String,
                default:''
            },
            isDepartmentShow:Boolean,
            default:false
        },
        data() {
            return {
                dataList:[],
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                },
                departmentData:{},
                // centerDialogVisible: false,
                //-------------------Cheng-----------------------
                restaurantsData: [],
                timeout:  null,
                departmentld:'',//部门id
                formLabelAlignId:'',//上级部门id
                departmentShow:false,//选择部门弹出框
                // ------部门选择(嵌套弹框)-----
                inputDepartmentVal:'',//搜索value值
                checkAll: false,
                checkDepartmentTrue: [],//已选择的部门
                editDepartmentTrue:[],//编辑时 已选的数据
                departmentNameData: [],//部门名字数据
                initDepartmentNameData:[],//部门名字数据最终结果
                isIndeterminate: true,
                isUnDepartmentData:false,//是否有部门数据
                dxDepartmentData:[],//部门数据
                breadcrumbData:[],//面包屑数据
                isActiveBreadcrumb:Number,//点击的当前的面包屑
                currentCompanyName:this.$cookie.get('currentCompanyName'),//公司名字
                departmentld:'',
                aadId:'',
                aadName:[],
                ccname:'',
                // addrformLabelAlign:[]
            };
        },
        components: {
            
        },
        created(){

            // //console.log(this.isDepartmentShow)
        }, 

        methods:{
            //取消
            handleCloseFn(){
                let emitData = {
                    isShow:false
                }
                let formData = this.formLabelAlign
                for(let i in formData){
                    formData[i] = ''
                }
                this.$emit('cancelFn',emitData);
               
            },
            //保存
            saveFn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //console.log(this.departmentData.title)
                        if(this.departmentData.title === '添加部门'){
                            this.addDepartment1();
                        }else if(this.departmentData.title === '编辑部门'){
                            this.updateDepartmentById1();
                        }
                        this.$emit('refreshFn');
                    } else {
                        ////console.log('error submit!!');
                        return false;
                    }
                });
            },
            //右侧列表 添加部门
            addDepartment1() {
                let param = {
                    param: JSON.stringify({
                        companyId: this.$cookie.get('currentCompanyId'), //公司ID
                        name: this.formLabelAlign.name,//部门名称
                        parentId: this.aadId,//部门ID
                        managerId: this.$cookie.get('userId'), //用户ID
                    })
                }
                addDepartment(param).then(result => {
                        if (result.code == '000000') {
                            //this.isDepartmentShow = false;
                            this.isDepartmenShow = true
                            this.$message.success('添加部门成功');
                            this.handleCloseFn();
                        } else if (result.code == '100000') {
                            this.$message.error(result.message);
                        }
                    })
                    .catch(error => {
                        //console.log(error)
                    })
            },
             //右侧列表 编辑部门
            updateDepartmentById1() {
                let param = {
                    param: JSON.stringify({
                        managerId: this.$cookie.get('userId'), //用户ID
                        departmentId:this.aadId,
                        parentId:this.formLabelAlignId,
                        name:this.formLabelAlign.name,
                        companyId: this.$cookie.get('currentCompanyId'), //公司ID
                    })
                }
                updateDepartmentById(param).then(result => {
                        if (result.code == '000000') {
                            //this.isDepartmentShow = false;
                            this.isDepartmenShow = true
                            this.$message.success('保存成功');
                            this.handleCloseFn();
                        } else if (result.code == '100000') {
                            this.$message.error(result.message);
                        }
                    })
                    .catch(error => {
                        //console.log(error)
                    })
            },
            departmentDataFn(data){
                // console.log(data)
                if(data.redactRegion){
                    if(data.title === '添加部门'){
                        let arr1 = data.redactRegion.filter((item,i)=>{
                            return i< data.redactRegion.length
                        })
                        let arr = arr1.map((item,i)=>{
                            return item.name
                        })
                        let redactName = arr.join("/");
                        if(data.redactId === undefined){//用户第一次进来没有部门 默认显示公司名
                            this.formLabelAlign.region = this.$cookie.get("currentCompanyName");
                        }else if(arr.length === 1){
                            this.formLabelAlign.region = '';//弹窗内上级部门默认显示
                        }else{
                            this.formLabelAlign.region = redactName;//弹窗内上级部门默认显示
                        }
                        
                        let arr2 = data.redactRegion.filter((item,i)=>{
                            return i< data.redactRegion.length-1
                        })
                        this.breadcrumbData = arr2;//弹窗内面包屑
                        //面包霄最后一个元素 id
                        let acc1 = arr1.filter((item,i)=>{
                            return i< arr1.length-1
                        })
                        let arr22 = acc1.map((item,i)=>{
                            return item.id
                        })
                        let arr33 = arr22[arr22.length - 1];
                        this.departmentld = arr33;//添加部门时倒数第二个元素id
                    }else if(data.title === '编辑部门'){
                        this.formLabelAlign.name = data.redactName;
                        let arr1 = data.redactRegion.filter((item,i)=>{
                        return i< data.redactRegion.length-1
                        })
                        let arr = arr1.map((item,i)=>{
                            return item.name
                        })
                        let redactName = arr.join("/");
                        this.formLabelAlign.region = redactName;//弹窗内上级部门默认显示
                        //console.log(arr1)
                        let arr2 = arr1.filter((item,i)=>{
                            return i< arr1.length-1
                        })
                        let arr22 = arr1.map((item,i)=>{
                            return item.id
                        })
                        let arr33 = arr22[arr22.length - 1];
                        //console.log(arr33);
                        this.departmentld = arr33;//编辑时到十点一个元素id
                        this.breadcrumbData = arr1;//弹窗内面包屑
                    }
                }
                let defaultData = data.defaultData
               
                //console.log(data)
                this.formLabelAlignId = data.formLabelAlignId;
                this.aadId = data.redactId;//部门id
                this.ccname = data.redactName;
                //console.log(data.redactId + data.redactName);
                this.departmentData = data;
            },
            //搜索部门主管
            querySearchAsyncType(queryString, cb) {
                //console.log(queryString)
                //调用后台接口
                let param = {
					param: JSON.stringify({
						companyId: this.$cookie.get('currentCompanyId'), //公司ID
						likeName:queryString
					})
				}
				ListType(param).then(result => {
                        //console.log(result)
						if (result.code == '000000') {
                            
                           this.dataList=[]; 
                            for(let i = 0; i < result.data.length; i++){
                                this.dataList.push({value: result.data[i].userName + '/' + result.data[i].departmentName + '/' + result.data[i].jobNumber});
                            }
                            cb(this.dataList);//关键点
                            
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						//console.log(error)
                    })
            },
            createStateFilter(queryString) {
                return (state) => { 
                    return (formLabelAlign.type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelectType(item) {
                //console.log(item);
                this.departmentld = item.id;
            },
            //部门选择 显示
            departmentFn(){
                this.departmentShow = true;
                // this.checkAll=false,
                // console.log(this.breadcrumbData);
                // let ids = '';

                // if(this.departmentData.title === '添加部门'){
                    
                // }else{

                // }
                if(this.breadcrumbData.length === 1){
                    this.listByCompanyId1();
                }else{
                    this.loadNode(this.departmentld);
                }
            },
            //选择全选
            checkDepartmentAllFn(val) {
                //console.log(val)
                // this.initDepartmentNameData = val ? this.departmentNameData : [];
             
                this.isIndeterminate = false;
                this.dxDepartmentData.forEach((item,i)=>{
                    this.$set(item,'checked',val);
                    // this.departmentTrueData(val,item,true)
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
                 //console.log(isChecked);
                 //console.log(i);
                let thisData = this.dxDepartmentData
                 //console.log(thisData);
                thisData.map(item=>{
                    item.checked = false
                })
                this.$set(thisData[i],'checked',true);
                this.checkDepartmentTrue=[];
                this.checkDepartmentTrue.push(thisData[i]);
            },
            //删除部门
            delDepartmentItemFn(index,id){
                // //console.log(index,id)
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
                        companyId: this.$cookie.get('currentCompanyId'), //公司ID
                    })
                }
                listByCompanyId(param)
                    .then(result => {
                        // //console.log(result)
                        if (result.code == '000000') {
                            // //console.log(result.data.departmentVOList)
                            this.dxPushItemCheckFn( result.data.departmentVOList);
                            // console.log(this.departmentld);
                            let aa = result.data.departmentVOList;
                                for(let i = 0; i<aa.length; i++){
                                   // //console.log(aa[i].id);
                                    this.$set(aa[i],'checked',false);
                                    if(aa[i].id === this.aadId){
                                        this.$set(aa[i],'checked',true);
                                        this.checkDepartmentTrue = [];
                                        this.checkDepartmentTrue.push({name:this.ccname});
                                        return
                                    }
                                }
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
                    //    //console.log(error)
                    })
            },
            //子级部门
            loadNode(departmentld) {
                if(departmentld === undefined){
                    this.checkDepartmentTrue = [];
                    this.breadcrumbData = [];
                    this.breadcrumbData.push({name:this.currentCompanyName,id:'0'})
                }else{
                    let param = {
                    param: JSON.stringify({
                        departmentld
                    })
                    }
                    listByParentId(param).then(result => {
                       // //console.log(departmentld);
                        if (result.code == '000000') {
                            this.dxPushItemCheckFn(result.data.departmentVOList);
                            //面包屑 
                            //console.log(this.breadcrumbData)
                            this.breadcrumbData = [];
                            this.breadcrumbData = result.data.pcListParentBySonResponses;
                            this.breadcrumbData.unshift({name:this.currentCompanyName,id:'0'})
                            if (this.dxDepartmentData.length === 0) {
                                this.isUnDepartmentData = true 
                            }else{
                                this.isUnDepartmentData = false 
                            }
                            
                            let aa = result.data.departmentVOList;
                            for(let i = 0; i<aa.length; i++){
                                this.$set(aa[i],'checked',false);
                                if(aa[i].id === this.aadId){
                                    this.$set(aa[i],'checked',true);
                                    this.checkDepartmentTrue = [];
                                    this.checkDepartmentTrue.push({name:this.ccname});
                                }
                            }
                            // this.checkAll = false
                        } else if (result.code == '100000') {

                        }
                    }).catch(error => {
                        //console.log(error)
                    })
                }
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
                        this.$set(item,'checked',false);
                        // //console.log(this.checkDepartmentTrue)
                        this.checkDepartmentTrue.forEach((trueItem,rtueI)=>{
                            // //console.log(trueItem.id +'----'+ item.id)
                            if(trueItem.id === item.id){
                                // //console.log(i+'----------')
                                this.$set(item,'checked',true);
                            }
                        })
                    })
                }
                this.checkAll =  arr.every(item=> item.checked == true);
                this.dxDepartmentData = arr;
            },
            // departmentTrueData(isChecked,item,isAll){
            //     if(isChecked){
            //         this.checkDepartmentTrue.push(item)
            //     }else{
            //         this.checkDepartmentTrue.forEach((trueItem,i)=>{
            //             if(trueItem.id === item.id){
            //                 this.checkDepartmentTrue.splice(i, 1);
            //                 this.$set(item,'checked',false)
            //             }
            //         })
            //     };
            // },
            //面包屑导航事件
            breadcrumbFn(item,i){
             //   console.log(item.id);
                this.isActiveBreadcrumb = i
                if(this.breadcrumbData.length <= 1) return
                if(item.id == 0){
                    this.listByCompanyId1()
                }else{
                    this.loadNode(item.id)
                }
            },
            //部门搜索
            searchDepartmentFn(){
                //console.log(this.inputDepartmentVal)
                let param = {
					param: JSON.stringify({
						companyId: this.$cookie.get('currentCompanyId'), //公司ID
						likeName: this.inputDepartmentVal
					})
				}
				listByLike(param)
					.then(result => {
                        //console.log(result)
						if (result.code == '000000') {
                            // this.data = result.data
                            this.dxPushItemCheckFn(result.data);
						} else if (result.code == '100000') {
						}
					})
					.catch(error => {
						//console.log(error)
					})
            },
            //部门选择 保存
            saveDepartmentFn(){
                this.departmentShow = false;
                let saveName = this.checkDepartmentTrue.map((item)=>{
                    return item.name
                })
                let saveId = this.checkDepartmentTrue.map((item)=>{
                    return item.id
                })
                this.formLabelAlign.region = saveName.join();
                this.aadId = '';
                this.aadId = saveId.join();
                //console.log(this.aadId);
            },
            //部门 取消 选择
            cancelDepartmentFnFn(){
                this.departmentShow = false;
                //console.log(this.editDepartmentTrue)
                // this.checkDepartmentTrue = this.editDepartmentTrue
                //console.log(this.$data)
                this.$set(this.$data,'checkDepartmentTrue',this.editDepartmentTrue)
            },
        },
        mounted() {
            
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
    .addDepartment{
        /deep/.el-dialog__title{
            font-weight: bold;
        }
        /deep/.el-dialog__header{
            text-align: left
        }
        /deep/.el-dialog--center{
            width: 30%;
            min-width: 650px;
            .el-dialog__body{
                padding: 40px 60px 20px 50px;
            }
        }
        /deep/.el-dialog__footer{
            padding: 0px 20px 40px;
        }
        .el-button{
            width: 175px;
        }
        
    }
    //选择部门弹出框样式
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
            height: 300px;
            overflow: auto;
            margin-top: 15px;
        }
        .subordinate{
            font-size:14px; 
            cursor: pointer;
        }
        .cont-right{
            .true-itme{
                height: 380px;
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
        //暂无部门
        .un-data{
            margin-top: 40px;
            text-align: center;
            color: #E79A18;
        }
</style>