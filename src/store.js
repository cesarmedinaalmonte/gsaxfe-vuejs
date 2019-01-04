import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        headerTitle: '',
        breadcrumb: []
    },
    mutations: {
        updateHeader(state, data){
            state.headerTitle = data.title,
            state.breadcrumb = data.breadcrumb ? data.breadcrumb : []
        }
    },
    actions: {
        updateHeader ({ commit }, payload) {
            commit('updateHeader', payload);
        }
    }
})
