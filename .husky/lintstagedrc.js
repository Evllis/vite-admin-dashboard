module.exports = {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'prettier --write'],
    '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
    'package.json': ['prettier --write'],
    '*.vue': ['prettier --write', 'stylelint --cache --fix "**/*.{vue,less,postcss,css,scss}" --cache --cache-location ../node_modules/.cache/stylelint/'],
    '*.{scss,less,styl,css,html}': [
        'stylelint --cache --fix "../**/*.{vue,less,postcss,css,scss}" --cache --cache-location .../node_modules/.cache/stylelint/',
        'prettier --write'
    ],
    '*.md': ['prettier --write']
}
