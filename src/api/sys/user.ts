import { defHttp } from '/@/utils/http/axios'
import { LoginParams, LoginResultModel, RegisterResultModel, GetUserInfoModel } from './model/userModel'

import { ErrorMessageMode } from '/#/axios'

enum Api {
    Login = '/user/login',
    Register = '/user/register',
    Logout = '/user/logout',
    GetUserInfo = '/user/getUserInfo',
    GetPermCode = '/user/getPermCode'
}

/**
 * @description: user login api
 */
export const loginApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') => {
    return defHttp.post<LoginResultModel>(
        {
            url: Api.Login,
            params
        },
        {
            errorMessageMode: mode
        }
    )
}

/**
 * @description: user register api
 */
export const registerApi = (params: LoginParams, mode: ErrorMessageMode = 'modal') => {
    return defHttp.post<RegisterResultModel>(
        {
            url: Api.Register,
            params
        },
        {
            errorMessageMode: mode
        }
    )
}

/**
 * @description: getUserInfo
 */
export const getUserInfo = () => {
    return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' })
}

export const getPermCode = () => {
    return defHttp.get<string[]>({ url: Api.GetPermCode })
}

export const doLogout = () => {
    return defHttp.get({ url: Api.Logout })
}
