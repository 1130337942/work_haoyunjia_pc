const mgRouters = [{
    path: "",
    name: "MgHome",
    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/views/mgHome/MgHome'),
    meta: {
        name: '首页'
    }
},{
    path: "/OrganizationalStructure",
    name: "OrganizationalStructure",
    component: () => import (/*webpackChunkName:'ImportHYJ'*/ '@/views/orgStructure/OrganizationalStructure'),
    meta: {
        name: '组织架构'
    }
},
{
    path: '/PermissionsManagement',
    name: "PermissionsManagement",
    meta: {
        name: '权限管理'
    },
    component: () =>
        import ( /*webpackChunkName:'ImportHYJ'*/ "@/views/permissions/PermissionsManagement"),
},
{
    path: '/CompanyBasisSet',
    name: "CompanyBasisSet",
    meta: {
        name: '基础设置'
    },
    component: () =>
        import ( /*webpackChunkName:'ImportHYJ'*/ "@/views/companySet/CompanyBasisSet"),
}, {
    path: '/CompanySmsSet',
    name: "CompanySmsSet",
    meta: {
        name: '短信模板'
    },
    component: () =>
        import ( /*webpackChunkName:'ImportHYJ'*/ "@/views/companySet/CompanySmsSet"),
}

]
export default mgRouters