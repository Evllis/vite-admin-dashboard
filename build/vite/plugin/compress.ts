/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import type { Plugin } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export const configCompressPlugin = (compress: 'gzip' | 'brotli' | 'none', deleteOriginFile = false): Plugin | Plugin[] => {
    const compressList = compress.split(',')

    const plugins: Plugin[] = []

    if (compressList.includes('gzip')) {
        plugins.push(
            compressPlugin({
                threshold: 10240, // 如果体积大于该阈值，它将被压缩，单位为b
                verbose: true, // 是否在控制台中输出压缩结果
                disable: false, // 是否禁用
                algorithm: 'gzip', // 压缩算法, 可选['gzip','brotliCompress' ,'deflate','deflateRaw']
                ext: '.gz', // 生成的压缩包的后缀
                deleteOriginFile
            })
        )
    }

    if (compressList.includes('brotli')) {
        plugins.push(
            compressPlugin({
                ext: '.br',
                algorithm: 'brotliCompress',
                deleteOriginFile
            })
        )
    }
    return plugins
}
