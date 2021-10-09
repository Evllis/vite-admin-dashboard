/**
 * @module .eslintrc
 * @author: evllis
 * @description: eslint配置
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    // 指定如何解析语法。可以为空，但若不为空，只能配该值，原因见下文
    parser: 'vue-eslint-parser',
    // 优先级低于parse的语法解析配置
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        parser: '@typescript-eslint/parser', // Specifies the ESLint parser
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            // tsx: true, // Allows for the parsing of JSX
            jsx: true
        }
    },
    // 扩展配置，加一些插件
    extends: [
        // 'plugin:vue/essential',
        'plugin:vue/vue3-recommended',
        'eslint:recommended',
        'airbnb-base',
        'plugin:@typescript-eslint/recommended', // typescript-eslint推荐规则
        'plugin:jest/recommended',
        'plugin:prettier/recommended' // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出. 确保在最后一个.
    ],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
        // 四个空格缩进
        indent: [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true
            }
        ],
        // 变量后面不加分号
        semi: ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true
            }
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-absolute-path': 'off',
        // 关闭检测console函数
        'no-console': 'off',
        // 关闭检测一元运算符，比如 ++，--
        'no-plusplus': [
            'off',
            {
                allowForLoopAfterthoughts: true
            }
        ],
        // 过滤同名参数，对象修改现象报错提示
        'no-param-reassign': [
            'error',
            {
                props: true,
                ignorePropertyModificationsFor: [
                    'e', // for e.returnvalue
                    'ctx', // for Koa routing
                    'req', // for Express requests
                    'request', // for Express requests
                    'res', // for Express responses
                    'response', // for Express responses
                    'state', // for vuex state
                    'config'
                ]
            }
        ],
        '@typescript-eslint/no-unused-vars': 'error',
        // 允许非空断言
        '@typescript-eslint/no-non-null-assertion': 'off',
        // 允许自定义模块和命名空间
        '@typescript-eslint/no-namespace': 'off',
        // 允许对this设置alias
        '@typescript-eslint/no-this-alias': 'off',
        // 允许使用any类型
        '@typescript-eslint/no-explicit-any': ['off'],
        'vue/comment-directive': 'off'
    },
    settings: {
        jest: {
            version: 26
        }
    }
}
