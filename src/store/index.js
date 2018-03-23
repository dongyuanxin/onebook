import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        isChrome:false,
        checked:false,
        server:{
            ip:'127.0.0.1',
            port: 80
        },
        url:'http://www.godbmw.com'
    },
    mutations:{
        checkChrome(state,userAgent) {
            if(state.checked) return 
            state.isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari')>-1
        },
        updateChecked(state){
            state.checked = true
        }
    },
    getters:{
        summaryUri(state){
            let port = typeof state.server.port === 'string'?state.server.port : state.server.port.toString()
            return state.server + ":" + port
        }
    }
})

export default store
