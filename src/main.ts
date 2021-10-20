import { createApp } from 'vue'

// 加载element-plus
// import ElementPlus from 'element-plus'
// import 'element-plus/lib/theme-chalk/index.css'

// 通过如下方式挂载全局属性
import Axios from 'axios'

import App from './App.vue'

// import Tailwind
import '@/styles/app.css'

// import svg-icons
import 'vite-plugin-svg-icons/register'

// 加载路由
import router from './router/index'
// 加载状态管理
import store from './store/index'

const app = createApp(App)
app.config.globalProperties.$api = Axios

app.use(store).use(router).mount('#app')
