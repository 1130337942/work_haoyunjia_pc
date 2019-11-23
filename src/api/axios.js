import axios from "axios";
import * as auth from '@/api/cookieStorage';
import { Message, MessageBox,Notification  } from 'element-ui';

//创建axios实例
const service  = axios.create({
    headers: { "Content-Type": "application/json" },
    headers: { "Access-Control-Allow-Origin": "*" },
    timeout: 60000
});

//添加拦截器
service.interceptors.request.use(
    config => {
        let getToken = auth.getCookies('token')
        if(getToken){
            config.headers["Authorization"] = getToken;
        }
        if (config.method === "post" || config.method === "put") {
            // console.log(config.data)
            // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
            config.data.param = JSON.stringify(config.data.param)
        }
        // 请求发送前处理
        return config
    },
    error => {
        // 请求错误的处理
        return Promise.reject(error)
    }
);

//响应拦截
service.interceptors.response.use(
    response => {
        const {data} = response;
        // console.log(data)
        
        if (data.code * 1 === 0) {
            return data;
        }
        if(data.code * 1 === 100000){
            Message({
                message: data.message,
                type: 'error'
            })
            return Promise.reject(data);
        }
    },
    error => {
        console.log(error)
        if(error&&error.response){
            switch (error.response.status) {
                case '400':
                    Message({
                        message: '错误请求',
                        type: 'error'
                    })
                break
                case '401':
                    MessageBox(
                    '登录超时，请重新登录',
                    '确定登出',{
                        confirmButtonText: '重新登录',
                        type: 'warning',
                        showCancelButton: false,
                        showClose: false,
                        closeOnClickModal: false
                    }).then(() => {
                        auth.removeCookies('token');
                    })
                break
                case '403':
                    Message({
                        message: '拒绝访问',
                        type: 'error'
                    })
                break
                case '404':
                    Message({
                        message: '请求错误,未找到该资源',
                        type: 'error'
                    })
                break
                case '405':
                    Message({
                        message: '请求方法错误',
                        type: 'error'
                    })
                break
                case '408':
                    Message({
                        message: '请求超时',
                        type: 'error'
                    })
                break
                case '500':
                    Message({
                        message: '服务器内部错误',
                        type: 'error'
                    })
                break
                case '501':
                    Message({
                        message: '服务器出小差了',
                        type: 'error'
                    })
                break  
                case '502':
                    Message({
                        message: '网络错误',
                        type: 'error'
                    })
                break
                case 503:
                    Message({
                        message: '服务不可用',
                        type: 'error'
                    })
                break
                case '504':
                    Message({
                        message: '网络超时',
                        type: 'error'
                    })
                break
                case '505':
                    Message({
                        message: 'http版本不支持该请求',
                        type: 'error'
                    })
                break
                case '4008':
                    Message({
                        message: '刷新token失败',
                        type: 'error'
                    })
                break
                default:
                    Message({
                        message: `连接错误${error.response.status}`,
                        type: 'error'
                    });
            }
        }else{
            Message({
                message: '服务器出小差了',
                type: 'error'
            })
        }  
        // console.log('err' + error) // for debug
        return Promise.reject(error)
    }
);

export default function() {
    return service;
}