/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

type ProxyItem = [string, string]

type ProxyList = ProxyItem[]

type ProxyTargetList = Record<string, ProxyOptions>

const httpsRE = /^https:\/\//

/**
 * Generate proxy
 * @param list
 */
const createProxy = (list: ProxyList = []): ProxyTargetList => {
    const ret = {}
    Object.keys(list).forEach((item) => {
        const value = list[item]
        const isHttps = httpsRE.test(value)
        // https://github.com/http-party/node-http-proxy#options
        ret[item] = {
            value,
            changeOrigin: true,
            ws: true,
            rewrite: (path) => path.replace(new RegExp(`^${item}`), ''),
            // https is require secure=false
            ...(isHttps ? { secure: false } : {})
        }
    })
    return ret
}

export default createProxy
