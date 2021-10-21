import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import windiCSS from 'vite-plugin-windicss'
import legacy from '@vitejs/plugin-legacy'

// 按需导入elementplus end
import PurgeIcons from 'vite-plugin-purge-icons'
// PWA一些技术集成
import configPwaConfig from './pwa'
// mock数据联调
import configMockPlugin from './mock'
// vite-plugin-compress的增强版，压缩用
import configCompressPlugin from './compress'
// svg组件化插件
import configSvgIconsPlugin from './svgSprite'
// 压缩图片资源
import configImageminPlugin from './imagemin'
// css样式框架
import configWindiCssPlugin from './windicss'
// 按需加载样式
import configStyleImportPlugin from './styleImport'
// 依赖分析
import configVisualizerConfig from './visualizer'

const createVitePlugins = (viteEnv: ViteEnv, isBuild: boolean) => {
    const { VITE_USE_IMAGEMIN, VITE_USE_MOCK, VITE_LEGACY, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv
    const vitePlugins: (Plugin | Plugin[])[] = [vue()]

    // css样式框架
    vitePlugins.push(windiCSS())

    // @vitejs/plugin-legacy
    if (VITE_LEGACY && isBuild) vitePlugins.push(legacy())

    // svg组件化插件
    vitePlugins.push(configSvgIconsPlugin(isBuild))

    // css样式框架
    vitePlugins.push(configWindiCssPlugin())
    // PurgeIcons
    vitePlugins.push(PurgeIcons())
    // 按需加载样式
    vitePlugins.push(configStyleImportPlugin())
    // 依赖分析
    vitePlugins.push(configVisualizerConfig())

    // mock数据联调
    if (VITE_USE_MOCK) vitePlugins.push(configMockPlugin(isBuild))

    // The following plugins only work in the production environment
    if (isBuild) {
        // 压缩图片资源
        if (VITE_USE_IMAGEMIN) vitePlugins.push(configImageminPlugin())

        // vite-plugin-compress的增强版，压缩用
        vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE))
        // PWA一些技术集成
        vitePlugins.push(configPwaConfig(viteEnv))
    }

    return vitePlugins
}

export default createVitePlugins
