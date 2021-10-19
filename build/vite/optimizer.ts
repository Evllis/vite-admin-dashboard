// TODO
import type { GetManualChunk } from 'rollup'

//
const vendorLibs: { match: string[]; output: string }[] = [
    // {
    //   match: ['xlsx'],
    //   output: 'xlsx',
    // },
]

const configManualChunk: GetManualChunk = (id: string): string | null => {
    if (/[\\/]node_modules[\\/]/.test(id)) {
        const matchItem = vendorLibs.find((item) => {
            const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig')
            return reg.test(id)
        })
        return matchItem ? matchItem.output : null
    }
    return null
}

export default configManualChunk
