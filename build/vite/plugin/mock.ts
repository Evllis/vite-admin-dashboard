/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { Plugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

const configMockPlugin = (isBuild: boolean): Plugin => {
    return viteMockServe({
        // ignore: /^\_/,
        ignore: /^_/,
        mockPath: 'mock',
        localEnabled: !isBuild,
        prodEnabled: isBuild,
        injectCode: `
       import { setupProdMockServer } from '../mock/_createProductionServer';
       setupProdMockServer();
       `
    })
}

export default configMockPlugin
