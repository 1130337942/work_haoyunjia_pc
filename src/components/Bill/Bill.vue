/**
* Bill.vue
*
* 账单 账单
*
* @author  程纪赢
*/
<template>
    <div class="clearfix">
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
                            <label>合作状态：</label>
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
                            <label>公司全称：</label>
                            <el-input
                                    size='mini'
                                    class="mini_input"
                                    placeholder="请输入"
                                    style="width: 65%;"
                                    v-model="company_name">
                            </el-input>
                        </li>
                </ul>    
               </div>    
            </div>
            <div class="clearfix tasksResult">
                <div class="left">
                    <el-button icon="el-icon-search" size='mini'>查询</el-button>
                    <el-button size="mini" style="margin-left: 10px;">导入</el-button>
                    <el-button size="mini" style="margin-left: 10px;">导出子账单</el-button>
                    <el-button size="mini" style="margin-left: 10px;">导出总账单</el-button>
                </div>
                <div class="right">
                    <el-button size="mini">刷新</el-button>
                    <el-button size="mini">列表设置</el-button>
                </div>
            </div>
            <!--表格3-->
            <div style="width:100%;" class='left pagingResult'>
                <ul class='clearfix flowOne'>
                    <li class='left'>订单总数:<i>15500</i> </li>
                    <li class='left'>税金:<i>20000</i> </li>
                    <li class='left'>服务费:<i>50000</i> </li>
                    <li class='left'>账单总金额:<i>2500000</i> </li>
                    <!-- <li class='right'><img src="../../assets/commonality/toTheBottom.png" class='left toTheBottom'></li> -->
                </ul>
                <el-table
                        :data="tableData3"
                        :header-cell-style='styleObj'
                        class='table'
                        style="width: 100%"
                        height="240">
                    <el-table-column
                            prop="date"
                            label="业务订单号"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="用工企业"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="众包平台"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="type"
                            label="接单公司类型"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="unit"
                            label="接单公司名称"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="serve"
                            label="服务类型"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="接单人手机号"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="valuation"
                            label="计价单位"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="单位金额"
                            align="center"
                            width="160">
                    </el-table-column>
                    <el-table-column
                            prop="quantity"
                            label="数量"
                            align="center"
                            width="140">
                    </el-table-column>
                </el-table>
            </div>
             <!--表格2-->
            <div style="margin-top: 10px; width:48%;" class='left pagingResult'>
                <ul class='clearfix flowOne'>
                    <li class='left'>账单总数:<i>25</i> </li>
                     <li class='left'>人数:<i>258</i> </li>
                      <li class='left'>税金:<i>85305</i> </li>
                       <li class='left'>服务费:<i>0</i> </li>
                        <li class='left'>账单总金额:<i>100000</i> </li>
                </ul>
                <el-table
                        :data="tableData"
                        :header-cell-style='styleObj'
                        class='table'
                        style="width: 100%"
                        height="240">
                    <el-table-column
                            prop="date"
                            label="账单号"
                             align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="账单月份"
                             align="center"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="状态"
                             align="center"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            label="金额"
                            align="center"
                            width="130">
                    </el-table-column>
                    <el-table-column
                            prop="taxes"
                            label="税金"
                            align="center"
                            width="130">
                    </el-table-column>
                </el-table>
            </div>
            <div style='width:3%;' class='left'>
                <img src="../../assets/commonality/toTheRight.png" class='toTheRight'>
            </div>
            <!--表格1-->
            <div style="margin-top: 10px; width:49%;" class='left pagingResult'>
                <ul class='clearfix flowOne'>
                    <li class='left'>人数:<i>5</i> </li>
                    <li class='right'>总金额:<i>200000</i> </li>
                </ul>
                <el-table
                        :data="tableData2"
                        :header-cell-style='styleObj'
                        class='table'
                        style="width: 100%"
                        height="240">
                    <el-table-column
                            prop="date"
                            label="姓名"
                            align="center"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="state"
                            label="手机号"
                            align="center"
                            width="190">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            align="center"
                            label="身份证号"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="money"
                            align="center"
                            label="状态"
                            width="180">         
                    </el-table-column>
                </el-table>
            </div>
    </div>
</template>

<script>
    export default {
        name: "regard",
        data(){
            return {
                company_name:'',
                medium:'mini',
                options: [{
                    value: '选项1',
                    label: '合作中'
                }, {
                    value: '选项2',
                    label: '竞标中'
                }, {
                    value: '选项3',
                    label: '已终止'
                }],
                value: '',
                tableData: [{
                    date: 'DBZD0001008',
                    name: '五月',
                    state: '已对账',
                    money:'￥:6753.68',
                    taxes:'￥:475.61',
                }, {
                    date: 'DBZD0021345',
                    name: '一月',
                    state: '待对账',
                    money:'￥:1520.18',
                    taxes:'￥:136.21',
                }, {
                    date: 'DBZD0006696',
                    name: '五月',
                    state: '待对账',
                    money:'￥:7053.98',
                    taxes:'￥:675.55',
                }, {
                   date: 'DBZD0010590',
                    name: '七月',
                    state: '已支付',
                    money:'￥:2753.01',
                    taxes:'￥:251.18',
                }, {
                    date: 'DBZD0001335',
                    name: '六月',
                    state: '待对账',
                    money:'￥:9753.08',
                    taxes:'￥:558.619',
                }, {
                    date: 'DBZD000758',
                    name: '二月',
                    state: '已支付',
                    money:'￥:6003.00',
                    taxes:'￥:405.03',
                }, {
                    date: 'DBZD0001002',
                    name: '二月',
                    state: '待对账',
                    money:'￥:6053.13',
                    taxes:'￥:415.10',
                }, {
                    date: 'DBZD0001135',
                    name: '八月',
                    state: '已对账',
                    money:'￥:1253.75',
                    taxes:'￥:175.63',
                }, {
                    date: 'DBZD0002569',
                    name: '九月',
                    state: '已对账',
                    money:'￥:1966.78',
                    taxes:'￥:135.55',
                }, {
                    date: 'DBZD0002369',
                    name: '三月',
                    state: '已对账',
                    money:'￥:6003.88',
                    taxes:'￥:355.68',
                }, {
                    date: 'DBZD0002456',
                    name: '九月',
                    state: '待对账',
                    money:'￥:8881.00',
                    taxes:'￥:400.50',
                }],
                tableData2: [{
                    date: '任勇',
                    name: '66122586980064859',
                    state: '13271446589',
                    money:'已对账',
                }, {
                    date: '林平',
                    name: '52618931981060208',
                    state: '15136598862',
                    money:'待支付',
                }, {
                    date: '刘霞',
                    name: '56985236985136469',
                    state: '15134569896',
                    money:'待支付',
                }, {
                   date: '傅秀英',
                    name: '42512456391102154',
                    state: '18794665852',
                    money:'已支付',
                }, {
                    date: '傅秀英',
                    name: '41042213561298659',
                    state: '18064221015',
                    money:'已支付',
                }],
                tableData3: [{
                    date: 'XWKL4279',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'邓秀英',
                    serve:'搬运',
                    phone:'19420441735',
                    valuation:'搬运',
                    money:'￥:6669.77',
                    quantity:'93',
                }, {
                    date: 'XWKL0012',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'邓秀英',
                    serve:'运输',
                    phone:'13271445656',
                    valuation:'搬运',
                    money:'￥:5856.46',
                    quantity:'24',
                }, {
                    date: 'XWKL2589',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'邓秀英',
                    serve:'运输',
                    phone:'13526558652',
                    valuation:'搬运',
                    money:'￥:7762.91',
                    quantity:'88',
                }, {
                    date: 'XWKL4458',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'邓秀英',
                    serve:'运输',
                    phone:'12566963369',
                    valuation:'搬运',
                    money:'￥:1324.60',
                    quantity:'54',
                }, {
                    date: 'XWKL6698',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'谭杰',
                    serve:'搬运',
                    phone:'18741220134',
                    valuation:'搬运',
                    money:'￥:8895.58',
                    quantity:'69',
                }, {
                    date: 'XWKL1328',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'谭杰',
                    serve:'搬运',
                    phone:'18812445635',
                    valuation:'搬运',
                    money:'￥:3244.79',
                    quantity:'72',
                }, {
                    date: 'XWKL4963',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'谭杰',
                    serve:'搬运',
                    phone:'13271456635',
                    valuation:'搬运',
                    money:'￥:7596.20',
                    quantity:'39',
                }, {
                    date: 'XWKL17001',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'谭杰',
                    serve:'搬运',
                    phone:'15024558789',
                    valuation:'搬运',
                    money:'￥:2468.01',
                    quantity:'71',
                }, {
                    date: 'XWKL0012',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'谭杰',
                    serve:'运输',
                    phone:'13271445656',
                    valuation:'搬运',
                    money:'￥:5856.46',
                    quantity:'24',
                }, {
                    date: 'XWKL2589',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'谭杰',
                    serve:'运输',
                    phone:'13526558652',
                    valuation:'搬运',
                    money:'￥:7762.91',
                    quantity:'88',
                }, {
                    date: 'XWKL6698',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'谭杰',
                    serve:'搬运',
                    phone:'18741220134',
                    valuation:'搬运',
                    money:'￥:8895.58',
                    quantity:'69',
                }, {
                    date: 'XWKL1328',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'张强',
                    serve:'搬运',
                    phone:'18812445635',
                    valuation:'搬运',
                    money:'￥:3244.79',
                    quantity:'72',
                }, {
                    date: 'XWKL4963',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'张强',
                    serve:'搬运',
                    phone:'13271456635',
                    valuation:'搬运',
                    money:'￥:7596.20',
                    quantity:'39',
                },{
                    date: 'XWKL4279',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'张强',
                    serve:'搬运',
                    phone:'19420441735',
                    valuation:'搬运',
                    money:'￥:6669.77',
                    quantity:'93',
                }, {
                    date: 'XWKL2589',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'张强',
                    serve:'运输',
                    phone:'13526558652',
                    valuation:'搬运',
                    money:'￥:7762.91',
                    quantity:'88',
                }, {
                    date: 'XWKL4458',
                    name: '德邦',
                    state: '一招盈',
                    type:'自由职业者',
                    unit:'张强',
                    serve:'运输',
                    phone:'12566963369',
                    valuation:'搬运',
                    money:'￥:1324.60',
                    quantity:'54',
                }, {
                    date: 'XWKL6698',
                    name: '德邦',
                    state: '一招盈',
                    type:'个体工商户',
                    unit:'张强',
                    serve:'搬运',
                    phone:'18741220134',
                    valuation:'搬运',
                    money:'￥:8895.58',
                    quantity:'69',
                }],
                styleObj: {
                    color:'rgba(0,0,0,0.8)',
                    background:'#CED4D9',
                    fontSize:'14px',
                    fontFamily: "PingFangSC-Medium",
                    fontWeight:500,
                }
            }
        },
        methods:{

        },
        created(){
            
        }
    }
</script>
<style lang="scss">
        // 滚动条
        .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar{
            /*滚动条整体样式*/
            width:10px;
            /*高宽分别对应横竖滚动条的尺寸*/
            height:1px;
        }

        .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-thumb{
            /*滚动条中的滚动块*/
            border-radius:10px;
            -webkit-box-shadow: inset 0 0 5px rgba(216, 216, 216, 1);
            background:rgba(216, 216, 216, 1);
        }

        .el-table--scrollable-y .el-table__body-wrapper::-webkit-scrollbar-track{
            /*滚动条里面的轨道*/
            -webkit-box-shadow: inset 0 0 5px rgba(216, 216, 216, 1);
            border-radius:10px;
            background:rgba(248, 248, 248, 1);
        }
        .table tr th:last-child{
            background:#CED4D9;
        }
      
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
    // 表格样式
    .flowOne{
        margin-bottom: 11px;
    }
    .flowOne li{
        margin-right: 40px;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
    }
    .flowOne li:last-child{
        margin-right: 20px;
    }
    .flowOne li i{
        color:#EE382B;
        font-size:18px;
        font-family:PingFangSC-Medium;
        font-weight:500;
    }
    .toTheRight{
        width:100%;
        height:100%;
        margin-top:144px;
        // margin-left:5px;
    }
     .toTheBottom{
        width:45px;
        height:40px;
        margin-right: 150px;
     }
         
</style>