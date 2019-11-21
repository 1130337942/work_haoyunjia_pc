/**
* AllBill.vue
*
* 灵活用工 全部订单
*
* @author  程纪赢
*/
<template>
    <div>
            <div class="clearfix referResult">
               <div class="left" style='width:100%;'>
                <ul class='clearfix top_screen'>
                        <li class='left' style='width:40%;'>
                            <el-input
                                placeholder="请输入内容"
                                suffix-icon="el-icon-search"
                                size="mini"
                                style='width:91%;'
                                v-model="company_name">
                            </el-input>
                        </li>
                         <li class='left'>
                            <label>签署状态：</label>
                            <el-select v-model="value" placeholder="请选择" value="" size='mini' style="width: 60%;">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li class='left'>
                            <label>公司类型：</label>
                            <el-select v-model="value" placeholder="请选择" value="" size='mini' style="width: 60%;">
                                <el-option
                                        v-for="item in options2"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                </ul>        
               </div>    
            </div>
            <div class="clearfix tasksResult">
                <div class="left">
                    <el-button icon="el-icon-search" size='mini'>查询</el-button>
                    <el-button size="mini" style="margin-left: 10px;" @click="toLead = true">导入</el-button>
                    <el-button size="mini" style="margin-left: 10px;">导出</el-button>
                    <el-button size="mini" style="margin-left: 10px;">导入模板</el-button>
                </div>
                <div class="right">
                    <el-button size="mini" @click=refresh >刷新</el-button>
                    <el-button size="mini">列表设置</el-button>
                </div>
            </div>
            <el-dialog
                    title="导入"
                    :visible.sync="toLead"
                    width="30%"
                    center>
                    <el-upload
                    class="upload-demo"
                    ref="upload"
                    action=" "
                    :on-change = 'changeFile'
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" :disabled="!!fileList.length">选取文件</el-button>
                    </el-upload>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="toLead = false">取 消</el-button>
                        <el-button type="primary" @click="submit">确 定</el-button>
                    </span>
                </el-dialog>
            <!--表格-->
            <div class='pagingResult'>
                <el-table
                        :data="tableData"
                        style="width: 100%"
                        height="528"
                        :header-cell-style='styleObj'>
                    <el-table-column type="index" width="50" align="center"></el-table-column>
                    <el-table-column prop="businessOrderNo" label="业务订单号" width="100" align="center"></el-table-column>
                    <el-table-column prop="valuationUnitText" label="计价单位" width="100" align="center"></el-table-column>
                    <el-table-column prop="number" label="数量" width="100" align="center"></el-table-column>
                    <el-table-column prop="unitMoney" label="单位金额" width="100" align="center"></el-table-column>
                    <el-table-column prop="totalMoney" label="总金额" width="100" align="center"></el-table-column>
                    <el-table-column prop="remark" label="业务备注" width="100" align="center"></el-table-column>
                    <el-table-column prop="subpackageId" label="分包公司ID" width="100" align="center"></el-table-column>
                    <el-table-column prop="serviceType" label="服务类型" width="100" align="center"></el-table-column>
                    <el-table-column prop="freeworkMobile" label="接单人手机号" width="180" align="center"></el-table-column>
                    <el-table-column prop="freeworkIdNumber" label="接单人身份证号" width="180" align="center"></el-table-column>
                    <el-table-column prop="freeworkName" label="接单人姓名" width="180" align="center"></el-table-column>
                    <el-table-column prop="status" label="订单状态" width="100" align="center"></el-table-column>
                    <el-table-column prop="billMonth" label="账单月份" width="100" align="center"></el-table-column>
                    <el-table-column prop="importBatch" label="导入批次" width="100" align="center"></el-table-column>
                    <el-table-column prop="laborBegin" label="用工开始时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="laborEnd" label="用工结束时间" width="180" align="center"></el-table-column>
                    <el-table-column prop="subpackageTypeText" label="分包公司类型" width="180" align="center"></el-table-column>
                    <el-table-column prop="companyName" label="用工企业名称" width="180" align="center"></el-table-column>
                    <el-table-column prop="partnerName" label="众包平台公司名称" width="180" align="center"></el-table-column>
                    <el-table-column prop="subpackageName" label="分包公司名称" width="180" align="center"></el-table-column>
                </el-table>
            </div>
            <!--分页-->
            <div class="block">
            <el-pagination
                    align='center'
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[1,5,10,20]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length">
            </el-pagination>
            </div>
    </div>
</template>

<script>
    export default {
        name: "regard",
        data(){
            return {
                toLead:false,
                fileList: [],
                company_name:'',
                medium:'mini',
                options: [{
                    value: '选项1',
                    label: '草稿'
                }, {
                    value: '选项2',
                    label: '待签署'
                }, {
                    value: '选项3',
                    label: '已签署'
                }],
                options2: [{
                    value: '选项2',
                    label: '公司'
                }, {
                    value: '选项3',
                    label: '自由职业'
                }],
                value: '',
                tableData: [{
                    businessOrderNo:'YT20190917',
                    valuationUnitText:'天',
                    number:'60',
                    unitMoney:'5',
                    totalMoney:'300',
                    remark:'无',
                    subpackageId:'UID132714',
                    serviceType:'市场推广',
                    freeworkMobile:'13271446325',
                    freeworkIdNumber:'410422199406005019',
                    freeworkName:'李洋',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 00:00',
                    laborEnd:'2019/10/02 00:00',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'李好',
                },{
                    businessOrderNo:'YT20190901',
                    valuationUnitText:'天',
                    number:'1',
                    unitMoney:'220',
                    totalMoney:'220',
                    remark:'无',
                    subpackageId:'UID132715',
                    serviceType:'市场推广',
                    freeworkMobile:'1523698564',
                    freeworkIdNumber:'410422199012525236',
                    freeworkName:'张雪琪',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 01:50',
                    laborEnd:'2019/10/02 17:00',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张淑芳',
                },{
                    businessOrderNo:'YT20191015',
                    valuationUnitText:'天',
                    number:'60',
                    unitMoney:'10',
                    totalMoney:'600',
                    remark:'无',
                    subpackageId:'UID188017',
                    serviceType:'配送服务',
                    freeworkMobile:'15137546696',
                    freeworkIdNumber:'622458198206345785',
                    freeworkName:'李和平',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 12:10',
                    laborEnd:'2019/10/03 14:45',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'一洛',
                },{
                    businessOrderNo:'YT20190911',
                    valuationUnitText:'天',
                    number:'37',
                    unitMoney:'8',
                    totalMoney:'296',
                    remark:'无',
                    subpackageId:'UID145637',
                    serviceType:'配送服务',
                    freeworkMobile:'17087777634',
                    freeworkIdNumber:'6224221538206345785',
                    freeworkName:'李大春',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/07 12:00',
                    laborEnd:'2019/10/08 15:30',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'夏洛',
                },{
                    businessOrderNo:'YT20190983',
                    valuationUnitText:'天',
                    number:'71',
                    unitMoney:'12',
                    totalMoney:'852',
                    remark:'无',
                    subpackageId:'UID145637',
                    serviceType:'配送服务',
                    freeworkMobile:'17087777634',
                    freeworkIdNumber:'622125199065351024',
                    freeworkName:'张晓亮',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/07 09:00',
                    laborEnd:'2019/10/08 10:10',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'汪小荷',
                },{
                    businessOrderNo:'YT20190810',
                    valuationUnitText:'天',
                    number:'2',
                    unitMoney:'220',
                    totalMoney:'440',
                    remark:'无',
                    subpackageId:'UID145112',
                    serviceType:'配送服务',
                    freeworkMobile:'18021441235',
                    freeworkIdNumber:'423321188096346103',
                    freeworkName:'卫士杰',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/11 00:01',
                    laborEnd:'2019/10/12 07:39',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张亚柯',
                },{
                    businessOrderNo:'YT20191028',
                    valuationUnitText:'天',
                    number:'92',
                    unitMoney:'110',
                    totalMoney:'10120',
                    remark:'无',
                    subpackageId:'UID145110',
                    serviceType:'配送服务',
                    freeworkMobile:'15237445452',
                    freeworkIdNumber:'523321189634101523',
                    freeworkName:'刘琼',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 17:30',
                    laborEnd:'2019/10/02 22:01',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张亮',
                },{
                    businessOrderNo:'YT20191056',
                    valuationUnitText:'天',
                    number:'3',
                    unitMoney:'220',
                    totalMoney:'660',
                    remark:'无',
                    subpackageId:'UID145119',
                    serviceType:'配送服务',
                    freeworkMobile:'18354556936',
                    freeworkIdNumber:'366421199905061037',
                    freeworkName:'陆贞',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/09 00:30',
                    laborEnd:'2019/10/10 03:56',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张潇铭',
                },{
                    businessOrderNo:'YT20190950',
                    valuationUnitText:'天',
                    number:'57',
                    unitMoney:'27',
                    totalMoney:'1539',
                    remark:'无',
                    subpackageId:'UID132714',
                    serviceType:'市场推广',
                    freeworkMobile:'13271446325',
                    freeworkIdNumber:'410422199406005019',
                    freeworkName:'李素丽',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 00:00',
                    laborEnd:'2019/10/02 00:00',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'沈聪',
                },{
                    businessOrderNo:'YT20190901',
                    valuationUnitText:'天',
                    number:'98',
                    unitMoney:'120',
                    totalMoney:'11760',
                    remark:'无',
                    subpackageId:'UID132715',
                    serviceType:'市场推广',
                    freeworkMobile:'1523698564',
                    freeworkIdNumber:'410422199012525236',
                    freeworkName:'李颖',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 01:50',
                    laborEnd:'2019/10/02 17:00',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'程一诺',
                },{
                    businessOrderNo:'YT20191015',
                    valuationUnitText:'天',
                    number:'17',
                    unitMoney:'200',
                    totalMoney:'3400',
                    remark:'无',
                    subpackageId:'UID188017',
                    serviceType:'配送服务',
                    freeworkMobile:'15137546696',
                    freeworkIdNumber:'622458198206345785',
                    freeworkName:'袁开亮',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 12:10',
                    laborEnd:'2019/10/03 14:45',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张力',
                },{
                    businessOrderNo:'YT20190911',
                    valuationUnitText:'天',
                    number:'1',
                    unitMoney:'220',
                    totalMoney:'220',
                    remark:'无',
                    subpackageId:'UID145637',
                    serviceType:'配送服务',
                    freeworkMobile:'17087777634',
                    freeworkIdNumber:'6224221538206345785',
                    freeworkName:'刘闪闪',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/07 12:00',
                    laborEnd:'2019/10/08 15:30',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'胡一',
                },{
                    businessOrderNo:'YT20190983',
                    valuationUnitText:'天',
                    number:'58',
                    unitMoney:'180',
                    totalMoney:'5800',
                    remark:'无',
                    subpackageId:'UID145637',
                    serviceType:'配送服务',
                    freeworkMobile:'17087777634',
                    freeworkIdNumber:'622125199065351024',
                    freeworkName:'杨大璐',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/07 09:00',
                    laborEnd:'2019/10/08 10:10',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'白俊俊',
                },{
                    businessOrderNo:'YT20190810',
                    valuationUnitText:'天',
                    number:'12',
                    unitMoney:'98',
                    totalMoney:'1176',
                    remark:'无',
                    subpackageId:'UID145112',
                    serviceType:'配送服务',
                    freeworkMobile:'18021441235',
                    freeworkIdNumber:'423321188096346103',
                    freeworkName:'李元杰',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/11 00:01',
                    laborEnd:'2019/10/12 07:39',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'张娜',
                },{
                    businessOrderNo:'YT20191028',
                    valuationUnitText:'天',
                    number:'5',
                    unitMoney:'201',
                    totalMoney:'105',
                    remark:'无',
                    subpackageId:'UID145110',
                    serviceType:'配送服务',
                    freeworkMobile:'15237445452',
                    freeworkIdNumber:'523321189634101523',
                    freeworkName:'梁达张',
                    status:'已完成',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/01 17:30',
                    laborEnd:'2019/10/02 22:01',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'吴亚群',
                },{
                    businessOrderNo:'YT20191056',
                    valuationUnitText:'天',
                    number:'37',
                    unitMoney:'170',
                    totalMoney:'6290',
                    remark:'无',
                    subpackageId:'UID145119',
                    serviceType:'配送服务',
                    freeworkMobile:'18354556936',
                    freeworkIdNumber:'366421199905061037',
                    freeworkName:'张珊珊',
                    status:'待接单',
                    billMonth:'201910',
                    importBatch:'无',
                    laborBegin:'2019/10/09 00:30',
                    laborEnd:'2019/10/10 03:56',
                    subpackageTypeText:'自由职业者',
                    companyName:'圆通速递',
                    partnerName:'一招盈',
                    subpackageName:'韩璐奇',
                }],
                currentPage: 1, // 当前页码
                total: 20, // 总条数
                pageSize: 5, // 每页的数据条数
                styleObj: {
                    color:'rgba(0,0,0,0.8)',
                    background:'#CED4D9',
                    fontSize:'14px',
                    fontFamily: "PingFangSC-Medium",
                    fontWeight:500,
                }
            }
        },
        methods: {
             //上传
            changeFile(file){
                this.fileList.push(file)
            },
            submit(){
                let file = this.fileList[0];
                let param = new FormData();
                param.append("file", file.raw);
                let config = {
                //添加请求头
                    headers: { "Content-Type": "multipart/form-data" },
                };
                    //上传
                    this.$axios.post('http://dfs.goodluckplus.com/fs/uploadbig?fileName='+ file.name,param).then(result => {
                        this.toLead = false;
                        var $result = result.data.data

                        this.$axios({
                        url:'http://basic.goodluckplus.com/pcpartener/rest/import',
                        method: 'post',
                        data: {
                            param:JSON.stringify({
                                fileName:file.name,
                                url:$result.url,
                                companyId:this.$cookie.get('currentCompanyId')
                            })
                        },
                        headers:{
                            Authorization:this.$cookie.get('token'),
                        }
                        }).then(result =>{
                            console.log(result)
                            if(result.data.code == '000000'){
                                alert(result.data.data.msg)
                                this.refresh()
                            }else if(result.data.code == '100000'){
                                alert(result.data.message)
                            }  
                        }).catch((error)=>{
                            alert('请求失败')
                            console.log(error)
                            //判断是否是401
                        });

                    }).catch(error => {
                    alert('上传失败！');
                });
            },
            handleRemove(file, fileList) {
            //    console.log(file, fileList);
                this.fileList.splice(0,1)
            },
            handlePreview(file) {
            //    console.log(file);
            },
            //分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.currentPage = val;
            },
            //列表
            // getAllList(){
            //      this.$axios({
            //             url:'http://hr.goodluckplus.com/crowdOrder/rest/getAll',
            //             method: 'post',
            //             data: {
            //                 param:JSON.stringify({
            //                     id:this.$cookie.get('currentCompanyId') , //公司ID
            //                 }),
            //                 pageParam:{
            //                     pageIndex:0, //分页的页索引  写死0
            //                     pageSize:10
            //                 } 
            //             },
            //             headers:{
            //                 Authorization:this.$cookie.get('token')
            //             }
            //             }).then(result =>{
            //                 if(result.data.code == '000000'){ //成功
            //                     console.log(result)
            //                     this.tableData = result.data.data
            //                 }else if(result.data.code == '100000'){ //失败
            //                 //  alert(result.data.message)
            //                 }  
            //             }).catch((error)=>{
            //                 alert('请求失败')
            //                 console.log(error)
            //             });
            // },
             //刷新
            refresh(){
                // this.Findkeyword = ''
                // this.pullDownValue = ''
                this.getAllList()
            }
        },
        created(){
            var $cookie = this.$cookie;
            this.$cookie.get('token')  ;
            //this.getAllList()   ;
        }
    }
</script>
<style lang="scss">
 
</style>
<style lang="scss" scoped>
    .mini_input{
        width:140px;
    }
    .interior_btn{
        width: 324px;
    }
    .tasks{
        margin-top:20px;
    }
     //顶部筛选
    .top_screen label{
        display: inline-block;
        width:60px;
        text-align: right;
    } 
</style>