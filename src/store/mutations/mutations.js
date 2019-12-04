import router from '@/router';
export default {
    //push页面页签
    commitTabArrFn(state,data){
        // console.log(data)
        let thisRouteName = data.name
        let moduleTabType = sessionStorage.moduleTabType //1：业务工作台、2：管理控制台
        var ishas = state[`tabArr${moduleTabType}`].some(item=>{
            return thisRouteName == item.name
        })
        if(!ishas){
            state[`tabArr${moduleTabType}`].push(data)
        }
        sessionStorage.setItem(`tabArr${moduleTabType}`,JSON.stringify(state[`tabArr${moduleTabType}`]))
        state.pageTabArr =  JSON.parse(sessionStorage[`tabArr${moduleTabType}`]);

        if(router.app._route.meta.keepAlive){
            let arr =  state.pageTabArr.map(item =>{
                return item.path.substring(1)
            })
            state.include = arr.join()
        }
    },
    //删除页签
    closeTabArrFn(state,data){
        // console.log(data)
        let moduleTabType = sessionStorage.moduleTabType;
        let delIndex = state[`tabArr${moduleTabType}`].findIndex(item=> item.name == data.name)
        state[`tabArr${moduleTabType}`].splice(delIndex, 1);
        sessionStorage.setItem(`tabArr${moduleTabType}`,JSON.stringify( state[`tabArr${moduleTabType}`]))
        state.pageTabArr =  JSON.parse(sessionStorage[`tabArr${moduleTabType}`]);
        if(router.app._route.meta.keepAlive){
            let arr =  state.pageTabArr.map(item =>{
                return item.path.substring(1)
            })
            state.include = arr.join()
        }
       
    },
    //清除vuex 页签的数据
    tabArrClear(state){
        state.tabArr1 = [];
        state.tabArr2 = [];
    },
    //权限编码
    commitPostUserCodeFn(state,data){
        state.postUserCode = data;
        sessionStorage.setItem('postUserCode',data)
    },
    commitGetUserCodeFn(state,data){
        state.getUserCode = data
    }
}