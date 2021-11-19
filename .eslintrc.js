const { defineConfig } = require('eslint-define-config')
module.exports = defineConfig({
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
        jsxPragma: 'React',
        ecmaFeatures: {
            // tsx: true, // Allows for the parsing of JSX
            jsx: true
        }
    },
    // 扩展配置，加一些插件
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:prettier/recommended',
        'plugin:jest/recommended' // 使用prettier中的样式规范，且如果使得ESLint会检测prettier的格式问题，同样将格式问题以error的形式抛出. 确保在最后一个.
    ],
    plugins: ['vue', '@typescript-eslint', 'import'],
    // ↓自定义规则配置
    rules: {
        // 四个空格缩进
        indent: 'off',
        // indent: [
        //     'error',
        //     4,
        //     {
        //         SwitchCase: 1,
        //         flatTernaryExpressions: true
        //     }
        // ],
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
        // 'no-param-reassign': [
        //     'error',
        //     {
        //         props: true,
        //         ignorePropertyModificationsFor: [
        //             'e', // for e.returnvalue
        //             'ctx', // for Koa routing
        //             'req', // for Express requests
        //             'request', // for Express requests
        //             'res', // for Express responses
        //             'response', // for Express responses
        //             'state', // for vuex state
        //             'config',
        //             'item'
        //         ]
        //     }
        // ],
        // 关闭：禁止对函数参数再赋值检测
        'no-param-reassign': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
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
        'no-shadow': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'never',
                    component: 'always'
                },
                svg: 'always',
                math: 'always'
            }
        ],
        'vue/multi-word-component-names': 'off',
        'vue/require-default-prop': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/one-component-per-file': 'off',
        'vue/attributes-order': 'off',
        'space-before-function-paren': 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        'no-use-before-define': 'off',
        'vue/custom-event-name-casing': 'off',
        'vue/script-setup-uses-vars': 'error',
        'vue/v-on-event-hyphenation': 'off'
    },
    settings: {
        jest: {
            version: 26
        }
    }
})
