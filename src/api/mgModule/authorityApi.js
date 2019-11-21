import api from '@/api/https'

let VUE_APP_basic = process.env.VUE_APP_basic
let VUE_APP_export = process.env.VUE_APP_export

//获取角色列表
export function getRoleSetByCompanyId(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/getRoleSetByCompanyId'
    return api.post(url, params, header, data);
}
//权限列表
export function getResourceList(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/getResourceList'
    return api.post(url, params, header, data);
}
//权限修改
export function updateResource(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/updateResource '
    return api.post(url, params, header, data);
}
//添加角色/角色组
export function addRole(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/addRole'
    return api.post(url, params, header, data);
}
//角色/角色组 角色修改
export function updateRole(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/updateRole'
    return api.post(url, params, header, data);
}
//角色/角色组 角色删除	
export function deleteById(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/deleteById'
    return api.post(url, params, header, data);
}
//角色下添加员工
export function addRoleEmployee(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/addRoleEmployee'
    return api.post(url, params, header, data);
}
//角色下删除员工
export function deleteRoleEmployee(data, params, header){
    let url = VUE_APP_basic+'/pcroleref/rest/deleteRoleEmployee'
    return api.post(url, params, header, data);
}
