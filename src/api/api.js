/* eslint-disable no-undef */
import axios from 'axios'
import cookie from 'js-cookie';
let $cookie = cookie; 

let VUE_APP_basic = process.env.VUE_APP_basic
let VUE_APP_export = process.env.VUE_APP_export

//配置1 登陆不需要token
const LoginAxios = axios.create({
  timeout: 60000 
})
LoginAxios.interceptors.response.use(data => {
  // if (data.data.code ===  401) {
  //   window.location.hash = '/Login'
  // }
  return data
}, error => {
  // console.log(error.request.status);
  if(error.request.status == 0){
    alert('请求超时!!');
  }
  return Promise.reject(error)
});
export function AxiosLogin (url, prama) {
  return new Promise((resolve, reject) => {
    LoginAxios({
      url: url,
      method: 'post',
      data: prama
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    });
  });
}
//配置2 导入 导出 下载 列表 不需要设置超时时间
//文件上传拦截axios请求加token 不需要设置超时时间
axios.interceptors.request.use(config => {
  if ($cookie.get('token')) {
    config.headers['Authorization'] = $cookie.get('token')
  }
  return config
},error => {
  return Promise.reject(error) 
})
axios.interceptors.response.use(data => {
  // if (data.data.code ===  '401') {
  //   window.location.hash = '/Login'
  // }
  return data
});
//列表
export function axiosDc (url, prama) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: prama
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}
//文件上传专用 (导出)
export function AxiosFilePost (url, prama) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      prama,
      headers: {
      //  'content-type': 'multipart/form-data'
      },
      withCredentials: true
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}



//超时时间
const service = axios.create({
   timeout: 60000
})
//列表拦截axios请求加token
service.interceptors.request.use(config => {
  if ($cookie.get('token')) {
    config.headers['Authorization'] = $cookie.get('token')
  }
  return config
},error => {
  return Promise.reject(error) 
})

//列表401+请求超时控制
service.interceptors.response.use(data => {
  // if (data.data.code ===  '401') {
  //   window.location.hash = '/Login'
  // }
  return data
}, error => {
  // console.log(error.request.status);
  if(error.request.status == 0){
    alert('请求超时!');
  //  window.location.hash = '/Login'
  }
  return Promise.reject(error)
})
//列表post请求
export function AxiosPost (url, prama) {
  return new Promise((resolve, reject) => {
    service({
      url: url,
      method: 'post',
      data: prama
    }).then(res => {
      resolve(res.data)
    }).catch(e => {
      reject(e)
    })
  })
}
//个性化配置
export function getByOrgAndCompanyId (params) {
  const url = VUE_APP_export + '/orgDiv/rest/getByOrgAndCompanyId'
  const param = params
  return  AxiosPost(url, param)
}
//获取PC端菜单信息
export function getPcMenusByOrgId (params) {
  const url = VUE_APP_export + '/orgDiv/rest/getPcMenusByOrgId'
  const param = params
  return  AxiosPost(url, param)
}
//登陆
export function getLogin (params) {
  const url = VUE_APP_basic + '/pc/rest/auth'
  const param = params
  return  AxiosLogin(url, param)
}
//退出
export function logout (params) {
  const url = VUE_APP_basic + '/pc/rest/logout'
  const param = params
  return  AxiosPost(url, param)
}
//公司列表
export function listCompany (params) {
  const url = VUE_APP_basic + '/pccompany/rest/listCompany'
  const param = params
  return  axiosDc(url, param)
}
//注册
export function register (params) {
  const url = VUE_APP_basic + '/pcuser/rest/register'
  const param = params
  return  AxiosLogin(url, param)
}
//验证码
export function verifyCode (params) {
  const url = VUE_APP_basic + '/pc/rest/getVerifyCode'
  const param = params
  return  AxiosLogin(url, param)
}
//找回密码第一步 校验手机号
export function checkExistMobile (params) {
  const url = VUE_APP_basic + '/pc/rest/checkExistMobile'
  const param = params
  return  AxiosLogin(url, param)
}
export function updatePasswd (params) {
  const url = VUE_APP_basic + '/pcuser/rest/updatePasswd'
  const param = params
  return  AxiosLogin(url, param)
}
//公司入驻 搜索公司
export function searchCompanyName (params) {
  const url = VUE_APP_basic + '/pccompany/rest/searchCompanyName'
  const param = params
  return  AxiosPost(url, param)
}
//入驻
export function registerCompany (params) {
  const url = VUE_APP_basic + '/pccompany/rest/registerCompany'
  const param = params
  return  AxiosPost(url, param)
}
//获取省市区
export function getBaseRegion (params) {
  const url = VUE_APP_basic + '/pcregion/rest/getBaseRegion'
  const param = params
  return  axiosDc(url, param)
}
//公共字典
export function getDictItemsByCodes (params) {
  const url = VUE_APP_basic + '/pcdict/rest/getDictItemsByCodes'
  const param = params
  return  AxiosPost(url, param)
}
//合作关系管理 获取请求编码 （导出功能需要）
export function getRequestCode (params) {
  const url = VUE_APP_export + '/requestWork/rest/getRequestCode'
  const param = params
  return  AxiosPost(url, param)
}
//合作商列表
export function list (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/list'
  const param = params
  return  axiosDc(url, param)
}
//分配业务角色列表
export function partnerList (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/partnerList'
  const param = params
  return  axiosDc(url, param)
}
//业务角色信息分配
export function updateBizRolePc (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/updateBizRolePc'
  const param = params
  return  axiosDc(url, param)
}
//业务角色信息分配前 服务人员校验
export function check (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/check'
  const param = params
  return  axiosDc(url, param)
}
//合作商列表导出
export function partnerExport (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/partnerExport'
  const param = params
  return  AxiosFilePost(url, param)
}
//合作商下载
export function getTemplateUrl (params) {
  const url = VUE_APP_basic + '/pctemplate/rest/getTemplateUrl'
  const param = params
  return  AxiosPost(url, param)
}
//合作商导入
export function importUrl (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/import'
  const param = params
  return  axiosDc(url, param)
}
//用工池 列表发起签字
export function startTax (params) {
  const url = VUE_APP_export + '/pcTax/rest/startTax'
  const param = params
  return  axiosDc(url, param)
}
//客户合同管理，供应商合同管理
export function getAll (params) {
  const url = VUE_APP_export + '/pcCont/rest/getAll'
  const param = params
  return  AxiosPost(url, param)
}
//判断企业是否已认证
export function companyCertification (params) {
  const url = VUE_APP_export + '/pcCont/rest/companyCertification'
  const param = params
  return  AxiosPost(url, param)
}
//根据公司ID获取模板
export function TemplateByCompanyId (params) {
  const url = VUE_APP_export + '/pcTemplate/rest/getTemplateByCompanyId'
  const param = params
  return  AxiosPost(url, param)
}
//获取第二步合作商列表
export function getAllByLike1 (params) {
  const url = VUE_APP_export + '/pcCont/rest/getAllByLike1'
  const param = params
  return  axiosDc(url, param)
}
//获取第二步查询
export function getAllByLike2 (params) {
  const url = VUE_APP_export + '/pcCont/rest/getAllByLike2'
  const param = params
  return  axiosDc(url, param)
}
//合同管理窗口内发起签署signStatus 1 保存草稿signStatus 2
export function addCont (params) {
  const url = VUE_APP_export + '/pcCont/rest/addCont'
  const param = params
  return  AxiosPost(url, param)
}
//合同管理列表
export function createContractsAndPublish (params) {
  const url = VUE_APP_export + '/pcCont/rest/createContractsAndPublish'
  const param = params
  return  axiosDc(url, param)
}
//下载附件
// export function downloadZip (params) {
//   const url = VUE_APP_basic + '/pcCont/rest/downloadZip'
//   const param = params
//   return  AxiosFilePost(url, param)
// }
//用工池 客户 客户列表
export function customerList (params) {
  const url = VUE_APP_basic + '/pcpeople/rest/customerList'
  const param = params
  return  axiosDc(url, param)
}
//用工池 客户 服务人员分配
export function allacatonPartners (params) {
  const url = VUE_APP_basic + '/pcpartener/rest/allacatonPartners'
  const param = params
  return  axiosDc(url, param)
}
//用工池 客户 服务人员分配
export function addServicePeople (params) {
  const url = VUE_APP_basic + '/pcpeople/rest/addServicePeople'
  const param = params
  return  axiosDc(url, param)
}
//用工池 客户 服务人员列表
export function ServicePeopleList (params) {
  const url = VUE_APP_basic + '/pcpeople/rest/servicePeopleList'
  const param = params
  return  axiosDc(url, param)
}
//用工池 客户 删除服务人员列表
export function delServicePeople (params) {
  const url = VUE_APP_basic + '/pcpeople/rest/delServicePeople'
  const param = params
  return  axiosDc(url, param)
}
//服务人员管理 服务人员下载
export function serveTemplateUrl (params) {
  const url = VUE_APP_basic + '/pctemplate/rest/getTemplateUrl'
  const param = params
  return  AxiosPost(url, param)
}
//服务人员管理 导入
export function serveimport (params) {
  const url = VUE_APP_basic + '/pcpeople/rest/import'
  const param = params
  return  axiosDc(url, param)
}
//请求监控列表
export function requestWorkgetAll (params) {
  const url = VUE_APP_export + '/requestWork/rest/getAll'
  const param = params
  return  AxiosPost(url, param)
}
//查看单条请求监控详情
export function getRequestDetail (params) {
  const url = VUE_APP_export + '/requestWork/rest/getRequestDetail'
  const param = params
  return  AxiosPost(url, param)
}
//查看单条请求监控详情
export function getResult (params) {
  const url = VUE_APP_export + '/requestWork/rest/getResult'
  const param = params
  return  AxiosPost(url, param)
}
//组织架构树形结构 一级
export function listByCompanyId (params) {
  const url = VUE_APP_basic + '/pccompany/rest/listByCompanyId'
  const param = params
  return  AxiosPost(url, param)
}
//组织架构树形结构 子级
export function listByParentId (params) {
  const url = VUE_APP_basic + '/pccompany/rest/listByParentId'
  const param = params
  return  AxiosPost(url, param)
}
//组织架构树形结构 搜索上级部门
export function listByLike (params) {
  const url = VUE_APP_basic + '/pccompany/rest/listByLike'
  const param = params
  return  AxiosPost(url, param)
}
//组织架构树形结构 搜索部门主管
export function ListType (params) {
  const url = VUE_APP_basic + '/pccompany/rest/pcAddDepartEmployeeListLike'
  const param = params
  return  AxiosPost(url, param)
}
//管理控制台首页 
export function mghomePage (params) {
  const url = VUE_APP_basic + '/pccompany/rest/homePage'
  const param = params
  return  AxiosPost(url, param)
}
//管理控制台 添加部门
export function addDepartment (params) {
  const url = VUE_APP_basic + '/pccompany/rest/addDepartment'
  const param = params
  return  AxiosPost(url, param)
}
//管理控制台 修改部门
export function updateDepartmentById (params) {
  const url = VUE_APP_basic + '/pccompany/rest/updateDepartmentById'
  const param = params
  return  AxiosPost(url, param)
}
//管理控制台 添加成员
export function addEmployee (params) {
  const url = VUE_APP_basic + '/pccompany/rest/addEmployee'
  const param = params
  return  AxiosPost(url, param)
}
//管理控制台 编辑成员
export function updateEmployeeById (params) {
  const url = VUE_APP_basic + '/pccompany/rest/updateEmployeeById'
  const param = params
  return  AxiosPost(url, param)
}
//工作台列表
export function workBenchList (params) {
  const url = VUE_APP_basic + '/pcworkbench/rest/workBenchList'
  const param = params
  return  AxiosPost(url, param)
}
//切换工作台
export function switchWorkbench (params) {
  const url = VUE_APP_basic + '/pcworkbench/rest/switchWorkbench'
  const param = params
  return  AxiosPost(url, param)
}
