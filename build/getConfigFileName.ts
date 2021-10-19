/**
 * Get the configuration file variable name
 * @param env
 */
const getConfigFileName = (env: Record<string, any>): string => {
    return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`.toUpperCase().replace(/\s/g, '')
}

export default getConfigFileName
