import { App, Component } from 'vue'

interface FileType {
    [key: string]: Component
}

// 导入 globComponents 下面的 所有 .vue文件
const files: Record<string, FileType> = import.meta.globEager('/src/components/golbComponents/**/*.vue')

export default (app: App): void => {
    // 因为通过 import.meta.globEager 返回的列表不能迭代所以直接使用 Object.keys 拿到 key 遍历
    Object.keys(files).forEach((c: string) => {
        const component = files[c]?.default
        // 挂载全局控件
        console.log(111, component.name)
        app.component(component.name as string, component)
    })
}
