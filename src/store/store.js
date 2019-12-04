import Vuex from 'vuex'

import defaultState from './state/state'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import actions from './actions/actions'

export default()=>{
    const store =  new Vuex.Store({
        state:defaultState,
        getters,
        mutations,
        actions
    })
    //webpakc 热更替
    if(module.hot){
        module.hot.accept([
            './state/state',
            './getters/getters',
            './mutations/mutations',
            './actions/actions'
        ],()=>{
            const newState = require('./state/state').default
            const newGetters = require('./getters/getters').default
            const newMutations = require('./mutations/mutations').default
            const newActions = require('./actions/actions').default
            store.hotUpdate({
                state:newState,
                getters:newGetters,
                mutations:newMutations,
                actions:newActions
            })
        })
    }
    return store
}