import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import { stat } from 'fs';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        transferArray: [
            {path:'/index',name: '首页'}
        ],
        tags: []
    },
    mutations: {
        // state 公共存放区
        // valArray 左边导航点击后传入 [path && name]
        valuation(state, valArray) {
            if(valArray[2]){
                state.transferArray.push(
                    { path: valArray[0], name: valArray[1] }
                )
            }
        },
        SET_TAGS(state, tags) {
            state.tags = tags;
        }
    },
    actions: {
        initTags({commit}, tags) {
            commit('SET_TAGS', tags)
        },
        getTags({dispatch}) {
            let TagsView =  JSON.parse(localStorage.getItem('TagsView')) || [{path: '/index', name: '首页', active: true}];
            dispatch('initTags', TagsView)
        },
        saveTags({commit, state}, {path, name}) {
            let index = -1;
            let tags = state.tags;
            for(let i = 0; i < tags.length; i++) {
                if(tags[i].path == path) {
                    index = i;
                    break;
                }
            }
            tags.forEach(v => {
                v.active = false
            })
            if(index == -1) {
                tags.push({
                    path: path,
                    name: name,
                    active: true
                });
            } else {
                tags[index].active = true;
            }
            localStorage.setItem('TagsView', JSON.stringify(tags))
            commit('SET_TAGS', tags)
        },
        deleteTags({commit, state}, {path, name}) {
            let tags = state.tags;
            let index;
            let isSelect = false;
            for(let i = 0; i< tags.length; i++) {
                if(tags[i].name == name) {
                    index = i;
                    isSelect = tags[i].active;
                    break;
                }
            }
            if(index>=0) {
                tags.splice(index, 1);
                if(isSelect) {
                    tags[tags.length-1].active = true;
                    router.push(tags[tags.length-1].path)
                }
                localStorage.setItem('TagsView', JSON.stringify(tags))
                commit('SET_TAGS', tags)
            }
        }
    }
})
