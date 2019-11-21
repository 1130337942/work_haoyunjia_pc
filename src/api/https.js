import axios from '@/api/axios';
const instance = axios();
// console.log(axios)
export default {
    get(url, params, headers){
        let options = {};
        if (params) {
            options.params = params;
        }
        if (headers) {
            options.headers = headers;
        }
        return instance.get(url, options);
    },
    post(url, params, headers, data){
        let options = {};
        if (params) {
            options.params = params;
        }
        if (headers) {
            options.headers = headers;
        }
        // console.log(url)
        return instance.post(url, { param: data }, options);
    },
    put(url, params, headers) {
        let options = {};
    
        if (headers) {
          options.headers = headers;
        }
        return instance.put(url, params, options);
    },
    delete(url, params, headers) {
        let options = {};
        if (params) {
          options.params = params;
        }
        if (headers) {
          options.headers = headers;
        }
        return instance.delete(url, options);
    }

}