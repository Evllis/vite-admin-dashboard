import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// vite静态资源压缩 start
import viteCompression from 'vite-plugin-compression'
// 需要配置nginx
// gzip_static on; 启动模块。您应该确保压缩和解压文件的时间戳匹配
// gzip_http_version   1.1;  版本，默认是1.1， 使用 gzip_static,就是要 1.1的版本
// gzip_proxied  expired no-cache no-store private auth;  Nginx作为反向代理的时候启用，开启或者关闭后端服务器返回的结果
// vite静态资源压缩 end

// 按需导入elementplus start
import styleImport from 'vite-plugin-style-import'
import viteComponents, { ElementPlusResolver } from 'vite-plugin-components'
// 按需导入elementplus end

// 如果编辑器提示 path 模块找不到，则可以安装一下 @types/node -> npm i @types/node -D
import { resolve } from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const envUrl = { ...process.env, ...loadEnv(mode, process.cwd()) }
    return defineConfig({
        plugins: [
            vue(),
            viteCompression({
                // 生成压缩包gz
                verbose: true, // 是否在控制台中输出压缩结果
                disable: false, // 是否禁用
                threshold: 10240, // 如果体积大于该阈值，它将被压缩，单位为b
                algorithm: 'gzip', // 压缩算法, 可选['gzip','brotliCompress' ,'deflate','deflateRaw']
                ext: '.gz' // 生成的压缩包的后缀
            }),
            viteComponents({
                customComponentResolvers: [ElementPlusResolver()]
            }),
            // 按需导入element-plus的css样式
            styleImport({
                libs: [
                    {
                        libraryName: 'element-plus',
                        esModule: true,
                        resolveStyle: (name) => {
                            return `element-plus/lib/theme-chalk/${name}.css`
                        }
                    }
                ]
            })
        ],
        resolve: {
            alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
        },
        base: envUrl.VITE_BASE_URL, // 设置打包路径
        // 静态资源合并打包的问题
        build: {
            brotliSize: false, // 关闭打包计算, 提高打包速度
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
                    drop_console: true,
                    drop_debugger: true
                }
            }
        },
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
