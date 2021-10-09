module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
        'plugin:prettier/recommended', // 添加 prettier 插件
        'plugin:jest/recommended'
    ],
    parserOptions: {
        ecmaVersion: 12,
        parser: '@typescript-eslint/parser',
        sourceType: 'module'
    },
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
