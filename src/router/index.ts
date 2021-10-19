import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, form, next) => {
    // ...
    next()
})

export default router
