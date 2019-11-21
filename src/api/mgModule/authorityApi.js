import api from '@/api/https'

let VUE_APP_basic = process.env.VUE_APP_basic
let VUE_APP_export = process.env.VUE_APP_export

//获取角色列表
export function getRoleSetByCompanyId(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/getRoleSetByCompanyId'
    return api.post(url, params, header, data);
}