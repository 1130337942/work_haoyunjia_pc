const sliderData = [
    {
        name:'首页',
        path:"/MgHome",
        // id:"index",
    },
    {
        name:'组织架构',
        path:'/OrganizationalStructure'
    },
    {
        name:'权限管理',
        path:'/PermissionsManagement'
    },
    {
        name:'企业设置',
        // id:"aside2",
        child:[
            {
                name:'基础设置',
                path:'/CompanyBasisSet'
            },
            {
                name:'短信模板',
                path:'/CompanySmsSet'
            },
        ]
    },
   
]
export default sliderData