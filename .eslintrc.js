/**
 * @module .eslintrc
 * @author: evllis
 * @description: eslint配置
 */
module.exports = {
    // ↓默认情况下，ESLint 会在所有父级目录里寻找配置文件，一直到根目录。如果你想要你所有项目都遵循一个特定的约定时，这将会很有用，但有时候会导致意想不到的结果。为了将 ESLint 限制到一个特定的项目，在你项目根目录下的 package.json 文件或者 .eslintrc.* 文件里的 eslintConfig 字段下设置 "root": true。ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
    // ↓此项是用来告诉eslint找当前配置文件不能往父级查找
    root: true,
    // ↓指定你想启用的环境
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
    // ↓自定义规则配置
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
                    'config',
                    'item'
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
        'vue/comment-directive': 'off',
        // 关闭变量名以__下划线开头时报错的问题
        'no-underscore-dangle': 0,
        'no-shadow': 'off'
    },
    settings: {
        jest: {
            version: 26
        }
    }
}
