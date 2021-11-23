/**
 * Package file volume analysis
 */
import { Plugin } from 'vite'
import visualizer from 'rollup-plugin-visualizer'
import { isReportMode } from '../../utils'

export const configVisualizerConfig = (): Plugin | [] => {
    if (isReportMode()) {
        return visualizer({
            filename: './node_modules/.cache/visualizer/stats.html',
            open: true,
            gzipSize: true,
            brotliSize: true
        }) as Plugin
    }
    return []
}
