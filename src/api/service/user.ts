import Axios from '@/api/http'
import { HttpResponse } from '@/types/http'

// const developmentEnv = import.meta.env.VITE_MODE_NAME === 'development'

/**
 * @interface loginParams 登录参数
 * @property { String } username 用户名
 * @property { String } password 用户密码
 */
interface LoginParams {
    username: string
    password: string
}

// 封装User类型的接口方法
export default class UserService {
    /**
     * @description 查询User的信息
     * @param { Number } teamId 查询团队ID
     * @return { HttpResponse } result
     */
    static async login(params: LoginParams): Promise<HttpResponse> {
        return Axios('/api/login', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            }
        })
    }

    static async resgister(params: LoginParams): Promise<HttpResponse> {
        return Axios('/api/resgister', {
            method: 'get',
            responseType: 'json',
            params: {
                ...params
            }
        })
    }
}
