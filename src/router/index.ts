import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { clearPending } from '@/api/http'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, form, next) => {
    // 在跳转跳由之前, 先清除所有的请求
    clearPending()
    // ...
    next()
})

export default router
