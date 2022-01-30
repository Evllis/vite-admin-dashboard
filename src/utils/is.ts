const toString = Object.prototype.toString

export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`
}

export const isDef = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}

export const isUnDef = <T = unknown>(val?: T): val is T => {
    return !isDef(val)
}

export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}

export const isEmpty = <T = unknown>(val: T): val is T => {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }

    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }

    if (isObject(val)) {
        return Object.keys(val).length === 0
    }

    return false
}

export const isDate = (val: unknown): val is Date => {
    return is(val, 'Date')
}

export const isNull = (val: unknown): val is null => {
    return val === null
}

export const isNullAndUnDef = (val: unknown): val is null | undefined => {
    return isUnDef(val) && isNull(val)
}

export const isNullOrUnDef = (val: unknown): val is null | undefined => {
    return isUnDef(val) || isNull(val)
}

export const isNumber = (val: unknown): val is number => {
    return is(val, 'Number')
}

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isString = (val: unknown): val is string => {
    return is(val, 'String')
}

export const isFunction = (val: unknown): val is Function => {
    return typeof val === 'function'
}

export const isBoolean = (val: unknown): val is boolean => {
    return is(val, 'Boolean')
}

export const isRegExp = (val: unknown): val is RegExp => {
    return is(val, 'RegExp')
}

export const isArray = (val: any): val is Array<any> => {
    return val && Array.isArray(val)
}

export const isWindow = (val: any): val is Window => {
    return typeof window !== 'undefined' && is(val, 'Window')
}

export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!val.tagName
}

export const isMap = (val: unknown): val is Map<any, any> => {
    return is(val, 'Map')
}

export const isServer = typeof window === 'undefined'

export const isClient = !isServer

export const isUrl = (path: string): boolean => {
    const reg =
        /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
    return reg.test(path)
}

/**
 * 校验电话号码是否合法
 * @param { String } mobile 电话号码
 * @param { Number } pattern 号码类型
 *      0 手机号+固话
 *      1 手机号
 *      2 固话
 * @return { Boolean }
 */
export const isMobile = (mobile: string, pattern = 1): boolean => {
    switch (pattern) {
        case 0:
            if (mobile.length === 11) {
                if (mobile.match(/^[1][3-9][0-9]$/)) {
                    return true
                }
                return false
            } else {
                if (!mobile.match(/(^\+86|86|\[86\]|\(86\)|\+0086|0086|\[0086\]|\(0086\))(\s[1]|[1])[345678][0-9]{9}$/)) {
                    if (mobile.match(/^[4,8,0][0-9]{2,3}(-[0-9]{7,8}$|(\s)[0-9]{7,8}$|[0-9]{7,8}$)/)) {
                        return true
                    }
                    return false
                }
                return true
            }
        case 1:
            if (mobile.length === 11) {
                if (mobile.match(/^[1][3-9][0-9]{9}$/)) {
                    return true
                }
                return false
            } else {
                if (mobile.match(/(^\+86|86|\[86\]|\(86\)|\+0086|0086|\[0086\]|\(0086\))(\s[1]|[1])[345678][0-9]{9}$/)) {
                    return true
                }
                return false
            }
        default:
            if (mobile.match(/^[4,8,0][0-9]{2,3}(-[0-9]{7,8}$|(\s)[0-9]{7,8}$|[0-9]{7,8}$)/)) {
                return true
            }
            return false
    }
}

/**
 * 校验注册用户名起名是否合法, 4到16位（中文、字母、数字、下划线，减号）
 * @param { String } account 用户名
 * @return { Boolean }
 */
export const isAccount = (account: string) => {
    if (/^[\u4e00-\u9fa5A-Za-z0-9-_]{4,16}$/.test(account)) {
        return true
    }
    return false
}
