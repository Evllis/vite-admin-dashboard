// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { showMessage } from '@/api/status'

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()

/**
 * 添加请求
 * @param { Object } config
 */
const addPending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    config.cancelToken =
        config.cancelToken ||
        new axios.CancelToken((cancel) => {
            if (!pending.has(url)) {
                pending.set(url, cancel)
            }
        })
}

/**
 * 移除请求
 * @param { Object } config
 */
const removePending = (config: AxiosRequestConfig) => {
    const url = [
        config.method,
        config.url,
        qs.stringify(config.params),
        qs.stringify(config.data)
    ].join('&')
    if (pending.has(url)) {
        // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
        const cancel = pending.get(url)
        cancel(url)
        pending.delete(url)
    }
}

/**
 * 清空pending中的请求(在路由跳转时调用)
 */
export const clearPending = () => {
    pending.forEach((item) => {
        item.cancel(item.url)
    })
    pending.clear()
}

const service = axios.create({
    // 联调
    // baseURL: process.env.NODE_ENV === 'production' ? '/' : '/api'
    baseURL: '/',
    headers: {
        get: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    },
    // 是否跨域站点访问请求
    withCredentials: true,
    timeout: 30000,
    transformRequest: [
        (data) => {
            return JSON.stringify(data)
        }
    ],
    validateStatus() {
        // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
        return true
    },
    transformResponse: [
        (data) => {
            if (typeof data === 'string' && data.startsWith('{')) {
                return JSON.parse(data)
            }
            return data
        }
    ]
})

// 请求拦截
service.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // 在请求开始前, 对之前的请求做检查取消操作
        removePending(config)
        // 将当前请求添加到pending中
        addPending(config)
        // 获取token，并将其添加至请求头中
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `${token}`
        }
        return config
    },
    (error) => {
        // 错误抛业务代码
        const err = JSON.parse(JSON.stringify(error))
        err.data = {}
        err.data.msg = '服务器异常, 请联系管理员!'
        return Promise.resolve(err)
    }
)

// 响应拦截
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 请求结束后, 移除本次请求
        removePending(response)
        const { status } = response
        let msg = ''
        if (status < 200 || status >= 300) {
            // 处理http错误
            msg = showMessage(status)
            if (typeof response.data === 'string') {
                response.data = { msg }
            } else {
                response.data.msg = msg
            }
        }
        return response
    },
    (error) => {
        const err = JSON.parse(JSON.stringify(error))
        if (axios.isCancel(err)) {
            console.log(`repeated request: ${err.message}`)
        } else {
            // handle error code
            err.data = {}
            err.data.msg = '请求超时或服务器异常, 请检查网络或联系管理员!'
            ElMessage.error(err.data.msg)
        }
        return Promise.reject(err)
    }
)

export default service
