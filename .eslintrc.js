module.exports = {
    'env': {
        'browser': true,
        'node': true,
        'es2020': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    'parser': 'babel-eslint',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        'babel'
    ],
    'rules': {
        'no-constant-condition': ['off'],
        'semi': ['error', 'never'],
        'quotes': ['error', 'single'],
    },
}
