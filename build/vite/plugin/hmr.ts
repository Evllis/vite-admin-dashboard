import type { Plugin } from 'vite'

/**
 * TODO
 * Temporarily solve the Vite circular dependency problem, and wait for a better solution to fix it later. I don't know what problems this writing will bring.
 * @returns
 */

export const configHmrPlugin = (): Plugin => {
    return {
        name: 'singleHMR',
        handleHotUpdate({ modules, file }) {
            if (file.match(/xml$/)) return []

            modules.forEach((item) => {
                if (!item.url.match(/\.(css|less)/)) {
                    item.importedModules = new Set()
                    item.importers = new Set()
                }
            })

            return modules
        }
    }
}
