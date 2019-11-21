/***
    添加角色弹框
 */
<template>
    <div class="addRole">
        <el-dialog :title="formData.type == 1?'添加角色':'添加角色组'" 
            :visible.sync="isRokeShow"
            :before-close="closeFn"
            center>
            <el-form :model="formData" ref="formData">
                <el-form-item label="类型" :label-width="formLabelWidth"
                prop="type"
                :rules=" [{ required: true, message: '请选择角色类型', trigger: ['blur','change'] }]">
                    <el-select v-model="formData.type" placeholder="请选择角色类型">
                        <el-option label="角色" value="1"></el-option>
                        <el-option label="角色组" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" :label-width="formLabelWidth"
                prop="name"
                :rules="{required: true, message: '请填写名字', trigger:['blur','change']}">
                    <el-input v-model="formData.name" placeholder="请填写角色名字"></el-input>
                </el-form-item>
                <el-form-item label="所属角色组" :label-width="formLabelWidth"
                prop="roles"
                :rules=" [{ required: true, message: '请选择角所属角色组', trigger: ['blur','change'] }]"
                v-show="formData.type == 1">
                    <el-select v-model="formData.roles" placeholder="请选择角所属角色组">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button class="fz-18" type="primary" @click="confirmFn('formData')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // isRokeShow: true,
                formData: {
                    type: '1',//类型
                    name: '',//名称 
                    roles:'',//角色组        
                },
                formLabelWidth: '120px'
            }
        },
        watch:{
            'formData.name':function(){
                this.formData.name = this.formData.name.replace(/\s+/g,'')
            },
        },
        props:{
            isRokeShow:Boolean,
        },
        methods:{
            //确定
            confirmFn(formName){
                console.log(formName)
                this.$refs[formName].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                this.$emit('confirmDialogAddRoleFn')
            },
            //取消
            closeFn(){
                this.$emit('closeDialogAddRoleFn')
            }
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