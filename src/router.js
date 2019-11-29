import Vue from 'vue'//引入Vue
import Router from 'vue-router'//引入vue-router
import mgRouters from '@/routers/mgRouters'
Vue.use(Router);//Vue全局使用Router
import cookie from 'js-cookie';
Vue.prototype.$cookie = cookie;
let routes = [
        {
            path: '/',//权限验证页面
            redirect:'/getByOrgAndCompanyId'
            // name: 'Login',
            // meta:{
            //     title:'一招盈零工平台'
            // },
            // //component: Login
            // component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Login/Login')
        },
        {
            path: '/Login',
            name: 'Login',
            meta:{
                title:'一招盈零工平台'
            },
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Login/Login')
        },
        {
            path: '/getByOrgAndCompanyId',
            name: 'getByOrgAndCompanyId',
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Login/getByOrgAndCompanyId')
        },
        {
            path:'/TheCompanyIn',//入驻
            name:'TheCompanyIn',
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Login/TheCompanyIn')
        },
        {
            path: '/test', //测试界面
            name: 'test',
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/HomePage/test')
        },
        {
            path: '/',
            name: 'myView',
            component: ()=>import(/*webpackChunkName:'ImportHYJ'*/ '@/components/myView/myView'),
          
            redirect:{name: 'index'},
            children: [
                {
                    path: '/index',// 首页
                    name: 'index',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/contents/index'),
                    meta: {
                        keepAlive: false, // 不需要缓存
                        name: '首页'
                      
                    }
                },
                {
                    path: '/AllBill',// 灵活用工
                    name: 'AllBill',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/FlexibleBill/AllBill'),
                    meta: {
                        keepAlive: false, // 不需要缓存
                    }
                },
                {
                    path: '/ProductCenter',// 产品中心
                    name: 'ProductCenter',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/ProductCenter/ProductCenter'),
                    meta: {
                        keepAlive: true, // 需要缓存
                    }
                },
                {
                    path: '/Partner',// 合作商管理 全部
                    name: 'Partner',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/PartnerManagement/Partner'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name: '全部',
                    }
                },
                {
                    path: '/Client',// 合作商管理 客户
                    name: 'Client',
                    // component: () => import ('@/components/PartnerManagement/Client')
                    component:()=>import(/*webpackChunkName:'ImportHYJ'*/ '@/components/PartnerManagement/Client'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name: '客户',
                    }
                },
                {
                    path: '/LaborPool',// 合作商管理 用工池
                    name: 'LaborPool',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/PartnerManagement/LaborPool'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name: '用工池',
                    }
                },
                {
                    path: '/Rest',// 合作商管理 其他
                    name: 'Rest',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/PartnerManagement/Rest'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name: '其他',
                    }
                },
                {
                    path: '/servicePeopleList',// 服务人员管理 服务人员
                    name: 'servicePeopleList',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/servicePeople/servicePeopleList'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name: '服务人员',
                    }
                },
                {
                    path: '/Bill',// 账单
                    name: 'Bill',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Bill/Bill'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name:'账单',
                    }
                },
                {
                    path: '/CustomerContract',//客户协议管理
                    name: 'CustomerContract',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Contract/CustomerContract'),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                {
                    path: '/SupplierContract',//用工协议管理
                    name: 'SupplierContract',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/Contract/SupplierContract'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name:'用工协议管理'
                    }
                },
                {
                    path: '/RequestMonitor',//请求监控
                    name: 'RequestMonitor',
                    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/components/RequestManagement/RequestMonitor'),
                    meta: {
                        keepAlive: true, // 需要缓存
                        name:'请求监控',
                    }
                }
            ]
        },
        {
            path: '/MgHome',//管理控制台
            name: 'MgHome',
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/views/mgHome/MgViewPage'),
            children: mgRouters
           
        },
        {
            path: '/Workbench',//切换工作台
            name: 'Workbench',
            component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/views/switchWorkbench/Workbench'),
        }
    ]

    

const router = new Router({
     mode: "history",
    // base: '/hot/',  
    routes: routes
})

router.beforeEach((to,from,next)=>{
    //console.log(to.path)
    //console.log(cookie.get('token'));
    
    if(to.path === '/Login' || to.path === '/getByOrgAndCompanyId') {
        next();
    }else{
        let token = cookie.get('token');
        if(token === '') {
            next('/getByOrgAndCompanyId');
        }else {
            next();
        }
    }
  });
export default router;
