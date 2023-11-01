module.exports = {
    'extends': [
        'eslint-config-react-app'
    ],
    'rules': {
        'quotes': ['error', 'single'],
        'import/no-anonymous-default-export': 'off'
    },
    'globals': {
        'cy': true
    }
}
