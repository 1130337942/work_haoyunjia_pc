import codeJson from './codeData';
import * as auth from '@/api/cookieStorage';
import store from '@/store/store';
import {ifUserIsRole} from '@/api/mgModule/authorityApi'
const install = (Vue)=>{
    Vue.prototype.$codeJson = ()=>{
        return codeJson
    },
    Vue.prototype.$codePostObj = ()=>{
        let $store = store()
        let data = {
            userId:auth.getUserId(),
            code: $store.state.postUserCode,
            companyId:auth.getCompanyId()
        }
        return data
    },
    Vue.prototype.$ifUserIsRoleFn = (data)=>{
        return ifUserIsRole(data)
    }
}

export default install;