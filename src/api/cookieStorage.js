import Cookies from 'js-cookie';

//设置cookie
export function setCookies(key, value, expires){
    return Cookies.set(key,value,{expires: expires})
}
//取出cookie
export function getCookies(key){
    return Cookies.get(key)
}
//删除某个cookie
export function removeCookies(key){
    return Cookies.remove(key)
}

//获取公司id
export function getCompanyId(){
    return Cookies.get('currentCompanyId')
}
//获取用户id
export function getUserId(){
    return Cookies.get('userId')
}