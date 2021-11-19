import '/@/design/index.less'
import 'virtual:windi-base.css'
import 'virtual:windi-components.css'
import 'virtual:windi-utilities.css'
// Register icon sprite
import 'virtual:svg-icons-register'
import App from './App.vue'
import { createApp } from 'vue'
import { setupStore } from '/@/store'
import { initAppConfigStore } from '/@/logics/initAppConfig'

// Importing on demand in local development will increase the number of browser requests by around 20%.
// This may slow down the browser refresh speed.
// Therefore, only enable on-demand importing in production environments .
if (import.meta.env.DEV) {
    import('ant-design-vue/dist/antd.less')
}

async function bootstrap() {
    const app = createApp(App)
    app.mount('#app')

    // Configure store
    setupStore(app)

    // Initialize internal system configuration
    initAppConfigStore()
}

bootstrap()
