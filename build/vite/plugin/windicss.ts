import type { Plugin } from 'vite'

import windiCSS from 'vite-plugin-windicss'

const configWindiCssPlugin = (): Plugin[] => {
    return windiCSS({
        safelist: 'no-select',
        preflight: {
            enableAll: true
        }
    })
}

export default configWindiCssPlugin
