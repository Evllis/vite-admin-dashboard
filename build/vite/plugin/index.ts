import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import legacy from '@vitejs/plugin-legacy'
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

import configPwaConfig from './pwa'
import configMockPlugin from './mock'
import configCompressPlugin from './compress'
import configSvgIconsPlugin from './svgSprite'
import configImageminPlugin from './imagemin'

const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
    const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
    const vitePlugins: (Plugin | Plugin[])[] = [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) => tag.startsWith('-')
                }
            }
        }),
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
    ]

    // vite-plugin-windicss
    vitePlugins.push(windiCSS())

    // @vitejs/plugin-legacy
    if (VITE_LEGACY && isBuild) vitePlugins.push(legacy())

    // vite-plugin-svg-icons
    vitePlugins.push(configSvgIconsPlugin(isBuild))

    // vite-plugin-mock
    if (VITE_USE_MOCK) vitePlugins.push(configMockPlugin(isBuild))

    // The following plugins only work in the production environment
    if (isBuild) {
        // vite-plugin-imagemin
        if (VITE_USE_IMAGEMIN) vitePlugins.push(configImageminPlugin())

        // rollup-plugin-gzip
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
        // vite-plugin-pwa
        vitePlugins.push(configPwaConfig(viteEnv))
    }

    return vitePlugins
}

export default createVitePlugins
