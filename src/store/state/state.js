const stateData = {
    include:'',//需要缓存的组件，keepAlive
    pageTabArr:[],//页面页签数据
    //业务控制台页签数据
    tabArr1:sessionStorage.tabArr1? JSON.parse(sessionStorage.tabArr1):[{
        path:'/index',
        name:'首页',
        pathName:'index'
    }],
    //管理控制台页签数据
    tabArr2:sessionStorage.tabArr2? JSON.parse(sessionStorage.tabArr2):[{
        path:'/mgHome',
        pathName:'mgHome',
        name:'首页'
    }],
    postUserCode:sessionStorage.postUserCode?sessionStorage.postUserCode:"",//向后台传送权限编码
    getUserCode:[],//后台获取的权限编码(是否有权限)
}
export default stateData