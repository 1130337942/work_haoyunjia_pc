/**
* SupplierContract.vue
*
* 合同管理 用工协议管理
*
* @author  程纪赢
*/
<template>
    <div>
        <!-- {{getUserCode}}用工协议管理 -->
            <div class="clearfix referResult">
               <div class="left" style='width:100%'>
                    <ul class='clearfix top_screen'>
                        <li class='left' style='width:40%;'>
                        <el-input
                            placeholder="请输入内容"
                            suffix-icon="el-icon-search"
                            size='mini'
                            style="width: 91%;"
                            v-model="company_name">
                        </el-input>
                        </li>
                        <li class="left" style='width:30%;'>
                        <label>创建时间：</label>
                        <el-date-picker
                        v-model="createDate"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        type="datetimerange"
                        align="right"
                        size='mini'
                        style="width: 70%;"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getCreateDate"
                        :picker-options="pickerOptions1">
                        </el-date-picker>
                    </li>
                    <li class="left" style='width:30%;'>
                        <label>签署时间：</label>
                        <el-date-picker
                        v-model="signDate"
                        value-format="yyyy-MM-dd HH:mm:ss" 
                        type="datetimerange"
                        align="right"
                        size='mini'
                        style="width: 70%;"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="getSignDate"
                        :picker-options="pickerOptions2">
                        </el-date-picker>
                    </li>
                    </ul>
                    <ul style='margin-top:10px;'>
                        <li>
                            <label>签署状态：</label>
                            <el-select v-model="value" placeholder="请选择" size='mini' style="width: 10%;">
                            <el-option label="" value=""></el-option>
                            <el-option
                                    v-for="item in options"
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
                    <el-button v-show="code['SupplierContract1']" size="mini" @click=List2()>搜索</el-button>
                    <el-button v-show="code['SupplierContract2']" size="mini" @click='companyCertification1'>新建</el-button>
                    <el-button v-show="code['SupplierContract3']" size="mini" @click='interiorList2' :disabled='isDisabled3'>发起签署</el-button>
                    <el-button v-show="code['SupplierContract1']" size="mini" style="margin-left: 10px;">高级搜索</el-button>
                    <el-button v-show="code['SupplierContract4']" size="mini" style="margin-left: 10px;" @click="interiorList3">下载</el-button>
                    <el-button v-show="code['SupplierContract3'] || code['SupplierContract4']" size="mini" style="margin-left: 10px;" @click="selectAll">{{this.btnselectAll}}</el-button>
                </div>
                <div class="right">
                    <el-button size="mini" @click=refresh>刷新</el-button>
                    <el-button size="mini">列表设置</el-button>
                </div>
            </div>
            <!--表格-->
            <div class='pagingResult'>
                <el-table
                        ref="multipleTable"
                        :data="tableData"
                        @selection-change="changeFun2"
                        @select='selectchangeFun'
                        style="width: 100%"
                        height="528"
                        border
                        empty-text="暂未查到匹配条件的数据"
                        :header-cell-style='styleObj'>
                    <el-table-column type="selection" align="center" fixed="left" width="55"></el-table-column>  
                    <el-table-column show-overflow-tooltip type="index" align="center" fixed="left" label="序号" width="50"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="pcContNo" align="center" fixed="left" label="协议编码" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="firstCompanyName" align="center" fixed="left" label="甲方公司" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondCompanyName" align="center" label="乙方公司" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="signStatus" align="center" label="签署状态" width="180">
                    <template slot-scope="scope">
                            <div v-if="scope.row.signStatus == 1">待签署</div>
                            <div v-if="scope.row.signStatus == 2">草稿</div>
                            <div v-if="scope.row.signStatus == 3">已签署</div>
                            <div v-if="scope.row.signStatus == 4">已到期</div>
                            <div v-else>草稿</div>
                    </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="templateName" label="协议模板名称" width="180">
                        <template>
                            <div>灵活用工-业务承揽协议</div>
                    </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="contName" align="center" label="协议名称" width="180"></el-table-column>
                    <el-table-column align="center" label="协议状态" width="180">
                        <template slot-scope="scope">
                            <div v-if='scope.row.signStatus != 3'>未生效</div>
                            <div v-else-if='timetamp <  scope.row.effectDate2'>未生效</div>
                            <div v-else-if='timetamp >= scope.row.effectDate2 && timetamp <= scope.row.failureDate2'>生效中</div>
                            <div v-else>已到期</div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="serviceTypeText" align="center" label="服务类型名称" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementMethodText" align="center" label="结算方式名称" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="effectDate1" label="生效日期" align="center" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="failureDate1" label="失效日期" align="center" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="startDate" label="发起日期" align="center" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="signDate" label="签署日期" align="center" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementMethod" align="center" label="乙方结算方式" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementAccount" align="center" label="乙方结算账户" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="secondSettlementAccountUser" align="center" label="乙方结算开户人" width="180"></el-table-column>
                    <el-table-column show-overflow-tooltip prop="belongCompanyId" align="center" label="所属公司" width="180" v-if="false" ></el-table-column>
                    <el-table-column prop="downloadUrl" align="center" label="附件" fixed="right" width="180">
                        <template slot-scope="scope">
                            <div v-if='scope.row.signStatus != 3'>
                                <a :href="scope.row.downloadUrl" target="view_window" style='color:#F8C059' >查看</a>
                            </div>
                            <div v-else>
                                 <span slot="trigger" size="small" type="primary" style='color:#F8C059;cursor:pointer;' @click="getTemplateUrl1(scope.row.downloadUrl,scope.row.contName)">下载</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="contRemark" align="center" label="协议备注" width="180"></el-table-column>
                </el-table>
                <!--分页-->
                <div class="block">
                    <el-pagination
                            align='center'
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[10,50,100,500]"
                            :page-size="pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total">
                    </el-pagination>
                </div>
            </div>
            <!-- 发起合同 -->
            <el-dialog
            title="定义协议内容"
            :visible.sync="dialogcontract"
            :close-on-click-modal='false'
            width="1056px"
            center>
            <el-steps :active="active" finish-status="success" style='margin-bottom:20px;'>
                <el-step title="协议内容"></el-step>
                <el-step title="选择乙方"></el-step>
                <el-step title="预览并发起"></el-step>
            </el-steps>
                <div v-if="active == 0">
                    <el-form label-width="110px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="用工人类型" :required='true'>
                                    <el-select placeholder="用工人类型" v-model='pullDownValue' size='mini'>
                                        <el-option label="" value=""></el-option>
                                        <el-option label="企业" value="2"></el-option>
                                        <el-option label="自由职业者" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                 <el-form-item label="协议模板" :required='true'>
                                    <el-select v-model="stencilValue" placeholder="请选择" size='mini' @change="selectGetTemplateByCompanyId" >
                                        <el-option label="" value=""></el-option>
                                        <el-option
                                                v-for="item in stencilDataList"
                                                :key="item.templateId"
                                                :label="item.templateName"
                                                :value="item.templateId">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="服务类型" :required='true'>
                                    <el-select v-model="serveValue" placeholder="请选择" size='mini' multiple collapse-tags @change="selectContract">
                                        <el-option
                                                v-for="item in dataDictPO"
                                                :key="item.itemCode"
                                                :label="item.itemName"
                                                :value="item.itemCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="支付方式" :required='true'>
                                    <el-select v-model="paymentValue" placeholder="请选择" size='mini' @change="selectGet">
                                        <el-option label="" value=""></el-option>
                                        <el-option
                                                v-for="item in datapayment"
                                                :key="item.itemCode"
                                                :label="item.itemName"
                                                :value="item.itemCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协议生效日期" :required='true'>
                                    <el-date-picker type="date" placeholder="选择日期"  size='mini' @change="getEffectDate" value-format="yyyy-MM-dd" v-model="effectDate" style='width:80%;'></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协议结束日期" :required='true'>
                                    <el-date-picker type="date" placeholder="选择日期"  size='mini' @change="getFailureDate" value-format="yyyy-MM-dd" v-model="failureDate" style='width:80%;'></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
                <div v-if='active == 1'>
                     <!--窗口内第二步搜索条件-->
                    <div>
                        <el-form :inline="true" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
                            <el-row>
                            <el-col :span="8">
                                <el-form-item label="创建时间" class='formData'>
                                    <el-date-picker
                                        v-model="aaa"
                                        value-format="yyyy-MM-dd HH:mm:ss" 
                                        type="datetimerange"
                                        align="right"
                                        size='mini'
                                        style='width:100%;'
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        @change="getEffectDateaa"
                                        :picker-options="pickerOptions1">
                                    </el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="导入批次号">
                                    <el-input placeholder="导入批次号" size='mini' v-model="importNum" ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="用工人全称/姓名">
                                    <el-input placeholder="合作商全称/姓名" size='mini' v-model="companyName" ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="信用代码/手机号" class='formidNo'>
                                    <el-input placeholder="信用代码/手机号" size='mini' v-model="idNo"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="服务类型">
                                    <el-select v-model="serviceTypeFinally" placeholder="请选择" size='mini' @change="selectCooperativePartner" style='width:92%;'>
                                        <el-option label="" value=""></el-option>
                                        <el-option
                                                v-for="item in dataDictPOS"
                                                :key="item.itemCode"
                                                :label="item.itemName"
                                                :value="item.itemCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="分配的客户">
                                    <el-input placeholder="分配的客户" size='mini' v-model="allotName"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item>
                                    <label class='el-form-item__label' style='width:120px;'></label>
                                    <el-button size="small" @click='cooperationList2()' style="background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 160px;">查询</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                    </div>
                     <!--窗口内第二步列表-->
                    <div v-if='flag == 1'>
                        <el-table
                        :data="tableData110"
                        @selection-change="changeFun"
                        height="200"
                        border
                        style="width: 100%">
                            <el-table-column show-overflow-tooltip type="selection" align="center" fixed="left" width="55"></el-table-column>  
                            <el-table-column show-overflow-tooltip prop="importNum" align="center"  fixed="left" label="导入批次号" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="partnerCompanyName" align="center" fixed="left" label="公司全称/姓名" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="companyTypeText" align="center" label="用工人类型" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="unionCode" align="center" label="信用代码/手机号" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="serviceTypeName" align="center" label="服务类型" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="allotName" align="center" label="分配的客户名称" width="150"></el-table-column>
                            <!-- <el-table-column label="分配的客户名称" width="150">
                                <template slot-scope="scope">
                                    <div v-if='scope.row.allotName == null'>{{$cookie.get('currentCompanyName')}}</div>
                                    <div v-else>{{scope.row.allotName}}</div>
                                </template>
                            </el-table-column>                      -->
                        </el-table>
                        <!--窗口内第二步分页-->
                        <div class="block">
                        <el-pagination
                                align='center'
                                @size-change="handleSizeChange110"
                                @current-change="handleCurrentChange110"
                                :current-page="currentPage110"
                                :page-sizes="[10,50,100,500]"
                                :page-size="pageSize110"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total110">
                        </el-pagination>
                        </div>
                    </div>
                    <!-- -------------------------------------------点击查询二次查询的列表出现--------------------------------------------------------------- -->
                    <div v-if='flag == 2'>
                        <el-table
                        :data="tableData112"
                        @selection-change="changeFun"
                        height="200"
                        border
                        style="width: 100%">
                            <el-table-column show-overflow-tooltip type="selection" align="center" fixed="left" width="55"></el-table-column>  
                            <el-table-column show-overflow-tooltip prop="importNum" align="center" fixed="left" label="导入批次号" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="partnerCompanyName" align="center" fixed="left" label="公司全称/姓名" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="companyTypeText" align="center" label="用工人类型" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="unionCode" align="center" label="信用代码/手机号" width="150"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="serviceTypeName" align="center" label="服务类型" width="150"></el-table-column> 
                            <el-table-column show-overflow-tooltip prop="allotName" align="center" label="分配的客户名称" width="150"></el-table-column>
                            <!-- <el-table-column label="分配的客户名称" width="150">
                                <template slot-scope="scope">
                                    <div v-if='scope.row.allotName == null'>{{$cookie.get('currentCompanyName')}}</div>
                                    <div v-else>{{scope.row.allotName}}</div>
                                </template>
                            </el-table-column>                        -->
                        </el-table>
                        <!--窗口内第二步分页-->
                        <div class="block">
                        <el-pagination
                                align='center'
                                @size-change="handleSizeChange112"
                                @current-change="handleCurrentChange112"
                                :current-page="currentPage112"
                                :page-sizes="[10,50,100,500]"
                                :page-size="pageSize112"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total112">
                        </el-pagination>
                        </div>
                    </div>
                </div>
                <div v-if='active == 2'>
                    <!--窗口内第三步不可点击搜索条件-->
                    <div>
                        <el-form :inline="true" class="demo-form-inline" :label-position="labelPosition" label-width="120px">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="用工人类型">
                                    <el-select placeholder="用工人类型" size='mini' v-model="pullDownValue" :disabled="true">
                                        <el-option label="企业" value="2"></el-option>
                                        <el-option label="自由职业者" value="1"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协议模板">
                                    <el-input placeholder="协议模板" size='mini' v-model='stencilName' :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="服务类型">
                                <el-tooltip class="item" size='mini' placement="bottom" effect="light">
                                    <div slot="content" style='color:black'>{{this.serviceTypeText2}}</div>
                                    <el-button size='mini' style='width:150px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'>{{this.serviceTypeText2}}</el-button>
                                </el-tooltip>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="支付方式">
                                    <el-select v-model="paymentValue" placeholder="请选择" size='mini' :disabled="true">
                                        <el-option
                                                v-for="item in datapayment"
                                                :key="item.itemCode"
                                                :label="item.itemName"
                                                :value="item.itemCode">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协议生效日期">
                                    <el-date-picker type="date" placeholder="选择日期" size='mini' :disabled="true" @change="getEffectDate" value-format="yyyy-MM-dd" v-model="effectDate" style="width: 84%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="协议结束日期">
                                    <el-date-picker type="date" placeholder="选择日期" size='mini' :disabled="true" @change="getFailureDate" value-format="yyyy-MM-dd" v-model="failureDate" style="width: 84%;"></el-date-picker>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        </el-form>
                    </div>
                    <!--窗口内第三步列表-->
                    <div>
                        <el-table
                        :data="dataList"
                        height="365"
                        border
                        style="width: 100%">
                            <el-table-column show-overflow-tooltip type="selection" align="center" fixed="left" width="55" v-if="false" ></el-table-column> 
                            <el-table-column show-overflow-tooltip prop="importNum" align="center" fixed="left" label="导入批次号" width="180"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="partnerCompanyName" align="center" fixed="left" label="公司全称/姓名" width="180"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="companyTypeText" align="center" label="用工人类型" width="180"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="unionCode" align="center" label="信用代码/手机号" width="180"></el-table-column>
                            <el-table-column show-overflow-tooltip prop="serviceTypeName" align="center" label="服务类型" width="180"></el-table-column>                        
                        </el-table>
                        <!--窗口内第三步分页-->
                        <div class="block">
                        <el-pagination
                                align='center'
                                @size-change="handleSizeChange110"
                                @current-change="handleCurrentChange110"
                                :current-page="currentPage"
                                :page-sizes="[10,50,100,500]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="dataList.length">
                        </el-pagination>
                        </div>
                    </div>
                </div>
                <ul class='clearfix' style='display: flex;flex-flow: row nowrap;justify-content: center;'>
                    <li class='left' style='margin-left:20px;'>
                        <el-button style="margin-top: 12px;border-radius:4px;border:1px solid rgba(248,192,89,1);color:rgba(248,192,89,1);width: 170px;" @click="prev" v-if='prevFalg == 1'>上一步</el-button>
                    </li>
                    <li class='left' style='margin-left:20px;'>
                        <el-button style="margin-top: 12px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;" @click="next" v-if='nextFalg == 2'>下一步</el-button>
                    </li>
                    <li class='left' style='margin-left:20px;'>
                        <el-button style="margin-top: 12px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;" @click="createContractsAndPublish1(1)" v-if='btnFalg == 3' :disabled='isDisabled'>发起签署</el-button>
                    </li>
                    <li class='left' style='margin-left:20px;'>
                        <el-button style="margin-top: 12px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;" @click="createContractsAndPublish1(2)" v-if='btnFalg == 3' :disabled='isDisabled2'>保存草稿</el-button>
                    </li>
                </ul>
            </el-dialog>
            <!-- 认证 -->
            <el-dialog
                title="提示"
                :visible.sync="dialogAutonym"
                width="30%">
                <span>公司未认证，请前往另一页面认证</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogAutonym = false">取 消</el-button>
                    <el-button type="primary" @click="dialogWindow">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 下载 -->
            <el-dialog
                title="下载"
                :visible.sync="dialogDownload "
                width="576px"
                center
                :before-close="DownloadClose">
                <div style='text-align: center;'>
                    <img src="./../../assets/uploading/download.png" alt="" 
                        style='width: auto;height: auto;max-width: 50%;max-height: 50%;margin-bottom:20px;'>
                    <ul class='clearfix' style='display: flex;flex-flow: row nowrap;justify-content: center;margin-bottom:10px;font-size: 14px;font-family: PingFangSC-Regular;font-weight: 400;color: rgb(238, 56, 43);'>
                        <li class='left' style='width:200px;padding: 0 10px;'>
                            您即将下载已签署的电子合同PDF文件、身份证正面、身份证反面等图片文件
                        </li>
                        <li class='left' style='width:200px;padding: 0 10px;'>
                            您将下载一份包含合同列表字段的Excel表格数据
                        </li>
                    </ul>
                    <p class='DownloadSelect'>
                        <el-radio v-model="radioDownload" label="1" style='width:180px;'>下载附件</el-radio>
                        <el-radio v-model="radioDownload" label="2" style='width:180px;'>下载合同记录</el-radio>
                    </p>
                   
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button slot="trigger" size="small" type="primary" @click="getDownload" style='margin-top: 13px;background:rgba(248,192,89,1);border-radius:4px;color:rgba(255,255,255,1);width: 170px;'>下载</el-button>
                </span>
            </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { getAll,companyCertification,getDictItemsByCodes,getAllByLike1,getAllByLike2,addCont,createContractsAndPublish,TemplateByCompanyId,downloadZip } from '../../api/api';
let _loadsh = require('loadsh');   
   export default {
        name: "SupplierContract",
        data(){
            return {
                btnselectAll:'全选',
                flagxz:false,
                signStatus1:'',
                dataAllLength:'',//单选数据长度
                dataAll:'',//全选条件
                form_s:'',
                ListSignDate1:'',
                ListSignStatus1:'',
                ids1:'', //合同Id数组集合
                radioDownload: '1',//下载选择框
                dialogDownload: false,//下载弹出框
                dialogAutonym:false,//弹出实名认证提示
                Autonym:'',
                isDisabled: false, // 是否禁止发起签署按钮
                isDisabled2: false, // 是否禁止保存草稿按钮
                isDisabled3: false, // 是否禁止外部发起草稿按钮
                flag:1,//第二步默认展示110表格
                prevFalg:'',
                nextFalg:2,
                btnFalg:'',
                company_name:'',
                medium:'mini',
                options: [{
                    value: '1',
                    label: '待签署'
                }, {
                    value: '2',
                    label: '草稿'
                }, {
                    value: '3',
                    label: '已签署'
                }, {
                    value: '4',
                    label: '已到期'
                }],
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
                //日期选择 签署时间
                pickerOptions2: {
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
                _id:[],//外边发起签署选中的ID
                partnerIds:'',
                effectDate2:'',
                timetamp:'',//当前日期
                pcContInfoVOS:[],   
                dataList:[], 
                dataList2:[],
                dataList3:[],
                multipleSelection: [],  
                multipleSelection2: [],   
                tableData110: [],  
                tableData112:[],
                datapayment:'', //支付方式
                itemName:'',//支付方式名称
                dataDictPO:'',//合同服务类型
                dataDictPOS:'',//合作商服务类型
                serviceTypeText:'',//服务类型名称
                serviceTypeText2:'',//第三步服务类型名称
                stencilDataList:[], //合同模板
                stencilName:'',//合同模板名称
                serveValue: '', //第一步服务类型ID
                _partnerCompanyCode:'',
                paymentValue:'',
                stencilValue:'',
                effectDate:'',
                failureDate:'',
                aaa:'',
                aa:'',
                bb:'',
                pullDownValue:'',//用工人类型
                importNum:"",
                companyName:"",
                serviceType:"",
                serviceTypeFinally:'',
                allotName:'',//分配的客户
                idNo:"",
                createDate:"", //创建时间
                createDate1:"", //创建时间
                createDate2:"", //创建时间
                signDate:'', //签署时间
                signDate1:'', //签署时间
                signDate2:'', //签署时间
                arr:'',
                signStatus:'',
                _pcContNo:'',
                currentPage: 1, // 当前页码
                total: 0, // 总条数
                pageSize: 10, // 每页的数据条数
                styleObj: {
                    color:'rgba(0,0,0,0.8)',
                    background:'#CED4D9',
                    fontSize:'14px',
                    fontFamily: "思源",
                    fontWeight:500,
                },
                active: 0,//步骤条    
                labelPosition: 'right',    
                dialogcontract: false,//发起合同
                value: '',
                tableData: [],
                currentPage110: 1, // 当前页码
                currentPage112: 1, // 当前页码
                total110: 0, // 总条数
                total112: 0, // 总条数
                pageSize110: 10, // 每页的数据条数
                pageSize112: 10, // 每页的数据条数
                code:{
                    'SupplierContract1':false,//查看
                    'SupplierContract2':false,//新建协议
                    'SupplierContract3':false,//发起签署
                    'SupplierContract4':false,//下载
                },
                getUserCode:[]
            }
        },
        created(){
            this.getUserCodeFn()

            this.List();
            //服务类型
           // this.getDictItemsByCodes1();
            //当前公司服务类型
            this.getDictItemsByCodes2();
            //根据公司ID获取模板
            this.getTemplateByCompanyId1();
            //支付方式
            this.payment();
            //当前日期
            // let _timetamp = new Date().getFullYear()+'-'+String(new Date().getMonth()+1).padStart(2,0)+'-'+String(new Date().getDate()).padStart(2,0);
            // let time  =  new Date(_timetamp).getTime() +2*3600*1000;
            // this.timetamp = time;
            let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
            let time  =  new Date(_timetamp).getTime();
            this.timetamp = time;
        },
        methods: {
            //获取权限列表
            async getUserCodeFn(){
                try{
                    let data = this.$codePostObj()
                    let res = await this.$ifUserIsRoleFn(data)
                        // console.log(res)
                    this.getUserCode = res.data
                    this.isCodeTrueFn()
                }catch(error){
                    console.log(error)
                } 
            },
            //当前页面有权限为true
            isCodeTrueFn(){
                if(this.getUserCode.length == 0 )return false
                let codeJson= this.$codeJson()
                this.getUserCode.forEach((item)=>{
                    this.code[codeJson[item]] = true
                });
            },
            //上一步
            prev(){
                if(this.active === 0){
                    
                }else if(this.active === 1){ //进入第1个页面
                    this.prevFalg = '';
                   // this.partnerIds = ''
                }else if(this.active === 2){ //进入第2个页面
                    this.prevFalg = 1;
                    this.nextFalg = 2;
                    this.btnFalg = '';
                }
                this.active --;
                if (this.active < 0) {
                    this.active = 0;
                }
            },
            //步骤条下一步
            next() {  
                // 点击下一步
                if(this.active === 0){ //第一次点击进入第二个页面的时候
                    if(!this.serviceTypeText2 || !this.stencilValue || !this.paymentValue || !this.effectDate || !this.failureDate || !this.pullDownValue){
                        this.$message.error("请选择查询条件!");
                        return false;
                    }else{
                        var data1 = new Date(this.effectDate).getTime()
                        var data2 = new Date(this.failureDate).getTime()
                        if(data1<=data2){
                            this.prevFalg = 1;
                            this.nextFalg = 2;
                            //清空第二步的搜索内容
                            this.aa = ''
                            this.bb = ''
                            this.importNum = ''
                            this.companyName = ''
                            this.idNo=''
                            this.serviceTypeFinally =''
                            this.cooperationList(1);
                        }else{
                            this.$message.error('结束日期必须大于或等于生效日期');
                            return false;
                        }
                        
                    }
                }else if(this.active === 1){ //第二次点击进入第三个页面的时候
                    var dataList = this.getSelected();
                    if (!dataList || dataList.length == 0) {
                        this.$message.error("请先勾选数据!");
                        return false;
                    }else{
                        this.prevFalg = 1;
                        this.nextFalg = '';
                        this.btnFalg = 3;
                        this.dataList = dataList;
                        this.serviceTypeText2

                        let _partnerCompanyCode = '' //遍历每行的partnerCompanyCode
                        for(let i = 0; i< this.dataList.length; i++){
                            _partnerCompanyCode += this.dataList[i].partnerCompanyCode
                            if (i != this.dataList.length - 1) {
                                _partnerCompanyCode += ','
                            }
                        }
                        this._partnerCompanyCode = _partnerCompanyCode                   
                    }
                }
                // 最后 active +1
                this.active ++;
            },
             //判断企业是否已认证
            companyCertification1(){
                let param = {param:JSON.stringify({firstCompanyId:this.$cookie.get('currentCompanyId'),userId:this.$cookie.get('userId')})}
                companyCertification(param).then(result => {
                 //   console.log(result)
					if(result.data.auth == true){
                        this.active = 0;
                        this.btnFalg = ''
                        this.nextFalg = 2
                        this.prevFalg = '';
                        this.pullDownValue = '';
                        this.serveValue = '';
                        this.paymentValue = '';
                        this.stencilValue = '';
                        this.effectDate = '';
                        this.failureDate = '';
                        this.aa = '';
                        this.bb = '';
                        this.importNum = '';
                        this.companyName = '';
                        this.idNo = ''
                        this.serviceTypeFinally = '';
                        this.dialogcontract = true;
                    }else if(result.data.auth == false){
                        this.dialogAutonym = true;
                        this.Autonym = result.data.authUrl
                     //   window.open(result.data.authUrl)
                    }
				})
				.catch(error => {
                    console.log(error)
                })
            },
            dialogWindow(){
                this.dialogAutonym = false;
                window.open(this.Autonym);
            },
            //合同列表页创建时间
            getCreateDate(val) {
                if(this.createDate != null){
                    this.createDate1 = this.createDate[0];
                    this.createDate2 = this.createDate[1];
                }else if(this.createDate == null){
                    this.createDate1 = '';
                    this.createDate2 = '';
                }
            },
            //合同列页签署时间
            getSignDate(val) {
                 if(this.signDate != null){
                    this.signDate1 = this.createDate[0];
                    this.signDate2 = this.createDate[1];
                }else if(this.signDate == null){
                    this.signDate1 = '';
                    this.signDate2 = '';
                }
            },
            //合同开始时间
            getEffectDate(val) {
                this.effectDate=val;
            },
            //合同结束时间
            getFailureDate(val) {
                this.failureDate=val;
            },
            //合同第二步创建时间
            getEffectDateaa(val) {
                this.aa = val[0];
                this.bb = val[1];
            },
            //窗口内表格分页
            handleSizeChange110(val) {
                this.currentPage110 = 1
                this.pageSize110 = val //每页显示的条数
                this.cooperationList(1)
            },
            handleCurrentChange110(val) {
                this.currentPage110 = val
                this.cooperationList(1)
            },
            handleSizeChange112(val) {
                this.currentPage112 = 1
                this.pageSize112 = val //每页显示的条数
                this.cooperationList(2)
            },
            handleCurrentChange112(val) {
                this.currentPage112 = val
                this.cooperationList(2)
            },
            //外边表格分页
            handleSizeChange(val) {
              //  console.log(`每页 ${val} 条`);
                this.currentPage = 1;
                this.pageSize = val;
                this.List();
            },
            handleCurrentChange(val) {
             //   console.log(`当前页: ${val}`);
                this.currentPage = val;
                this.List();
            },
            //获取第二步合作商列表
            cooperationList: _loadsh.debounce(function(tab){
                 console.log(tab)
                // console.log(parseInt(this.pullDownValue));
                // console.log(this.serveValue);
                // console.log(this.paymentValue);
                // console.log(this.effectDate);
                // console.log(this.failureDate);
                if(tab == 1){
                    this.flag = 1;
                    let serveValue = this.serveValue;
                    let param = {param:JSON.stringify({
                        companyType:parseInt(this.pullDownValue),//用工人类型
                        serviceType:serveValue.join(), //服务类型编码
                        secondSettlementMethod:this.paymentValue, //乙方结算方式 取数据字典
                        effectDate:this.effectDate, //生效日期
                        failureDate:this.failureDate, //失效日期

                        belongCompanyId:this.$cookie.get('currentCompanyId') , //公司ID
                        importNum:this.importNum,
                        companyName:this.companyName,
                        idNo:this.idNo,
                        sqlBeginDate:this.aa,
                        sqlEndDate:this.bb,
                }),
                pageParam: {
                    pageIndex:this.currentPage110-1, //第几页
                    pageSize:this.pageSize110 //每页几条
                    }
                }
                getAllByLike1(param).then(result =>{
                             if(result.code == '000000'){ //成功
                                this.tableData110 = result.data.partnerInfoResps
                                this.total110 = result.data.allCount
                            //    this.partnerIds = result.data.partnerIds //每行数据的ID
                            }else if(result.code == '100000'){ //失败
                                this.$message.error(result.message)
                            }  
                        }).catch((error)=>{
                            console.log(error)
                        });
                }else if(tab == 2){
                        this.flag = 2;
                        let serveValue = this.serveValue;
                        let param = {param:JSON.stringify({
                            companyType:parseInt(this.pullDownValue),//用工人类型
                            serviceType:serveValue.join(), //服务类型编码
                            secondSettlementMethod:this.paymentValue, //乙方结算方式 取数据字典
                            effectDate:this.effectDate, //生效日期
                            failureDate:this.failureDate, //失效日期

                            belongCompanyId:this.$cookie.get('currentCompanyId') , //公司ID
                            serviceType1:this.serviceTypeFinally, //服务类型编码
                            importNum:this.importNum,
                            companyName:this.companyName,
                            idNo:this.idNo,
                            sqlBeginDate:this.aa,
                            sqlEndDate:this.bb,
                            allotName:this.allotName
                        }),pageParam: {
                            pageIndex:this.currentPage112-1, //第几页
                            pageSize:this.pageSize112 //每页几条
                            }
                        }
                        getAllByLike2(param).then(result =>{
                            console.log(result);
                                    if(result.code == '000000'){ //成功
                                        this.tableData112 = result.data.partnerInfoResps
                                        this.total112 = result.data.allCount
                                    }else if(result.code == '100000'){ //失败
                                        this.$message.error(result.message)
                                    }  
                                }).catch((error)=>{});
                   
                }

            
            },500),
            //查询第二步合作商列表
            cooperationList2(){
                //this.currentPage112 = 1;
                this.cooperationList(2);
            },
             //第一步公共字典获取当前公司服务类型
            getDictItemsByCodes2(){
                getDictItemsByCodes({
			        param:JSON.stringify({
                        parentCode:'SVT',
                        companyId:this.$cookie.get('currentCompanyId'),
					}),
					pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}
				}).then(result => {
                    this.dataDictPO = result.data[0].dataDictPO;
                    this.dataDictPOS = result.data[0].dataDictPO;
				})
				.catch(error => {})
            },
            //公共字典获取服务类型
            // getDictItemsByCodes1(){
            //     getDictItemsByCodes({
			//         param:JSON.stringify({
			// 			parentCode:'SVT',
			// 		}),
			// 		pageParam: {
			// 			pageIndex: this.currentPage - 1, //第几页
			// 			pageSize: this.pageSize //每页几条
			// 		}
			// 	}).then(result => {
            //         this.dataDictPOS = result.data[0].dataDictPO
			// 	})
			// 	.catch(error => {})
            // },
             //根据公司ID获取模板
            getTemplateByCompanyId1(){
                TemplateByCompanyId({
			    param:JSON.stringify({
						companyId:this.$cookie.get('currentCompanyId'),
					})
				}).then(result => {
                    // console.log(result);
                     this.stencilDataList = result.data;
				})
				.catch(error => {})
            },
            //公共字典获支付方式
            payment(){
                getDictItemsByCodes({
			    param:JSON.stringify({
						parentCode:'PMT',
					})
				}).then(result => {
					 this.datapayment = result.data[0].dataDictPO
				})
				.catch(error => {
                    this.$router.push('/Login');
                })
            },
             //列表
            List: _loadsh.debounce(function(){     
                if(!this.code['SupplierContract1']) return false //没有查看权限功能  
                let param = {param:JSON.stringify({
                    firstId:this.$cookie.get('currentCompanyId'), //甲方公司ID编码
                    belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                    sqlBeginDate:this.createDate1,
                    sqlEndDate:this.createDate2,
                    signBeginDate:this.signDate1,
                    signEndDate:this.signDate2,
                    signStatus:this.value,
                    }), pageParam:{
                    pageIndex:this.currentPage-1, //第几页
                    pageSize:this.pageSize //每页几条
                }
                }
                getAll(param).then(result =>{
                            if(result.code == '000000'){ //成功
                                this.tableData = result.data.pcContInfoVOList //表格数组
                                this.total = result.data.allCount //表格数据长度
                            }else if(result.code == '100000'){ //失败
                                this.$message.error(result.message)
                            }  
                        }).catch((error)=>{});
            },500),
            //外边列表搜索
            List2(){
                this.dataAll = '';
                this.currentPage = 1;
                let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
                let time  =  new Date(_timetamp).getTime();
                this.timetamp = time;
                this.List();
            },
            //获取选中结果
            getSelected() {
                return this.multipleSelection;
            },
            //点击选中的数据添加到第三步
            interiorList(){
                // 获取选中的数据
                var dataList = this.getSelected();
                if (!dataList || dataList.length == 0) {
                    this.$message.error("请先勾选数据!");
                    return false;
                }
                this.dataList = dataList        
            },
            changeFun (val) {
                this.multipleSelection = val // 返回的是选中的列的数组集合
            },
            getSelected2() {
                return this.multipleSelection2;
            },
            interiorList2(){
                // 获取外部选中的数据
                var dataList2 = this.getSelected2();
                if (!dataList2 || dataList2.length == 0) {
                    this.$message.error("请先勾选数据!");
                    return false;
                }
                this.dataList2 = dataList2
                let signStatus = []
                let _pcContNo = []
                let _id = ''
                for(let i = 0; i< dataList2.length; i++){
                    signStatus.push(dataList2[i].signStatus);
                       _id += dataList2[i].id
                    if (i != this.dataList2.length - 1) {
                        _id += ','
                    }
                } 
                this._id = _id.split()
                for(let j = 0; j< signStatus.length; j++){
                    if(signStatus[j] != 2){
                        this.$message.error('请选择草稿状态的数据');
                        return
                    }else{
                        this.sponsorSign();
                        return
                    }
                }
            },
            changeFun2 (val) {
                this.multipleSelection2 = val // 返回的是选中的列的数组集合
            },
            selectchangeFun(val){
                this.dataAll = '';
            },
             //根据公司ID获取模板
            selectGetTemplateByCompanyId(vId){
                let obj = {};
                obj = this.stencilDataList.find((item)=>{//这里的selectList就是上面遍历的数据源
                    return item.templateId === vId;//筛选出匹配数据
                });
                this.stencilName = obj.templateName;
            },
            //获取支付状态的name值
            selectGet(vId){
                let obj = {};
                obj = this.datapayment.find((item)=>{//这里的selectList就是上面遍历的数据源
                    return item.itemCode === vId;//筛选出匹配数据
                });
                this.itemName = obj.itemName
                // console.log(obj.itemName);//我这边的name就是对应label的
                // console.log(obj.itemCode);
            },
            //获取合同服务类型的name值
            selectContract(vId){
                // vID 是一个数组，循环获取name,根据id
                if (!vId && vId.length === 0) {
                    return ;
                }//这里多选的时候获取name和单选不一样 单选是对象 多选是数组所以...
                let nameArr = [];
                let codeArr = [];
                let that = this;
                vId.forEach(element => {
                    let obj = that.dataDictPO.find((item)=>{
                        return item.itemCode === element;
                    });
                    if (obj) {
                        nameArr.push(obj.itemName);
                        codeArr.push(obj.itemCode);
                    }
                });
                /*
                let namestring = ''
                        for(let i = 0; i< nameArr.length; i++){
                            console.log(nameArr[i])
                            namestring += nameArr[i]
                            if (i != nameArr.length - 1) {
                                namestring += ','
                            }
                        }
                        */
                this.serviceTypeText2 = nameArr.join();
               // console.log(this.serviceTypeText2)
            },
            //获取合作商服务类型的name值
            selectCooperativePartner(vId){
                let obj = {};
                obj = this.dataDictPOS.find((item)=>{
                    return item.itemCode === vId;
                });
                // console.log(obj.itemName);
                // console.log(obj.itemCode);
            },
            //发起签署signStatus 1 保存草稿signStatus 2
            createContractsAndPublish1: _loadsh.debounce(function(signStatus){ 
                let _this = this
                if(signStatus == 2){ //弹窗第三步保存草稿
                    this.isDisabled2 = true
                    let param = {param:JSON.stringify({
                        pcContNo :this._pcContNo,
                        secondIds :this._partnerCompanyCode,
                        firstId :this.$cookie.get('currentCompanyId'),//当前公司ID
                        signStatus :2,
                        effectDate1 :this.effectDate,
                        failureDate1 :this.failureDate,
                        companyType :this.pullDownValue,
                        templateCode :this.stencilValue,
                        templateCodeText :this.stencilName,
                        serviceType :this.serveValue.join(), //服务类型编码
                        secondSettlementMethod :this.paymentValue, //结算方式
                        createUser :this.$cookie.get('userId'), //当前用户ID
                        companyId: this.$cookie.get('currentCompanyId'),//当前公司ID
                    })}
                    addCont(param).then(result => {
                                if(result.code == '000000'){ //成功
                                        this.$message({
                                            showClose: true,
                                            message:'请求成功，后台正在处理',
                                            type: 'success'
                                        });
                                        this.isDisabled2 = false
                                        this.isDisabled = false
                                        this.isDisabled3 = false
                                        //刷新
                                        this.refresh();   
                                        //每次请求完清空数据
                                        var arr = []
                                        _this.pcContInfoVOS =Object.assign([],arr)
                                        this.dataList = '';
                                        this.dialogcontract = false
                                        }else if(result.code == '100000'){ //失败
                                            this.$message({
                                                showClose: true,
                                                message:result.message,
                                                type: 'error'
                                            });
                                            this.isDisabled2 = false
                                            this.isDisabled = false
                                            this.isDisabled3 = false
                                        }  
                            })
                            .catch(error => {
                                this.$message.error('请求失败')
                                //    console.log(error)
                            })
                }else if(signStatus == 1){ //弹窗第三步发起签署
                    this.isDisabled = true
                    let param = {param:JSON.stringify({
                        pcContNo :this._pcContNo,
                        secondIds :this._partnerCompanyCode,
                        firstId :this.$cookie.get('currentCompanyId'),//当前公司ID
                        signStatus :1,
                        effectDate1 :this.effectDate,
                        failureDate1 :this.failureDate,
                        companyType :this.pullDownValue,
                        templateCode :this.stencilValue,
                        templateCodeText :this.stencilName,
                        serviceType :this.serveValue.join(), //服务类型编码
                        secondSettlementMethod :this.paymentValue, //结算方式
                        createUser :this.$cookie.get('userId'), //当前用户ID
                        companyId: this.$cookie.get('currentCompanyId'),//当前公司ID
                    })}
                    addCont(param).then(result => {
                                if(result.code == '000000'){ //成功
                                        this.$message({
                                            showClose: true,
                                            message:'请求成功，后台正在处理',
                                            type: 'success'
                                        });
                                        this.isDisabled2 = false
                                        this.isDisabled = false
                                        this.isDisabled3 = false
                                        //刷新
                                        this.refresh();   
                                        //每次请求完清空数据
                                        var arr = []
                                        _this.pcContInfoVOS =Object.assign([],arr)
                                        this.dataList = '';
                                        this.dialogcontract = false
                                            
                                        }else if(result.code == '100000'){ //失败
                                            this.$message({
                                                showClose: true,
                                                message:result.message,
                                                type: 'error'
                                            });
                                            this.isDisabled2 = false
                                            this.isDisabled = false
                                            this.isDisabled3 = false
                                        }  
                            })
                            .catch(error => {
                                this.$message.error('请求失败')
                                //    console.log(error)
                            })
                }
                },500),
            //外边列表发起签署    
            sponsorSign: _loadsh.debounce(function(){ 
                    this.isDisabled3 = true
                    let param = {param:JSON.stringify({
                        id :this._id,
                        companyId: this.$cookie.get('currentCompanyId'),//当前公司ID
                        createUser:this.$cookie.get('userId'),
                        createUserName:this.$cookie.get('userName'),
                    })}
                    createContractsAndPublish(param).then(result => {
                                if(result.code == '000000'){ //成功
                                        this.$message({
                                            showClose: true,
                                            message:'请求成功，后台正在处理',
                                            type: 'success'
                                        });
                                        this.isDisabled2 = false
                                        this.isDisabled = false
                                        this.isDisabled3 = false     
                                        //刷新
                                        this.refresh();    
                                        }else if(result.code == '100000'){ //失败
                                            this.$message({
                                                showClose: true,
                                                message:result.message,
                                                type: 'error'
                                            });
                                            this.isDisabled2 = false
                                            this.isDisabled = false
                                            this.isDisabled3 = false
                                        }  
                            })
                            .catch(error => {})
            },500),
            //下载文件
            getTemplateUrl1: _loadsh.debounce(function(url,name){ 
               // console.log('后台返回给我的地址' + url)
                let url2 = '/' + url.split('/').slice(3).join('/');
               // console.log('截取后的地址' + url2)
                let urlHost = window.location.host;
                // console.log('本地地址' + urlHost)
                // console.log('拼接后的地址' + urlHost + url2)
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
            },500),
            //刷新
            refresh(){
                this.createDate = '';
                this.signDate = '';
                this.value = '';
                this.company_name = '';
                let _timetamp = new Date().getFullYear()+'/'+String(new Date().getMonth()+1).padStart(2,0)+'/'+String(new Date().getDate()).padStart(2,0);
                let time  =  new Date(_timetamp).getTime();
                this.timetamp = time;
                this.List();   
            },
            //下载弹出框
            DownloadClose(done) {
                this.dataAll = '';
                done();
            },
             //获取选中结果
            //点击选中的数据添加到第三步
            interiorList3(){
                // 获取选中的数据
                var dataList = this.getSelected2();
                if (!dataList || dataList.length == 0) {
                    this.$message.warning("请先勾选数据!");
                    return false;
                }else{
                    this.dialogDownload = true;
                    this.dataList3 = dataList;  
                    let id = [];
                    let ListSignDate = [];
                    let ListSignStatus = [];
                    for(let i = 0; i< this.dataList3.length; i++){
                        id.push(this.dataList3[i].id);
                        ListSignDate.push(this.dataList3[i].signDate);
                        ListSignStatus.push(this.dataList3[i].signStatus);
                    }
                    this.ids1 = id;
                    this.ListSignDate1 = ListSignDate.join(",");
                    this.ListSignStatus1 = ListSignStatus.join(",");
                    this.dataAllLength = this.dataList3.length;
                    let signStatus = [];
                    for(let i = 0; i< dataList.length; i++){
                        signStatus.push(dataList[i].signStatus);
                    } 
                    for(let j = 0; j< signStatus.length; j++){
                        console.log(signStatus[j])
                        if(signStatus[j] != '3'){
                            this.flagxz = false;
                            return;
                        }else if(signStatus[j] == '3'){
                            this.flagxz = true;
                        }
                    }
                }   
            },
            //下载
            getDownload: _loadsh.debounce(function(){ 
                if(this.dataAll == '1'){//1为全选
                    if(this.radioDownload == '2'){ //合同记录
                        this.$axios({
                            url: process.env.VUE_APP_export + '/pcCont/rest/downloadContractRecord',
                            method: 'post',
                            responseType:'blob',  //指定blob类型`
                            data: {
                                param: JSON.stringify({
                                type:1,
                                firstId:this.$cookie.get('currentCompanyId'), //甲方公司ID编码
                                belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                createDate:this.createDate1,
                                createEndDate:this.createDate2,
                                signDate:this.signDate1,
                                signEndDate:this.signDate2,
                                signStatus:this.value,
                                createUser:this.$cookie.get('userId'),//发起人id
                                createUserName:this.$cookie.get('userName'),//发起人
                                })
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: this.$cookie.get('token')
                            },
                            responseType:'blob'//后端响应数据格式为blob类型。
                        }).then(result => {
                                console.log(result)
                                const aLink = document.createElement("a");
                                let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                aLink.href = URL.createObjectURL(blob)
                                aLink.setAttribute('download', '合同记录' + '.xlsx') // 设置下载文件名称
                                aLink.click();
                                //document.body.appendChild(aLink)
                                this.$refs.loadElement.appendChild(aLink);
                            }).catch(error => {}); 
                        
                    }else if(this.radioDownload == '1'){ //合同附件
                            if(this.total > '101'){
                                    this.$message.warning('一次最多只可选择下载100个合同的附件')
                                    return;
                            }else if(this.flagxz){
                                    this.$axios({
                                    url: process.env.VUE_APP_export + '/pcCont/rest/downloadZip',
                                    method: 'post',
                                    responseType:'blob',  //指定blob类型`
                                    data: {
                                        param: JSON.stringify({
                                            type:1,
                                            firstId:this.$cookie.get('currentCompanyId'), //甲方公司ID编码
                                            belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                            createDate:this.createDate1,
                                            createEndDate:this.createDate2,
                                            signDate:this.signDate1,
                                            signEndDate:this.signDate2,
                                            signStatus:this.value,
                                            createUser:this.$cookie.get('userId'),//发起人id
                                            createUserName:this.$cookie.get('userName'),//发起人
                                        })
                                    },
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: this.$cookie.get('token')
                                    },
                                    responseType:'blob'//后端响应数据格式为blob类型。
                                })
                                    .then(result => {
                                    //  console.log(result)
                                        const aLink = document.createElement("a");
                                    //  let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                        let blob = new Blob([result.data], {type: "application/zip"})
                                        aLink.href = URL.createObjectURL(blob)
                                        aLink.setAttribute('download', 'V0910' + '.zip') // 设置下载文件名称
                                        aLink.click();
                                        this.$refs.loadElement.appendChild(aLink);
                                    }).catch(error => {});
                                } else if(!this.flagxz){
                                    this.$message.warning('只支持已签署状态协议的附件下载');
                                    return;
                                }
                        }
                }else if(this.dataAll == ''){//null为单选
                    if(this.radioDownload == '2'){
                        this.$axios({
                            url: process.env.VUE_APP_export + '/pcCont/rest/downloadContractRecord',
                            method: 'post',
                            responseType:'blob',  //指定blob类型`
                            data: {
                                param: JSON.stringify({
                                type:2,
                                ids:this.ids1,
                                belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                createUser:this.$cookie.get('userId'),//发起人id
                                createUserName:this.$cookie.get('userName'),//发起人
                                })
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: this.$cookie.get('token')
                            },
                            responseType:'blob'//后端响应数据格式为blob类型。
                        }).then(result => {
                                console.log(result)
                                const aLink = document.createElement("a");
                                let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                aLink.href = URL.createObjectURL(blob)
                                aLink.setAttribute('download', '合同记录' + '.xlsx') // 设置下载文件名称
                                aLink.click();
                                //document.body.appendChild(aLink)
                                this.$refs.loadElement.appendChild(aLink);
                            }).catch(error => {}); 
                    }else if(this.radioDownload == '1'){
                            if(this.dataAllLength > '101'){
                                 this.$message.warning('一次最多只可选择下载100个合同的附件')
                                 return;
                            }else if(this.flagxz){
                                this.$axios({
                                url: process.env.VUE_APP_export + '/pcCont/rest/downloadZip',
                                method: 'post',
                                responseType:'blob',  //指定blob类型`
                                data: {
                                    param: JSON.stringify({
                                        type:2,
                                        ids:this.ids1,
                                        belongCompanyId:this.$cookie.get('currentCompanyId'), //所属公司 供应商传乙方id 客户传甲方id
                                        createUser:this.$cookie.get('userId'),//发起人id
                                        createUserName:this.$cookie.get('userName'),//发起人
                                    })
                                },
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: this.$cookie.get('token')
                                },
                                responseType:'blob'//后端响应数据格式为blob类型。
                            })
                                .then(result => {
                                 //   console.log(result)
                                    const aLink = document.createElement("a");
                                  //  let blob = new Blob([result.data], {type: "application/vnd.ms-excel"})
                                    let blob = new Blob([result.data], {type: "application/zip"})
                                    aLink.href = URL.createObjectURL(blob)
                                    aLink.setAttribute('download', 'V0910' + '.zip') // 设置下载文件名称
                                    aLink.click();
                                    this.$refs.loadElement.appendChild(aLink);
                                }).catch(error => {});
                            }else if(!this.flagxz){
                                this.$message.warning('只支持已签署状态协议的附件下载');
                                return
                            } 
                        } 
                }
                  
            },500),
             //全选
            selectAll() {
                this.$refs.multipleTable.toggleAllSelection();
                if(this.dataAll == ''){
                    this.btnselectAll = '取消全选';
                    this.dataAll = '1';
                }else if(this.dataAll == '1'){
                    this.btnselectAll = '全选';
                    this.dataAll = '';
                }
            }   
                
        },
       
    }
</script>
<style lang="scss">
.el-tag.el-tag--info{ //控制发起合同第一步 服务类型字段
    max-width: 83px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
    //选择框
    .DownloadSelect .el-radio__input.is-checked .el-radio__inner{
        border-color: rgb(248, 192, 89);
        background: rgb(248, 192, 89);
    }
    .DownloadSelect .el-radio__input.is-checked+.el-radio__label{
        color: rgb(248, 192, 89);
    }
    .DownloadSelect .el-radio__inner:hover{
        border-color: rgb(248, 192, 89);
    }
    // 日期选择框
    .formData .el-form-item__content{
        width:60%;
    }
    .formidNo{
        width:100%;
    }
    .formidNo .el-form-item__content{
        width:59%;
    }
</style>
<style lang="scss" scoped>
.el-button:active {
    border-color: rgb(248, 192, 89);
    outline: 0;
}
    .mini_input{
        width:140px;
    }
    .interior_btn{
        width: 230px;
    }
    // 下载按钮
    .el-button--primary{
        border-color: rgb(248, 192, 89);
    }
    .el-button--primary:focus, .el-button--primary:hover{
        border-color: rgb(248, 192, 89);
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
</style>