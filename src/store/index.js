import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        server:{
            ip:'127.0.0.1',
            port: 80
        },
        url:'http://www.godbmw.com'
    },
    mutations:{ },
    getters:{
        summaryUri(state){
            let port = typeof state.server.port === 'string'?state.server.port : state.server.port.toString()
            return state.server + ":" + port
        }
    }
})

export default store
