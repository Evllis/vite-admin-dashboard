import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv, UserConfigExport } from 'vite'
import { resolve } from 'path'
import moment from 'moment'
import pkg from './package.json'

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import createProxy from './build/vite/proxy'
import { wrapperEnv } from './build/utiils'
import { OUTPUT_DIR } from './build/constant'
import createVitePlugins from './build/vite/plugin'

const pathResolve = (dir: string): string => {
    return resolve(process.cwd(), '.', dir)
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss')
}

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
    const root = process.cwd()
    const env = { ...process.env, ...loadEnv(mode, root) }

    // The boolean type read by loadEnv is a string. This function can be converted to boolean type
    const viteEnv = wrapperEnv(env)
    const { VITE_PORT, VITE_BASE_URL, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv
    const isBuild = command === 'build'
    return defineConfig({
        base: VITE_BASE_URL, // 设置打包路径
        root,
        resolve: {
            alias: [
                {
                    // 匹配html的静态资源别名
                    // alias要用'/'开头，并且路径只能用字符串，不能用path.resolve
                    find: '/assets',
                    replacement: 'src/assets'
                },
                {
                    find: /\/@\//,
                    replacement: `${pathResolve('src')}/`
                },
                {
                    find: /\/#\//,
                    replacement: `${pathResolve('types')}/`
                }
            ]
        },
        // 静态资源合并打包的问题
        build: {
            target: 'es2015',
            outDir: OUTPUT_DIR,
            brotliSize: false, // 关闭打包计算, 提高打包速度
            chunkSizeWarningLimit: 2000,
            rollupOptions: {
                output: {
                    chunkFileNames: 'assets/js/[name]-[hash].js',
                    entryFileNames: 'assets/js/[name]-[hash].js',
                    assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
                }
            },
            // 生产环境移除 console
            terserOptions: {
                compress: {
                    keep_infinity: true,
                    drop_console: VITE_DROP_CONSOLE,
                    drop_debugger: true
                }
            }
        },
        server: {
            host: true,
            port: VITE_PORT, // 设置服务启动端口号
            // open: true, // 设置服务启动时是否自动打开浏览器
            cors: true, // 允许跨域

            // 设置代理，根据我们项目实际情况配置
            proxy: createProxy(VITE_PROXY)
            // proxy: {
            //     '^/api': {
            //         target: 'http://localhost:3000',
            //         changeOrigin: true,
            //         ws: true,
            //         secure: false,
            //         rewrite: (path) => path.replace(/^\/api/, '')
            //     }
            // }
        },
        define: {
            // setting vue-i18-next
            // Suppress warning
            __INTLIFY_PROD_DEVTOOLS__: false,
            __APP_INFO__: JSON.stringify(__APP_INFO__)
        },
        plugins: createVitePlugins(viteEnv, isBuild),
        optimizeDeps: {
            // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
            include: ['@iconify/iconify', 'moment/dist/locale/zh-cn', 'moment/dist/locale/eu'],
            exclude: ['vue-demi']
        }
    })
}
