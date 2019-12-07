/***
    添加角色弹框
 */
<template>
    <div class="addRole">
        <el-dialog :title=" formData.type == 1? `${titleText}角色`:`${titleText}角色组`" 
            :visible.sync="isShow"
            :before-close="closeFn"
            center>
            <el-form :model="formData" ref="formData">
                <el-form-item label="类型" :label-width="formLabelWidth"
                prop="type"
                :rules=" [{ required: true, message: '请选择角色类型', trigger: ['blur','change'] }]">
                    <el-select v-model="formData.type" placeholder="请选择角色类型"
                    :disabled="!dialogData.isAddEdit">
                        <el-option label="角色" value="1"></el-option>
                        <el-option label="角色组" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属角色组" :label-width="formLabelWidth"
                prop="roleSetId"
                :rules=" [{ required: true, message: '请选择角所属角色组', trigger: ['blur','change'] }]"
                v-if="formData.type == 1">
                    <el-select v-model="formData.roleSetId" placeholder="请选择角所属角色组">
                        <el-option v-for="(item,i) in rolesData" 
                        :key="i"
                        :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth"
                prop="name"
                :rules="{required: true, message: '请填写名字', trigger:['blur','change']}">
                    <el-input v-model="formData.name" placeholder="请填写角色名字"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="fz-18" type="primary" @click="confirmFn('formData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getRoleSetByCompanyId,addRole,updateRole} from '@/api/mgModule/authorityApi';
    import { getCompanyId } from '@/api/cookieStorage';
    export default {
        data(){
            return{
                // isRokeShow: true,
                formData: {
                    type: '1',//类型
                    name: '',//名称 
                    roleSetId:'',//角色组  
                    companyId: getCompanyId()     
                },
                formLabelWidth: '120px',
                dialogData:{},//父组件传来的数据
                titleText:'添加',
                companyId:getCompanyId(),//公司id
                rolesData:[],//角色组数据
            }
        },
        watch:{
            'formData.name':function(){
                this.formData.name = this.formData.name.replace(/\s+/g,'')
            },
        },
        props:{
            isShow:Boolean,
        },
        created(){
            
        },
        methods:{
            //确定
            confirmFn(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.dialogData.isAddEdit){//添加
                            this.addRoleFn();
                        }else{ //编辑
                            this.editRoleFn()
                        }
                    } else {
                        // console.log('error submit!!');
                        return false;
                    }
                });
                setTimeout(()=>{
                    this.$emit('confirmDialogAddRoleFn');
                },500)
                //重置
                // this.$refs[formName].resetFields();
            },
            //取消
            closeFn(){
                this.$emit('closeDialogAddRoleFn')
            },
            //父组组件点击事件 - 传参
            addRoleDialogFn(data){
                // console.log(data)
                // console.log(this.$data)
                this.dialogData = data
                this.$set(this.formData,'type',data.isRole?'1':'2');//1:角色 2：角色组
                this.titleText = data.isAddEdit?'添加':'编辑';
                this.getRoleSetByCompanyIdFn()
                if(data.isAddEdit){//添加
                    
                }else{//编辑
                    this.$set(this.formData,'name',data.data.name);
                    this.formData.roleSetId = data.data.roleSetId
                }
            },
            //所属角色组列表
            async getRoleSetByCompanyIdFn(){
                try{
                    let data = {
                        companyId:this.companyId
                    }
                    let res = await getRoleSetByCompanyId(data)
                    // console.log(res)
                    this.rolesData = res.data
                }catch(error){
                    console.log(error)
                }
            },
            //添加角色/角色组
            async addRoleFn(){
                if(this.formData.type==2){
                    delete this.formData.roleSetId
                }
                // console.log(this.formData)
                try{
                    
                    let res = await addRole(this.formData)
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }catch(error){
                    console.log(error)
                }
            },
            //编辑角色/角色组
            async editRoleFn(){
                if(this.formData.type==2){//角色组
                    delete this.formData.roleSetId
                    this.formData.id = this.dialogData.data.id
                }else{
                    this.formData.id = this.dialogData.data.roleId
                }
                // console.log(this.formData)
                try{
                    let res = await updateRole(this.formData);
                    this.$message({
                        message: res.message,
                        type: 'success'
                    })
                }catch(error){
                    console.log(error)
                }
            },
            
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/css/dialog.scss';
    @import '@/assets/css/public.scss';
    $input-w:310px;
    .addRole{
        /deep/.el-dialog{
            width: 600px;
        }
        /deep/.el-select,/deep/.el-input{
            width: $input-w
        }
    }
</style>