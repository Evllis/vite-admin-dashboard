import { createStore } from 'vuex'

const defaultStore = {
    count: 0
}

export default createStore({
    state() {
        return defaultStore
    },
    mutations: {
        increment(state: typeof defaultStore) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    },
    getters: {
        double(state: typeof defaultStore) {
            return 2 * state.count
        }
    }
})
