// declare module '*.vue' {
//     import { DefineComponent } from 'vue'
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
//     const component: DefineComponent<{}, {}, any>
//     export default component
// }

// shims-vue.d.ts
// import Vue from 'vue'
// import VueRouter, { Route } from 'vue-router'
// import { Store } from 'vuex'

// declare module 'vue/types/vue' {
//     interface Vue {
//         $router: VueRouter
//         $route: Route
//         $store: Store<any>
//         // 以下是在main.ts中挂载到Vue.prototype上的变量
//         $api: any
//         $mock: any
//         $configs: any
//     }
// }
