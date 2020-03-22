import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import iView from 'iview'
import axios from 'axios'
import 'iview/dist/styles/iview.css'
import './permission'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(iView)



Vue.prototype.$axios = axios

var vue =new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
export default vue //将vue对象默认导出，便于其他地方使用该对象