<template>
    <div class="tags">
        <div class="tag" v-for="(item, index) in tags" :key="index">
                <el-tag
                :class="{activeTags: item.active }"
                :closable="item.path !== '/index'"
                :disable-transitions="false"
                @click.native="goPage(item.name,item.path)"
                @close="removeTab(item.path, item.name)">
                {{item.name}}
                </el-tag>
        </div>
    </div>  
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: "myMain",
        data() {
            return{
                myBool:true
            }
        },
        computed: {
            ...mapState(['tags']),
            pathName: function() {
                return this.$store.state.transferArray;
            }
        },
        mounted() {
            this.getTags();
        },
        updated:function(){
           // console.log('更新前')
            let int = this.$store.state.transferArray.length - 1
            this.myjs.myGo(this.$store.state.transferArray,this.$store.state.transferArray[int].name)
            if(this.myBool){
                this.myjs.myGo(this.$store.state.transferArray,this.$store.state.transferArray[int].name)
            }else{
                this.myjs.myGo(this.$store.state.transferArray,this.$store.state.transferArray[0].name)
            }
        },
        methods: {
            ...mapActions(['saveTags', 'getTags', 'deleteTags']),
            goPage(name,path) {
                this.saveTags({name, path});
                // this.myjs.myGo(this.$store.state.transferArray,name)
                this.$router.push(path);
            },
            removeTab(path, name) {
                this.deleteTags({path, name});
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
