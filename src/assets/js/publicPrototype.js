import codeJson from './codeData'
const install = (Vue)=>{
    Vue.prototype.$codeJson = ()=>{
        return codeJson
    }
}

export default install;