import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layouts/DefaultLayout.vue'),
        children: [
            {
                path: 'home',
                name: 'home',
                alias: '',
                component: () => import('@/pages/Home.vue')
            }
        ]
    }
]

export default routes
