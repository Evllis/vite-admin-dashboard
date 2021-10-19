/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { Plugin } from 'vite'
import styleImport from 'vite-plugin-style-import'

const configStyleImportPlugin = (isBuild: boolean): Plugin | [] => {
    if (!isBuild) {
        return []
    }
    const styleImportPlugin = styleImport({
        libs: [
            {
                libraryName: 'element-plus',
                esModule: true,
                resolveStyle: (name) => {
                    // 这里是“子组件”列表，无需额外引入样式文件
                    const ignoreList: string[] = [
                        /* 'sub-menu', 'menu-item' */
                    ]
                    return ignoreList.includes(name) ? '' : `element-plus/lib/theme-chalk/${name}.css`
                }
            }
        ]
    })
    return styleImportPlugin
}

export default configStyleImportPlugin
