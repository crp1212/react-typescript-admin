module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["plugin:@typescript-eslint/recommended",],
    plugins: ["@typescript-eslint", "react", "react/jsx-uses-vars"],
    'env': {
        'browser': true,
        'es6': true
    },
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'rules': {
        '@typescript-eslint/indent': [
            'error',
            2
        ],
        '@typescript-eslint/explicit-function-return-type': 0,
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "@typescript-eslint/no-unused-vars": 0
    }
}