import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const envUrl = { ...process.env, ...loadEnv(mode, process.cwd()) }
    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
        },
        base: envUrl.VITE_BASE_URL, // 设置打包路径
        server: {
            port: 4000, // 设置服务启动端口号
            open: true, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域

            // 设置代理，根据我们项目实际情况配置
            proxy: {
                '^/api': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                    ws: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        }
    })
}
