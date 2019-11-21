<template>
  <div class="BigBox clearfix">
    <div class="left leftBox">
      <h1>角色详情</h1>
      <h2>公司入驻</h2>
    </div>
    <!-- 已入驻/未入驻 -->
    <div class="left rightBox" v-show="box == 1">
      <div class="rightText">
        <h1>公司入驻</h1>
        <div class="search">
          <el-input placeholder class="interior_btn" v-model="companyName" size="small">
            <el-button slot="append" @click="search">搜索</el-button>
          </el-input>
        </div>
        <div class="content">
          <ul>
            <li v-show='flag == "showEnter"'>{{datum.companyName}}</li>
            <li v-show='flag == "showEnter"'> 地址： {{datum.detailAddress}}</li>
            <li v-show='flag == "showEnter"'> 法定代表人： {{datum.contactPerson}}</li>
            <li v-show='flag == "showEnter"'> 管理员联系电话： {{datum.contactMobile}}</li>
            <li v-show='authentication == "one"' style='color:rgba(248,192,89,1);font-size:16px;position: absolute;bottom: 0;'>企业已认证，请联系管理员添加您进组织！</li>
            <li v-show='authentication == "two"' style='color:rgba(248,192,89,1);font-size:16px;position: absolute;bottom: 0;'>企业未入驻，赶紧来入驻吧！</li>
          </ul>
        </div>
        <div class='btn btnEnter' v-show = 'flag2 == "showEnter2"'>
              <el-button @click= 'box2()'>入驻</el-button>
        </div>
      </div>
    </div>

    <!-- 创建 -->
    <div class="left rightBox" v-show="box == 2">
      <div class="rightText">
        <h1>创建</h1>
        <div style="width:900px;height:400px;margin:0 auto;">
          <el-form :label-position="labelPosition" :model="formLabelAlign" class="SubmittedIn">
            <el-form-item class="left" style="margin-left:40px">
              <label>公司全称</label>
              <span>*</span>
              <el-input v-model="formLabelAlign.companyName" size="small"></el-input>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>证件类型</label>
              <span>*</span>
              <el-select v-model="formLabelAlign.idType" placeholder="请选择" size="small" style="width:100%;">
                <el-option label="" value=""></el-option>
                <el-option label="大陆 " value="1"></el-option>
                <el-option label="离岸" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>信用代码</label>
              <span>*</span>
              <el-input v-model="formLabelAlign.idNumber" size="small"></el-input>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>行业类型</label>
              <span>*</span>
              <el-select v-model="formLabelAlign.industryType" placeholder="请选择" size="small" style="width:100%;">
                <!-- <el-option label="大陆 " value="1"></el-option>
                <el-option label="离岸" value="2"></el-option> -->
                <el-option label="" value=""></el-option>
                <el-option
                  v-for="item in dataDictPO2"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>人员规模</label>
              <span>*</span>
              <el-select v-model="formLabelAlign.pullDownValue" placeholder="请选择" size="small" style="width: 100%;">
                <el-option label="" value=""></el-option>
                <el-option
                  v-for="item in dataDictPO1"
                  :key="item.itemCode"
                  :label="item.itemName"
                  :value="item.itemCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>联系人姓名</label>
              <span>*</span>
              <el-input v-model="formLabelAlign.contactPerson" size="small"></el-input>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>邀请码</label>
              <el-input v-model="formLabelAlign.invitationCode" size="small"></el-input>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>公司注册地址</label>
              <span>*</span> <br>
              <el-select v-model="formLabelAlign.sheng" placeholder="省" @click.native='getDictItemsByCodes2(1)' @change="selectGetSheng" size="small" style="width:30%;">
                <el-option label="" value=""></el-option>
                <el-option
                  v-for="item in datalist1"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select v-model="formLabelAlign.shi" placeholder="市" size="small" @click.native='getDictItemsByCodes2(2)' @change="selectGetShi" style="width:30%;margin:0 5%;">
                <el-option label="" value=""></el-option>
                <el-option
                  v-for="item in datalist2"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
              <el-select v-model="formLabelAlign.qu" placeholder="区" size="small" @click.native='getDictItemsByCodes2(3)' @change="selectGetQu" style="width:30%;" class='right'>
                <el-option label="" value=""></el-option>
                <el-option
                  v-for="item in datalist3"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="left" style="margin-left:40px">
              <label>详细地址</label>
              <span>*</span>
              <el-input v-model="formLabelAlign.detailAddress" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btn btnSubmit">
          <el-button @click="box = 1">上一步</el-button>
          <el-button v-on:click="succeedSubmit" class="btnColor">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { searchCompanyName,registerCompany,getDictItemsByCodes,getBaseRegion } from "../../api/api";

export default {
  name: "TheCompanyIn",
  data() {
    return {
      box: 1,
      flag: "",
      flag2:'',
      authentication: "",
      companyName:'',
      datum: [
        {
          companyName: "",
          detailAddress: "",
          contactPerson: "",
          contactMobile: ""
        }
      ],
      //表单
      labelPosition: "top",
      formLabelAlign: {
        companyCategory:1,
        companyName:'',
        idType:'',
        idNumber:'',
        industryType:'',
        pullDownValue:'',
        contactPerson:'',
        invitationCode:'',
        detailAddress:'',
        sheng:'',
        shi:'',
        qu:'',
        addressCode:'',
        businessLicenseAttachment:'',
        businessLicenseAttachmentSheng:'',
        businessLicenseAttachmentShi:'',
        businessLicenseAttachmentQu:'',
      },
      // 创建
      form: {
        region: ""
      },
      dataDictPO1:'',
      dataDictPO2:'',
      datalist1:'',
      datalist2:'',
      datalist3:'',
    };
  },
  components: {},
  methods: {
    box2() {
      this.box = 2;
    },
    //搜索
    search() {
      var $cookie = this.$cookie;
      this.$cookie.get("token");
     // console.log("token:====" + this.$cookie.get("token"));
      
     // this.flag2 = "showEnter2";
      let param = {param:JSON.stringify({companyName: this.companyName})}
      searchCompanyName(param).then(result => {
          if (result.code == "000000") {
            //成功
          //  console.log(result.data);
            if (result.data != null) {
              this.flag = "showEnter";
              this.datum = result.data;
              if (
                result.data.registerStatus == "1" &&
                result.data.certificationStatus == "2" 
              ) {
                this.authentication = "one";
                this.flag2 = "";
              } else if (
                result.data.registerStatus == "1" &&
                result.data.certificationStatus == "3"
              ) {
                this.authentication = "one";
                this.flag2 = "";
              } else if (
                result.data.registerStatus == "1" &&
                result.data.certificationStatus == "1"
              ) {
                this.authentication = "two";
                this.flag2 = "showEnter2";
              } else if (
                result.data.registerStatus == "2"
              ) {
                this.authentication = "two";
                this.flag2 = "showEnter2";
              }
            }else{
             // this.$message.error('企业未入驻，赶紧来入驻吧！');
              this.datum = ''
              this.authentication = "two";
              this.flag = "";
              this.flag2 = "showEnter2";
            }
          } else if (result.code == "100000") {
            //失败
            this.$message.error(result.message);
          }
        })
        .catch(error => {
          //  this.$router.push('/Login');
        });
    },
    //入驻
     succeedSubmit() {
      var $cookie = this.$cookie;
      this.$cookie.get("token");
      this.formLabelAlign.addressCode = this.formLabelAlign.sheng + '-' + this.formLabelAlign.shi + '-' + this.formLabelAlign.qu;
      this.formLabelAlign.businessLicenseAttachment = this.formLabelAlign.businessLicenseAttachmentSheng + '-' + this.formLabelAlign.businessLicenseAttachmentShi + '-' + this.formLabelAlign.businessLicenseAttachmentQu;
         let param = {param:JSON.stringify({
            companyCategory: this.formLabelAlign.companyCategory,
            companyName: this.formLabelAlign.companyName,
            idType: this.formLabelAlign.idType,
          //  idNumber: this.formLabelAlign.idNumber,
            industryType: this.formLabelAlign.industryType,
            staffSize: this.formLabelAlign.pullDownValue,
            invitationCode: this.formLabelAlign.invitationCode,
            addressCode: this.formLabelAlign.addressCode,
            detailAddress: this.formLabelAlign.detailAddress,
            contactPerson: this.formLabelAlign.contactPerson,
            unionCode: this.formLabelAlign.unionCode,
            businessRegistrationNumber: this.formLabelAlign.idNumber,
            businessLicenseAttachment:this.formLabelAlign.businessLicenseAttachment
         })}
          registerCompany(param) .then(result => {
          if (result.code == "000000") {
            this.$cookie.set('currentCompanyName',this.formLabelAlign.companyName);
            this.$cookie.set('currentCompanyId',result.data.companyId);
            //  this.$cookie.set('mobile',result.data.mobile)
            //  this.$cookie.set('userId',result.data.userId);
            //  this.$cookie.set('headPortraitAttachment',result.data.headPortraitAttachment);
            //  this.$cookie.set('tabIcon',result.data.tabIcon);
            //  this.$cookie.set('userName',this.formLabelAlign.contactPerson);
            //  localStorage.setItem("mobile",result.data.mobile);
            //  localStorage.setItem("passwd",result.data.passwd);
            //  localStorage.setItem("key_token", result.data.token)
            //成功
            this.$message({
              message: '公司注册成功',
              type: 'success'
            });
          //  console.log(this);
            let _this = this;
            _this.$router.push('/index');
          } else if (result.code == "100000") {
            //失败
            this.$message.error(result.message);
          }
        })
        .catch(error => {
           // this.$router.push('/Login');
        });
    },
    //公共字典获取公司人员规模
		getDictItemsByCodes1() {
			let param = {param:JSON.stringify({
					parentCode: 'EMP'
					}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}}
          getDictItemsByCodes(param).then(result => {
          //  console.log(result);
					  this.dataDictPO1 = result.data[0].dataDictPO
				})
				.catch(error => {
					this.$router.push('/Login');
				})
    },
    //公共字典获取省市区
		getDictItemsByCodes2(tab) {
      if(tab == 1){
        let param = {param:JSON.stringify({
          parentCode: '',
          name:''
				}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
        }}
        getBaseRegion(param).then(result => {
					  this.datalist1 = result.data
				})
				.catch(error => {
					this.$router.push('/Login');
        });
      }else if(tab == 2){
        let param = {param:JSON.stringify({
          parentCode: this.formLabelAlign.sheng,
          name:''
				}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
        }}
        getBaseRegion(param).then(result => {
					  this.datalist2 = result.data
				})
				.catch(error => {
					this.$router.push('/Login');
				})
      }else if(tab == 3){
        let param = {param:JSON.stringify({
          parentCode: this.formLabelAlign.shi,
          name:''
				}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
        }}
        getBaseRegion(param).then(result => {
					  this.datalist3 = result.data
				})
				.catch(error => {
					this.$router.push('/Login');
				})
      }
        
    },
    //公共字典获取公司行业类型
		getDictItemsByCodes3() {
			let param = {param:JSON.stringify({
					parentCode: 'IND'
					}),pageParam: {
						pageIndex: this.currentPage - 1, //第几页
						pageSize: this.pageSize //每页几条
					}}
          getDictItemsByCodes(param).then(result => {
					  this.dataDictPO2 = result.data[0].dataDictPO
				})
				.catch(error => {
					
				})
    },
    //根据公司ID获取省
    selectGetSheng(vId){
      let obj = {};
      obj = this.datalist1.find((item)=>{//这里的selectList就是上面遍历的数据源
        return item.code === vId;//筛选出匹配数据
      });
        this.formLabelAlign.businessLicenseAttachmentSheng = obj.name;
    },
    //根据公司ID获取市
    selectGetShi(vId){
      let obj = {};
      obj = this.datalist2.find((item)=>{//这里的selectList就是上面遍历的数据源
        return item.code === vId;//筛选出匹配数据
      });
        this.formLabelAlign.businessLicenseAttachmentShi = obj.name;
    },
    //根据公司ID获取区
    selectGetQu(vId){
      let obj = {};
      obj = this.datalist3.find((item)=>{//这里的selectList就是上面遍历的数据源
        return item.code === vId;//筛选出匹配数据
      });
        this.formLabelAlign.businessLicenseAttachmentQu = obj.name;
    },
  },
  created() {
    //公共字典获取公司人员规模
    this.getDictItemsByCodes1();
    //公共字典获取公司行业类型
    this.getDictItemsByCodes3();
  }
};
</script>
<style src="../../Style/init.css"></style>
<style lang='scss'>
/* 搜索按钮 */
.interior_btn .el-input-group__append {
  color: white;
  background: #f8c059;
}
// 入驻按钮
.btn .el-button {
  padding: 8px 67px;
  font-size: 18px;
  color: white;
  background: #f8c059;
}
.btn .el-button:active {
  color: none;
  border-color: none;
}
.btn .el-button:hover,
.btn .el-button:focus {
  color: white;
  border-color: #f8c059;
  background-color: #f8c059;
}
// 提交页面
.SubmittedIn .el-form-item__label {
  line-height: 0;
  margin-top: 20px;
}
.SubmittedIn .el-form-item {
  width: 42%;
}
</style>

<style scoped>
.BigBox {
  width: 100%;
  height: 100%;
}
.leftBox {
  width: 20%;
  height: 100%;
  background: #272727;
  box-sizing: border-box;
}
.rightBox {
  width: 80%;
  height: 100%;
  color: #333333;
  background: #ffffff;
}
.leftBox h1 {
  text-align: center;
  margin-top: 100px;
}
.leftBox h1 {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.leftBox h2 {
  width: 240px;
  height: 48px;
  line-height: 48px;
  margin: 100px auto;
  text-align: center;
  background: rgba(248, 192, 89, 1);
  border-radius: 24px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}
.rightText h1 {
  width: 880px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  margin: 100px auto 40px auto;
}
.search {
  text-align: center;
}
.content {
  width: 880px;
  height: 334px;
  margin: 50px auto 0 auto;
  padding: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
}
.content ul {
  position: relative;
  height: 100%;
}
.content ul li {
  height: 22px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  margin: 10px 0;
}
.content ul li:nth-child(1) {
  height: 28px;
  font-size: 20px;
  line-height: 28px;
}
/* 入驻按钮,提交按钮 */
.btnEnter,
.btnSubmit {
  width: 880px;
  margin: 200px auto 40px auto;
  text-align: right;
}
/* 搜索按钮 */
.interior_btn {
  width: 880px;
}
/* 提交页面 */
.SubmittedIn span {
  color: #ee382b;
}
</style>

