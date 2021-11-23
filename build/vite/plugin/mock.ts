/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { Plugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export const configMockPlugin = (isBuild: boolean): Plugin => {
    return viteMockServe({
        ignore: /^_/, // 忽略以_开头的文件
        mockPath: './src/server/mock', // mock文件地址
        localEnabled: !isBuild, // 开发打包开关
        prodEnabled: isBuild, // 生产打包开关
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
            import setupProdMockServer from './mock/_createProductionServer';
            setupProdMockServer();
        `,
        logger: false, // 是否在控制台显示请求日志
        supportTs: false // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
    })
}
