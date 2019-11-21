import api from '@/api/https'

let VUE_APP_basic = process.env.VUE_APP_basic
let VUE_APP_export = process.env.VUE_APP_export

//工作台列表
export function workBenchList(data, params, header){
    const url = VUE_APP_basic + "/pcworkbench/rest/workBenchList"
    return api.post(url, params, header, data);
}
//切换工作台
export function switchWorkbench (data, params, header) {
    const url = VUE_APP_basic + '/pcworkbench/rest/switchWorkbench'
    return api.post(url, params, header, data);
}
  