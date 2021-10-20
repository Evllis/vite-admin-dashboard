module.exports = {
    moduleFileExtensions: ['vue', 'js', 'ts'],
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.vue$': 'vue-jest', // vue 文件用 vue-jest 转换
        '^.+\\.ts$': 'ts-jest' // ts 文件用 ts-jest 转换
    },
    // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
    moduleNameMapper: {
        '/@/(.*)$': '<rootDir>/src/$1' // 这里的key是一个正则表达式, 找到 @/ 开头 (.*) 圆括号捕获匹配，$ 结束。 value 是一个映射路径, <rootDir> 指向jest根目录， $1 是正则捕获的值
    }
}
