import Axios from 'axios'
import { ElMessage } from 'element-plus'

const baseURL = 'https://api.github.com'

const axios = Axios.create({
    baseURL,
    timeout: 2000 // 请求超时 20s
})

// 前置拦截器(发起请求之前拦截)
axios.interceptors.request.use(
    (response) => {
        /**
         * 根据你的项目实际情况来对config做处理
         * 这里对config不做任何处理，直接返回
         */
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 后置拦截器(获取响应时的拦截)
axios.interceptors.response.use(
    (response) => {
        /**
         * 根据你的项目实际情况对response和error做处理
         * 这里对response和error不做任何处理，直接返回
         */
        return response
    },
    (error) => {
        if (error.response && error.response.data) {
            const code = error.response.status
            const msg = error.response.data.message
            ElMessage.error(`Code: ${code}, Message: ${msg}`)
            console.error(`[Axios Error]`, error.message)
        } else {
            ElMessage.error(`${error}`)
        }
        return Promise.reject(error)
    }
)

export default axios
