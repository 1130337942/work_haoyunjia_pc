<template>
    <div class="tags">
        
    </div>  
</template>

<script>
   
    export default {
        name: "myMain",
        data() {
            return{
                myBool:true
            }
        },
        computed: {
            pathName: function() {
             
            }
        },
        mounted() {
            
        },
        updated:function(){
           
        },
        methods: {
            goPage(name,path) {
                this.$router.push(path);
            },
            removeTab(path, name) {
                
            }
        }
    }
</script>
<style lang="scss" scoped>
    .el-tag {
    background-color: #fbf7f7;
    border-color: rgba(233,233,233,1);    
    display: inline-block;
    height: 28px;
    font-size:14px;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:#000000;
    border-width: 0;
    border-style: none;
    border-radius:8px 8px 0px 0px;
    -webkit-box-sizing: none;
    box-sizing: none;
    white-space: nowrap;
}
.el-tag:hover{
    cursor: pointer;
}
.activeTags{
    color:#FFFFFF;
    background: #666666;
}
    
</style>
<style scoped>
    .tags{
        display: flex;
    }
   
</style>
