import {ifUserIsRole} from '@/api/mgModule/authorityApi'
import * as auth from '@/api/cookieStorage'
export default{
    async getUserCodeFn({state,commit}){
        try{
            let data = {
                userId:auth.getUserId(),
                code:state.postUserCode,
                companyId:auth.getCompanyId()
            };
            let res = await ifUserIsRole(data)
                  console.log(res)
            commit('commitGetUserCodeFn',res.data)
        }catch(error){
            console.log(error)
        }
        
    }
}