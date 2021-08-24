import { createApp } from 'vue'

// 通过如下方式挂载全局属性
// import * as api from '@/api/api'
// app.config.globalProperties['$api'] = api

// import Tailwind
import '@/styles/app.css'

// 加载element-plus
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

import App from './App.vue'

// 加载路由
import router from './router/index'
// 加载状态管理
import store from './store/index'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
